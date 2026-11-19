'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';
import type { Job } from '@/data/jobs';
import { jobs } from '@/data/jobs';
import buttonStyles from '@/components/Common/Button/Button.module.css';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: Job;
  isOpen: boolean;
  onToggle: () => void;
}

type ApplicationDetails = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
};

const emptyApplication = (jobTitle: string): ApplicationDetails => ({
  firstName: '',
  lastName: '',
  email: '',
  jobTitle,
});

// Enable this after the reCAPTCHA site key is authorized for the deployed domain.
const careersCaptchaEnabled = false;

export default function JobCard({ job, isOpen, onToggle }: JobCardProps) {
  const contentId = `job-description-${job.id}`;
  const triggerId = `job-toggle-${job.id}`;
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [application, setApplication] = useState<ApplicationDetails>(() => emptyApplication(job.title));
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState('');

  const closeApplication = () => {
    if (!isSubmitting) setIsApplicationOpen(false);
  };

  useEffect(() => {
    if (!isApplicationOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) setIsApplicationOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isApplicationOpen, isSubmitting]);

  const openApplication = () => {
    setApplication(emptyApplication(job.title));
    setApplicationStatus('idle');
    setSubmissionError('');
    setResume(null);
    setResumeError('');
    setCaptchaToken(null);
    setCaptchaError('');
    recaptchaRef.current?.reset();
    if (resumeInputRef.current) resumeInputRef.current.value = '';
    setIsApplicationOpen(true);
  };

  const handleResumeChange = (file: File | null) => {
    if (!file) {
      setResume(null);
      return;
    }
    if (!/\.(pdf|docx)$/i.test(file.name)) {
      setResume(null);
      setResumeError('Please upload a PDF or DOCX resume.');
      if (resumeInputRef.current) resumeInputRef.current.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResume(null);
      setResumeError('Your resume must be 5 MB or smaller.');
      if (resumeInputRef.current) resumeInputRef.current.value = '';
      return;
    }

    setResume(file);
    setResumeError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resume) {
      setResumeError('Please upload your resume.');
      return;
    }
    if (careersCaptchaEnabled && !captchaToken) {
      setCaptchaError('Please complete the reCAPTCHA.');
      return;
    }
    setIsSubmitting(true);
    setApplicationStatus('idle');
    setSubmissionError('');

    try {
      const formData = new FormData();
      formData.append('firstName', application.firstName);
      formData.append('lastName', application.lastName);
      formData.append('email', application.email);
      formData.append('jobTitle', application.jobTitle);
      formData.append('resume', resume);
      if (careersCaptchaEnabled && captchaToken) formData.append('captchaToken', captchaToken);
      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;

      if (!response.ok) throw new Error(result?.error || 'Application submission failed');
      setApplicationStatus('success');
    } catch (error) {
      console.error('Job application error:', error);
      setSubmissionError(error instanceof Error ? error.message : 'Failed to send your application. Please try again.');
      setApplicationStatus('error');
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className={styles.card}>
      <button id={triggerId} type="button" className={styles.trigger} aria-expanded={isOpen} aria-controls={contentId} onClick={onToggle}>
        <span className={styles.headerContent}>
          <span className={styles.title}>{job.title}</span>
          <span className={styles.meta}>
            {job.experience && <span>Experience: {job.experience}</span>}
            <span>Work Mode: {job.workMode}</span>
            {job.location && <span>Location: {job.location}</span>}
          </span>
        </span>
        <FiChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div id={contentId} className={styles.content} role="region" aria-labelledby={triggerId}>
          {job.summary && (
            <section className={styles.descriptionSection}>
              <h3 className={styles.sectionTitle}>Job Summary</h3>
              <p className={styles.description}>{job.summary}</p>
            </section>
          )}

          {job.sections.filter((section) => section.description || section.items?.length).map((section) => (
            <section className={styles.descriptionSection} key={section.title}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              {section.description && <p className={styles.description}>{section.description}</p>}
              {section.items && section.items.length > 0 && <ul className={styles.items}>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}

          <div className={styles.applicationAction}>
            <button type="button" className={`${buttonStyles.button} ${buttonStyles.heroPrimary} ${buttonStyles.cta}`} onClick={openApplication}>
              Apply Now
            </button>
          </div>
        </div>
      )}

      {isApplicationOpen && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => event.target === event.currentTarget && closeApplication()}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={`application-title-${job.id}`}>
            <button type="button" className={styles.closeButton} onClick={closeApplication} aria-label="Close application form" disabled={isSubmitting}>
              <FiX aria-hidden="true" />
            </button>

            {applicationStatus === 'success' ? (
              <div className={styles.successState} role="status">
                <h2 id={`application-title-${job.id}`}>Application sent</h2>
                <p>Thanks, {application.firstName}. Your application for {application.jobTitle} has been sent to our team.</p>
                <button type="button" className={`${buttonStyles.button} ${buttonStyles.heroPrimary} ${buttonStyles.content}`} onClick={closeApplication}>Done</button>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <p className={styles.eyebrow}>QAonCloud Careers</p>
                  <h2 id={`application-title-${job.id}`}>Apply for a role</h2>
                  <p>All fields are required.</p>
                </div>

                <form className={styles.applicationForm} onSubmit={handleSubmit}>
                  <div className={styles.nameFields}>
                    <label className={styles.fieldLabel}>
                      <span>First name <b aria-hidden="true">*</b></span>
                      <input type="text" name="firstName" value={application.firstName} onChange={(event) => setApplication((current) => ({ ...current, firstName: event.target.value }))} autoComplete="given-name" required />
                    </label>
                    <label className={styles.fieldLabel}>
                      <span>Last name <b aria-hidden="true">*</b></span>
                      <input type="text" name="lastName" value={application.lastName} onChange={(event) => setApplication((current) => ({ ...current, lastName: event.target.value }))} autoComplete="family-name" required />
                    </label>
                  </div>
                  <label className={styles.fieldLabel}>
                    <span>Email <b aria-hidden="true">*</b></span>
                    <input type="email" name="email" value={application.email} onChange={(event) => setApplication((current) => ({ ...current, email: event.target.value }))} autoComplete="email" required />
                  </label>
                  <label className={styles.fieldLabel}>
                    <span>Role <b aria-hidden="true">*</b></span>
                    <select name="jobTitle" value={application.jobTitle} onChange={(event) => setApplication((current) => ({ ...current, jobTitle: event.target.value }))} required>
                      {jobs.map((opening) => <option key={opening.id} value={opening.title}>{opening.title}</option>)}
                    </select>
                  </label>
                  <label className={styles.fieldLabel}>
                    <span>Upload resume — PDF or DOCX (max 5 MB) <b aria-hidden="true">*</b></span>
                    <input ref={resumeInputRef} type="file" name="resume" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => handleResumeChange(event.target.files?.[0] ?? null)} required />
                  </label>
                  {resume && <p className={styles.fileName}>{resume.name}</p>}
                  {resumeError && <p className={styles.applicationError} role="alert">{resumeError}</p>}
                  {careersCaptchaEnabled && (
                    <>
                      <div className={styles.recaptchaWrap}>
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                          theme="dark"
                          onChange={(token) => { setCaptchaToken(token); setCaptchaError(''); }}
                          onExpired={() => { setCaptchaToken(null); setCaptchaError('reCAPTCHA expired. Please verify again.'); }}
                        />
                      </div>
                      {captchaError && <p className={styles.applicationError} role="alert">{captchaError}</p>}
                    </>
                  )}
                  {applicationStatus === 'error' && <p className={styles.applicationError} role="alert">{submissionError}</p>}
                  <button type="submit" className={`${buttonStyles.button} ${buttonStyles.heroPrimary} ${buttonStyles.content} ${styles.submitButton}`} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit application'}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </article>
  );
}
