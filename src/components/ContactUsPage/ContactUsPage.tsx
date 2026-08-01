'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
import styles from './ContactUsPage.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

/* ─────────────────────────────────────────
   Status Dialog
───────────────────────────────────────── */
function StatusDialog({ status, onClose }: { status: 'success' | 'error'; onClose: () => void }) {
  const isSuccess = status === 'success';
  return (
    <div className={styles.dialogBackdrop} onClick={onClose}>
      <div className={styles.dialogCard} data-status={status} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className={styles.dialogClose}><FiX /></button>
        <div className={styles.dialogIconWrap} data-status={status}>
          {isSuccess
            ? <FiCheckCircle size={34} color="#10b981" />
            : <FiXCircle size={34} color="#ef4444" />}
        </div>
        <h3 className={styles.dialogTitle}>
          {isSuccess ? 'Message Sent!' : 'Something went wrong'}
        </h3>
        <p className={styles.dialogBody}>
          {isSuccess
            ? "Your message has been sent successfully! We'll get back to you soon."
            : 'Failed to send your message. Please try again or contact us directly.'}
        </p>
        <button onClick={onClose} className={styles.dialogBtn} data-status={status}>
          {isSuccess ? 'Great, thanks!' : 'Close'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Disposable email domains blocklist
───────────────────────────────────────── */
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', '10minutemail.com', 'tempmail.com', 'guerrillamail.com',
  'throwaway.email', 'yopmail.com', 'trashmail.com', 'fakeinbox.com',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'guerrillamail.info',
  'spam4.me', 'dispostable.com', 'maildrop.cc', 'spamgourmet.com',
  'temp-mail.org', 'getnada.com', 'mailnull.com', 'spamgourmet.net',
  'discard.email', 'spamhereplease.com', 'spamex.com', 'trashmail.at',
  'trashmail.io', 'getairmail.com', 'filzmail.com', 'throwam.com',
]);

/* ─────────────────────────────────────────
   Email validator
───────────────────────────────────────── */
function validateEmail(email: string): string {
  const v = email.trim();
  if (!v) return 'Email is required';
  if (v.length > 254) return 'Email must be 254 characters or fewer';
  if (/\s/.test(v)) return 'Email must not contain spaces';

  const atCount = (v.match(/@/g) || []).length;
  if (atCount === 0) return 'Email must contain @';
  if (atCount > 1) return 'Email must contain only one @';

  const [local, domain] = v.split('@');
  if (!local) return 'Email must have a local part before @';
  if (local.length > 64) return 'Local part must be 64 characters or fewer';
  if (local.startsWith('.')) return 'Email must not start with a dot';
  if (local.endsWith('.')) return 'Email must not end with a dot';
  if (/\.{2,}/.test(local)) return 'Email must not contain consecutive dots';

  if (!domain) return 'Email must have a domain after @';
  if (!domain.includes('.')) return 'Email must contain a valid domain extension (e.g. .com, .in)';
  if (domain.startsWith('.')) return 'Domain must not start with a dot';
  if (domain.endsWith('.')) return 'Domain must not end with a dot';
  if (/\.{2,}/.test(domain)) return 'Domain must not contain consecutive dots';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address';

  const tld = domain.split('.').pop() || '';
  if (tld.length < 2) return 'Email must contain a valid domain extension (e.g. .com, .in)';

  if (DISPOSABLE_DOMAINS.has(domain.toLowerCase())) return 'Disposable email addresses are not allowed';

  return '';
}

/* ─────────────────────────────────────────
   Phone validator
───────────────────────────────────────── */
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

export default function ContactUsPage() {
  const [privacyChecked, setPrivacy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const workEmailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);

  /* ── reCAPTCHA ── */
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const recaptchaWrapRef = useRef<HTMLDivElement>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState('');
  const [privacyError, setPrivacyError] = useState('');

  /* ── Form state ── */
  const [biz, setBiz] = useState({
    firstName: '', lastName: '', company: '', designation: '', workEmail: '',
    phone: '', country: '', services: [] as string[], howHeard: '', budgetRange: '', message: '',
  });

  /* ── Validation ── */
  const [bizTouched, setBizTouched] = useState({
    firstName: false,
    lastName: false,
    workEmail: false,
    phone: false,
  });
  const computeBizErrors = (data: typeof biz) => ({
    firstName: data.firstName.trim() ? '' : 'First name is required',
    lastName: data.lastName.trim() ? '' : 'Last name is required',
    workEmail: validateEmail(data.workEmail),
    phone: data.phone.trim() ? validatePhone(data.phone) : '',
  });

  const bizErrors = computeBizErrors(biz);

  const isFormValid =
    !Object.values(computeBizErrors(biz)).some(e => e !== '') &&
    privacyChecked &&
    !!captchaToken;

  const showError = (field: keyof typeof bizTouched) =>
    bizTouched[field] ? bizErrors[field] : '';

  const focusAndScrollTo = (element: HTMLElement | null) => {
    requestAnimationFrame(() => {
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  /* ── Services dropdown ── */
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── File handling ── */
  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!/\.(pdf|docx)$/i.test(file.name)) {
      setFile(null);
      setFileError('Please upload only a PDF or DOCX file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFile(null);
      setFileError('File exceeds 5 MB. Please upload a smaller file.');
      return;
    }
    setFileError('');
    setFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBizTouched({ firstName: true, lastName: true, workEmail: true, phone: true });
    setPrivacyError(privacyChecked ? '' : 'Privacy policy agreement is required');
    if (!captchaToken) setCaptchaError('Please complete the reCAPTCHA');

    const firstInvalidField =
      (bizErrors.firstName && firstNameRef.current) ||
      (bizErrors.lastName && lastNameRef.current) ||
      (bizErrors.workEmail && workEmailRef.current) ||
      (bizErrors.phone && phoneRef.current) ||
      (!privacyChecked && privacyRef.current) ||
      (!captchaToken && recaptchaWrapRef.current);

    if (!isFormValid) {
      focusAndScrollTo(firstInvalidField || null);
      return;
    }

    setIsSubmitting(true);
    try {
      const contactForm = new FormData();
      contactForm.append('firstName', biz.firstName);
      contactForm.append('lastName', biz.lastName);
      contactForm.append('company', biz.company);
      contactForm.append('designation', biz.designation);
      contactForm.append('workEmail', biz.workEmail);
      contactForm.append('phone', biz.phone);
      contactForm.append('country', biz.country);
      biz.services.forEach(service => contactForm.append('services', service));
      contactForm.append('howHeard', biz.howHeard);
      contactForm.append('budgetRange', biz.budgetRange);
      contactForm.append('message', biz.message);
      contactForm.append('captchaToken', captchaToken);
      if (uploadedFile) contactForm.append('document', uploadedFile);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: contactForm,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setBiz({ firstName: '', lastName: '', company: '', designation: '', workEmail: '', phone: '', country: '', services: [], howHeard: '', budgetRange: '', message: '' });
      setBizTouched({ firstName: false, lastName: false, workEmail: false, phone: false });
      setFile(null); setPrivacy(false); setPrivacyError(''); setCaptchaToken(null); setCaptchaError('');
      recaptchaRef.current?.reset();
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error) {
      console.error('Contact form error:', error);
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Upload zone ── */
  const UploadZone = () => (
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
            onClick={() => { setFile(null); setFileError(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}>✕</button>
        </div>
      ) : (
        <>
          <p className={styles.dropText}>Drag and drop file here</p>
          <p className={styles.dropOr}>Or</p>
          <button type="button" className={styles.browseBtn} onClick={() => fileInputRef.current?.click()}>Browse File</button>
        </>
      )}
      <input ref={fileInputRef} type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden
        onChange={e => handleFile(e.target.files?.[0] ?? null)} />
    </div>
  );

  return (
    <div className={styles.contactPage}>
      <header className={styles.headerSection}>
        <div className={styles.ellipse2017} />
        <div className={styles.ellipse2018} />
        <div className={styles.logoWrapper}>
          <Link href="/"><Image src="/logos/qaoncloud3dlogo.png" alt="QAonCloud" width={220} height={220} priority /></Link>
        </div>
        <h1 className={styles.headerTitle}>Let’s talk about your QA needs </h1>
        <p className={styles.heroSubtitle}>
          We’d love to chat about your QA needs. Just leave us your details and we’ll get back to you in no time.
        </p>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>

          {/* LEFT */}
          <aside className={styles.leftSection}>
            <div className={styles.contactCard}>
              <h2 className={styles.cardTitle}>Get In Touch</h2>
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
                      Fremont, CA 94538, <br />United States
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

          {/* RIGHT */}
          <section className={styles.rightSection}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>

              {/* Row 1: First Name + Last Name */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>First Name <span className={styles.req}>*</span></label>
                  <input
                    ref={firstNameRef}
                    className={`${styles.formInput}${showError('firstName') ? ' ' + styles.inputError : ''}`}
                    placeholder="Enter Here"
                    value={biz.firstName}
                    onChange={e => {
                      setBiz(p => ({ ...p, firstName: e.target.value }));
                      setBizTouched(p => ({ ...p, firstName: true }));
                    }}
                    onBlur={() => setBizTouched(p => ({ ...p, firstName: true }))}
                  />
                  {showError('firstName') && <span className={styles.fieldError}>{showError('firstName')}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Last Name <span className={styles.req}>*</span></label>
                  <input
                    ref={lastNameRef}
                    className={`${styles.formInput}${showError('lastName') ? ' ' + styles.inputError : ''}`}
                    placeholder="Enter Here"
                    value={biz.lastName}
                    onChange={e => {
                      setBiz(p => ({ ...p, lastName: e.target.value }));
                      setBizTouched(p => ({ ...p, lastName: true }));
                    }}
                    onBlur={() => setBizTouched(p => ({ ...p, lastName: true }))}
                  />
                  {showError('lastName') && <span className={styles.fieldError}>{showError('lastName')}</span>}
                </div>
              </div>

              {/* Row 2: Company + Designation */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Company</label>
                  <input className={styles.formInput} placeholder="Enter Here" value={biz.company}
                    onChange={e => setBiz(p => ({ ...p, company: e.target.value }))} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Designation</label>
                  <input className={styles.formInput} placeholder="Enter Here" value={biz.designation}
                    onChange={e => setBiz(p => ({ ...p, designation: e.target.value }))} />
                </div>
              </div>

              {/* Row 3: Work Email + Phone */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Work Email <span className={styles.req}>*</span></label>
                  <input
                    ref={workEmailRef}
                    className={`${styles.formInput}${showError('workEmail') ? ' ' + styles.inputError : ''}`}
                    type="email" placeholder="Enter Here" value={biz.workEmail}
                    onChange={e => { setBiz(p => ({ ...p, workEmail: e.target.value })); setBizTouched(p => ({ ...p, workEmail: true })); }}
                    onBlur={() => setBizTouched(p => ({ ...p, workEmail: true }))}
                  />
                  {showError('workEmail') && <span className={styles.fieldError}>{showError('workEmail')}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone</label>
                  <input
                    ref={phoneRef}
                    className={`${styles.formInput}${showError('phone') ? ' ' + styles.inputError : ''}`}
                    type="tel" placeholder="Enter Here" value={biz.phone}
                    onChange={e => { setBiz(p => ({ ...p, phone: e.target.value.replace(/[^\d+\s\-]/g, '') })); setBizTouched(p => ({ ...p, phone: true })); }}
                    onBlur={() => setBizTouched(p => ({ ...p, phone: true }))}
                  />
                  {showError('phone') && <span className={styles.fieldError}>{showError('phone')}</span>}
                </div>
              </div>

              {/* Row 4: Country + Services */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Country</label>
                  <select className={styles.formSelect} value={biz.country}
                    onChange={e => setBiz(p => ({ ...p, country: e.target.value }))}>
                    <option value="">Select</option>
                    <option>United States</option>
                    <option>India</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Service I am interested in</label>
                  <div className={styles.multiSelectDropdown} ref={dropdownRef}>
                    <div className={styles.dropdownHeader} onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
                      <span>{biz.services.length > 0 ? `${biz.services.length} service${biz.services.length > 1 ? 's' : ''} selected` : 'Select services'}</span>
                      <span className={styles.dropdownArrow}>{servicesDropdownOpen ? '▲' : '▼'}</span>
                    </div>
                    {servicesDropdownOpen && (
                      <div className={styles.dropdownContent}>
                        {['Functional Testing', 'Performance Testing', 'Security Testing', 'Automation Testing', 'Compliance Testing'].map(service => (
                          <label key={service} className={styles.dropdownItem}>
                            <input type="checkbox" className={styles.checkbox} value={service}
                              checked={biz.services.includes(service)}
                              onChange={e => {
                                const checked = e.target.checked;
                                setBiz(p => ({ ...p, services: checked ? [...p.services, service] : p.services.filter(s => s !== service) }));
                              }} />
                            {service}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 5: How heard + My budget range */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>How did you hear about us?</label>
                  <select className={styles.formSelect} value={biz.howHeard}
                    onChange={e => setBiz(p => ({ ...p, howHeard: e.target.value }))}>
                    <option value="">Select</option>
                    <option>Google Search</option>
                    <option>LinkedIn</option>
                    <option>Referral</option>
                    <option>Social Media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>My budget range</label>
                  <select className={styles.formSelect} value={biz.budgetRange}
                    onChange={e => setBiz(p => ({ ...p, budgetRange: e.target.value }))}>
                    <option value="">Select</option>
                    <option>Under $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000 – $50,000</option>
                    <option>$50,000+</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>How can we help?</label>
                <textarea className={styles.formTextarea} placeholder="Enter Here"
                  value={biz.message} onChange={e => setBiz(p => ({ ...p, message: e.target.value }))} />
              </div>

              {/* Upload */}
              <div className={styles.uploadSection}>
                <label className={styles.uploadLabel}>Upload Document (PDF or DOCX, max 5MB)</label>
                <UploadZone />
                {fileError && <p className={styles.fieldError}>{fileError}</p>}
              </div>

              {/* Privacy */}
              <div className={styles.privacyRow}>
                <input ref={privacyRef} type="checkbox" id="priv-b" className={styles.checkbox}
                  checked={privacyChecked}
                  onChange={e => {
                    setPrivacy(e.target.checked);
                    if (e.target.checked) setPrivacyError('');
                  }} />
                <label htmlFor="priv-b" className={styles.privacyLabel}>
                  Your privacy is important to us. By filling this form you agree to our{' '}
                  <Link href="/Privacy-policy" className={styles.privacyLink}>privacy policy</Link>  <span className={styles.req}>*</span>
                </label>
              </div>
              {privacyError && <p className={styles.fieldError}>{privacyError}</p>}

              {/* reCAPTCHA */}
              <div ref={recaptchaWrapRef} className={styles.recaptchaWrap} tabIndex={-1}>
                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  theme="dark"
                  onChange={(token: string | null) => { setCaptchaToken(token); setCaptchaError(''); }}
                  onExpired={() => { setCaptchaToken(null); setCaptchaError('reCAPTCHA expired. Please verify again.'); }} />
              </div>
              {captchaError && <p className={styles.captchaError}>{captchaError}</p>}

              <button type="submit" className={styles.submitButton}
                disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit'}
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
