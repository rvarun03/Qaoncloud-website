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
import WhatYouGetSection, { type FunctionalTestingDeliverable } from '@/components/FunctionalTesting/WhatYouGetSection/WhatYouGetSection'
import AiTestingEffectivenessSection, { type AiTestingCapability } from '@/components/FunctionalTesting/AiTestingEffectivenessSection/AiTestingEffectivenessSection'
import CaseStudiesSection from '@/components/FunctionalTesting/CaseStudiesSection/CaseStudiesSection'
import { functionalTestingCaseStudies } from '@/data/functionalTestingCaseStudies'

const pageTitle = "Integration & API Testing Services | QAonCloud";
const pageDescription =
  "QAonCloud's AI-powered integration and API testing catches the failures that happen between systems. Smarter coverage across endpoints, data flows, and third-party dependencies.";
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
    title: 'Map your integration landscape',
    description: 'We learn your architecture — services, APIs, third-party dependencies, data flows, and the integration points that carry the most risk. AI builds a dependency map. We define success metrics together: target integration defect rate, critical paths, coverage thresholds.',
    icon: Binoculars,
  },
  {
    id: 2,
    label: 'Step 2',
    position: 'right',
    title: 'Build an intelligent integration test suite',
    description: 'AI generates test scenarios based on your dependency graph, API contracts, and historical defect data. Engineers review and add domain-specific scenarios — the business-critical chains and edge cases that need product context.',
    icon: FlowIcon,
  },
  {
    id: 3,
    label: 'Step 3',
    position: 'left',
    title: 'Run targeted integration tests every release',
    description: 'Each build triggers AI-powered impact analysis. When a service changes, AI identifies which integrations and downstream flows are affected. Only the relevant test scenarios run — targeted coverage, no wasted cycles.',
    icon: Paintbrush,
  },
  {
    id: 4,
    label: 'Step 4',
    position: 'right',
    title: 'Monitor, report, improve',
    description: ` Continuous API monitoring between releases. Detailed reporting every cycle — contract violations, integration failures, third-party anomalies, and coverage trends. Each cycle makes the AI smarter about where your integrations are most likely to fail.`,
    icon: FileChartColumn,
  },
]

const functionalTestingDeliverables: FunctionalTestingDeliverable[] = [
  {
    title: 'Cross platform test suite',
    description: 'AI-generated scenarios covering feature parity, data sync, platform-specific behaviour, and device-OS combinations. Weighted by your actual install base.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/TestCases.png',
    tone: 'dark',
  },
  {
    title: 'Platform parity reports',
    description: 'Feature-by-feature comparison across platforms. Where behaviour is consistent. Where it diverges. Prioritised by user impact.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/BugReports_Matched.png',
    tone: 'dark',
  },
  {
    title: 'Cross platform bug reports ',
    description: 'Exact platform, device, OS version, reproduction steps, and root cause. Your team can fix without spending hours reproducing.',
    tone: 'blue',
  },
  {
    title: 'Outcome dashboards ',
    description: 'Platform-specific defect rate, parity gaps by feature, cross platform regression trends, and device coverage by user impact tier.',
    tone: 'blue',
  },
];

const aiTestingCapabilities: AiTestingCapability[] = [
  {
    number: '01',
    title: 'Build your test matrix from real data',
    description: 'We analyse your user analytics — traffic by browser, device, OS, and screen size. AI builds a prioritised test matrix weighted by your actual user base. No generic lab. A matrix built for your product.',
  },
  {
    number: '02',
    title: 'Identify high-risk pages and components',
    description: 'AI analyses your frontend — CSS features, layout patterns, interactive elements, responsive breakpoints — and flags the pages and components most likely to render inconsistently across browsers. These get deeper coverage.',
  },
  {
    number: '03',
    title: 'Run AI-powered cross browser validation',
    description: 'Visual and functional tests run across your prioritised matrix every release. AI compares rendering, detects anomalies, and flags cross browser inconsistencies. Engineers validate the complex cases and investigate browser-specific behaviour issues.',
  },
  {
    number: '04',
    title: 'Report, prioritise, improve',
    description: "Every cycle delivers reporting — which browsers have issues, which pages are affected, severity by user impact. Coverage trends track improvements over time. The matrix evolves as your traffic patterns change.",
  },
];


const fintechRows: ComparisonRow[] = [
  {
    alternative: "Testing APIs in isolation",
    problem: "Individual endpoints pass. Integrations fail. You're testing the pieces, not how they work together.",
    difference: "AI maps dependencies and tests the full interaction chain. We catch the failures that happen between systems.",
  },
  {
    alternative: "Manual integration testing",
    problem: "Too slow to keep up with microservices and frequent releases. Engineers build Postman collections that go stale in a week.",
    difference: "AI-generated scenarios that evolve with your architecture. No stale collections. No manual maintenance.",
  },
  {
    alternative: "Contract testing tools alone",
    problem: "Catches schema mismatches but misses behavioural failures — timeouts, race conditions, data corruption across services.",
    difference: "Contract validation plus AI-powered scenario testing and anomaly detection. Schema and behaviour, not just schema.",
  },
  {
    alternative: "Your engineers doing integration QA",
    problem: "They wrote the services. They'll miss the assumptions baked into the integration. And they should be building, not testing.",
    difference: "Fresh eyes backed by AI. We find the integration gaps your team can't see — and prove it in your defect metrics.",
  },
];

export default function page() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}>
            <IndustryPageHeader
              tag="Integration & API Testing Services | QAonCloud"
              title="Your features work alone. Do they work together?"
              description={
                <>
                  Most bugs don't live inside a single module. They live in the gaps — where your frontend talks to your backend, your backend talks to a payment gateway, and a third-party API changes its response format without telling you. Our AI-powered integration and API testing finds the failures that happen between systems, before your users do.
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
              title="How we test your "
              highlight="integrations and APIs"
              steps={functionalTestingSteps}
            />
            </ContentWrapper>
           <SectionDivider />
          <ContentWrapper>
            <WhatYouGetSection deliverables={functionalTestingDeliverables} />
          </ContentWrapper>
          <SectionDivider />
          <ContentWrapper>
            <AiTestingEffectivenessSection capabilities={aiTestingCapabilities} />
          </ContentWrapper>
          <SectionDivider />
           <ContentWrapper>
            <ComparisonTable title="Here’s why " highlight="teams choose us" rows={fintechRows} />
          </ContentWrapper>
          <SectionDivider />
          <ContentWrapper>
            <CaseStudiesSection
              heading="Real outcomes."
              highlightedHeading="Real teams."
              caseStudies={functionalTestingCaseStudies}
            />
          </ContentWrapper>
          <FAQs
            title="FAQs"
            highlight=""
            faqs={[
              { question: "What's the difference between API testing and integration testing?", answer: "API testing validates individual endpoints — request, response, status codes. Integration testing validates how those APIs work together — data flowing between services, contract compatibility, failure handling across system boundaries. We do both." },
              { question: "Do you test third-party integrations?", answer: "Yes. Payment gateways, identity providers, CRMs, notification services — if your product depends on it, we test and monitor it. AI baselines their behaviour and flags changes before they break your flows." },
              { question: "Can you work with our existing API tests? ", answer: " Absolutely. We assess what you have, fill the gaps, and layer AI-driven scenario generation and monitoring on top. We build on what's working, not throw it out." },
              { question: "How do you handle microservices architectures?", answer: "AI maps the dependency graph across your services and identifies the highest-risk integration points. Test scenarios cover the full interaction chains — not just individual service endpoints. Each deployment triggers targeted tests for the services affected by the change." },
              { question: 'How do you measure success?', answer: " Integration defect rate, API failures caught pre-release, contract violations detected, third-party incidents prevented. The metrics that tell you your systems actually work together — not just that individual endpoints return 200." },
              { question: 'How quickly can you start?', answer: "Most teams are up and running within 2–3 weeks. You'll see measurable improvement in integration defect rates within the first month." },
              { question: 'How does pricing work?', answer: "Based on scope and outcomes — number of services, integration complexity, third-party dependencies, release cadence. Not headcount. Book a discovery call and we'll give you a real number."},
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
          <SectionDivider />
          
        </div>
      </div>
    </div>
  )
}
