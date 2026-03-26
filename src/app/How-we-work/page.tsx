import { ContentWrapper } from '@/components/Common/ContentWrapper/ContentWrapper'
import React from 'react'
import classes from "./page.module.css"
import FAQs from '@/components/Industries/FAQS/FAQs'
import { Banner } from '@/components/Common/Banner/Banner'
import { MilestoneSection } from '@/components/How-we-work/MilestoneSection/MilestoneSection'
import FeatureShowcase from '@/components/How-we-work/FeatureShowcase/FeatureShowcase'
import Header from '@/components/Common/Header/Header'
import PhaseSection from '@/components/How-we-work/PhaseSection/PhaseSection'
import TwoSystems from '@/components/How-we-work/TwoSystems/TwoSystems'
import SectionDivider from '@/components/Common/SectionDivider/SectionDivider'
import type { Metadata } from 'next'
import { TestimonialCard } from '@/components/Common/TestimonialCard/TestimonialCard'

const pageTitle = "How QAonCloud Works | Our QA Approach";
const pageDescription =
  "Explore how QAonCloud provides reliable QA testing services with expert teams, flexible engagement models, and proven processes for faster product releases.";
const socialTitle = pageTitle.endsWith(" | QAonCloud") ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/How-we-work",
    languages: {
      en: "/How-we-work",
      "x-default": "/How-we-work",
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: "/How-we-work",
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
}

export default function page() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}>
            <Header title='How we deliver QA 40% faster'
              description='AI handles the slow, repetitive tasks. Our engineers handle the strategic decisions. You ship 40% faster, more frequently, minus the added anxiety.'
              imageSrc="/Images/How-We-Work/Banner.png"
              imageAlt="How We Work Banner" />
          </div>
          <ContentWrapper>
            <TwoSystems />
          </ContentWrapper>

          <SectionDivider />
          <PhaseSection />
          <SectionDivider />
          <ContentWrapper>
            <FeatureShowcase />
          </ContentWrapper>

          <SectionDivider />
          <ContentWrapper>
            <MilestoneSection />
          </ContentWrapper>

          <FAQs
            title="FAQs"
            highlight=""
            faqs={[
              {
                question: "What's the minimum commitment?",
                answer:
                  "We typically start with a 1-month focused engagement. Long enough to prove value, short enough that you're not locked in if it's not a fit.",
              },
              {
                question: "Do we get dedicated engineers or a rotating pool?",
                answer:
                  "You’ll get dedicated engineers who learn your product and stay with you. So, no explaining context every sprint.",
              },
              {
                question: "What if we need to scale up or down?",
                answer:
                  "We flex with your needs. Launching a big release? We ramp up. Quieter quarter? We scale back. You're not paying for idle capacity.",
              },
              {
                question: "How do you handle sensitive data?",
                answer:
                  " We use synthetic test data by default. For HealthTech clients, we're HIPAA-compliant. For FinTech clients, we follow SOC 2 practices. We work within your security requirements.",
              },
              {
                question: "What if we already have some automation?",
                answer:
                  "That’s okay! We'll assess what's working, integrate with it, and fill the gaps. We're not here to throw out what you've already built.",
              },
            ]}
          />
         <ContentWrapper>
           <TestimonialCard
            quote="We went from zero to 100% test coverage without us investing practically any time. For small teams that can't afford dedicated testers, this synergy is great."
            name="Miguel Romero Karam"
            role="Netzo"
            avatarSrc="/Miguel Romero Karam.jpg"
          />
         </ContentWrapper>
          <ContentWrapper>
            <Banner
              title="See how this"
              highlight="fits your needs"
              description="Let’s get on a 30-minute call to walk through your current set up, discuss possibilities, and see if there’s a fit. "
              ctaLabel="Talk to an Expert"
              ctaHref="/Contact-us"
              linkDescription="Have a few questions?"
              linkDescriptionText="Email us"
              linkDescriptionHref="mailto:contactus@qaoncloud.com"
              linkDescriptionSuffix="and we'll get back to you."
              decorativeImage="/Images/Footer/HomePage.png"
            />
          </ContentWrapper>

        </div>
      </div>

    </div>
  )
}
