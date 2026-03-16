import styles from "./MilestoneCard.module.css";

interface MilestoneCardProps {
  day: number;
  items: string[];
}

export const MilestoneCard = ({ day, items }: MilestoneCardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.dayTitle}>By Day {day}</h3>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <svg 
              className={styles.checkIcon}
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
            >
              <circle 
                cx="10" 
                cy="10" 
                r="9" 
                stroke="#00D26A" 
                strokeWidth="2"
              />
              <path 
                d="M6 10L8.5 12.5L14 7" 
                stroke="#00D26A" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};