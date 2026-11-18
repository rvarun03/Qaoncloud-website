import { ReactNode } from 'react';
import classes from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  trailingText?: string;
  description?: ReactNode;
  subDescription?: string; // 👈 new optional para
  marginBottom?: number;
}

export default function SectionHeader({
  title,
  highlight,
  trailingText,
  description,
  subDescription,
  marginBottom,
}: SectionHeaderProps) {
  const marginStyle = marginBottom ? { marginBottom: `${marginBottom}rem` } : undefined;

  return (
    <div className={classes.container}
    //   style={{
    //     textAlign: center ? "center" : "left",
    //     maxWidth: "720px",
    //     margin: center ? "0 auto" : "0",
    //   }}
    >
      <h2 className={classes.sectionTitle} style={marginStyle}>
        {title}{" "}
        {highlight && <span className={classes.highlight}>{highlight}</span>}
        {trailingText && <> {trailingText}</>}
      </h2>{
        description && <p className={classes.sectionDescription} style={marginStyle}>{description}</p>
      }
      
       {subDescription && (
        <p className={classes.sectionDescription} style={marginStyle}>
          {subDescription}
        </p>
      )}
    </div>
  );
}
