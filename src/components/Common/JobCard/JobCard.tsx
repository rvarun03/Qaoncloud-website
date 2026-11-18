'use client';

import { FormEvent, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import type { Job } from '@/data/jobs';
import buttonStyles from '@/components/Common/Button/Button.module.css';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: Job;
  isOpen: boolean;
  onToggle: () => void;
}

export default function JobCard({ job, isOpen, onToggle }: JobCardProps) {
  const contentId = `job-description-${job.id}`;
  const triggerId = `job-toggle-${job.id}`;
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleResumeChange = (file: File | null) => {
    if (!file) return;
    if (!/\.(pdf|docx)$/i.test(file.name)) {
      setResume(null);
      setFileError('Please upload only a PDF or DOCX resume.');
      if (resumeInputRef.current) resumeInputRef.current.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setResume(null);
      setFileError('The resume must be 10 MB or smaller.');
      if (resumeInputRef.current) resumeInputRef.current.value = '';
      return;
    }

    setResume(file);
    setFileError('');
    setApplicationStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resume) {
      setFileError('Please upload your resume.');
      return;
    }

    setIsSubmitting(true);
    setApplicationStatus('idle');

    try {
      const application = new FormData();
      application.append('jobTitle', job.title);
      application.append('resume', resume);

      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: application,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error || 'Application submission failed');
      }

      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = '';
      setApplicationStatus('success');
    } catch (error) {
      console.error('Job application error:', error);
      setApplicationStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className={styles.card}>
      <button
        id={triggerId}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
      >
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
              {section.items && section.items.length > 0 && (
                <ul className={styles.items}>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}

          <div className={styles.applicationAction}>
            <button
              type="button"
              className={`${buttonStyles.button} ${buttonStyles.heroPrimary} ${buttonStyles.cta}`}
              onClick={() => setIsApplicationOpen((current) => !current)}
              aria-expanded={isApplicationOpen}
              aria-controls={`job-application-${job.id}`}
            >
              Apply Now
            </button>
          </div>

          {isApplicationOpen && (
            <form id={`job-application-${job.id}`} className={styles.applicationForm} onSubmit={handleSubmit}>
              <label className={styles.resumeLabel} htmlFor={`resume-${job.id}`}>Upload Resume — PDF or DOCX (max 10MB)</label>
              <input
                ref={resumeInputRef}
                id={`resume-${job.id}`}
                className={styles.resumeInput}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => handleResumeChange(event.target.files?.[0] ?? null)}
              />
              {resume && <p className={styles.fileName}>{resume.name}</p>}
              {fileError && <p className={styles.applicationError}>{fileError}</p>}
              {applicationStatus === 'success' && <p className={styles.applicationSuccess} role="status">Your application has been sent successfully.</p>}
              {applicationStatus === 'error' && <p className={styles.applicationError} role="alert">Failed to send your application. Please try again.</p>}
              <button
                type="submit"
                className={`${buttonStyles.button} ${buttonStyles.heroPrimary} ${buttonStyles.cta}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      )}
    </article>
  );
}
