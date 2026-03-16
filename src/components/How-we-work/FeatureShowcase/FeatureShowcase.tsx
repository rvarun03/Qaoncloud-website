"use client";

import React from 'react';
import Image from 'next/image';
import styles from './FeatureShowcase.module.css';
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader';

const features = [
  {
    title: 'Communication',
    items: [
      'We join your Slack, Teams, or Discord - whatever you use',
      'Daily async updates, not meetings that eat your calendar',
      'Escalations go directly to you when judgment is needed',
    ],
  },
  {
    title: 'Tooling',
    items: [
      'Native integration with your CI/CD (GitHub Actions, CircleCI, Jenkins, GitLab CI, etc.)',
      'Works with your existing test management tools or we bring ours',
      "Automated reports land in your inbox, not a portal you'll forget to check",
    ],
  },
  {
    title: 'Cadence',
    items: [
      'Release daily? We test daily.',
      'Sprint-based? We align to your sprints.',
      "Chaotic startup schedule? We've seen it. We adapt.",
    ],
  },
];

const FeatureShowcase: React.FC = () => (
  <div className={styles.container}>
    <SectionHeader
      title="We plug into"
      highlight="your workflow"
      description="You don't change how you work. We adapt to you."
    />

    <div className={styles.grid}>

      {/* ── Communication card ── */}
      <div className={styles.cardOuter}>
        <div className={`${styles.card} ${styles.cardDark}`}>
          <h3 className={styles.title}>{features[0].title}</h3>
          <ul className={styles.list}>
            {features[0].items.map((item, i) => (
              <li key={i} className={styles.listItem}>{item}</li>
            ))}
          </ul>
          <div className={styles.iconCluster}>
            <div className={styles.iconItem} style={{ zIndex: 1 }}>
              <div className={styles.iconImage}>
                <Image src="/Images/How-We-Work/Slack.png" alt="Slack" fill style={{ objectFit: 'contain' }} />
              </div>
              
            </div>
            <div className={styles.iconItem} style={{ zIndex: 2, marginLeft: '-56px', marginBottom: '10px' }}>
              <div className={styles.iconImage}>
                <Image src="/Images/How-We-Work/Teams.png" alt="Teams" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>
            <div className={styles.iconItem} style={{ zIndex: 3, marginLeft: '-60px' }}>
              <div className={styles.iconImage}>
                <Image src="/Images/How-We-Work/Discord.png" alt="Discord" fill style={{ objectFit: 'contain' }} />
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* ── Tooling card ── */}
      <div className={styles.cardOuter}>
        <div className={`${styles.card} ${styles.cardDark}`}>
          <h2 className={styles.title}>{features[1].title}</h2>
          <ul className={styles.list}>
            {features[1].items.map((item, i) => (
              <li key={i} className={styles.listItem}>{item}</li>
            ))}
          </ul>
          <div className={styles.iconCluster}>
            <div className={styles.iconItem} style={{ zIndex: 1 }}>
              <div className={styles.toolCircleCI}>
                <Image src="/Images/How-We-Work/CircleCI.png" alt="CircleCI" fill style={{ objectFit: 'contain' }} />
              </div>
              
            </div>
            <div className={styles.iconItem} style={{ zIndex: 2, marginLeft: '-50px',marginBottom: '30px', marginRight: '5px' }}>
              <div className={styles.toolGithub}>
                <Image src="/Images/How-We-Work/Github.png" alt="GitHub" fill style={{ objectFit: 'contain' }} />
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* ── Cadence card (full width) ── */}
      <div className={`${styles.cardOuter} ${styles.cardOuterFull}`}>
        <div className={`${styles.card} ${styles.cardGradient}`}>
          <h2 className={styles.title}>{features[2].title}</h2>
          <ul className={styles.list}>
            {features[2].items.map((item, i) => (
              <li key={i} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  </div>
);

export default FeatureShowcase;