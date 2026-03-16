import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import styles from "./Comparisontable.module.css";

export interface ComparisonRow {
  alternative: string;
  problem: string;
  difference: string;
}

interface ComparisonTableProps {
  title: string;
  highlight: string;
  rows: ComparisonRow[];
}

const ComparisonTable = ({ title, highlight, rows }: ComparisonTableProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.glowBlob} aria-hidden="true" />
      <div className={styles.container}>
        <SectionHeader title={title} highlight={highlight} />
        

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className={styles.theadRow}>
                <th className={styles.thAlternative}>Alternative</th>
                <th className={styles.thProblem}>
                  <span className={styles.thIcon}>
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 8h-2.81A6 6 0 0 0 15 5.5V4a1 1 0 0 0-2 0v1.17A5.98 5.98 0 0 0 12 5c-.34 0-.68.03-1 .08V4a1 1 0 0 0-2 0v1.5A6 6 0 0 0 6.81 8H4a1 1 0 0 0 0 2h2.09A5.96 5.96 0 0 0 6 11v1H4a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H4a1 1 0 0 0 0 2h2.81A6 6 0 0 0 18 16v-1h2a1 1 0 0 0 0-2h-2v-1c0-.34-.03-.68-.09-1H20a1 1 0 0 0 0-2zM12 7a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0v-5a4 4 0 0 1 4-4zm-1 4h2v2h-2v-2zm0 4h2v2h-2v-2z" fill="#E8730E"/>
                    </svg>
                  </span>
                  The Problem
                </th>
                <th className={styles.thDifference}>
                  <span className={styles.thIcon}>
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2L2 8L12 22L22 8L18 2H6ZM16 4L18.5 8H13.5L16 4ZM8 4L10.5 8H5.5L8 4ZM4.5 10H9L12 18L4.5 10ZM11 10H13L12 13.5L11 10ZM15 10H19.5L12 18L15 10Z" fill="#3093E8"/>
                    </svg>
                  </span>
                  How We're Different
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className={styles.row}>
                  <td className={styles.tdAlternative}>{row.alternative}</td>
                  <td className={styles.tdProblem}>{row.problem}</td>
                  <td className={styles.tdDifference}>{row.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;