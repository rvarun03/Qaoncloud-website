import React from 'react';
import styles from './HowWeWork.module.css';
import Image from 'next/image';
import Button from '@/components/Common/Button/Button';


const HowWeWork = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            How we deliver{' '}
            <span className={styles.highlight}>QA 40% faster</span>
          </h1>
          <p className={styles.description}>
            AI eliminates the slow parts. Engineers handle the hard parts.
            You ship 2× faster, more frequently, minus the added anxiety.
          </p>
          <div className={styles.buttonContainer}>
            <Button href="/Contact-u" variant="heroPrimary" size="cta">
                            Talk To An Expert
                          </Button>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/How-we-work.png"
            width={600}
            height={500}
            alt="QA delivery illustration"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
