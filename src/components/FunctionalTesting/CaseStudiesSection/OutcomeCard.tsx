import type { OutcomeCardProps } from './types';
import styles from './CaseStudiesSection.module.css';

export default function OutcomeCard({ outcome }: OutcomeCardProps) {
  return (
    <aside className={styles.outcomeCard}>
      {outcome.label && <p className={styles.outcomeLabel}>{outcome.label}</p>}
      <p className={styles.outcomeValue}>{outcome.value}</p>
      <p className={styles.outcomeDescription}>{outcome.description}</p>
      <ul className={styles.outcomeHighlights}>
        {outcome.highlights.map((highlight, index) => (
          <li key={`${highlight}-${index}`}>{highlight}</li>
        ))}
      </ul>
    </aside>
  );
}
