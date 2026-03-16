'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import styles from './CareerPage.module.css';
import PageHeader from '../Common/PageHeader/PageHeader';

/* ─────────────────────────────────────────
   Status Dialog
───────────────────────────────────────── */
function StatusDialog({ status, onClose }: { status: 'success' | 'error'; onClose: () => void }) {
  const isSuccess = status === 'success';
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(145deg, #0f1623 0%, #090c0e 100%)',
        border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        borderRadius: '20px',
        padding: '48px 40px 40px',
        maxWidth: '440px',
        width: '100%',
        position: 'relative',
        boxShadow: `0 0 60px ${isSuccess ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}`,
        textAlign: 'center',
      }} onClick={e => e.stopPropagation()}>

        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.06)', border: 'none',
          borderRadius: '8px', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '16px',
        }}>
          <FiX />
        </button>

        <div style={{
          width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 24px',
          background: isSuccess ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {isSuccess
            ? <FiCheckCircle size={34} color="#10b981" />
            : <FiXCircle    size={34} color="#ef4444" />}
        </div>

        <h3 style={{
          color: '#fff', fontSize: '22px', fontWeight: 700,
          letterSpacing: '-0.5px', margin: '0 0 12px',
        }}>
          {isSuccess ? 'Application Sent!' : 'Something went wrong'}
        </h3>

        <p style={{
          color: 'rgba(255,255,255,0.6)', fontSize: '15px',
          lineHeight: '1.6', margin: '0 0 32px',
        }}>
          {isSuccess
            ? "Your application has been sent successfully! We\'ll get back to you soon."
            : 'Failed to send your application. Please try again or contact us directly.'}
        </p>

        <button onClick={onClose} style={{
          width: '100%', height: '46px', borderRadius: '12px', border: 'none',
          background: isSuccess ? '#10b981' : '#ef4444',
          color: '#fff', fontWeight: 600, fontSize: '15px',
          cursor: 'pointer', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {isSuccess ? 'Great, thanks!' : 'Close'}
        </button>
      </div>
    </div>
  );
}


const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','10minutemail.com','tempmail.com','guerrillamail.com',
  'throwaway.email','yopmail.com','trashmail.com','fakeinbox.com',
  'sharklasers.com','guerrillamailblock.com','grr.la','guerrillamail.info',
  'spam4.me','dispostable.com','maildrop.cc','spamgourmet.com',
  'temp-mail.org','getnada.com','mailnull.com','spamgourmet.net',
  'discard.email','spamhereplease.com','spamex.com','trashmail.at',
  'trashmail.io','getairmail.com','filzmail.com','throwam.com',
]);

function validateEmail(email: string): string {
  const v = email.trim();
  if (!v) return 'Email is required';
  if (v.length > 254) return 'Email must be 254 characters or fewer';
  if (/\s/.test(v)) return 'Email must not contain spaces';

  const atCount = (v.match(/@/g) || []).length;
  if (atCount === 0) return 'Email must contain @';
  if (atCount > 1)   return 'Email must contain only one @';

  const [local, domain] = v.split('@');
  if (!local)             return 'Email must have a local part before @';
  if (local.length > 64)  return 'Local part must be 64 characters or fewer';
  if (local.startsWith('.')) return 'Email must not start with a dot';
  if (local.endsWith('.'))   return 'Email must not end with a dot';
  if (/\.{2,}/.test(local))  return 'Email must not contain consecutive dots';

  if (!domain)               return 'Email must have a domain after @';
  if (!domain.includes('.')) return 'Email must contain a valid domain extension (e.g. .com, .in)';
  if (domain.startsWith('.')) return 'Domain must not start with a dot';
  if (domain.endsWith('.'))   return 'Domain must not end with a dot';
  if (/\.{2,}/.test(domain))  return 'Domain must not contain consecutive dots';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(v)) return 'Enter a valid email address';

  const tld = domain.split('.').pop() || '';
  if (tld.length < 2) return 'Email must contain a valid domain extension (e.g. .com, .in)';

  const domainLower = domain.toLowerCase();
  if (DISPOSABLE_DOMAINS.has(domainLower)) return 'Disposable email addresses are not allowed';

  return '';
}

function validatePhone(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return 'Phone is required';
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (!/^\+?[0-9\s\-]{8,15}$/.test(trimmed)) return 'Enter a valid phone number (e.g. +1 415 555 2671)';
  if (digitsOnly.length < 7 || digitsOnly.length > 15) return 'Phone number must be between 7 and 15 digits';
  if (/^(\d)\1+$/.test(digitsOnly)) return 'Phone number cannot be all repeated digits';
  const seqs = ['0123456789', '9876543210', '1234567890'];
  if (digitsOnly.length >= 10 && seqs.some(s => digitsOnly.includes(s.slice(0, digitsOnly.length)))) {
    return 'Phone number cannot be a sequential pattern';
  }
  return '';
}

export default function CareerPage() {
  const [privacyChecked, setPrivacy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState({ firstName: false, lastName: false, email: false, phone: false });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string>('');
  const [career, setCareer] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  const computeErrors = (data: typeof career) => ({
    firstName: !data.firstName.trim()
      ? 'First name is required'
      : !/^[a-zA-Z\s\-']*$/.test(data.firstName)
      ? 'Name cannot contain numbers or special characters'
      : '',
    lastName: !data.lastName.trim()
      ? 'Last name is required'
      : !/^[a-zA-Z\s\-']*$/.test(data.lastName)
      ? 'Name cannot contain numbers or special characters'
      : '',
    email: validateEmail(data.email),
    phone: validatePhone(data.phone),
  });

  useEffect(() => { setErrors(computeErrors(career)); }, [career]);

  const formErrors = computeErrors(career);
  const hasErrors = Object.values(formErrors).some(e => e !== '');
  const isFormValid = !hasErrors && !!uploadedFile && privacyChecked && !!captchaToken;

  const handleNameChange = (value: string, field: 'firstName' | 'lastName') => {
    setCareer(p => ({ ...p, [field]: value }));
    setTouched(p => ({ ...p, [field]: true }));
  };

  const handleEmailChange = (value: string) => {
    setCareer(p => ({ ...p, email: value }));
    setTouched(p => ({ ...p, email: true }));
  };

  const handlePhoneChange = (value: string) => {
    const sanitised = value.replace(/[^\d+\s\-]/g, '');
    setCareer(p => ({ ...p, phone: sanitised }));
    setTouched(p => ({ ...p, phone: true }));
  };

  const showError = (field: keyof typeof touched) => touched[field] ? errors[field] : '';

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('File exceeds 5 MB'); return; }
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) { alert('Only PDF or DOCX files accepted'); return; }
    setFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug logging for mobile
    console.log('Form submission started');
    console.log('Form data:', career);
    console.log('File uploaded:', !!uploadedFile);
    console.log('Privacy checked:', privacyChecked);
    console.log('Captcha token:', !!captchaToken);
    console.log('Form valid:', isFormValid);
    
    setTouched({ firstName: true, lastName: true, email: true, phone: true });
    if (!isFormValid) {
      console.log('Form validation failed:', { errors, hasErrors, uploadedFile: !!uploadedFile, privacyChecked, captchaToken: !!captchaToken });
      return; // guard — button should already be disabled
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Starting captcha verification...');
      const captchaRes = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      });
      const captchaData = await captchaRes.json();
      console.log('Captcha verification result:', captchaData);
      
      if (!captchaData.success) {
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
        setCaptchaError('reCAPTCHA verification failed. Please complete it again to submit.');
        setIsSubmitting(false);
        return;
      }

      const fullName   = `${career.firstName} ${career.lastName}`;
      const resumeInfo = `${uploadedFile!.name} (${(uploadedFile!.size / 1024).toFixed(1)} KB)`;
      const fileBase64 = await toBase64(uploadedFile!);

      // Upload resume to Cloudinary
      const uploadForm = new FormData();
      uploadForm.append("file", uploadedFile!);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.url) {
        throw new Error("Upload failed");
      }

      const document_link = uploadData.url;

      // 1️⃣ Team notification — must succeed
      await emailjs.send('service_ox6diqq', 'template_9f8xcmm', {
        name: fullName, from_name: fullName, first_name: career.firstName,
        last_name: career.lastName, email: career.email, from_email: career.email,
        reply_to: career.email, phone: career.phone, to_name: 'QAonCloud Team',
        resume: resumeInfo, resume_name: uploadedFile!.name, resume_attachment: fileBase64,
        file_url: document_link,
        message: `New Career Application\n\nName: ${fullName}\nEmail: ${career.email}\nPhone: ${career.phone}\nResume: ${resumeInfo}`,
      }, '8VzXZD4Cz9LhSvU54');

      // 2️⃣ Applicant confirmation — failure here should NOT block success
      try {
        await emailjs.send('service_ox6diqq', 'template_3gsbsoi', {
          name: fullName, from_name: fullName, first_name: career.firstName,
          last_name: career.lastName, email: career.email, from_email: career.email,
          to_email: career.email, reply_to: 'contactus@qaoncloud.com',
          phone: career.phone, to_name: career.firstName,
          message: `Thank you for your interest in QAonCloud! We have received your application and will review your resume shortly.\n\nBest regards,\nQAonCloud Team`,
        }, '8VzXZD4Cz9LhSvU54');
      } catch (confirmErr) {
        // Confirmation failed — log but don't affect success state
        console.warn('Confirmation email failed (non-critical):', confirmErr);
      }

      setSubmitStatus('success');
      setCareer({ firstName: '', lastName: '', email: '', phone: '' });
      setErrors({ firstName: '', lastName: '', email: '', phone: '' });
      setTouched({ firstName: false, lastName: false, email: false, phone: false });
      setFile(null); setPrivacy(false); setCaptchaToken(null); setCaptchaError('');
      recaptchaRef.current?.reset();
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error: unknown) {
      console.error('EmailJS error:', error);
      if (error && typeof error === 'object' && 'text' in error) {
        console.error('EmailJS error detail:', (error as { text: string }).text);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <PageHeader
              title="Join Us"
              
            />
      

      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <aside className={styles.leftSection}>
            <div className={styles.contactCard}>
              <h2 className={styles.cardTitle}>Find Us</h2>
              <div className={styles.contactItems}>

                {/* US */}
                <div className={styles.contactItem}>
                  <FiMapPin className={styles.icon} />
                  <div className={styles.contactGroup}>
                    <span className={styles.contactLabel}>US</span>
                    <a
                      href="https://maps.google.com/?q=39159+Paseo+Padre+Pkwy+ste+207,+Fremont,+CA+94538,+United+States"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactValue}
                    >
                      39159 Paseo Padre Pkwy ste 207,<br />
                      Fremont, CA 94538, United States
                    </a>
                    <div className={styles.phoneRow}>
                      <FiPhone className={styles.icon} />
                        <a href="tel:+15103192565" className={styles.contactValue}>+1 (415) 630-2109</a> 
                    </div>
                  </div>
                </div>

                <div className={styles.divider} />

                {/* India */}
                <div className={styles.contactItem}>
                  <FiMapPin className={styles.icon} />
                  <div className={styles.contactGroup}>
                  <span className={styles.contactLabel}>India</span>
                    <a
                      href="https://maps.google.com/?q=B3-8,+IIT+Madras+Research+Park,+Kanagam+Rd,+Tharamani,+Chennai,+Tamil+Nadu+600113,+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactValue}
                    >
                      B3 -8, IIT Madras Research Park, <br />Kanagam Rd,
                      Tharamani, Chennai, <br />Tamil Nadu 600113, India
                    </a>
                    <div className={styles.phoneRow}>
                      <FiPhone className={styles.icon} />
                        <a href="tel:+919884292684" className={styles.contactValue}>+91 98842 92684</a>
                    </div>
                  </div>
                </div>

                <div className={styles.divider} />

                {/* Email */}
                <div className={styles.contactItem}>
                  <FiMail className={styles.icon} />
                   <a href="mailto:contactus@qaoncloud.com" className={styles.contactValue} > contactus@qaoncloud.com </a>
                </div>

              </div>
            </div>
          </aside>

          <section className={styles.rightSection}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>First Name <span className={styles.req}>*</span></label>
                  <input
                    className={`${styles.formInput}${showError('firstName') ? ' ' + styles.inputError : ''}`}
                    placeholder="Enter Here" value={career.firstName}
                    onChange={e => handleNameChange(e.target.value, 'firstName')}
                    onBlur={() => setTouched(p => ({ ...p, firstName: true }))}
                    autoComplete="given-name"
                    inputMode="text"
                    enterKeyHint="next"
                  />
                  {showError('firstName') && <span className={styles.fieldError}>{showError('firstName')}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Last Name <span className={styles.req}>*</span></label>
                  <input
                    className={`${styles.formInput}${showError('lastName') ? ' ' + styles.inputError : ''}`}
                    placeholder="Enter Here" value={career.lastName}
                    onChange={e => handleNameChange(e.target.value, 'lastName')}
                    onBlur={() => setTouched(p => ({ ...p, lastName: true }))}
                    autoComplete="family-name"
                    inputMode="text"
                    enterKeyHint="next"
                  />
                  {showError('lastName') && <span className={styles.fieldError}>{showError('lastName')}</span>}
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email <span className={styles.req}>*</span></label>
                  <input
                    className={`${styles.formInput}${showError('email') ? ' ' + styles.inputError : ''}`}
                    type="email" placeholder="Enter Here" value={career.email}
                    onChange={e => handleEmailChange(e.target.value)}
                    onBlur={() => setTouched(p => ({ ...p, email: true }))}
                    autoComplete="email"
                    inputMode="email"
                    enterKeyHint="next"
                  />
                  {showError('email') && <span className={styles.fieldError}>{showError('email')}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone <span className={styles.req}>*</span></label>
                  <input
                    className={`${styles.formInput}${showError('phone') ? ' ' + styles.inputError : ''}`}
                    type="tel" placeholder="+1 234 567 8900" value={career.phone}
                    onChange={e => handlePhoneChange(e.target.value)}
                    onBlur={() => setTouched(p => ({ ...p, phone: true }))}
                    autoComplete="tel"
                    inputMode="tel"
                    enterKeyHint="done"
                  />
                  {showError('phone') && <span className={styles.fieldError}>{showError('phone')}</span>}
                </div>
              </div>

              <div className={styles.uploadSection}>
                <label className={styles.uploadLabel}>
                  Upload Resume — PDF or DOCX only (max 5MB) <span className={styles.req}>*</span>
                </label>
                <div
                  className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className={styles.uploadedFile}>
                      <span>{uploadedFile.name}</span>
                      <button type="button" className={styles.removeFile}
                        onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}>✕</button>
                    </div>
                  ) : (
                    <>
                      <p className={styles.dropText}>Drag and drop file here</p>
                      <p className={styles.dropOr}>Or</p>
                      <button type="button" className={styles.browseBtn} onClick={() => fileInputRef.current?.click()}>Browse File</button>
                    </>
                  )}
                  <input ref={fileInputRef} type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    hidden 
                    onChange={e => handleFile(e.target.files?.[0] ?? null)}
                    capture={false}
                  />
                </div>
              </div>

              <div className={styles.privacyRow}>
                <input type="checkbox" id="priv-c" className={styles.checkbox}
                  checked={privacyChecked} onChange={e => setPrivacy(e.target.checked)} />
                <label htmlFor="priv-c" className={styles.privacyLabel}>
                  Your privacy is important to us. By filling this form you agree to our{' '}
                  <Link href="/Privacy-policy" className={styles.privacyLink}>privacy policy</Link> *
                </label>
              </div>

              <div className={styles.recaptchaWrap}>
                <ReCAPTCHA 
                  ref={recaptchaRef} 
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  theme="dark" 
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 'compact' : 'normal'}
                  onChange={(token: string | null) => { 
                    setCaptchaToken(token); 
                    setCaptchaError(''); 
                  }}
                  onExpired={() => { 
                    setCaptchaToken(null); 
                    setCaptchaError('reCAPTCHA expired. Please verify again.'); 
                  }} 
                />
              </div>
              {captchaError && (
                <p className={styles.captchaError}>{captchaError}</p>
              )}

              <button type="submit" className={styles.submitButton}
                disabled={!isFormValid || isSubmitting}
                title={!isFormValid ? 'Please fix all errors before submitting' : ''}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>

              {(submitStatus === 'success' || submitStatus === 'error') && (
                <StatusDialog status={submitStatus} onClose={() => setSubmitStatus('idle')} />
              )}

            </form>
          </section>
        </div>
      </main>
    </div>
  );
}