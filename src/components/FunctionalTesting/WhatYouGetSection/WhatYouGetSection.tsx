import Image from "next/image";
import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import styles from "./WhatYouGetSection.module.css";

export type FunctionalTestingDeliverable = {
  title: string;
  description: string;
  imageSrc?: string;
  tone: "dark" | "blue";
};

type WhatYouGetSectionProps = {
  deliverables: FunctionalTestingDeliverable[];
};

function DeliverableCard({ deliverable }: { deliverable: FunctionalTestingDeliverable }) {
  const hasArtwork = Boolean(deliverable.imageSrc);

  return (
    <article
      className={`${styles.card} ${
        deliverable.tone === "blue" ? styles.blueCard : styles.darkCard
      } ${hasArtwork ? styles.cardWithArtwork : ""}`}
    >
      <div className={styles.cardContent}>
        <h3>{deliverable.title}</h3>
        <p>{deliverable.description}</p>
      </div>
      {hasArtwork && (
        <div className={styles.artwork} aria-hidden="true">
          <Image
            src={deliverable.imageSrc!}
            alt=""
            fill
            sizes="(max-width: 800px) 8rem, 13rem"
            className={styles.artworkImage}
          />
        </div>
      )}
    </article>
  );
}

export default function WhatYouGetSection({ deliverables }: WhatYouGetSectionProps) {
  return (
    <section className={styles.section} aria-label="What you get">
      <div className={styles.header}>
        <SectionHeader title="What you get" />
      </div>
      <div className={styles.grid}>
        {deliverables.map((deliverable) => (
          <DeliverableCard key={deliverable.title} deliverable={deliverable} />
        ))}
      </div>
    </section>
  );
}
