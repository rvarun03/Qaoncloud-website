import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function configurationError() {
  return NextResponse.json(
    { ok: false, error: 'SMTP test email is not configured' },
    { status: 503 }
  );
}

export async function POST() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    return configurationError();
  }

  const smtpPort = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
    return configurationError();
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const recipient = process.env.SMTP_TEST_TO_EMAIL || smtpUser;
  const sentAt = new Date().toISOString();

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const result = await transporter.sendMail({
      from: `"QAonCloud SMTP Test" <${smtpUser}>`,
      to: recipient,
      subject: 'QAonCloud production SMTP test',
      text: `SMTP is working. This test email was sent at ${sentAt}.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;">SMTP is working</h2>
          <p style="line-height:1.6;">This test email was sent successfully from the QAonCloud production SMTP test route.</p>
          <p style="color:#666;font-size:13px;">Sent at ${sentAt}</p>
        </div>`,
    });

    return NextResponse.json({
      ok: true,
      message: 'SMTP test email sent',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('[test-email] SMTP test failed:', error);
    return NextResponse.json(
      { ok: false, error: 'SMTP test email failed' },
      { status: 502 }
    );
  }
}
