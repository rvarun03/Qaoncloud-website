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

const pageTitle = " Cross Platform Testing Services | QAonCloud";
const pageDescription =
  "QAonCloud's AI-powered cross platform testing ensures your product works consistently across iOS, Android, web, and desktop. Real devices. Real outcomes. No platform-specific surprises.";
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
    title: 'Map your platform landscape',
    description: 'We learn your product across every platform you support — iOS, Android, web, desktop. Features, user journeys, data flows, and the platform-specific behaviours that differ. AI builds a cross platform risk map. We define success metrics together.',
    icon: Binoculars,
  },
  {
    id: 2,
    label: 'Step 2',
    position: 'right',
    title: 'Build a platform-aware test suite',
    description: 'AI generates test scenarios that validate feature parity, data consistency, and platform-specific behaviour across your supported platforms. Engineers add the scenarios that need domain knowledge — the business-critical flows where platform consistency matters most.',
    icon: FlowIcon,
  },
  {
    id: 3,
    label: 'Step 3',
    position: 'left',
    title: 'Run targeted cross platform tests every release',
    description: 'Each build triggers AI-powered analysis. Changed a feature? AI validates it across all platforms. Updated one platform? AI checks for regressions on the others. Targeted testing on the combinations that matter.',
    icon: Paintbrush,
  },
  {
    id: 4,
    label: 'Step 4',
    position: 'right',
    title: 'Report, track parity, improve',
    description: ` Every cycle delivers reporting — parity gaps, platform-specific defects, device coverage by user impact, and consistency trends. You'll see exactly where platforms diverge and which gaps are closing.`,
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
    alternative: "Each platform team testing their own",
    problem: "iOS team tests iOS. Android team tests Android. Nobody tests parity. Cross-cutting bugs live in production.",
    difference: "We test across platforms. AI validates that features, data, and behaviour are consistent everywhere. One team, full picture.",
  },
  {
    alternative: "Testing on emulators only",
    problem: "Emulators miss device-specific bugs — manufacturer skins, hardware quirks, real-world memory and network conditions.",
    difference: "Real devices, prioritised by your install base. AI targets the device-OS combinations where bugs actually cluster.",
  },
  {
    alternative: "Manual cross platform spot-checks",
    problem: "You'll catch the missing feature. You'll miss the subtle data sync issue, the gesture that doesn't register, the notification that doesn't fire.",
    difference: "AI-powered parity validation catches the inconsistencies manual testing misses — functional, visual, and data-level.",
  },
  {
    alternative: "Your engineers doing cross platform QA",
    problem: "They know one platform deeply. They spot-check the others. Platform-specific bugs escape because nobody has the full picture.",
    difference: "Dedicated cross platform coverage. AI finds the divergences. Engineers investigate the complex ones. Your devs build.",
  },
];

export default function page() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}>
            <IndustryPageHeader
              tag="Cross Platform Testing Services | QAonCloud"
              title="Built for one platform. Works on all of them."
              description={
                <>
                  Your app works on iOS. Does it work on Android? Your web app works on desktop. Does it work on tablet? Cross platform bugs are silent — features that behave differently, data that syncs wrong, gestures that don't respond. Our AI-powered cross platform testing catches the inconsistencies across every platform your users are on.
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
              title="How we test "
              highlight="across platforms"
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
              { question: "What platforms do you test?", answer: "iOS, Android, web, and desktop — native apps, hybrid apps, PWAs, and responsive web apps. If your users are on it, we test it." },
              { question: "What's the difference between cross browser and cross platform testing?", answer: "Cross browser testing validates your web app across different browsers (Chrome, Safari, Firefox, Edge). Cross platform testing validates your product across different platforms entirely — iOS vs Android vs web vs desktop. Different operating systems, different app builds, different user experiences. We do both." },
              { question: "Do you test on real devices or emulators? ", answer: " Real devices, prioritised by your install base. Emulators miss device-specific bugs — manufacturer skins, hardware quirks, real-world performance conditions. We use emulators for initial coverage and real devices for validation." },
              { question: "How do you handle device fragmentation on Android?", answer: "AI analyses your install base and prioritises the device-manufacturer-OS combinations that carry the most user impact. Samsung on Android 13 behaves differently from Xiaomi on Android 14. We test the combinations your users actually use, not a generic device list." },
              { question: 'How do you measure success?', answer: "Platform-specific defect rate, parity gaps closed, cross platform regression catch rate, and device coverage by user impact tier. The metrics that tell you your users are getting the same experience regardless of platform." },
              { question: 'How quickly can you start?', answer: "Most teams are up and running within 2–3 weeks. You'll see platform-specific defects dropping within the first month." },
              { question: 'How does pricing work?', answer: "Based on scope and outcomes — number of platforms, device complexity, feature breadth, and release cadence. Not headcount. Book a discovery call and we'll give you a real number."},
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
