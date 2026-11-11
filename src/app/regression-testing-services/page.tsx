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
import { Binoculars, FileChartColumn, Headset, Paintbrush, ScanEye } from 'lucide-react'
import { forwardRef } from 'react'
import Mistakes from '@/components/Industries/Mistakes/Mistakes'
import IndustryPageHeader from '@/components/Industries/FinTech/Header/IndustryPageHeader'
import SectionDivider from '@/components/Common/SectionDivider/SectionDivider'
import StepSection, { FlowIcon, type ServiceStep } from '@/components/Services/StepsSection'
import WhatYouGetSection, { type ServiceDeliverable } from '@/components/Services/WhatYouGetSection'

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
      You built the feature. It passed code review. It looked great in staging. Then a user hit an edge case no one thought of, and your support queue caught fire.
      
      of, and your support queue caught fire.
    </>
  ),
  cards: [
    { title: "Coverage is shallow", description: "You're testing the happy path and calling it done. Real users don't follow the happy path. They enter unexpected inputs, skip steps, and use your product in ways no one planned for. Without AI analysing where defects actually cluster, you're guessing what to test." },
    { title: "Engineers are testing their own code", description: `That's like proofreading your own essay. They'll miss what they expect to see. And every hour they spend testing is an hour they're not shipping.` },
    { title: "Test cases are stale", description: "Requirements changed mid-sprint. Features evolved. Your test cases still reflect what the product looked like three months ago. Stale tests give you false confidence — and real production bugs." },
  ],
}

const releaseRegulationsData = {
  title: "AI-powered functional testing.  ",
  highlight: "Outcomes, not effort",
  description: `We don't sell you hours or headcount: We commit to outcomes — fewer escaped defects, higher coverage across critical flows, and production stability you can measure.`,
  cards: [
    { title: "AI at the test design layer, not just execution", description: "Most testing tools automate execution — running the same scripts, just faster. We use AI where it actually matters: deciding what to test and why. Our models analyse your application, your defect history, and your code changes to generate test cases targeting the areas most likely to break." },
    { title: "Coverage that's measured, not assumed", description: "We map every critical user flow and track coverage against it. Not lines of code — real user paths. You'll know exactly which flows are tested, where gaps exist, and where bugs are most likely to escape." },
    { title: "Results you can see in your defect metrics", description: "Escaped defect rate. Production bug counts. Coverage percentages. The metrics that actually tell you whether testing is working — not timesheets." },
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

const functionalTestingSteps: ServiceStep[] = [
  {
    id: 1,
    label: 'Step 1',
    position: 'left',
    title: 'Understand your product',
    description: 'We learn your application inside out — features, user roles, business rules, integrations, and the edge cases that keep your team up at night. We define success metrics together: target defect rates, coverage thresholds, the flows that matter most.',
    icon: Binoculars,
  },
  {
    id: 2,
    label: 'Step 2',
    position: 'right',
    title: 'Map critical user flows',
    description: 'Every path a user can take, from onboarding to checkout. Each flow prioritised by business impact and historical defect density. Not guesswork — data.',
    icon: FlowIcon,
  },
  {
    id: 3,
    label: 'Step 3',
    position: 'left',
    title: 'AI-powered test design + engineering review',
    description: 'AI generates risk-weighted test cases across positive paths, negative paths, boundary values, and edge cases. Engineers review, refine, and add the domain-specific scenarios only someone who knows your product would think of.',
    icon: Paintbrush,
  },
  {
    id: 4,
    label: 'Step 4',
    position: 'right',
    title: 'Execute, measure and improve',
    description: 'Tests run against your staging environment every cycle. You get reporting — not just pass/fail, but coverage progress, defect trends, and risk flags. Each cycle feeds back into the AI, making coverage smarter over time.',
    icon: FileChartColumn,
  },
]

const functionalTestingDeliverables: ServiceDeliverable[] = [
  {
    title: 'Test cases',
    description: 'Risk-weighted, AI-generated. IDs, steps, test data, expected vs. actual results, severity classification. Traceable to the user flow it covers.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/TestCases.png',
  },
  {
    title: 'Bug reports',
    description: 'Exact steps to reproduce, screenshots, environment details, impact assessment. No guesswork for your engineering team.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/BugReports_Matched.png',
  },
  {
    title: 'Coverage dashboards',
    description: 'Which critical flows are covered. Where gaps exist. How coverage is trending cycle over cycle.',
    isWide: true,
  },
]


const fintechRows: ComparisonRow[] = [
  {
    alternative: "In-house QA team",
    problem: "Takes months to hire. Still misses bugs because they're too close to the code. No AI layer to find the gaps.",
    difference: "Productive in weeks. AI finds coverage gaps your team can't see. Measurable defect reduction from month one.",
  },
  {
    alternative: "Offshore QA vendors",
    problem: "Junior testers following scripts. They log what failed — they don't tell you what's at risk.",
    difference: "Senior engineers backed by AI. We reduce your escaped defect rate and prove it in your metrics.",
  },
  {
    alternative: "AI testing tools alone",
    problem: "Great at generating test cases. Terrible at knowing which ones matter.",
    difference: "AI handles test intelligence. Engineers handle judgment. You get both.",
  },
  {
    alternative: "Your engineers doing QA",
    problem: "Your most expensive people doing work that isn't their job. Features don't ship. Bugs still escape.",
    difference: "Free your engineers to build. We deliver fewer production bugs and higher coverage — with people and AI built for it.",
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
              title="Every feature works. Every edge case covered"
              description={
                <>
                  Your users don't file bug reports — they leave. Our AI-powered functional testing catches the bugs, glitches, and broken flows that manual QA misses.
                  <span className={classes.brightBadges}>
                    ✅ Not faster testing     ✅ More effective testing  ✅ Measurably fewer bugs in production.
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
            
           <StepSection
              title="How we design and execute "
              highlight="functional tests"
              steps={functionalTestingSteps}
            />
            </ContentWrapper>
           <SectionDivider />
          <ContentWrapper>
            <WhatYouGetSection title="What you get" deliverables={functionalTestingDeliverables} />
          </ContentWrapper>
          <SectionDivider />
           <ContentWrapper>
            <ComparisonTable title="Here’s why " highlight="teams choose us" rows={fintechRows} />
          </ContentWrapper>

          <FAQs
            title="FAQs"
            highlight=""
            faqs={[
              { question: "What types of applications do you test?", answer: "Web apps, mobile apps, SaaS platforms, APIs, enterprise applications. If it has features and users, we test it." },
              { question: "How does AI make testing more effective?", answer: "AI analyses your app structure, defect history, and code changes to generate test cases weighted by risk — not just volume. It finds the gaps manual testing misses, prioritises what's most likely to break, and gets smarter every cycle." },
              { question: "Do you do both manual and automated testing? ", answer: "Yes. AI-powered automation for intelligent test design and high-coverage execution. Manual exploratory testing for edge cases, business logic, and the things that require human judgment." },
              { question: "How do you measure success?", answer: "Escaped defect rate, production bug counts, defect density by module, and coverage against critical user flows. Not timesheets — the metrics that tell you whether testing is actually working." },
              { question: 'How quickly can you start? ', answer: "Most teams are up and running within 2–3 weeks. You'll see measurable improvement in your first month." },
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
