import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const ALLOWED_ATTACHMENTS: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

type ContactDetails = {
  firstName: string;
  lastName: string;
  company: string;
  designation: string;
  workEmail: string;
  phone: string;
  country: string;
  services: string[];
  howHeard: string;
  budgetRange: string;
  message: string;
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

function displayValue(value: string) {
  return value ? escapeHtml(value) : 'Not provided';
}

function buildDetailsHtml(details: ContactDetails, attachmentName?: string) {
  const rows = [
    ['Name', escapeHtml(`${details.firstName} ${details.lastName}`)],
    ['Email', `<a href="mailto:${escapeHtml(details.workEmail)}">${escapeHtml(details.workEmail)}</a>`],
    ['Company', displayValue(details.company)],
    ['Designation', displayValue(details.designation)],
    ['Phone', displayValue(details.phone)],
    ['Country', displayValue(details.country)],
    ['Services', details.services.length ? escapeHtml(details.services.join(', ')) : 'Not provided'],
    ['Heard', displayValue(details.howHeard)],
    ['Budget', displayValue(details.budgetRange)],
    ['Attachment', attachmentName ? `${escapeHtml(attachmentName)} — attached` : 'Not provided'],
  ];

  return `
    <table style="width:100%;border-collapse:collapse;margin-top:16px;">
      ${rows.map(([label, value]) => `
        <tr>
          <td style="width:180px;padding:8px 12px 8px 0;font-weight:600;color:#555;vertical-align:top;">${label}</td>
          <td style="padding:8px 0;color:#222;vertical-align:top;">${value}</td>
        </tr>`).join('')}
    </table>
    <div style="margin-top:20px;">
      <p style="margin:0 0 8px;font-weight:600;color:#555;">How can we help?</p>
      <p style="margin:0;color:#222;line-height:1.6;white-space:pre-wrap;">${displayValue(details.message)}</p>
    </div>`;
}

function buildDetailsText(details: ContactDetails, attachmentName?: string) {
  return `Name: ${details.firstName} ${details.lastName}
Email: ${details.workEmail}
Company: ${details.company || 'Not provided'}
Designation: ${details.designation || 'Not provided'}
Phone: ${details.phone || 'Not provided'}
Country: ${details.country || 'Not provided'}
Services: ${details.services.join(', ') || 'Not provided'}
Heard: ${details.howHeard || 'Not provided'}
Budget: ${details.budgetRange || 'Not provided'}
Attachment: ${attachmentName ? `${attachmentName} — attached` : 'Not provided'}

How can we help?
${details.message || 'Not provided'}`;
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
    const details: ContactDetails = {
      firstName: getText(formData, 'firstName'),
      lastName: getText(formData, 'lastName'),
      company: getText(formData, 'company'),
      designation: getText(formData, 'designation'),
      workEmail: getText(formData, 'workEmail'),
      phone: getText(formData, 'phone'),
      country: getText(formData, 'country'),
      services: formData.getAll('services').filter((service): service is string => typeof service === 'string'),
      howHeard: getText(formData, 'howHeard'),
      budgetRange: getText(formData, 'budgetRange'),
      message: getText(formData, 'message'),
    };
    const captchaToken = getText(formData, 'captchaToken');

    if (!details.firstName || !details.lastName || !details.workEmail || !captchaToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.workEmail)) {
      return NextResponse.json({ error: 'Invalid work email' }, { status: 400 });
    }

    if (!(await verifyCaptcha(captchaToken))) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    const uploadedFile = formData.get('document');
    const attachments: nodemailer.SendMailOptions['attachments'] = [];
    let attachmentName: string | undefined;

    if (uploadedFile instanceof File && uploadedFile.size > 0) {
      attachmentName = uploadedFile.name.split(/[\\/]/).pop() || 'document';
      const extension = attachmentName.slice(attachmentName.lastIndexOf('.')).toLowerCase();
      const contentType = ALLOWED_ATTACHMENTS[extension];

      if (!contentType) {
        return NextResponse.json({ error: 'Only PDF or DOCX files are allowed' }, { status: 400 });
      }
      if (uploadedFile.size > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json({ error: 'The attachment must be 5 MB or smaller' }, { status: 400 });
      }

      attachments.push({
        filename: attachmentName,
        content: Buffer.from(await uploadedFile.arrayBuffer()),
        contentType,
      });
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

    const senderEmail = smtpUser;
    const teamEmail = process.env.CONTACT_TO_EMAIL || 'varun@qaoncloud.com';
    const fullName = `${details.firstName} ${details.lastName}`;
    const detailsHtml = buildDetailsHtml(details, attachmentName);
    const detailsText = buildDetailsText(details, attachmentName);

    await transporter.sendMail({
      from: `"QAonCloud Website" <${senderEmail}>`,
      to: [
        "varun@qaoncloud.com"
      ],
      replyTo: details.workEmail,
      subject: `Business Enquiry from ${fullName}`,
      text: `Hi,\n\nA new business enquiry has been received from the QAonCloud website with the following details.\n\n${detailsText}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:8px;">
          <p style="color:#222;line-height:1.6;">Hi,</p>
          <p style="color:#222;line-height:1.6;">A new business enquiry has been received from the QAonCloud website with the following details.</p>
          ${detailsHtml}
          <p style="margin-top:24px;color:#777;font-size:13px;">Sent via the QAonCloud website contact form.</p>
        </div>`,
      attachments,
    });

    await transporter.sendMail({
      from: `"QAonCloud" <${senderEmail}>`,
      to: details.workEmail,
      replyTo: teamEmail,
      subject: 'Thank You For Contacting QAonCloud',
      text: `Hi ${details.firstName},\n\nThank you for reaching out to QAonCloud!\n\nWe've received your inquiry and our team will get back to you within 1–2 business days.\nIf you have any urgent questions, please reach out to contactus@qaoncloud.com.\n\n--\nThanks and Regards\nThe QAonCloud Team\n+1 (415) 630-2109`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:8px;">
          <p style="color:#222;line-height:1.6;">Hi ${escapeHtml(details.firstName)},</p>
          <p style="color:#222;line-height:1.6;margin-top:28px;">Thank you for reaching out to QAonCloud!</p>
          <p style="color:#222;line-height:1.6;margin-top:28px;">We've received your inquiry and our team will get back to you within 1–2 business days.<br />
          If you have any urgent questions, please reach out to <a href="mailto:contactus@qaoncloud.com">contactus@qaoncloud.com</a>.</p>
          <p style="color:#222;line-height:1.6;margin-top:28px;">--<br />
          Thanks and Regards<br />
          The QAonCloud Team<br />
          +1 (415) 630-2109</p>
        </div>`,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('[contact] Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again.' },
      { status: 500 }
    );
  }
}
