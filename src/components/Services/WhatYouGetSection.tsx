import Image from "next/image";
import styles from "./WhatYouGetSection.module.css";
import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
type Deliverable = {
  title: string;
  description: string;
  imageSrc?: string;
};

const deliverables: Deliverable[] = [
  {
    title: "Test cases",
    description:
      "IDs, steps, test data, expected vs. actual results, and severity classification. Specific, reproducible, traceable.",
    imageSrc: "/Images/FunctionalTesting/WhatYouGet/TestCases.png",
  },
  {
    title: "Bug reports",
    description:
      "Exact steps to reproduce, screenshots, environment details, and impact assessment. No guesswork.",
    imageSrc: "/Images/FunctionalTesting/WhatYouGet/BugReports_Matched.png",
  },
  {
    title: "Weekly QA reports",
    description:
      "Pass/fail breakdown, defect distribution by module, coverage progress, risk flags, and recommendations for the next cycle.",
  },
];

function DeliverableCard({ deliverable, isWide }: { deliverable: Deliverable; isWide: boolean }) {
  const hasArtwork = Boolean(deliverable.imageSrc);

  return (
    <article
      className={`${styles.card} ${isWide ? styles.cardWide : ""} ${
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

export default function WhatYouGetSection() {
  return (
    <section className={styles.section} aria-labelledby="what-you-get-title">
      <SectionHeader title="What you get" />
      <div className={styles.grid}>
        {deliverables.map((deliverable, index) => (
          <DeliverableCard
            key={deliverable.title}
            deliverable={deliverable}
            isWide={index === deliverables.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
