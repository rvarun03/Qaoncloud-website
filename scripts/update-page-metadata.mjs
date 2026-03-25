import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import os from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const require = createRequire(import.meta.url);
// typescript is a devDependency in this repo
const ts = require("typescript");

const execFileAsync = promisify(execFile);

const DEFAULT_INPUT =
  "/home/varun/Downloads/meta title and desc - qaoncloud.xlsx";

const APP_DIR = path.resolve("src/app");
const PAGE_FILE_RE = /^page\.(tsx|ts|jsx|js)$/;

function normalizeRoute(route) {
  if (!route) return null;
  let value = String(route).trim();
  if (!value) return null;

  // Accept full URLs and pull pathname
  if (/^https?:\/\//i.test(value)) {
    try {
      value = new URL(value).pathname || "/";
    } catch {
      // ignore and treat as raw
    }
  }

  if (!value.startsWith("/")) value = `/${value}`;
  value = value.replace(/\/+$/, "");
  if (value === "") value = "/";
  return value;
}

function tokenize(value) {
  if (!value) return [];
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean);
}

function normForMatch(value) {
  return tokenize(value).join("");
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

function computeRouteFromPageFile(filePath) {
  const rel = path.relative(APP_DIR, filePath);
  const dir = path.dirname(rel);
  const segments = dir === "." ? [] : dir.split(path.sep);
  const filtered = segments.filter((seg) => {
    if (!seg) return false;
    if (seg.startsWith("(") && seg.endsWith(")")) return false; // route groups
    if (seg.startsWith("@")) return false; // parallel routes
    return true;
  });
  if (filtered.length === 0) return "/";
  return `/${filtered.join("/")}`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        const next = text[i + 1];
        if (next === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ",") {
      row.push(field);
      field = "";
      continue;
    }
    if (ch === "\n") {
      row.push(field.replace(/\r$/, ""));
      field = "";
      rows.push(row);
      row = [];
      continue;
    }
    field += ch;
  }
  row.push(field.replace(/\r$/, ""));
  rows.push(row);
  return rows;
}

async function convertExcelToCsv(inputPath) {
  const tmpRoot = os.tmpdir();
  const outDir = await fs.mkdtemp(path.join(tmpRoot, "qaoncloud-meta-out-"));
  const profileDir = await fs.mkdtemp(
    path.join(tmpRoot, "qaoncloud-lo-profile-")
  );
  const xdgRuntimeDir = path.join(profileDir, "xdg-runtime");
  await fs.mkdir(xdgRuntimeDir, { recursive: true });

  const args = [
    "--headless",
    "--nologo",
    "--norestore",
    `-env:UserInstallation=file://${profileDir}`,
    "--convert-to",
    "csv",
    "--outdir",
    outDir,
    inputPath,
  ];

  try {
    await execFileAsync("soffice", args, {
      env: {
        ...process.env,
        HOME: profileDir,
        XDG_RUNTIME_DIR: xdgRuntimeDir,
      },
      timeout: 120_000,
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (err) {
    const message =
      err?.stderr ||
      err?.stdout ||
      err?.message ||
      "Unknown LibreOffice conversion error";
    throw new Error(
      `Failed to convert Excel to CSV via soffice.\n` +
        `Tried: soffice ${args.map((a) => JSON.stringify(a)).join(" ")}\n` +
        `Error: ${String(message).trim()}`
    );
  }

  const converted = (await fs.readdir(outDir)).filter((f) =>
    f.toLowerCase().endsWith(".csv")
  );
  if (converted.length === 0) {
    throw new Error(
      `Converted output not found in ${outDir}. Expected a .csv file.`
    );
  }
  if (converted.length > 1) {
    // If multiple, choose the one that matches the input basename.
    const base = path.basename(inputPath).replace(/\.(xlsx|xls)$/i, "");
    const best = converted.find(
      (f) => path.basename(f).replace(/\.csv$/i, "") === base
    );
    if (best) return path.join(outDir, best);
  }
  return path.join(outDir, converted[0]);
}

function findHeaderIndex(headers, candidates) {
  const lowered = headers.map((h) => String(h || "").trim().toLowerCase());
  for (const cand of candidates) {
    const idx = lowered.findIndex((h) => h === cand);
    if (idx !== -1) return idx;
  }
  for (const cand of candidates) {
    const idx = lowered.findIndex((h) => h.includes(cand));
    if (idx !== -1) return idx;
  }
  return -1;
}

function getScriptKind(filePath) {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (filePath.endsWith(".ts")) return ts.ScriptKind.TS;
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
}

function hasUseClientDirective(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (!ts.isExpressionStatement(stmt)) break;
    const expr = stmt.expression;
    if (!ts.isStringLiteral(expr)) break;
    if (expr.text === "use client") return true;
  }
  return false;
}

function isExported(node) {
  return (
    node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false
  );
}

function isObjectLiteralExpression(node) {
  return node && ts.isObjectLiteralExpression(node);
}

function unwrapExpression(expr) {
  let current = expr;
  while (current) {
    if (ts.isParenthesizedExpression(current)) {
      current = current.expression;
      continue;
    }
    if (ts.isAsExpression(current)) {
      current = current.expression;
      continue;
    }
    if (ts.isSatisfiesExpression?.(current)) {
      current = current.expression;
      continue;
    }
    break;
  }
  return current;
}

function findObjectLiteralInExpression(expr) {
  const unwrapped = unwrapExpression(expr);
  if (isObjectLiteralExpression(unwrapped)) return unwrapped;
  // Arrow returning object literal: () => ({ ... })
  return null;
}

function applyTextChange(text, start, end, replacement) {
  return text.slice(0, start) + replacement + text.slice(end);
}

function inferIndentAt(text, index) {
  const lineStart = text.lastIndexOf("\n", index - 1) + 1;
  const prefix = text.slice(lineStart, index);
  const match = prefix.match(/^[ \t]*/);
  return match ? match[0] : "";
}

function formatMetadataObjectLiteral({ title, description, baseIndent = "" }) {
  const propIndent = `${baseIndent}  `;
  return (
    `${baseIndent}{\n` +
    `${propIndent}title: ${JSON.stringify(String(title ?? ""))},\n` +
    `${propIndent}description: ${JSON.stringify(String(description ?? ""))},\n` +
    `${baseIndent}}`
  );
}

function findExportedMetadataObjectLiteral(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    if (!isExported(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      if (decl.name.text !== "metadata") continue;
      if (!decl.initializer) return { kind: "metadata", objectLiteral: null };
      const objectLiteral = findObjectLiteralInExpression(decl.initializer);
      return { kind: "metadata", objectLiteral };
    }
  }
  return null;
}

function findExportedGenerateMetadataReturnObjectLiteral(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (ts.isFunctionDeclaration(stmt)) {
      if (!isExported(stmt)) continue;
      if (!stmt.name || stmt.name.text !== "generateMetadata") continue;
      if (!stmt.body) return { kind: "generateMetadata", objectLiteral: null };
      for (const s of stmt.body.statements) {
        if (!ts.isReturnStatement(s) || !s.expression) continue;
        const obj = findObjectLiteralInExpression(s.expression);
        if (obj) return { kind: "generateMetadata", objectLiteral: obj };
      }
      return { kind: "generateMetadata", objectLiteral: null };
    }

    if (ts.isVariableStatement(stmt)) {
      if (!isExported(stmt)) continue;
      for (const decl of stmt.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        if (decl.name.text !== "generateMetadata") continue;
        if (!decl.initializer) return { kind: "generateMetadata", objectLiteral: null };
        const init = unwrapExpression(decl.initializer);
        if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
          const body = init.body;
          if (ts.isBlock(body)) {
            for (const s of body.statements) {
              if (!ts.isReturnStatement(s) || !s.expression) continue;
              const obj = findObjectLiteralInExpression(s.expression);
              if (obj) return { kind: "generateMetadata", objectLiteral: obj };
            }
          } else {
            const obj = findObjectLiteralInExpression(body);
            if (obj) return { kind: "generateMetadata", objectLiteral: obj };
          }
        }
        return { kind: "generateMetadata", objectLiteral: null };
      }
    }
  }
  return null;
}

function computeInsertPosForMetadata(sourceFile, text) {
  let insertPos = 0;

  // Skip directives like 'use client'/'use server'
  for (const stmt of sourceFile.statements) {
    if (!ts.isExpressionStatement(stmt)) break;
    const expr = stmt.expression;
    if (!ts.isStringLiteral(expr)) break;
    insertPos = stmt.end;
  }

  let lastImportEnd = -1;
  for (const stmt of sourceFile.statements) {
    if (ts.isImportDeclaration(stmt) || ts.isImportEqualsDeclaration(stmt)) {
      lastImportEnd = Math.max(lastImportEnd, stmt.end);
    }
  }
  if (lastImportEnd !== -1) insertPos = lastImportEnd;

  // Insert after any trailing whitespace/newlines after the last import/directive
  while (insertPos < text.length && (text[insertPos] === "\n" || text[insertPos] === "\r")) {
    insertPos++;
  }

  return insertPos;
}

async function updatePageFile(filePath, { title, description }) {
  const original = await fs.readFile(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    original,
    ts.ScriptTarget.Latest,
    true,
    getScriptKind(filePath)
  );

  const isClient = hasUseClientDirective(sourceFile);

  const metaDecl = findExportedMetadataObjectLiteral(sourceFile);
  if (metaDecl) {
    if (!metaDecl.objectLiteral) {
      return {
        updated: false,
        reason: "Found exported metadata but couldn't safely edit (non-literal initializer).",
      };
    }
    const start = metaDecl.objectLiteral.getStart(sourceFile);
    const end = metaDecl.objectLiteral.getEnd();
    const baseIndent = inferIndentAt(original, start);
    const replacement = formatMetadataObjectLiteral({
      title,
      description,
      baseIndent,
    });
    const nextText = applyTextChange(original, start, end, replacement);
    if (nextText === original) return { updated: false, reason: "No changes." };
    await fs.writeFile(filePath, nextText, "utf8");
    return { updated: true, mode: "metadata" };
  }

  const genDecl = findExportedGenerateMetadataReturnObjectLiteral(sourceFile);
  if (genDecl) {
    if (!genDecl.objectLiteral) {
      return {
        updated: false,
        reason:
          "Found exported generateMetadata but couldn't locate an object-literal return to edit.",
      };
    }
    const start = genDecl.objectLiteral.getStart(sourceFile);
    const end = genDecl.objectLiteral.getEnd();
    const baseIndent = inferIndentAt(original, start);
    const replacement = formatMetadataObjectLiteral({
      title,
      description,
      baseIndent,
    });
    const nextText = applyTextChange(original, start, end, replacement);
    if (nextText === original) return { updated: false, reason: "No changes." };
    await fs.writeFile(filePath, nextText, "utf8");
    return { updated: true, mode: "generateMetadata" };
  }

  if (isClient) {
    return {
      updated: false,
      reason:
        "Page is a client component ('use client'); skipping adding metadata export.",
    };
  }

  const insertPos = computeInsertPosForMetadata(sourceFile, original);
  const objectLiteral = formatMetadataObjectLiteral({ title, description });
  const block =
    (insertPos === 0 ? "" : "\n\n") +
    `export const metadata = ${objectLiteral};\n`;
  const nextText = applyTextChange(original, insertPos, insertPos, block);
  await fs.writeFile(filePath, nextText, "utf8");
  return { updated: true, mode: "inserted" };
}

function pickBestRouteForRow({ pages, title }, allRoutes) {
  const pagesTokens = tokenize(pages);
  const titleTokens = tokenize(title);
  const pagesNorm = normForMatch(pages);
  if (!pagesNorm) return null;

  if (pagesNorm === "homepage" || pagesNorm === "home") return "/";

  let best = null;
  for (const route of allRoutes) {
    const routeTokens = tokenize(route);
    const routeNorm = normForMatch(route);
    const lastSeg = route === "/" ? "homepage" : route.split("/").pop();
    const lastSegNorm = normForMatch(lastSeg);

    let score = 0;
    if (routeNorm === pagesNorm) score += 1000;
    if (lastSegNorm === pagesNorm) score += 900;
    if (routeNorm.includes(pagesNorm)) score += 500 + Math.min(200, pagesNorm.length);
    if (lastSegNorm.includes(pagesNorm)) score += 450 + Math.min(200, pagesNorm.length);

    let tokenHits = 0;
    for (const t of pagesTokens) if (routeTokens.includes(t)) tokenHits += 10;
    for (const t of titleTokens) if (routeTokens.includes(t)) tokenHits += 25;
    score += tokenHits;

    if (!best || score > best.score) best = { route, score };
    else if (best && score === best.score) best = { route: null, score }; // tie => ambiguous
  }

  if (!best || !best.route) return null;
  if (best.score < 50) return null;
  return best.route;
}

async function main() {
  const args = process.argv.slice(2);
  const inputIdx = args.findIndex((a) => a === "--input");
  const inputPath =
    inputIdx !== -1 ? args[inputIdx + 1] : process.env.METADATA_INPUT || DEFAULT_INPUT;

  let csvPath = inputPath;
  if (!csvPath) {
    console.error("Missing input file path. Use --input <path>.");
    process.exit(1);
  }

  if (
    csvPath.toLowerCase().endsWith(".xlsx") ||
    csvPath.toLowerCase().endsWith(".xls")
  ) {
    try {
      csvPath = await convertExcelToCsv(csvPath);
    } catch (err) {
      console.error(
        `${String(err?.message || err)}\n\n` +
          `Fallback conversion command:\n` +
          `  soffice --headless --convert-to csv --outdir /tmp ${JSON.stringify(
            inputPath
          )}`
      );
      process.exit(2);
    }
  }

  const csvText = await fs.readFile(csvPath, "utf8");
  const rows = parseCsv(csvText).filter((r) => r.some((c) => String(c || "").trim() !== ""));
  if (rows.length < 2) {
    console.error("CSV seems empty or missing data rows.");
    process.exit(1);
  }

  const headers = rows[0];
  const routeCol = findHeaderIndex(headers, ["route", "path", "url"]);
  const pagesCol = findHeaderIndex(headers, ["pages", "page"]);
  const titleCol = findHeaderIndex(headers, ["meta title", "title"]);
  const descCol = findHeaderIndex(headers, ["meta description", "description", "desc"]);

  if (titleCol === -1 || descCol === -1) {
    console.error(
      `Couldn't find required columns. Found headers: ${headers
        .map((h) => JSON.stringify(h))
        .join(", ")}`
    );
    process.exit(1);
  }

  const allFiles = await walk(APP_DIR);
  const pageFiles = allFiles.filter((f) => PAGE_FILE_RE.test(path.basename(f)));
  const routeToFiles = new Map();
  for (const file of pageFiles) {
    const route = computeRouteFromPageFile(file);
    const list = routeToFiles.get(route) ?? [];
    list.push(file);
    routeToFiles.set(route, list);
  }

  const allRoutes = Array.from(routeToFiles.keys());

  const updatedFiles = [];
  const skipped = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const routeRaw = routeCol !== -1 ? row[routeCol] : null;
    const pages = pagesCol !== -1 ? row[pagesCol] : null;
    const title = row[titleCol];
    const description = row[descCol];

    if (!title && !description) continue;

    let route = normalizeRoute(routeRaw);
    if (!route) route = pickBestRouteForRow({ pages, title }, allRoutes);
    if (!route) {
      skipped.push({
        route: routeRaw || pages || `(row ${i + 1})`,
        reason: "Couldn't map row to a route (no route column and fuzzy match failed).",
      });
      continue;
    }

    const matchedFiles = routeToFiles.get(route);
    if (!matchedFiles || matchedFiles.length === 0) {
      skipped.push({ route, reason: "No matching page file found in src/app." });
      continue;
    }
    if (matchedFiles.length > 1) {
      skipped.push({
        route,
        reason: `Ambiguous: multiple page files match this route (${matchedFiles
          .map((f) => path.relative(process.cwd(), f))
          .join(", ")}).`,
      });
      continue;
    }

    const filePath = matchedFiles[0];
    const result = await updatePageFile(filePath, { title, description });
    if (result.updated) {
      updatedFiles.push({ route, filePath, mode: result.mode });
    } else {
      skipped.push({ route, reason: result.reason || "No changes." });
    }
  }

  console.log(JSON.stringify({ updatedFiles, skipped }, null, 2));
}

await main();
