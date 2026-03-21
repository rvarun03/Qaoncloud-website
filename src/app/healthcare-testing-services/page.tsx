import { ContentWrapper } from '@/components/Common/ContentWrapper/ContentWrapper'
import React from 'react'
import classes from "./page.module.css"

import FAQs from '@/components/Industries/FAQS/FAQs'
import { Banner } from '@/components/Common/Banner/Banner'
import { Headset, ScanEye } from 'lucide-react'
import { forwardRef } from 'react'
import ComparisonTable from '@/components/Industries/ComparisonTable/Comparisontable';
import FinTechteamSection from '@/components/Industries/FinTech/FinTechteams/FinTechteamSection'
import { ComparisonRow } from '@/components/Industries/ComparisonTable/Comparisontable';
import ClientSlider from '@/components/Common/Slider/Slider'
import IndustryPageHeader from '@/components/Industries/FinTech/Header/IndustryPageHeader'
import Mistakes from '@/components/Industries/Mistakes/Mistakes'
import ReleaseRegulations from '@/components/Industries/ReleaseRegulations/ReleaseRegulations'
import WorkWell from '@/components/Industries/WorkWell/WorkWell'
import SectionDivider from '@/components/Common/SectionDivider/SectionDivider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QA for HealthTech Teams | QAonCloud',
  description: 'HIPAA-compliant QA for HealthTech teams. Ship 40% faster with synthetic test data, audit-ready documentation, and engineers experienced in EMR, FHIR, and HealthTech compliance.',
}
export const healthcareData = {
  title: "HealthTech teams",
  highlight: "ship faster with QAonCloud",
  featured: {
    logoSrc: "/logos/Akyrian.png",
    logoAlt: "Akyrian",
    logoLink: "https://docsend.com/view/whb97ns2ev3i9erb",
    statHighlight: "30-40% cost optimization",
    statRest: " and efficiency gains",
    quote:
      '"Manual HIPAA/GDPR compliance verification processes, patient data access permission validation across user roles."',
   caseStudyLink: "https://docsend.com/view/whb97ns2ev3i9erb",
    image: "/Images/Healthcare/HealthTech teams ship faster.png",
    imageAlt: "DNA helix HealthTech",
  },
  testimonials: [
    {
      
      quote:
        "QAonCloud team showcased excellent technical skills and attention to detail, achieving thorough testing according to the plan. We appreciate the comprehensive project closure report. Overall, we highly recommend QAonCloud.",
      author: {
        name: "Kavitha Sivashankaran",
        role: "Engineer, Quality and Regulatory Affairs",
         avatar: "/Kavitha Sivashankaran.jpg", 
      },
    },{
      
      quote:
        "I've worked with a variety of both on and offshore staffing partners for QA. QAonCloud has been the premier partner in the space. Onboarding is quick and easy, and the team is highly flexible and they've done a fantastic job quickly learning both the platform and our clients' specific needs.",
      author: {
        name: "",
        role: "Head of Delivery, a US-based HealthTech firm",
         avatar: "/profileHealthcare.jpg",
      },
    },
    
  ],
};
const mistakesData = {
  title: "In HealthTech ",
  highlight: "it isn’t “just a bug” ",
  description: `The stakes are higher. The regulations are stricter. Bugs could threaten patient health. 
But you can't afford to slow down, and your engineers can’t do it all. You're forced to choose between moving fast and staying compliant. `,
  cards: [
    { title: "Test data is a nightmare", description: "You can't test with real patient data. But creating realistic synthetic data that covers edge cases and workflows? That's a project in itself. Most teams either cut corners or test mildly." },
    { title: "Integrations break quietly", description: `Think EMRs, EHRs, hospital systems, insurance APIs. They’re fragile, inconsistently documented, and deeply interconnected. It only takes one bad release to break workflows across an entire health system.` },
    { title: "Regulatory documentation never ends", description: "Think HIPAA. FDA. SOC 2. Audits demand documented test coverage. Every submission needs proof that you tested what you said you tested." },
  ],
}

const releaseRegulationsData = {
  title: "QA that moves ",
  highlight: "fast and stays compliant ",
  description: `Think AI-accelerated QA testing meets engineers with extensive HealthTech expertise. Be it generating synthetic test data, automating regression suites, or parallel execution, our AI handles the volume. Our engineers make the calls on what matters clinically, what tends to break, and what auditors demand. The result? 40% faster releases. HIPAA-compliant test data. Documentation that's ready to go.`,
  cards: [
    { title: "Synthetic test data that’s safe", description: "Our AI generates realistic patient data that covers edge cases without exposing PHI. No more cutting corners because you don't have safe data." },
    { title: "Engineers who know HealthTech, inside out", description: `Our engineers have tested EMR integrations, HL7 feeds, FHIR APIs, and insurance claim workflows. We know where HealthTech software breaks.` },
    { title: "Built-in audit-ready documentation", description: "Every test run is documented. Every coverage gap is visible. When auditors or FDA reviewers ask, you can prove your work. " },
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
  title: "How we work with",
  highlight: "HealthTech teams",
  description: "",
  steps: [
            { icon: Headset, title: '1. Discovery call', description: 'We’ll discuss your product, your compliance requirements, and your biggest QA pain points, in a 30-minute call. No pitch deck, just an honest conversation.' },
            { icon: ScanEye, title: '2. A focused Pilot', description: "We’ll start with a focused 1-month pilot. You'll see the 40% improvement on real work, with compliant processes from day one." },
            { icon: ChartTrendIcon, title: '3. Scale together', description: "We grow with you as your product grows. More surfaces, more integrations, more coverage. Same team that knows your product and your compliance needs." },
  ]}
export const healthcareRows: ComparisonRow[] = [
  {
    alternative: "In-house QA team",
    problem: "It takes 6+ months to hire, train and equip someone who understands HealthTech compliance. Then you have to worry about retaining them, too.",
    difference: "We're productive in weeks, embedding engineers who already know HIPAA, FDA, and HealthTech integrations, into your workflow.",
  },
  {
    alternative: "Offshore QA vendors",
    problem: "Offshore QA often means junior resources who don't understand how to handle PHI or HealthTech workflows. They would need constant hand-holding, and risk compliance.",
    difference: "You get senior engineers who have worked extensively in HealthTech. They know what BAA means, why test data matters, and do what it takes to stay compliant.",
  },
  {
    alternative: "AI testing tools alone",
    problem: "No one to call when an auditor has questions. No judgment on clinical edge cases.",
    difference: "AI handles volume. Humans handle judgment. You can't explain your test coverage to FDA with a dashboard.",
  },
  {
    alternative: "Your engineers doing QA",
    problem: "Your developers aren't HealthTech compliance experts. They need to be building features, not struggling to document test coverage for audits.",
    difference: "Frees up your engineers to do what they do best. We'll handle QA with documentation that satisfies regulators.",
  },
];

export default function page() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}>
            <IndustryPageHeader
              tag="AI-accelerated QA for HealthTech"
              title="HIPAA-compliant by design"
              description="Faster shipping shouldn’t mean risking patient data. With QAonCloud, you can ship 40% faster, 
          without compromising regulatory compliance or cutting corners. We use synthetic data, document coverage, 
          and embed engineers with extensive HealthTech experience."
              imageSrc="/Images/Healthcare/HealthcareHeader.png"
              imageAlt="HealthTech Card"
            />
          </div>
          <ClientSlider heading="Trusted by HealthTech teams across the world" />
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
            
            
            <FinTechteamSection
              title={healthcareData.title}
              highlight={healthcareData.highlight}
              featured={healthcareData.featured}
              testimonials={healthcareData.testimonials}
            />
            
            <ContentWrapper>
               <ComparisonTable title="Here's why" highlight="HealthTech Teams prefer us" rows={healthcareRows} />
            </ContentWrapper>
           
          


          <FAQs
            title="FAQs"
            highlight=""
            faqs={[
             // { question: "How fast can you get started?", answer: "Most teams are up and running within 2-3 weeks. We start with a discovery call to understand your product and compliance requirements, then move into a focused pilot engagement." },
              { question: "How do you handle HIPAA compliance?", answer: "We never use real patient data. Our AI-generated synthetic test data is realistic enough to catch edge cases but contains no traces of PHI. We sign BAAs and follow HIPAA security requirements throughout our process, so compliance is never an issue." },
              { question: "Have you worked with EMR/EHR integrations?", answer: "Yes, we have! We've tested integrations with Epic, Cerner, Allscripts, athenahealth, and custom hospital systems. We've also worked with HL7, FHIR APIs, and insurance claim workflows." },
              { question: "Can you help with FDA documentation?", answer: "Yes. We provide documented test coverage, traceability matrices, and verification records that support FDA submissions. Our built-in documentation is designed to answer the questions reviewers actually ask." },
              // { question: 'What does "40% faster" actually mean?', answer: "Simply put, what usually takes 12 months with traditional QA approaches takes just 7 months with us. We save time by letting our AI handle the repetitive work (test generation, execution, data creation) while our engineers focus on judgment calls and compliance documentation." },
              
            ]}
          />


          <ContentWrapper>
            <Banner
              title="Ship faster with"
              highlight="no compliance anxiety"
              description="Talk to a healthtech QA expert today. We’ll keep it simple - no pitch deck, no six-meeting sales cycle. Just an honest conversation about how we can help with your QA needs."
              ctaLabel="Talk To An Expert"
              ctaHref="/Contact-us"
              linkDescription="Or see"
              linkDescriptionText="How HealthTech companies cut release times by 40%"
              linkDescriptionHref="https://docsend.com/view/whb97ns2ev3i9erb"
              decorativeImage="/Images/Footer/HomePage.png"
            />
          </ContentWrapper>
        </div>
      </div>
    </div>
  )
}