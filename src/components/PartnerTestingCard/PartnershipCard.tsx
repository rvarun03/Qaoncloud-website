import React from "react";
import styles from "./PartnershipCard.module.css";

interface PartnershipCardProps {
  company: string;
  logo: string;
  topColor: string;
  tags: string[];
  title: string;
  description: string;
  subdescription?: string; // Made optional with ?
  url: string;
}

export default function PartnershipCard({
  company,
  logo,
  topColor,
  tags,
  title,
  description,
  subdescription,
  url
}: PartnershipCardProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
      <div className={styles.card}>
        <div className={styles.top} style={{ backgroundColor: topColor }}>
          <div className={styles.tags}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <img src={logo} alt={company} className={styles.logo} />
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          {subdescription && (
            <span className={styles.readMoreLink}>
              {subdescription}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
