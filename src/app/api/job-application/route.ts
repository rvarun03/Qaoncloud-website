import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jobs } from '@/data/jobs';

export const runtime = 'nodejs';

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUMES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const careersCaptchaEnabled = true;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] as string);
}

function isValidName(value: string) {
  return /^[a-zA-Z\s\-']{1,100}$/.test(value);
}

function getText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

async function verifyCaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured');
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const firstName = getText(formData, 'firstName');
    const lastName = getText(formData, 'lastName');
    const email = getText(formData, 'email');
    const jobTitle = getText(formData, 'jobTitle');
    const captchaToken = getText(formData, 'captchaToken');
    const resume = formData.get('resume');
    const job = jobs.find((opening) => opening.title === jobTitle);

    if (!firstName || !lastName || !email || !jobTitle) {
      return NextResponse.json({ error: 'First name, last name, email, and role are required.' }, { status: 400 });
    }
    if (!isValidName(firstName) || !isValidName(lastName)) {
      return NextResponse.json({ error: 'Please enter a valid first and last name.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!job) {
      return NextResponse.json({ error: 'Please select a current job opening.' }, { status: 400 });
    }
    if (careersCaptchaEnabled && !(await verifyCaptcha(captchaToken))) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
    }
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: 'A resume is required.' }, { status: 400 });
    }

    const resumeName = resume.name.split(/[\\/]/).pop() || 'resume';
    const extensionIndex = resumeName.lastIndexOf('.');
    const extension = extensionIndex >= 0 ? resumeName.slice(extensionIndex).toLowerCase() : '';
    const contentType = ALLOWED_RESUMES[extension];
    if (!contentType) {
      return NextResponse.json({ error: 'Only PDF and DOCX resumes are allowed.' }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json({ error: 'Your resume must be 5 MB or smaller.' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass || !Number.isFinite(smtpPort)) {
      throw new Error('SMTP configuration is incomplete');
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const fullName = `${firstName} ${lastName}`;
    await transporter.sendMail({
      from: `"QAonCloud Careers" <${smtpUser}>`,
      to: 'varun@qaoncloud.com',
      replyTo: email,
      subject: `New application: ${fullName} — ${job.title}`,
      text: `A new QAonCloud application was submitted.\n\nName: ${fullName}\nEmail: ${email}\nRole: ${job.title}\nResume: ${resumeName} (attached)\n\nReply directly to this email to contact the applicant.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:8px;">
          <h2 style="color:#002A8D;">New career application</h2>
          <p style="color:#222;line-height:1.6;">A candidate applied through the QAonCloud careers page.</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="width:120px;padding:8px 12px 8px 0;font-weight:600;color:#555;">Name</td><td style="padding:8px 0;color:#222;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#555;">Email</td><td style="padding:8px 0;color:#222;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#555;">Role</td><td style="padding:8px 0;color:#222;">${escapeHtml(job.title)}</td></tr>
            <tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#555;">Resume</td><td style="padding:8px 0;color:#222;">${escapeHtml(resumeName)} (attached)</td></tr>
          </table>
          <p style="margin-top:24px;color:#777;font-size:13px;">Reply directly to this email to contact the applicant.</p>
        </div>`,
      attachments: [{
        filename: resumeName,
        content: Buffer.from(await resume.arrayBuffer()),
        contentType,
      }],
    });

    try {
      await transporter.sendMail({
        from: `"QAonCloud" <${smtpUser}>`,
        to: email,
        replyTo: 'contactus@qaoncloud.com',
        subject: `We received your application, ${firstName}!`,
        text: `Hi ${firstName},\n\nThank you for applying for the ${job.title} role at QAonCloud. We have received your application and will review your resume shortly. We will be in touch soon.\n\nRegards,\nQAonCloud Team`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:8px;">
            <h2 style="color:#002A8D;">Thanks for applying, ${escapeHtml(firstName)}!</h2>
            <p style="color:#333;line-height:1.6;">We have received your application for the <strong>${escapeHtml(job.title)}</strong> role and will review your resume shortly.</p>
            <p style="color:#333;line-height:1.6;">We will be in touch soon.</p>
            <p style="color:#888;font-size:13px;margin-top:32px;">— QAonCloud Team</p>
          </div>`,
      });
    } catch (confirmationError) {
      console.warn('[job-application] Applicant confirmation email failed:', confirmationError);
    }
    
    return NextResponse.json({ message: 'Application sent successfully' });
  } catch (error) {
    console.error('[job-application] Failed to send application:', error);
    return NextResponse.json({ error: 'Failed to send your application. Please try again.' }, { status: 500 });
  }
}
