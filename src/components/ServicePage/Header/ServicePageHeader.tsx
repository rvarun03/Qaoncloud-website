import React from 'react';
import styles from './ServicePageHeader.module.css';
import Image from 'next/image';
import Button from '../../Common/Button/Button';

const ServicePageHeader = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
            <p className={styles.header_para}>Putting the 'assurance' in quality assurance.</p>
            <h1>
              No chaos. No compromises. Just quality{' '}
              <span style={{ color: '#3b82f6' }}>you can trust.</span>
            </h1>
            <p>
              Nothing's more stressful than uncovering new issues just before a release. That's something the 200+ businesses that trust us will never have to worry about. 
              Rest assured, we'll cover all angles, check all possibilities, and make sure there are no delays. Because your wins are our wins, Partner! 
            </p>
            <div className={styles.buttonContainer}>
                <Button href="/Contact-us" variant="primary" size="cta">
                     Talk To An Expert 
                </Button>
            </div>
        </div>   
        <div className={styles.image}>
            <Image src="/Service-logo.png" width={600} height={500} alt='Professional working on laptop' />
        </div> 

      </div> 

    </section>
  );
};

export default ServicePageHeader;
