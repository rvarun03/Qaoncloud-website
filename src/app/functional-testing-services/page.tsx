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
import StepSection from '@/components/Services/StepsSection'
import WhatYouGetSection from '@/components/Services/WhatYouGetSection'

const pageTitle = "Functional Testing Services | QAonCloud";
const pageDescription =
  "QAonCloud's functional testing catches what manual QA misses. AI-powered test intelligence. Fewer escaped defects. Measurable outcomes.";
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
  title: "Your features work in a demo. Do they work  ",
  highlight: "in production?",
  description: (
    <>
      You built the feature. It passed the code review. It looked great in staging. Then a user hit an edge case no one thought 
      
      of, and your support queue caught fire.
    </>
  ),
  cards: [
    { title: "Coverage is shallow", description: "You’re testing the happy path and calling it done. But real users don’t follow the happy path. They enter unexpected inputs, skip steps, and use your product in ways no one anticipated." },
    { title: "Engineers are testing their own code", description: `The same people who wrote the feature are testing it. That’s like proofreading your own essay — you’ll miss what you expect to see` },
    { title: "Test cases are stale", description: "Requirements changed mid-sprint. Features evolved. But your test cases still reflect what the product looked like three months ago." },
  ],
}

const releaseRegulationsData = {
  title: "Functional testing that covers ",
  highlight: "what actually matters",
  description: `We learn your product, map your critical user flows, and test every feature against what your users actually do. AI handles the volume. Engineers handle the judgment.`,
  cards: [
    { title: "Scope that matches your product, not a template", description: "UI interactions, business logic, data validations, workflows, integrations, and edge cases. Nothing is assumed. Nothing is skipped." },
    { title: "Test design rooted in real user behaviour", description: "We design test cases around real scenarios. Positive paths, negative paths, boundary values, and the weird stuff users do that no one planned for." },
    { title: "Execution that keeps pace with your sprints", description: "AI runs high-volume test cycles across browsers and devices in parallel. Engineers focus on exploratory testing and the calls that algorithms can’t make." },
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
ChartTrendIcon.displayName = "ChartTrendIcon";

const WorkWellData = {
  title: "We work well with",
  highlight: "FinTech teams",
  description: "",
  steps: [
            { icon: Headset, title: '1. Discovery call', description: 'We learn your product, your compliance requirements, and where QA is slowing you down. ' },
            { icon: ScanEye, title: '2. A focused Pilot', description: "We’ll start with a focused 1-month engagement. You’ll know we’re a fit, when you see 40% faster releases. " },
            { icon: ChartTrendIcon, title: '3. Scale together', description: "We’ll grow with your product. More surfaces, more test coverage, more ownership." },
  ]}


export const fintechRows: ComparisonRow[] = [
  {
    alternative: "In-house QA team",
    problem: "Takes months to hire. Still misses bugs because they’re too close to the code.",
    difference: "We’re productive in weeks. Fresh eyes, deep expertise, no blind spots.",
  },
  {
    alternative: "Offshore QA vendors",
    problem: "Junior testers following scripts blindly. They log failures, they don’t explain why it matters.",
    difference: "Senior engineers who understand your product and tell you what’s at risk.",
  },
  {
    alternative: "AI testing tools alone",
    problem: "Great at generating test cases. Terrible at knowing which ones matter.",
    difference: "AI handles volume. Engineers handle judgment. You get both",
  },
  {
    alternative: "Your engineers doing QA",
    problem: "Your most expensive people doing work that isn’t their job. Features don’t ship.",
    difference: "Free your engineers to build. We handle testing with people who do this all day",
  },
];

export default function page() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}>
            <IndustryPageHeader
              tag="Functional Testing Services | QAonCloud"
              title="Every feature works. Every time"
              description={
                <>
                  Your users don’t care how it was built. They care that it works. Our functional testing catches bugs, glitches, and broken flows before anyone outside your team sees them.
                  <span className={classes.brightBadges}>
                    ✅ AI-accelerated     ✅ Expert-driven  ✅ 40% faster.
                  </span>
                </>
                

              }
              imageSrc="/Images/FunctionalTesting/FunctionalTesting-Banner.png"
              imageAlt="FinTech Card"
              secondaryButtonText="See How We Work"
              secondaryButtonHref="/How-we-work"
            />
          </div>
          <ClientSlider heading="Trusted by 60+ global teams" />
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
            
           <StepSection />
            </ContentWrapper>
           <SectionDivider />
          <ContentWrapper>
            <WhatYouGetSection />
          </ContentWrapper>
          <SectionDivider />
           <ContentWrapper>
            <ComparisonTable title="Here’s why " highlight="teams choose us" rows={fintechRows} />
          </ContentWrapper>

          <FAQs
            title="FAQs"
            highlight=""
            faqs={[
              { question: "What types of applications do you test?", answer: "Web apps, mobile apps, SaaS platforms, APIs, and enterprise applications. If it has features and users, we test it." },
              { question: "Do you do both manual and automated functional testing?", answer: "Yes. AI-accelerated automation for repetitive, high-volume scenarios. Manual exploratory testing for edge cases and the things automation can’t catch." },
              { question: "How quickly can you start?", answer: "Most teams are up and running within 2-3 weeks. You’ll see results within the first month." },
              { question: "What tools do you work with?", answer: "We integrate with your existing stack — Jira, TestRail, Zephyr, GitHub, or whatever you use. We adapt to you." },
              { question: 'How does pricing work? ', answer: "Depends on scope — number of features, release frequency, and complexity. Book a discovery call and we’ll give you a real number." },
            ]}
          />
          <ContentWrapper>
            <Banner
              title="Bugs caught before users catch them"
              
              description="Start with a focused pilot and you’ll see the difference in your first release cycle."
              ctaLabel="Talk To An Expert"
              ctaHref="/Contact-us"
              decorativeImage="/Images/Footer/HomePage.png"
            />
          </ContentWrapper>
        </div>
      </div>
    </div>
  )
}
