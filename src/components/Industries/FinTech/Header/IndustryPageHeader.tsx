import { type ReactNode } from "react";
import styles from "./IndustryPageHeader.module.css";
import Image from "next/image";
import Button from "../../../Common/Button/Button";

type IndustryPageHeaderProps = {
  tag: string
  title: string
  description: ReactNode
  imageSrc: string
  imageAlt: string
  buttonText?: string
  buttonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}


const IndustryPageHeader = ({
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText = "Talk To An Expert",
  buttonHref = "/Contact-us",
  secondaryButtonText,
  secondaryButtonHref = "/How-we-work",
}: IndustryPageHeaderProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Floating Image */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageEllipse} />
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={420}
            height={260}
            priority
            className={styles.image}
          />
        </div>

        {/* Tag */}
        <div className={styles.tag}>
          <span className={styles.star}>✦</span>
          {tag}
        </div>

        {/* Heading */}
        <h1 className={styles.title}>{title}</h1>

        {/* Description */}
        <p className={styles.description}>{description}</p>

        <div className={styles.buttons}>
          <Button
            href={buttonHref}
            variant="heroPrimary"
            size="cta"
          >
            {buttonText}
          </Button>
          {secondaryButtonText && (
            <Button
              href={secondaryButtonHref}
              variant="secondary"
              size="cta"
              className={styles.secondaryButton}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>

      </div>
    </section>
  );
};

export default IndustryPageHeader;
