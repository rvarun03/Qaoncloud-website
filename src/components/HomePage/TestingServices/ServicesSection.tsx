"use client";

import { Code2, Zap, ArrowUpRight, Sparkles, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./ServicesSection.module.css";
import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  wide?: boolean;
}

const SERVICES: Service[] = [
  {
    title: "Functional Testing",
    description:
      "Every feature works the way it should. We catch bugs or glitches before your users do.",
    icon: Code2,
  },
  {
    title: "Test Automation",
    description:
      "Tests that take minutes, not hours. Our custom automation keeps up with your product.",
    icon: Zap,
  },
  {
    title: "Performance Testing",
    description:
      "No launch-day surprises. Our load, stress, and scalability testing ensures your app can keep up with the traffic.",
    icon: ArrowUpRight,
  },
  {
    title: "AI/ML QA",
    description:
      "Specialized testing for ML models and AI features. Validate accuracy, bias, and edge cases at scale.",
    icon: Sparkles,
    wide: true,
  },
  {
    title: "Security Testing",
    description:
      "No room for vulnerabilities. Our penetration testing and security audits protect your users and your reputation.",
    icon: Shield,
  },
];

/* ─────────────────────────────────────────
   SVG Grid Pattern (rendered inside inner circle)
───────────────────────────────────────── */
function GridPattern() {
  return (
    <svg
      className={styles.gridPattern}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="svc-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="20" stroke="#ffffff" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="20" y2="0" stroke="#ffffff" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#svc-grid)" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Custom Shield Icon
───────────────────────────────────────── */
function CustomShieldIcon({ className, width, height, strokeWidth }: { className?: string; width?: number; height?: number; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield shape with orange outline */}
      <path
        d="M12 2L4 7V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V7L12 2Z"
        stroke="#e8550a"
        strokeWidth={strokeWidth || 2}
        fill="none"
      />
      {/* Dark background fill */}
      <path
        d="M12 2L4 7V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V7L12 2Z"       
        opacity="0.9"
      />
      {/* Checkmark */}
      <path
        d="M8 12L11 15L16 9"
        stroke="#e8550a"
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Single Card
───────────────────────────────────────── */
function ServiceCard({ title, description, icon: Icon, wide }: Service) {
  // Use custom shield icon for Security Testing
  const FinalIcon = title === "Security Testing" ? CustomShieldIcon : Icon;
  
  return (
    <div className={`${styles.card} ${wide ? styles.colSpan2 : ""}`}>
      {/* Text content */}
      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
      </div>

      {/* Bottom-right decorative layered circles */}
      <div className={styles.corner}>
        {/* Outer circle */}
        <div className={styles.outerCircle}>
          {/* Inner circle with grid + icon */}
          <div className={styles.innerCircle}>
            <GridPattern />
            <FinalIcon className={styles.icon} width={50} height={60} strokeWidth={1.2} />
          </div>
        </div>

        {/* Blue glow — bottom-right of the outer circle */}
        <div className={styles.blueGlow} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <SectionHeader title="Software testing services that cut risks," highlight="not momentum" />
      

      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
