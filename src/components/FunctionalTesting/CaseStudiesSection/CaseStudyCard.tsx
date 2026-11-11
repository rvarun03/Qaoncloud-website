import OutcomeCard from './OutcomeCard';
import type { CaseStudyCardProps } from './types';
import styles from './CaseStudiesSection.module.css';
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader';

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className={styles.caseStudyCard}>
      
      <h3 className={styles.cardTitle}>
        {caseStudy.title}{' '}
        {caseStudy.highlightedText && (
          <span className={styles.cardTitleHighlight}>{caseStudy.highlightedText}</span>
        )}
      </h3>
      <div className={styles.divider} />
      <div className={styles.cardContent}>
        <div className={styles.caseStudyDetails}>
          <div>
            <p className={styles.detailLabel}>Context</p>
            <p className={styles.detailText}>{caseStudy.context}</p>
          </div>
          <div>
            <p className={styles.detailLabel}>What we did</p>
            <p className={styles.detailText}>{caseStudy.whatWeDid}</p>
          </div>
        </div>
        <OutcomeCard outcome={caseStudy.outcome} />
      </div>
    </article>
  );
}
