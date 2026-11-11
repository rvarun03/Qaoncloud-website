import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import { Bug, Gem } from "lucide-react";
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
                    <Bug size={30} strokeWidth={1.8} color="#FF8641" aria-hidden="true" />
                  </span>
                  The Problem
                </th>
                <th className={styles.thDifference}>
                  <span className={styles.thIcon}>
                    <Gem size={30} strokeWidth={1.8} color="#22A5F8" aria-hidden="true" />
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
