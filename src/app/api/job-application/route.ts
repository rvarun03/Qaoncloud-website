import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jobs } from '@/data/jobs';

export const runtime = 'nodejs';

const MAX_RESUME_SIZE = 10 * 1024 * 1024;
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jobTitle = getText(formData, 'jobTitle');
    const resume = formData.get('resume');
    const job = jobs.find((opening) => opening.title === jobTitle);

    if (!job) {
      return NextResponse.json({ error: 'Invalid job opening' }, { status: 400 });
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

    await transporter.sendMail({
      from: `"QAonCloud Careers" <${smtpUser}>`,
      to: 'varun@qaoncloud.com',
      subject: `Application for ${job.title}`,
      text: `Please find the attached resume for the ${job.title} position.`,
      html: `<p>Please find the attached resume for the <strong>${escapeHtml(job.title)}</strong> position.</p>`,
      attachments: [{
        filename: resumeName,
        content: Buffer.from(await resume.arrayBuffer()),
        contentType,
      }],
    });

    return NextResponse.json({ message: 'Application sent successfully' });
  } catch (error) {
    console.error('[job-application] Failed to send application:', error);
    return NextResponse.json(
      { error: 'Failed to send your application. Please try again.' },
      { status: 500 }
    );
  }
}
