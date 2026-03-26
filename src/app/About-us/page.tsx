import { Banner } from '@/components/Common/Banner/Banner'
import { ContentWrapper } from '@/components/Common/ContentWrapper/ContentWrapper'
import React from 'react'
import classes from "./page.module.css"
import Image from 'next/image'
import ContentSection from '@/components/About-Us/ContentSection'
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader'
import PageHeader from '@/components/Common/PageHeader/PageHeader'



const pageTitle = "About us – Trusted QA & Software Testing Partner";
const pageDescription =
  "Meet the leadership team and the people behind QAonCloud, a global software testing company delivering reliable QA services to help businesses release high-quality software faster.";
const socialTitle = pageTitle.endsWith(" | QAonCloud") ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/About-us",
    languages: {
      en: "/About-us",
      "x-default": "/About-us",
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: "/About-us",
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
};
const boardMembers = [
  {
    name: 'Rajiv Kuchhal',
    role: 'Chairman of DesiCrew',
    bio: 'Founding member of Infosys BPO, Ex-COO of OnMobile, Investor in Social Enterprises',
    photo: '/Images/AboutUs/RajivKuchhal.png',
    linkedin: 'https://in.linkedin.com/in/rajiv-kuchhal-4557a42',
  },
  {
    name: 'Saloni Malhotra',
    role: 'Founder, DesiCrew',
    bio: 'Aspen Fellow. Ex-PayTM',
    photo: '/Images/AboutUs/Saloni Malhotra.JPG',
    linkedin: 'https://in.linkedin.com/in/salonimalhotra',
  },
  {
    name: 'JK Manivannan',
    role: 'CEO, DesiCrew',
    bio: 'IIM Bangalore and Anna Univ. Emerging Leaders Fellow - City University (New York)',
    photo: '/Images/AboutUs/Manivannan.png',
    linkedin: 'https://in.linkedin.com/in/manijk',
  },
  {
    name: 'Sarath Naru',
    role: 'Board Member',
    bio: 'Managing Partner, Ventureast',
    photo: '/Images/AboutUs/Sarath_Naru.png',
    linkedin: 'https://in.linkedin.com/in/sarathnaru/',
  },
  {
    name: 'Sandip Sen',
    role: 'Board Member',
    bio: 'Ex-Global CEO, Aegis Ltd',
    photo: '/Images/AboutUs/Sandip Sen1.png',
    linkedin: 'https://in.linkedin.com/in/sandipsen',
  },
]

export default function AboutPage() {
  return (
    <div className={classes.pageWrapper}>

      {/* HEADER */}
      <PageHeader
              title="We are QAonCloud"
              subtitle="The preferred AI-accelerated QA partner for teams looking to ship faster, without cutting corners."
            />
      {/* <header className={classes.headerSection}>
        <div className={classes.logoWrapper}>
          <div className={classes.ellipse2017} />
          <div className={classes.ellipse2018} />
          <Image src="/logos/qaoncloud3dlogo.png" alt="QAonCloud" width={220} height={220} priority className={classes.logoImage}/>
        </div>
        <h1 className={classes.heroTitle}>We are QAonCloud</h1>
        <p className={classes.heroSubtitle}>
          The preferred AI-accelerated QA partner for teams looking to ship faster, without cutting corners.
        </p>
      </header> */}

      {/* BUILT BY DESICREW */}
      <ContentSection
        title={<>Keeping releases <span className={classes.sectionHighlight}>bug-free since 2016</span></>}
        imageSrc="/Images/AboutUs/Saloni MalhotraTeam.png"
        imageAlt="Built by Desicrew in 2016"
      >
        <p>
          QAonCloud is a trusted software testing company, formed to solve an issue teams constantly face - frequent delays and buggy releases.
          We’re the strategic QA arm of{" "}
          <a
            href="https://desicrew.in/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffffff", textDecoration: "underline" }}
          >
            DesiCrew
          </a>
          , and we’ve worked with startups and global businesses across industries, combining fast, precise automation with reliable, skilled engineers, having deep domain expertise.
        </p></ContentSection>

      <ContentSection
        title={<>Our approach <span className={classes.sectionHighlight}>is simple</span></>}
        imageSrc="/Images/AboutUs/Our_approach.png"
        imageAlt="QAonCloud team"
        reversed
        altBg
      >
        <p> Our AI handles the repetitive, high-volume work, while our engineers make the strategic calls.
          The result? 40% faster QA. We build strong partnerships, and our clients trust us to deliver,
          again and again.</p>
        <p>We don't look in from the outside. We embed into your workflow, sit in your standups, and take
          ownership, alongside your team. When something's wrong, we'll be the first to tell you, and
          we'll stick with you until it's resolved.</p>
        <p>We're here to help you ship confidently, with every release.</p>
      </ContentSection>

      {/* VISION & MISSION */}
      <section className={classes.visionMissionSection}>
        <div className={classes.cardsWrapper}>

          {/* Vision card */}
          <div className={classes.vmCard}>
            <div className={classes.vmCardText}>
              <h3 className={classes.vmCardLabel}>Our Vision</h3>
              <p className={classes.vmCardDescription}>
                To help you deliver the best customer experience for your applications and empower business
                for every entrepreneur.
              </p>
            </div>
            <Image
              src="/Images/AboutUs/Vision-icon.png"
              alt="Vision"
              width={220}
              height={220}
              className={classes.vmCardIcon}
            />
          </div>

          {/* Mission card */}
          <div className={classes.vmCard}>
            <div className={classes.vmCardText}>
              <h3 className={classes.vmCardLabel}>Our Mission</h3>
              <p className={classes.vmCardDescription}>
                At QAonCloud, we endeavor to bring high tech jobs to rural India, to create job opportunities
                for the rural youth, and also to create a positive impact on their economic status by working
                from their hometown.
              </p>
            </div>
            <Image
              src="/Images/AboutUs/Mission-icon.png"
              alt="Mission"
              width={220}
              height={220}
              className={classes.vmCardIcon}
            />
          </div>

        </div>
      </section>

      {/* BOARD MEMBERS */}
      
      <section className={classes.boardSection}>
        <div className={classes.boardInner}>
          <SectionHeader title='Our' highlight='Board Members' />
          
          <div className={classes.boardGrid}>
            {boardMembers.map((member) => (
              <div key={member.name} className={classes.memberCard}>
                <div className={classes.cardNoise} />
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={400}
                  height={440}
                  className={classes.memberPhoto}
                />
                <div className={classes.memberInfo}>
                  <h4 className={classes.memberRole}>{member.role}</h4>
                  <div className={classes.memberNameRow}>
                    <div className={classes.memberName}>{member.name}</div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.memberLinkedIn}
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <hr className={classes.memberDivider} />
                  <p className={classes.memberBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE & CERTIFICATIONS */}
      <section className={classes.certSection}>
        <div className={classes.certInner}>
          <SectionHeader title='Compliance &amp;' highlight='Certifications' />
          <h2 className={classes.certTitle}>
             <span className={classes.certTitleHighlight}></span>
          </h2>
          <div className={classes.certGrid}>
            {[
              { src: '/Images/AboutUs/image001-scaled.png', alt: 'ASPIRE Certified Gold Leaf Impact' },
              { src: '/Images/AboutUs/21-2.png', alt: 'ISO 27001:2013 Certified' },
              { src: '/Images/AboutUs/22-2.png', alt: 'Great Place To Work Certified' },
              { src: '/Images/AboutUs/23-2.png', alt: 'UN Sustainable Development Goals' },
              { src: '/Images/AboutUs/25-2.png', alt: 'ISO 9001:2015 Certified' },
            ].map((cert, i) => (
              <div key={i} className={classes.certItem}>
                <img src={cert.src} alt={cert.alt} className={classes.certImg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentWrapper>
        <Banner
          title="Want to create experiences users actually come back to?"
          highlight=""
          description=""
          subDescription='30 minutes. No pitch deck. Just a conversation about your setup and whether we can help'
          ctaLabel="Book a 30-Minute Call"
          ctaHref="/Contact-us"
          decorativeImage="/Images/Footer/HomePage.png"
        />
      </ContentWrapper>

    </div>
  )
}
