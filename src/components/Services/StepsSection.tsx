"use client";

import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import { Binoculars, FileChartColumn, WandSparkles } from "lucide-react";
import type { ElementType, SVGProps } from "react";
import styles from "./StepsSection.module.css";

const phases: {
  id: number;
  label: string;
  position: "left" | "right";
  title: string;
  description: string;
  icon: ElementType;
}[] = [
  {
    id: 1,
    label: "Step 1",
    position: "left",
    title: "Understand your product",
    description:
      "We learn your application inside out — features, user roles, business rules, integrations, and the edge cases that keep your team up at night.",
    icon: Binoculars,
  },
  {
    id: 2,
    label: "Step 2",
    position: "right",
    title: "Map critical user flows",
    description:
      "Every path a user can take, from onboarding to checkout. Each flow gets prioritised by business impact and risk.",
    icon: FlowIcon,
  },
  {
    id: 3,
    label: "Step 3",
    position: "left",
    title: "Design test cases that matter",
    description:
      "AI generates comprehensive test cases. Engineers review, refine, and add the domain-specific scenarios only someone who knows your product would think of.",
    icon: WandSparkles,
  },
  {
    id: 4,
    label: "Step 4",
    position: "right",
    title: "Execute and report",
    description:
      "Tests run against your staging environment every cycle. Detailed reports — what passed, what failed, what needs attention — land in your inbox, not buried in a portal.",
    icon: FileChartColumn,
  },
];

type Phase = (typeof phases)[number];

function FlowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 3a8 8 0 1 0 7.2 11.5" />
      <path d="m12.5 11.5 8 3.2-3.5 1a1 1 0 0 0-.7.7l-1 3.5z" />
    </svg>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const Icon = phase.icon;

  return (
    <div className={`${styles.row} ${phase.position === "right" ? styles.rowRight : styles.rowLeft}`}>
      <article className={styles.cardOuter}>
        <div className={styles.phaseLabel}>{phase.label}</div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Icon aria-hidden="true" className={styles.icon} />
            <h3>{phase.title}</h3>
          </div>
          <p>{phase.description}</p>
        </div>
      </article>
    </div>
  );
}

function Connector({ fromPosition, id }: { fromPosition: Phase["position"]; id: number }) {
  const gradientId = `gradient-${id}`;
  const leftToRight = "M 500 0 L 700 0 Q 730 0 730 30 L 730 100";
  const rightToLeft = "M 450 0 L 260 0 Q 235 0 235 30 L 235 100";
  const arrowX = fromPosition === "left" ? "73%" : "23.5%";

  return (
    <div className={styles.connectorWrapper}>
      <svg
        className={styles.connectorSvg}
        viewBox="0 0 1000 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1={fromPosition === "left" ? "0%" : "100%"}
            y1="0%"
            x2={fromPosition === "left" ? "100%" : "0%"}
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255,134,65,0)" />
            <stop offset="100%" stopColor="#FF8641" />
          </linearGradient>
        </defs>
        <path
          d={fromPosition === "left" ? leftToRight : rightToLeft}
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: "-5px",
          left: arrowX,
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "10px solid #FF8641",
        }}
      />
    </div>
  );
}

export default function StepSection() {
  return (
    <section className={styles.wrapper}>
      <SectionHeader
        title="How we design and execute "
        highlight="functional tests"
      />
      <div className={styles.timeline}>
        {phases.map((phase, index) => (
          <div key={phase.id} className={styles.phaseBlock}>
            <PhaseCard phase={phase} />
            {index < phases.length - 1 && <Connector fromPosition={phase.position} id={phase.id} />}
          </div>
        ))}
      </div>
    </section>
  );
}
