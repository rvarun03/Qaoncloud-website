import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import styles from "./AiTestingEffectivenessSection.module.css";

export type AiTestingCapability = {
  number: string;
  title: string;
  description: string;
};

type AiTestingEffectivenessSectionProps = {
  capabilities: AiTestingCapability[];
};

export default function AiTestingEffectivenessSection({
  capabilities,
}: AiTestingEffectivenessSectionProps) {
  return (
    <section className={styles.section} aria-label="How AI makes testing more effective">
      <div className={styles.header}>
        <SectionHeader
          title="How"
          highlight="AI"
          trailingText="makes testing more effective"
        />
      </div>
      <div className={styles.grid}>
        {capabilities.map((capability) => (
          <article className={styles.card} key={capability.number}>
            <div className={styles.cardContent}>
              <p className={styles.number}>{capability.number}</p>
              <h3>{capability.title}</h3>
              <p className={styles.description}>{capability.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
