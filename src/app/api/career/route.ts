import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const MAX_RESUME_SIZE = 10 * 1024 * 1024;
const CAREER_TO_EMAIL = 'varun@qaoncloud.com';
const ALLOWED_RESUMES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

function getText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] as string);
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
    const phone = getText(formData, 'phone');
    const captchaToken = getText(formData, 'captchaToken');
    const resume = formData.get('resume');

    if (!firstName || !lastName || !email || !phone || !captchaToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (!(await verifyCaptcha(captchaToken))) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: 'A resume is required' }, { status: 400 });
    }

    const resumeName = resume.name.split(/[\\/]/).pop() || 'resume';
    const extensionIndex = resumeName.lastIndexOf('.');
    const extension = extensionIndex >= 0 ? resumeName.slice(extensionIndex).toLowerCase() : '';
    const contentType = ALLOWED_RESUMES[extension];

    if (!contentType) {
      return NextResponse.json({ error: 'Only PDF or DOCX resumes are allowed' }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json({ error: 'The resume must be 10 MB or smaller' }, { status: 400 });
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
    const resumeSize = `${(resume.size / 1024).toFixed(1)} KB`;
    const attachments: nodemailer.SendMailOptions['attachments'] = [{
      filename: resumeName,
      content: Buffer.from(await resume.arrayBuffer()),
      contentType,
    }];

    await transporter.sendMail({
      from: `"QAonCloud Careers" <${smtpUser}>`,
      to: [
        "contactus@qaoncloud.com"
      ],
      replyTo: email,
      subject: `Received a career application from ${fullName}`,
      text: `

You have received a new career application from ${fullName} through the QAonCloud careers page.

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Resume: ${resumeName} (${resumeSize}) — attached

You can reply directly to this email to contact the applicant.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:8px;">
          <p style="color:#222;line-height:1.6;">Hi Varun,</p>
          <p style="color:#222;line-height:1.6;">You have received a new career application from <strong>${escapeHtml(fullName)}</strong> through the QAonCloud careers page.</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="width:140px;padding:8px 12px 8px 0;font-weight:600;color:#555;">First Name</td><td style="padding:8px 0;color:#222;">${escapeHtml(firstName)}</td></tr>
            <tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#555;">Last Name</td><td style="padding:8px 0;color:#222;">${escapeHtml(lastName)}</td></tr>
            <tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#555;">Email</td><td style="padding:8px 0;color:#222;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#555;">Phone</td><td style="padding:8px 0;color:#222;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#555;">Resume</td><td style="padding:8px 0;color:#222;">${escapeHtml(resumeName)} (${resumeSize}) — attached</td></tr>
          </table>
          <p style="margin-top:24px;color:#777;font-size:13px;">Reply directly to this email to contact the applicant.</p>
        </div>`,
      attachments,
    });

    try {
      await transporter.sendMail({
        from: `"QAonCloud" <${smtpUser}>`,
        to: email,
        replyTo: 'contactus@qaoncloud.com',
        subject: `We received your application, ${firstName}!`,
        text: `Hi ${firstName},

Thank you for applying to QAonCloud! We have received your application and will review your resume shortly. We will be in touch soon.

Regards,
QAonCloud Team`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:8px;">
            <h2 style="color:#002A8D;">Thanks for applying, ${escapeHtml(firstName)}!</h2>
            <p style="color:#333;line-height:1.6;">We have received your application and will review your resume shortly. We will be in touch soon.</p>
            <p style="color:#888;font-size:13px;margin-top:32px;">— QAonCloud Team</p>
          </div>`,
      });
    } catch (confirmationError) {
      console.warn('[career] Applicant confirmation email failed:', confirmationError);
    }

    return NextResponse.json({ message: 'Application sent successfully' });
  } catch (error) {
    console.error('[career] Failed to send career application:', error);
    return NextResponse.json(
      { error: 'Failed to send your application. Please try again.' },
      { status: 500 }
    );
  }
}
