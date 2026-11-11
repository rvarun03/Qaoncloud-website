import Image from "next/image";
import styles from "./WhatYouGetSection.module.css";
import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
export type ServiceDeliverable = {
  title: string;
  description: string;
  imageSrc?: string;
  isWide?: boolean;
};

type WhatYouGetSectionProps = {
  title: string;
  deliverables: ServiceDeliverable[];
};

function DeliverableCard({ deliverable }: { deliverable: ServiceDeliverable }) {
  const hasArtwork = Boolean(deliverable.imageSrc);

  return (
    <article
      className={`${styles.card} ${deliverable.isWide ? styles.cardWide : ""} ${
        hasArtwork ? styles.cardWithArtwork : ""
      }`}
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
            sizes="(max-width: 640px) 8rem, 13rem"
            className={styles.artworkImage}
          />
        </div>
      )}
    </article>
  );
}

export default function WhatYouGetSection({ title, deliverables }: WhatYouGetSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="what-you-get-title">
      <SectionHeader title={title} />
      <div className={styles.grid}>
        {deliverables.map((deliverable) => (
          <DeliverableCard key={deliverable.title} deliverable={deliverable} />
        ))}
      </div>
    </section>
  );
}
