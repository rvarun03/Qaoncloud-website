import { ContentWrapper } from '@/components/Common/ContentWrapper/ContentWrapper'
import React from 'react'
import classes from "./page.module.css"
import FAQs from '@/components/Industries/FAQS/FAQs'
import { Banner } from '@/components/Common/Banner/Banner'
import ComparisonTable from '@/components/Industries/ComparisonTable/Comparisontable';
import FinTechteamSection from '@/components/Industries/FinTech/FinTechteams/FinTechteamSection'
import { ComparisonRow } from '@/components/Industries/ComparisonTable/Comparisontable';
import ClientSlider from '@/components/Common/Slider/Slider'
import ReleaseRegulations from '@/components/Industries/ReleaseRegulations/ReleaseRegulations'
import WorkWell from '@/components/Industries/WorkWell/WorkWell'
import { Headset, ScanEye } from 'lucide-react'
import { forwardRef } from 'react'
import Mistakes from '@/components/Industries/Mistakes/Mistakes'
import IndustryPageHeader from '@/components/Industries/FinTech/Header/IndustryPageHeader'
import SectionDivider from '@/components/Common/SectionDivider/SectionDivider'



const pageTitle = "FinTech Software Testing Services | QAonCloud";
const pageDescription =
  "QAonCloud provides fintech and banking software testing services including security, compliance, API, and performance testing for reliable financial applications.";
const socialTitle = pageTitle.endsWith(" | QAonCloud") ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/fintech-software-testing",
    languages: {
      en: "/fintech-software-testing",
      "x-default": "/fintech-software-testing",
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: "/fintech-software-testing",
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
};
const finTechData = {
  title: "FinTech teams",
  highlight: "ship faster with QAonCloud",
  featured: {
    logoSrc: "/logos/avanti.png",
    logoAlt: "avanti",
    logoLink: "https://docsend.com/view/gxyqru5wr72twj8p",
    statHighlight: "Reduction",
    statRest: "in the number of production defects",
    quote: '"With domain knowledge and expertise, QA teams, have reduced the bugs and enhanced the app quality by setting up QA processes for a number of test scenarios and features."',
    caseStudyLink: "https://docsend.com/view/gxyqru5wr72twj8p",
    image: "/Images/Fintech/shipfasterimage.png",
    imageAlt: "Glowing crypto coins",
  },
  testimonials: [
   
    {
       
      quote: "QAonCloud team members are flexible and adaptive. The QA testers are collaborative and function effectively with the available data, and can easily adapt to the requirements as and when needed. The team manager maintains high efficiency and productivity among the teams while pushing them to be autonomous and self-sufficient.",
      author: { name: "Ishansh Singh", role: "Product Specialist, Avanti", avatar: "/Images/Fintech/Ishansh_Avanti.png" },
    },
     {
        
      quote:
        "The team is highly flexible, and they've done a fantastic job quickly learning both the platform and our clients' specific needs so we can deliver quality working custom software on time.",
      author: {
        name: "",
        role: "Head of Delivery, a US-based FinTech firm",
         avatar: "/profileFintech.jpg",
      },
    },
  ],
};

const mistakesData = {
  title: "In FinTech, mistakes ",
  highlight: "are costly",
  description: (
    <>
      Because a bug isn't just a mistake. It's a regulatory incident. A glaring headline. An act of non-compliance.
      <br /> 
      That's why most FinTech teams are forced to choose between compliance and speed.
    </>
  ),
  cards: [
    { title: "Compliance is relentless", description: "PCI-DSS, SOC 2, PSD2, state regulations. And they keep changing. Every release needs documented test coverage you can show auditors." },
    { title: "Security isn't optional", description: `You can't ship with "we'll test that later." Vulnerabilities in FinTech get exploited fast, and the consequences aren't just technical.` },
    { title: "Audit prep is a fire drill", description: "When auditors ask for test documentation, scrambling to recreate it is a red flag. You need records that exist before anyone asks." },
  ],
}

const releaseRegulationsData = {
  title: "QA that keeps up with ",
  highlight: "releases and regulations",
  description: `Audit-ready documentation. Engineers who know what PCI-DSS actually requires & AI to handle volume & enhance speed to give you 40% faster releases.`,
  cards: [
    { title: "Compliance built in, not bolted on", description: "Automated compliance reporting and test coverage documentation is audit-ready by default." },
    { title: "Security testing from day one", description: "Security isn’t a final step. It's embedded in every test cycle, every release, every deployment." },
    { title: "Engineers who speak FinTech fluently", description: "Our experts have seen it all - payment processors, neobanks, and trading platforms. Your edge cases won’t break us." },
  ],
}

const ChartTrendIcon = forwardRef<SVGSVGElement, { size?: number; color?: string; className?: string }>(
  ({ size = 35, color = "#FF8641", className = "" }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Vertical bars */}
      <line x1="3"  y1="20" x2="3"  y2="14" />
      <line x1="7"  y1="20" x2="7"  y2="11" />
      <line x1="11" y1="20" x2="11" y2="14" />
      <line x1="15" y1="20" x2="15" y2="9"  />
      {/* Trend line — starts ABOVE bars with a gap */}
      <polyline points="1,12 6,7 10,10 21,2" />
    </svg>
  )
)
const WorkWellData = {
  title: "We work well with",
  highlight: "FinTech teams",
  description: "",
  steps: [
            { icon: Headset, title: '1. Discovery call', description: 'We learn your product, your compliance requirements, and where QA is slowing you down. ' },
            { icon: ScanEye, title: '2. A focused Pilot', description: "We’ll start with a focused 1-month engagement. You’ll know we’re a fit, when you see 40% faster releases. " },
            { icon: ChartTrendIcon, title: '3. Scale together', description: "We’ll grow with your product. More surfaces, more test coverage, more ownership." },
  ]}


const fintechRows: ComparisonRow[] = [
  {
    alternative: "In-house QA team",
    problem: "It takes 6 months to hire and train someone who understands FinTech compliance.",
    difference: "We're productive in weeks with experienced engineers who know regulatory landscape.",
  },
  {
    alternative: "Offshore QA vendors",
    problem: "Offshore QA involves junior resources with negligible regulatory context.",
    difference: "Our senior engineers have deep domain expertise, having worked in FinTech. Regulatory compliance is their forte, and you won't have to babysit them.",
  },
  {
    alternative: "AI testing tools alone",
    problem: "No one to call when an auditor has questions. It requires strategic interventions to determine what actually matters.",
    difference: "AI handles volume. Engineers handle judgment. You can't call an algorithm at 2AM, but you can call us.",
  },
  {
    alternative: "Your engineers doing QA",
    problem: "Puts development on pause, and tires out your team. They're not compliance experts anyway.",
    difference: "Frees up your engineers to build like they were meant to. Compliance is built-in from day one.",
  },
];

export default function page() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}>
            <IndustryPageHeader
              tag="AI-accelerated QA for FinTech"
              title="Compliance-ready and right on the money."
              description={
                <>
                  With QAonCloud, you'll ship 40% faster, with no added anxiety. Our engineers are fluent in FinTech, 
                  so no more cutting corners on security or postponing compliance checks. Just quick, smooth, secure releases.
                  <span className={classes.brightBadges}>
                    ✅ PCI-DSS     ✅ SOC 2   ✅ PSD2
                  </span>
                </>
                

              }
              imageSrc="/Images/Fintech/fintech-banner.png"
              imageAlt="FinTech Card"
            />
          </div>
          <ClientSlider heading="Trusted by global FinTech teams" />
          <SectionDivider />
          <ContentWrapper>
            <Mistakes
              {...mistakesData}
            />
          </ContentWrapper>
          <SectionDivider />
          <ContentWrapper>
            <ReleaseRegulations
              {...releaseRegulationsData}
            />
          </ContentWrapper>
            <SectionDivider />
            <ContentWrapper>  
            <WorkWell
              {...WorkWellData}
              
              
            />
          </ContentWrapper>
          <ContentWrapper>
            
            <FinTechteamSection
              title={finTechData.title}
              highlight={finTechData.highlight}
              featured={finTechData.featured}
              testimonials={finTechData.testimonials}
            />
            <ComparisonTable title="Here's why" highlight="FinTech Teams prefer us" rows={fintechRows} />
          </ContentWrapper>

          <FAQs
            title="FAQs"
            highlight=""
            faqs={[
              { question: "How fast can you get started?", answer: "Most teams are up and running within 2-3 weeks. We start with a discovery call to understand your product and compliance requirements, then move into a focused pilot engagement." },
              { question: "Are you familiar with industry-specific regulations?", answer: "We've worked with PCI-DSS, SOC 2 Type II, PSD2, state money transmitter requirements, GDPR, and more. If there's a regulation we haven't encountered, we'll tell you upfront, and we learn about it fast." },
              { question: "What if we already have some QA in place?", answer: "We don’t expect you to change your processes, we integrate into your way of work. Most clients start by handing us their biggest pain point (compliance testing, regression suites, or a specific product surface) and expand from there." },
              { question: "How do you handle sensitive test data?", answer: "We use synthetic test data generation, so real customer data is never exposed. This keeps your compliance with data privacy regulations in check, removing a major security risk from your testing process." },
              { question: 'How do you manage to deliver 40% faster? ', answer: "We use synthetic test data generation, so real customer data is never exposed. This keeps your compliance with data If traditional QA takes 12 months, we’ll do it in 7. We save a lot of time with our AI handling repetitive work (test generation, execution, data creation), letting our engineers focus on judgment calls and edge cases.privacy regulations in check, removing a major security risk from your testing process." },
              { question: "What about the pricing? ", answer: (
                  <>
                    Pricing varies from one engagement to another, depending on the scope and complexity of the work.
                    <br />
                    The best way to get an accurate quote is to{" "}
                    <a href="/Contact-us" style={{ color: "#3093E8", textDecoration: "underline" }}>
                      book a discovery call
                    </a>{" "}
                    with us.
                  </>
                ),
              },
            ]}
          />
          <ContentWrapper>
            <Banner
              title="Faster, frequent,"
              highlight="bug-free releases"
              description="Talk to an expert & learn how you can speed up your QA process today."
              ctaLabel="Talk To An Expert"
              ctaHref="/Contact-us"
              linkDescription="Or see"
              linkDescriptionText="How FinTech companies cut release times by 40%"
              linkDescriptionHref="https://docsend.com/view/gxyqru5wr72twj8p"
              decorativeImage="/Images/Footer/HomePage.png"
            />
          </ContentWrapper>
        </div>
      </div>
    </div>
  )
}
