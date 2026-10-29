import styles from './HeroSection.module.css';
import NextLink from 'next/link';
import Button from '../../Common/Button/Button';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Background glow image */}
      <div className={styles.glowWrapper}>
        <img
          src="/Images/Banner/HomeBanner.png"
          alt=""
          className={styles.glowImage}
          aria-hidden="true"
        />
      </div>

      <div className={styles.content}>
        {/* Text block */}
        <div className={styles.textBlock}>
          <h1 className={styles.heading}>
            40% faster QA. Accelerated by AI,
            <br className={styles.desktopBreak} />
            driven by experts.
          </h1>
          <p className={styles.subheading}>
            QA software testing services that deliver impeccable quality, 40% faster.
            No chaos, no compromises.
          </p>
          <div className={styles.buttons}>
            <Button href="/Contact-us" variant="heroPrimary" size="cta">
              Talk To An Expert
            </Button>
            <NextLink href="/How-we-work" className={styles.btnSecondary}>
              See How We Work
            </NextLink>
          </div>

          {/* Invisible spacer for positioning */}
          <div className={styles.spacer}></div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <h2 className={styles.statNumber}>40%</h2>
            <p className={styles.statLabel}>faster than in-house teams</p>
          </div>
          <div className={styles.statItem}>
            <h2 className={styles.statNumber}>12+ years</h2>
            <p className={styles.statLabel}>Of QA testing services</p>
          </div>
          <div className={styles.statItem}>
            <h2 className={styles.statNumberOrange}>FinTech, HealthTech &amp; SaaS</h2>
            <p className={styles.statLabel}>Deep domain expertise</p>
          </div>
        </div>
      </div>
    </section>
  );
}
