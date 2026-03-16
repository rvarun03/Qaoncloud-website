import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import styles from "./FinTechteamSection.module.css";

/* ---------------- TYPES ---------------- */

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface FeaturedTestimonial {
  logoSrc: string;
  logoAlt: string;
  logoLink?: string;
  statHighlight: string;
  statRest: string;
  quote: string;
  author?: Author;
  caseStudyLink?: string;
  image: string;
  imageAlt: string;
}

interface TestimonialItem {

  quote: string;
  author: Author;
}

interface FinTechteamSectionProps {
  title: string;
  highlight: string;
  featured: FeaturedTestimonial;
  testimonials: TestimonialItem[];
}

/* ---------------- COMPONENT ---------------- */

function FinTechteamSection({
  title,
  highlight,
  featured,
  testimonials,
}: FinTechteamSectionProps) {
  return (
    <section className={styles.section}>

      {/* Heading with ellipse glow behind it */}
      <div className={styles.headingWrap}>
        <div className={styles.ellipse} aria-hidden="true" />
        <SectionHeader title={title} highlight={highlight} />

      </div>

      {/* Featured testimonial */}
      <div className={styles.featured}>
        <div className={styles.featuredContent}>
          <div className={styles.logoWrap}>
            {featured.logoLink ? (
              <a href={featured.logoLink} target="_blank" rel="noopener noreferrer">
                <img src={featured.logoSrc} alt={featured.logoAlt} className={styles.logoImg} />
              </a>
            ) : (
              <img src={featured.logoSrc} alt={featured.logoAlt} className={styles.logoImg} />
            )}
          </div>

          <h3 className={styles.stat}>
            <span className={styles.statHighlight}>{featured.statHighlight}</span>
            {" "}{featured.statRest}
          </h3>

          <blockquote className={styles.quote}>{featured.quote}</blockquote>

          {featured.caseStudyLink ? (
            <a href={featured.caseStudyLink} target="_blank"
              rel="noopener noreferrer" className={styles.caseStudyLink}>
              Read Full Case Study →
            </a>
          ) : featured.author ? (
            <div className={styles.author}>
              <img src={featured.author.avatar} alt={featured.author.name} className={styles.avatar} />
              <div>
                <p className={styles.authorName}>{featured.author.name}</p>
                <p className={styles.authorRole}>{featured.author.role}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.featuredImage}>
          <img src={featured.image} alt={featured.imageAlt} className={styles.heroImg} />
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Testimonials row */}
      <div className={styles.testimonials}>
        {testimonials.map((item, index) => (
          <div key={index} className={styles.testimonialCard}>
           {/*<span className={styles.badge}>{item.label}</span> */}
            <blockquote className={styles.testimonialQuote}>
              {item.quote}
            </blockquote>
            <div className={styles.author}>
              <img src={item.author.avatar} alt={item.author.name} className={styles.avatar} />
              <div>
                <div className={styles.authorName}>{item.author.name}</div>
                <div className={styles.authorRole}>{item.author.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default FinTechteamSection;