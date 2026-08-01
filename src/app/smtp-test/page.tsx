'use client';

import { useState } from 'react';
import styles from './smtp-test.module.css';

type TestResult = {
  ok: boolean;
  message?: string;
  error?: string;
};

export default function SmtpTestPage() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  async function sendTestEmail() {
    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', { method: 'POST' });
      const data = await response.json() as TestResult;

      setResult({
        ok: response.ok && data.ok,
        message: data.message,
        error: data.error,
      });
    } catch {
      setResult({ ok: false, error: 'Could not connect to the SMTP test route' });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span className={styles.badge}>Production check</span>
        <h1>SMTP Email Test</h1>
        <p>
          Send a sample email using the server&apos;s configured Gmail SMTP credentials.
        </p>

        <button type="button" onClick={sendTestEmail} disabled={isSending}>
          {isSending ? 'Sending…' : 'Send Test Email'}
        </button>

        {result && (
          <div
            className={result.ok ? styles.success : styles.error}
            role="status"
          >
            {result.ok
              ? result.message || 'SMTP test email sent successfully'
              : result.error || 'SMTP test email failed'}
          </div>
        )}
      </section>
    </main>
  );
}
