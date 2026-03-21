import { ContentWrapper } from '@/components/Common/ContentWrapper/ContentWrapper'
import React from 'react'
import classes from "./page.module.css"
import FAQs from '@/components/Industries/FAQS/FAQs'
import { Banner } from '@/components/Common/Banner/Banner'
import ComparisonTable from '@/components/Industries/ComparisonTable/Comparisontable';
import FinTechteamSection from '@/components/Industries/FinTech/FinTechteams/FinTechteamSection'
import { ComparisonRow } from '@/components/Industries/ComparisonTable/Comparisontable';
import ClientSlider from '@/components/Common/Slider/Slider'
import IndustryPageHeader from '@/components/Industries/FinTech/Header/IndustryPageHeader'
import { Headset, ScanEye } from 'lucide-react'
import { forwardRef } from 'react'
import Mistakes from '@/components/Industries/Mistakes/Mistakes'
import ReleaseRegulations from '@/components/Industries/ReleaseRegulations/ReleaseRegulations'
import WorkWell from '@/components/Industries/WorkWell/WorkWell'
import SectionDivider from '@/components/Common/SectionDivider/SectionDivider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QA for SaaS Teams | QAonCloud',
  description: 'AI-accelerated QA for SaaS teams. Ship 40% faster with fewer bugs, faster releases, and QA that keeps up with your deployment schedule.',
}

export const saasData = {
  title: "SaaS teams",
  highlight: "ship faster with confidence",
  featured: {
    logoSrc: "/logos/FORATravel.png",
    logoAlt: "FORATravel",
    logoLink: "https://docsend.com/view/v8jfi9rsm7jmdbs9",
    statHighlight: "Reduction",
    statRest: " of Production bugs",
    quote: '"Comprehensive test planning and QA strategy aligned with the requirements for smooth and faster releases."',
    caseStudyLink: "https://docsend.com/view/v8jfi9rsm7jmdbs9",
    image: "/Images/Saas/Saas teams ship faster.png",
    imageAlt: "Glowing cloud SaaS",
  },
  testimonials: [
    {
       
      quote:
        "We went from zero to 100% test coverage without us investing practically any time. For small teams that can't afford dedicated testers, this synergy is great",
      author: {
        name: "Miguel Romero Karam",
        role: "Cofounder & CTO",
        avatar: "/Miguel Romero Karam.jpg", 
      },
    },
    {
       
      quote:
        "Before QAonCloud, we had no resources to find, execute, and understand how we could get better or worse. QAonCloud helped us define the best testing strategy and the reports were coming in pretty much the next day",
      author: {
        name: "Robert Johnson",
        role: "Principal Software Engineer, AT&T Cybersecurity",
        avatar: "/Robert Johnson.jpg",
      },
    },
  ],
};
const mistakesData = {
  title: "Your QA is slowing you down  ",
  highlight: "more than you think ",
  description: `You built a CI/CD pipeline to help you ship faster. But releases kept piling up for testing. Your engineers had to write test cases when they should’ve been building code. Bugs slipped through. Somehow, somewhere along the way, QA became a bottleneck. Now you’re struggling to choose between shipping fast and shipping safe, while all your competitors are stepping it up.`,
  cards: [
    { title: "QA is the bottleneck", description: "Your engineers are doing their best, turning in code on time. But releases wait days for testing. QA always seems to fall behind and eventually something slips through." },
    { title: "Your engineers are on QA-duty", description: `Let’s face it, you developers didn't sign up to write test scripts. But they spend 20-30% of their time testing, when they should be building features.` },
    { title: "Your customers find bugs before you do", description: "Flaky tests, missed edge cases, or bugs in production, lead to an overall loss of trust. Sounds like a nightmare, doesn’t it? " },
  ],
}

const releaseRegulationsData = {
  title: "AI-accelerated QA that ",
  highlight: "keeps up with your cadence",
 description: `We combine AI-accelerated QA testing with product-savvy engineers who embed into your workflow in no time. The AI handles the volume: test generation, testing across browsers and devices, regression suites that run in parallel. Meanwhile, the engineers handle the strategic decisions, such as what needs testing, what matters, and what's broken. The result? 40% faster releases. Tests that catch real bugs. Engineers who are free to do what they were hired to do.`,
   cards: [
    { title: "QA that keeps up with you", description: "Want to ship daily? We’ll make it happen! We plug into your CI/CD pipeline to facilitate daily deployments. No more releases waiting on testing." },
    { title: "Free your engineers to build", description: `Free up 20-30% of your developers’ time so they can focus on what they do best - writing code. We’ll handle all the testing.` },
    { title: "Catch bugs before customers ", description: "You won’t be discovering new bugs after production. Because our tests actually work. Our coverage catches real issues, it doesn’t just pass." },
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
  highlight: "SaaS teams",
  description: "",
  steps: [
            { icon: Headset, title: '1. Discovery call', description: 'We’ll discuss your product, your compliance requirements, and your biggest QA pain points, in a 30-minute call. No pitch deck, just an honest conversation. ' },
            { icon: ScanEye, title: '2. A focused Pilot', description: "Most teams start with a focused 1-month pilot, depending on the highest-priority surface. You'll soon see your releases are 40% faster, with no added anxiety." },
            { icon: ChartTrendIcon, title: '3. Scale together', description: "We’ll grow with you as your product grows - more surfaces, more test types, more coverage. One thing remains constant, the diligent team that knows your product." },
  ]}

  
export const saasRows: ComparisonRow[] = [
  {
    alternative: "In-house QA team",
    problem: "Takes 6+ months to hire and ramp. You're already behind by the time they're productive.",
    difference: "We're productive in weeks. No recruiting, no ramp time, no retention risk.",
  },
  {
    alternative: "Offshore QA vendors",
    problem: "Junior resources who need constant management. You trade one bottleneck for another.",
    difference: "Senior engineers who learn your product and work autonomously. Less management, not more.",
  },
  {
    alternative: "AI testing tools alone",
    problem: "Great at running tests. Bad at knowing what to test. No one to call when something breaks.",
    difference: "AI handles execution. Humans handle judgment. You get speed and expertise together.",
  },
  {
    alternative: "Your engineers doing QA",
    problem: "Your most expensive people doing work that isn't their specialty. Features don't ship.",
    difference: "Free your engineers to build. We handle QA with people who do this all day.",
  },
];

export default function page() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}>
            <IndustryPageHeader
              tag="AI-accelerated QA for SaaS"
              title="Fewer bugs, faster releases."
              description="40% faster releases. Bugs caught before production. AI-accelerated QA that keeps up with your deployment schedule. 
              Our Saas-literate engineers embed seamlessly into your workflow, 
              without putting a dent in your roadmap."
              imageSrc="/Images/Saas/SaasHeader.png"
              imageAlt="SaaS Header Image"
              />
          </div>
          <ClientSlider heading="Trusted by SaaS teams around the world" />
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

            <FinTechteamSection
              title={saasData.title}
              highlight={saasData.highlight}
              featured={saasData.featured}
              testimonials={saasData.testimonials}
            />

            <ComparisonTable title="Here's why" highlight="SaaS Teams choose us" rows={saasRows} />
          </ContentWrapper>

          <FAQs
            title="FAQs"
            highlight=""
            faqs={[
              { question: "How fast can you ramp up on our product?", answer: "Since we embed industry experts, most of our QA teams are productive within 2-3 weeks. We'll start with your most critical user flows and take it from there. You'll see your releases speed up within a month." },
              { question: "Do you integrate with our CI/CD pipeline?", answer: "Yes, we do. We work with GitHub Actions, GitLab CI, CircleCI, Jenkins, and most major CI tools. Tests run automatically on every push, PR, or deployment." },
              { question: "Can you test across browsers and devices?", answer: "Yes, we can! Our AI runs tests parallelly across Chrome, Firefox, Safari, Edge, and mobile viewports. You get complete cross-browser coverage, and no time penalty." },
              { question: "What if we already have some tests written?", answer: "That's not a problem at all! We'll gladly work with what you have. If your existing tests are solid, we'll build on them. If they could use some work, we'll help you clean them up and fine-tune them." },
              { question: 'What does "40% faster" actually mean?', answer: "Simply put, what usually takes 12 months with traditional QA approaches takes just 7 months with us. We save time by letting our AI handle the repetitive work (test generation, execution, data creation) while our engineers focus on judgment calls and compliance documentation." },
              {
                question: "How does pricing work?",

                answer: (
                  <>
                    We typically work on monthly engagements starting with a focused pilot engagement. Pricing
                    depends entirely on the scope of work and complexity involved.
                    <br />
                    Want to put a real number to our services?{" "}
                    <a href="/Contact-us" style={{ color: "#3093E8", textDecoration: "underline" }}>
                      Book a quick discovery call
                    </a>{" "}
                    with us today.
                  </> 
                ),
              },
            ]}
          />

          <ContentWrapper>
            <Banner
              title="Ready to put"
              highlight="your app to the test?"
              description="Our SaaS QA experts are always up for a quick chat. No pitch deck, no six-meeting sales cycle. Just an honest conversation about how we can speed up your releases and ensure quality"
              ctaLabel="Talk To An Expert"
              ctaHref="/Contact-us"
              linkDescription="Or see"
              linkDescriptionText="How SaaS companies cut release times by 40%"
              linkDescriptionHref="https://docsend.com/view/v8jfi9rsm7jmdbs9"
              decorativeImage="/Images/Footer/HomePage.png"
            />
          </ContentWrapper>
        </div>
      </div>
    </div>
  )
}
