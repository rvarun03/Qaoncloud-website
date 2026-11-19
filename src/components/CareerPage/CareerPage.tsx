'use client';

import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import JobCard from '@/components/Common/JobCard/JobCard';
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader';
import { jobs } from '@/data/jobs';
import styles from './CareerPage.module.css';

export default function CareerPage() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  return (
    <main className={styles.page}>
      <section className={styles.section} aria-labelledby="open-positions-heading">
        <div className={styles.layout}>
          <aside className={styles.contactPanel} aria-labelledby="careers-contact-heading">
            <h2 id="careers-contact-heading" className={styles.contactTitle}>Get In Touch</h2>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <FiMapPin className={styles.contactIcon} aria-hidden="true" />
                <div className={styles.contactGroup}>
                  <span className={styles.contactLabel}>US</span>
                  <a
                    className={styles.contactValue}
                    href="https://maps.google.com/?q=39159+Paseo+Padre+Pkwy+ste+207,+Fremont,+CA+94538,+United+States"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    39159 Paseo Padre Pkwy ste 207,<br />
                    Fremont, CA 94538,<br />
                    United States
                  </a>
                  <div className={styles.phoneRow}>
                    <FiPhone className={styles.contactIcon} aria-hidden="true" />
                    <div className={styles.phoneList}>
                      <a className={styles.contactValue} href="tel:+16693365152">+1 (669) 336-5152</a>
                      <a className={styles.contactValue} href="tel:+16187496874">+1 (618) 749-6874</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.contactItem}>
                <FiMapPin className={styles.contactIcon} aria-hidden="true" />
                <div className={styles.contactGroup}>
                  <span className={styles.contactLabel}>India</span>
                  <a
                    className={styles.contactValue}
                    href="https://maps.google.com/?q=B3-8,+IIT+Madras+Research+Park,+Kanagam+Rd,+Tharamani,+Chennai,+Tamil+Nadu+600113,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    B3-8, IIT Madras Research Park,<br />
                    Kanagam Rd, Tharamani, Chennai,<br />
                    Tamil Nadu 600113, India
                  </a>
                  <div className={styles.phoneRow}>
                    <FiPhone className={styles.contactIcon} aria-hidden="true" />
                    <a className={styles.contactValue} href="tel:+919884292684">+91 98842 92684</a>
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.contactItem}>
                <FiMail className={styles.contactIcon} aria-hidden="true" />
                <a className={styles.contactValue} href="mailto:contactus@qaoncloud.com">contactus@qaoncloud.com</a>
              </div>
            </div>
          </aside>

          <div className={styles.positions}>
            <SectionHeader
              title="Explore Open Positions"
              description="Discover opportunities to build your career"
              highlight="with QAonCloud."
            />
            <div className={styles.cards}>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isOpen={openJobId === job.id}
                  onToggle={() => setOpenJobId((current) => current === job.id ? null : job.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
