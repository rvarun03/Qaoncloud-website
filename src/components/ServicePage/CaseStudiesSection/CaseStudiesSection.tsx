import React from "react";

import styles from "./CaseStudiesSection.module.css";

import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import PartnershipCard from "../../PartnerTestingCard/PartnershipCard";
import Button from "@/components/Common/Button/Button";

const caseStudies = [
  {
    company: "Aol.",
    logo: "/logos/AOI.png", // replace with actual path
    topColor: "#2A5068",
    tags: ["Automation TEST", "User Testing", "Functional QA"],
    title: "Fintech App: Reducing Production Defects",
    description: "We strengthened their QA process, improved test coverage, and helped cut defect leakage across releases.",
    url:"https://docsend.com/view/whb97ns2ev3i9erb"
  },
  {
    company: "Avanti",
    logo: "/logos/avanti.png",
    topColor: "#623B2B",
    tags: ["Integration Testing", "User Testing", "Performance QA"],
    title: "Ecommerce Platform: Fixing Checkout Issues",
    description: "We identified critical flow failures, validated integrations, and ensured a stable checkout experience.",
    url:"https://docsend.com/view/gxyqru5wr72twj8p"
  },
  {
    company: "RedBlackTree",
    logo: "/logos/redblacktree.png",
    topColor: "#3B2C66",
    tags: ["Compliance QA", "User Testing", "Security Testing"],
    title: "Healthcare SaaS: Strengthening Compliance",
    description: "We validated high-risk workflows, improved reliability, and supported faster compliance approvals.",
    url:"https://docsend.com/view/9kqq39c6tmhkubby"
  }
];

export default function PartnershipSection() {
  return (
    <section className={styles.section}>
      <SectionHeader
        title="The QAonCloud"
        highlight="Guarantee"
        description="Choosing the right QA partner isn't just about finding testers — it's about finding a team that truly understands your product."
      />

      <div className={styles.cardsGrid}>
        {caseStudies.map((study, idx) => (
          <PartnershipCard key={idx} {...study} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <Button href="/how-we-work" variant="primary" size="cta">
         Talk To An Expert 
      </Button>
      </div>
      
    </section>
  );
}
