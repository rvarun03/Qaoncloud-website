import GreenCards from "@/components/Industries/GreenCardsSection/GreenCards";


import ClientSlider from "@/components/Common/Slider/Slider";
import classes from './page.module.css'
import Testimonials from "@/components/HomePage/TestimonialsSection/Testimonials";
import { Banner } from "@/components/Common/Banner/Banner";
import PartnershipSection from "@/components/HomePage/PartnerTestingSection/PartnershipSection";
import CaseStudiesSection from "@/components/HomePage/CaseStudiesSection/CaseStudies";
import { ContentWrapper } from '@/components/Common/ContentWrapper/ContentWrapper';
import { ProcessSection } from "@/components/Common/DottedCards/ProcessSection";
import QualityAssurance from "@/components/Industries/QualityAssurance/QualityAssurance";
import HeroSection from "@/components/HomePage/HeroSection/HeroSection";
import WhyQAonCloud from "@/components/HomePage/WhyQaoncloud/WhyQAonCloud";
import ServicesSection from "@/components/HomePage/TestingServices/ServicesSection";
import SectionDivider from "@/components/Common/SectionDivider/SectionDivider";
import { Code2, Sparkles, Zap } from "lucide-react";
import QABanner from "@/components/Common/SmallBanner/Banner";




const pageTitle = "Software Testing & Quality Assurance Services | QAonCloud";
const pageDescription =
  "QAonCloud provides AI-accelerated QA software testing services including automation, functional, performance, and security testing to deliver reliable releases faster.";
const socialTitle = pageTitle.endsWith(" | QAonCloud") ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: "/",
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
};
export default function Home() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <HeroSection />
          <div>

          </div>
          <ClientSlider heading="We’ve helped 60+ global teams ship with confidence " />
          <SectionDivider />
          <QualityAssurance
            title="Your engineers aren’t stalling releases."
            highlight="Your QA is."
            description="Your engineers are on QA-duty when they should be building. Your tests take forever. Your “automation” needs hand-holding. And every release is a shot in the dark. "
            subDescription="But it doesn’t have to be this way. With our AI-accelerated, expert-driven QA services, you'll ship quickly, frequently and confidently."
            marginBottom={2}
          />
          <SectionDivider />
          <ContentWrapper>

            <ProcessSection title="How do we deliver"
              highlight="40% faster"
              description=""
              steps={[
                {
                  icon: Sparkles,
                  title: "1. AI handles the grunt work",
                  description: "Be it test case generation, scriptless automation, or synthetic test data, our AI handles high-volume, repetitive work that slows teams down.",
                },
                {
                  icon: Code2,
                  title: "2. Engineers make the calls",
                  description: "Nothing about your product or your users is generic. Our engineers learn your product, understand user behaviour, and make the strategic calls that algorithms can't.",
                },
                {
                  icon: Zap,
                  title: "3. You ship 40% faster",
                  description: "Detailed, weekly reports. Bugs caught before production. Engineers doing what they do best instead of testing.",
                },
              ]} />
          </ContentWrapper>
          <SectionDivider />
          {/* <PartnerSection /> */}
          <ContentWrapper>
            {/* <QAoncloudGuarentee /> */}
            <ServicesSection />

          </ContentWrapper>
          <SectionDivider />
          <ContentWrapper>
            <CaseStudiesSection />
            <QABanner
  ctaHref="/Contact-us"
  decorativeImage="/Images/Footer/HomePage.png"
/>
          </ContentWrapper>
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <ContentWrapper>
            <WhyQAonCloud />
          </ContentWrapper>
          <SectionDivider />
          <ContentWrapper>

            <PartnershipSection />
          </ContentWrapper>
          <SectionDivider />




          <ContentWrapper>
            <Banner
              title="No more glitches,"
              highlight="delays, or compliance anxiety!"
              description="Start with a 3-month pilot and you'll understand why 60+ global teams stick with us. You'll see the 40% difference in no time. "
              //subDescription=""
              ctaLabel=" Talk To An Expert"
              ctaHref="/Contact-us"
              decorativeImage="/Images/Footer/HomePage.png"
            />
          </ContentWrapper>
          

        </div>

      </div>
      {/* <FeatureGrid /> */}

    </div>

  )

}
