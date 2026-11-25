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

const functionalTestingDeliverables: FunctionalTestingDeliverable[] = [
  {
    title: 'Prioritised test matrix',
    description: 'Built from your actual user analytics. Browser-device-OS combinations ranked by traffic volume and risk. Updated as your user base evolves.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/TestCases.png',
    tone: 'dark',
  },
  {
    title: 'Cross browser bug reports',
    description: 'Exact browser, device, OS, and viewport. Screenshots, reproduction steps, and root cause analysis. Your frontend team can fix without guessing.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/BugReports_Matched.png',
    tone: 'dark',
  },
  {
    title: 'Visual comparison reports',
    description: 'Side-by-side rendering across browsers with anomalies flagged. Meaningful differences highlighted, noise filtered out.',
    tone: 'blue',
  },
  {
    title: 'Outcome dashboards ',
    description: 'Cross browser defects caught pre-release, browser-specific escape rate, coverage by traffic tier, and consistency trends. The metrics that tell you your users are getting the same experience regardless of browser.',
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
    alternative: "Manual cross browser spot-checks",
    problem: "You'll catch the obvious breaks. You'll miss the subtle ones. It doesn't scale past three browsers.",
    difference: "AI-powered visual and functional validation across your full prioritised matrix. Catches what eyeballing misses.",
  },
  {
    alternative: "BrowserStack / LambdaTest alone",
    problem: "Great infrastructure. No intelligence about what to test or what matters. You still need someone to design, run, and interpret the tests.",
    difference: "We use the infrastructure. AI decides what to test and where to focus. Engineers investigate the complex cases. You get coverage, not just access to browsers.",
  },
  {
    alternative: "Your frontend team doing cross browser QA",
    problem: "They're debugging CSS instead of building features. They test on their own devices and call it done.",
    difference: "Free your frontend team. We deliver cross browser consistency across the combinations your users actually use — with AI that finds what humans miss.",
  },
  {
    alternative: "Pixel-perfect visual regression tools",
    problem: "Too many false positives. Your team spends more time dismissing noise than fixing real bugs.",
    difference: "Intelligent anomaly detection. AI learns which differences matter and which don't. Fewer false positives. More real catches.",
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
              { question: "Which browsers and devices do you test on?", answer: "The ones your users actually use. We build your test matrix from your analytics data — real traffic, real devices, real browsers. Not a generic list." },
              { question: "Do you do visual testing or functional testing across browsers?", answer: "Both. Visual comparison catches layout and rendering inconsistencies. Functional validation catches the buttons that don't fire, forms that don't submit, and interactions that break on specific browsers. Cross browser bugs aren't just visual." },
              { question: "How does AI improve cross browser testing? ", answer: "AI prioritises which browser-device combinations matter most, identifies CSS and layout features with known compatibility risks, and detects rendering anomalies intelligently — filtering noise and surfacing real bugs. Smarter coverage, not just more screenshots." },
              { question: "Can you test responsive designs?", answer: "Yes. AI maps your responsive breakpoints and tests each one across relevant device-browser combinations. Layout shifts, overflow, touch targets, viewport-specific bugs — all covered." },
              { question: 'How do you handle browser updates?', answer: "Browsers update constantly. AI monitors which versions your users migrate to and adjusts the test matrix automatically. When a new browser version ships, we validate your critical flows against it before your users encounter issues." },
              { question: 'How quickly can you start?', answer: "Most teams are up and running within 2–3 weeks. You'll see cross browser defects dropping within the first sprint." },
              { question: 'How does pricing work?', answer: "Based on scope and outcomes — number of critical pages, complexity of your frontend, and the breadth of your user base's browser distribution. Not headcount. Book a discovery call and we'll give you a real number."},
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
