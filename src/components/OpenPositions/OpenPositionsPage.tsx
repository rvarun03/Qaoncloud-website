'use client';

import { useState } from 'react';
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader';
import JobCard from '@/components/Common/JobCard/JobCard';
import { jobs } from '@/data/jobs';
import styles from './OpenPositionsPage.module.css';

export default function OpenPositionsPage() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const handleToggle = (jobId: string) => {
    setOpenJobId((currentJobId) => currentJobId === jobId ? null : jobId);
  };

  return (
    <main className={styles.page}>
      <section className={styles.section} aria-labelledby="open-positions-heading">
        <SectionHeader
          title="Explore Open Positions"
          description="Discover opportunities to build your career "
          highlight="with QAonCloud."
        />
        <div className={styles.cards}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isOpen={openJobId === job.id}
              onToggle={() => handleToggle(job.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
