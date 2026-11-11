import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import type { ElementType, SVGProps } from "react";
import styles from "./StepsSection.module.css";

export type ServiceStep = {
  id: number;
  label: string;
  position: "left" | "right";
  title: string;
  description: string;
  icon: ElementType;
};

type StepSectionProps = {
  title: string;
  highlight?: string;
  steps: ServiceStep[];
};

export function FlowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m12.5 11.5 8 3.2-3.5 1a1 1 0 0 0-.7.7l-1 3.5z" />
    </svg>
  );
}

function PhaseCard({ phase }: { phase: ServiceStep }) {
  const Icon = phase.icon;

  return (
    <div className={`${styles.row} ${phase.position === "right" ? styles.rowRight : styles.rowLeft}`}>
      <article className={styles.cardOuter}>
        <div className={styles.phaseLabel}>{phase.label}</div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Icon aria-hidden="true" className={`${styles.icon} ${phase.id === 2 ? styles.flowIcon : ""}`} />
            <h3>{phase.title}</h3>
          </div>
          <p>{phase.description}</p>
        </div>
      </article>
    </div>
  );
}

function Connector({ fromPosition, id }: { fromPosition: ServiceStep["position"]; id: number }) {
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

export default function StepSection({ title, highlight, steps }: StepSectionProps) {
  return (
    <section className={styles.wrapper}>
      <SectionHeader title={title} highlight={highlight} />
      <div className={styles.timeline}>
        {steps.map((phase, index) => (
          <div key={phase.id} className={styles.phaseBlock}>
            <PhaseCard phase={phase} />
            {index < steps.length - 1 && <Connector fromPosition={phase.position} id={phase.id} />}
          </div>
        ))}
      </div>
    </section>
  );
}
