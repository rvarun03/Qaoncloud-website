import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";


import Button from "../Button/Button";

type IndustryPageHeaderProps = {
  
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  buttonText?: string
  buttonHref?: string
}

const Header = ({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText = "Talk To An Expert",
  buttonHref = "/how-we-work",
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

        {/* Heading */}
        <h1 className={styles.title}>{title}</h1>

        {/* Description */}
        <p className={styles.description}>{description}</p>

        {/* Button */}
        <Button href="/Contact-us" variant="heroPrimary" size="cta">
                            Talk To An Expert
                          </Button>

      </div>
    </section>
  );
};

export default Header;
