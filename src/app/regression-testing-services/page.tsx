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

const pageTitle = "Regression Testing Services | QAonCloud";
const pageDescription =
  "QAonCloud's AI-powered regression testing catches the bugs your updates introduce. Smarter test selection, fewer escaped defects, no release-day surprises.";
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
  title: "You're shipping fixes that create ",
  highlight: "new problems.",
  description: (
    <>
      You pushed a hotfix for checkout. Payments work now. But the discount code flow broke silently, and no one noticed until a customer screenshot landed in your support channel.
    </>
  ),
  cards: [
    { title: "Your regression suite is bloated and blind", description: "You're running hundreds of test cases every release. Half of them test things that haven't changed. The other half miss the features that actually got affected by the new code. Volume without intelligence." },
    { title: "It worked before isn't a test strategy", description: `Your team assumes unchanged code stays unchanged. It doesn't. Dependencies shift, data flows change, side effects ripple. Without AI mapping the actual blast radius of every change, you're hoping — not testing.` },
    { title: "Regression testing slows down releases instead of protecting them", description: "Every release waits for a full regression pass. Most of those tests are irrelevant to the change. The ones that matter get the same priority as everything else. Your test cycle is long, but your confidence is still low." },
  ],
}

const releaseRegulationsData = {
  title: "AI-powered regression testing.",
  highlight: "Test what matters, not everything.",
  description: `We don't run your entire test suite and call it regression. AI analyses every code change to identify exactly which features, flows, and integrations are at risk — then tests those with precision. The result: higher defect catch rates with fewer irrelevant tests.`,
  cards: [
    { title: "AI selects the right tests for every release", description: "Our AI maps the impact of each code change across your application. It identifies affected user flows, dependent modules, and integration points — then selects and prioritises the test cases that actually matter for that specific build. Not a static suite. A targeted one." },
    { title: "Coverage that adapts to your product", description: "Your product isn't the same as it was last quarter. Our regression coverage evolves with it. AI detects new risk areas, retires tests for stable modules, and surfaces untested paths as your application grows. No stale suites. No manual maintenance." },
    { title: "Outcomes, not hours We measure success by what reaches production — or doesn't.", description: "Escaped defect rate, regression defects caught pre-release, mean time to detect regressions. The numbers that tell you whether your releases are actually protected." },
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
    title: 'Map your application and its risk surface',
    description: ' We learn your product — features, dependencies, integrations, data flows, and release patterns. AI maps the full risk surface so every future change can be traced to what it affects.',
    icon: Binoculars,
  },
  {
    id: 2,
    label: 'Step 2',
    position: 'right',
    title: 'Build an intelligent regression suite',
    description: ' AI generates test cases covering critical user flows, integration points, and historically defect-prone areas. Engineers review and add the domain-specific cases that need product knowledge. The suite is weighted by risk from day one.',
    icon: FlowIcon,
  },
  {
    id: 3,
    label: 'Step 3',
    position: 'left',
    title: 'Run targeted regression every release',
    description: `Each build triggers AI-powered impact analysis. The regression suite adapts — selecting, re-prioritising, and running only the tests relevant to that change. Full coverage where it matters, no wasted cycles where it doesn't.`,
    icon: Paintbrush,
  },
  {
    id: 4,
    label: 'Step 4',
    position: 'right',
    title: 'Report, learn, improve',
    description: `Every cycle delivers detailed reporting — what passed, what failed, what's at risk. Defect patterns feed back into the AI. Coverage gaps get flagged. The suite gets smarter with every release.`,
    icon: FileChartColumn,
  },
]

const functionalTestingDeliverables: FunctionalTestingDeliverable[] = [
  {
    title: 'Targeted regression suite',
    description: 'AI-selected, risk-weighted test cases tailored to your product. Traceable to the user flows and integration points they protect.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/TestCases.png',
    tone: 'dark',
  },
  {
    title: 'Regression bug reports',
    description: ' Exact steps to reproduce, screenshots, environment details, and impact assessment. Clear enough for your engineers to fix without a back-and-forth.',
    imageSrc: '/Images/FunctionalTesting/WhatYouGet/BugReports_Matched.png',
    tone: 'dark',
  },
  {
    title: 'Impact analysis reports',
    description: `Every release mapped to the features and flows it affects. You'll know what's at risk before a single test runs.`,
    tone: 'blue',
  },
  {
    title: 'Outcome dashboards',
    description: 'Escaped regression rate, defects caught per cycle, suite health, and coverage trends. The metrics that tell you whether your releases are actually protected — not how many tests ran.',
    tone: 'blue',
  },
];

const aiTestingCapabilities: AiTestingCapability[] = [
  {
    number: '01',
    title: 'Change impact analysis',
    description: `Every commit, every PR — AI traces the ripple effects through your codebase and maps which user flows, modules, and integrations are affected. Tests get selected based on actual risk, not a checklist someone wrote six months ago.`
  },
  {
    number: '02',
    title: 'Risk-weighted test prioritisation',
    description: 'Not all regressions are equal. A broken checkout is worse than a misaligned tooltip. AI ranks test cases by business impact and defect probability, so the highest-risk areas get validated first — every cycle.',
  },
  {
    number: '03',
    title: 'Defect pattern learning',
    description: ' AI learns from every regression bug found — across your product and our client base. Where do regressions cluster? Integration boundaries. Shared state. Data migrations. AI generates targeted tests for these patterns in your product before the bugs show up.',
  },
  {
    number: '04',
    title: 'Smart suite maintenance',
    description: "Test suites decay. Selectors break, flows change, new features go untested. AI identifies broken tests, flags gaps in coverage, and suggests new cases — so your regression suite stays current without manual upkeep.",
  },
];


const fintechRows: ComparisonRow[] = [
  {
    alternative: "Re-running the full suite every release",
    problem: "Slow, expensive, and most tests are irrelevant to the change. You're wasting cycles and still missing regressions.",
    difference: "AI selects only the tests that matter for each build. Higher catch rate, fewer wasted tests.",
  },
  {
    alternative: "In-house regression testing",
    problem: "Same team, same blind spots. Suite maintenance gets deprioritised. Stale tests give false confidence.",
    difference: "Fresh perspective, AI-maintained suite, and engineers who do this all day. No stale tests. No blind spots.",
  },
  {
    alternative: "Record-and-replay tools",
    problem: "They break every time your UI changes. Maintenance eats the time they were supposed to save.",
    difference: "AI handles suite maintenance and adapts tests to product changes. Engineers focus on the regressions that need judgment.",
  },
  {
    alternative: "Your engineers doing regression",
    problem: "Your most expensive people running repetitive tests instead of building features. Regressions still escape.",
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
              tag="Regression Testing Services | QAonCloud"
              title="New code ships. Old features don't break."
              description={
                <>
                  Every release is a risk. New code can quietly break what was already working — and your users will find it before your team does. Our AI-powered regression testing identifies exactly what's at risk with every change and tests it before anything reaches production. No bloated test suites. No guesswork. Just the right tests, every time.
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
              title="How we build and run  "
              highlight="regression testing"
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
              { question: "What's the difference between functional testing and regression testing?", answer: " Functional testing validates that features work correctly. Regression testing makes sure they keep working after new code ships. We do both — often together." },
              { question: "How does AI improve regression testing?", answer: "AI maps the impact of every code change to identify which features and flows are at risk. Instead of re-running everything, it selects and prioritises the tests that matter for that specific release. Smarter selection, higher catch rate, no wasted cycles." },
              { question: "Can you work with our existing test suite? ", answer: "Yes. We'll assess what's working, fix what's broken, fill the gaps, and layer AI-driven test selection on top. We're not here to throw out what you've built." },
              { question: "How do you handle fast release cycles? Daily releases? Weekly?", answer: "We adapt. AI-powered test selection means your regression pass scales with your cadence — not against it." },
              { question: 'How do you measure success? ', answer: "Escaped regression rate, defects caught per cycle, suite health, and coverage against critical flows. The metrics that tell you releases are protected — not how many tests ran." },
              { question: 'How quickly can you start? ', answer: "Most teams are up and running within 2–3 weeks. You'll see measurable improvement in regression defect rates within the first month." },
              { question: 'How does pricing work? ', answer: "Based on scope and outcomes — product complexity, release cadence, number of critical flows. Not headcount. Book a discovery call and we'll give you a real number." },
              
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
