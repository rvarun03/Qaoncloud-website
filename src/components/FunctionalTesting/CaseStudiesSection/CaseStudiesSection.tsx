import CaseStudyCard from './CaseStudyCard';
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader';
import type { CaseStudiesSectionProps } from './types';
import styles from './CaseStudiesSection.module.css';

export default function CaseStudiesSection({
  heading,
  highlightedHeading,
  caseStudies,
}: CaseStudiesSectionProps) {
  return (
    <section className={styles.section} aria-label={heading}>
      {(heading || highlightedHeading) && (
        <SectionHeader title={heading ?? ''} highlight={highlightedHeading} />
      )}
      <div className={styles.cards}>
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  );
}
