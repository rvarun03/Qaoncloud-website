'use client';

import { useState } from 'react';
import JobCard from '@/components/Common/JobCard/JobCard';
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader';
import { jobs } from '@/data/jobs';
import styles from './CareerPage.module.css';

export default function CareerPage() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  return (
    <main className={styles.page}>
      <section className={styles.section} aria-labelledby="open-positions-heading">
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
      </section>
    </main>
  );
}
