import React from 'react';

import ServicePageHeader from '@/components/ServicePage/Header/ServicePageHeader';
import classes from "./page.module.css"
import QualityAssurance from '@/components/ServicePage/QualityAssurance/QualityAssurance';
import QualityTestingServices from '@/components/ServicePage/QualityServices/QualityServices';
import { ContentWrapper } from '@/components/Common/ContentWrapper/ContentWrapper';
import CaseStudiesSection from '@/components/ServicePage/CaseStudiesSection/CaseStudiesSection';
import FeatureLineCard from '@/components/ServicePage/GreenCardsSection/GreenLineCard';
import GreenCards from '@/components/ServicePage/GreenCardsSection/GreenLineCard';
import ServiceEfficiency from '@/components/ServicePage/UnmatchedExpertise/UnmatchedExpertise';
import { SmoothReleases } from '@/components/ServicePage/SmoothReleases/SmoothReleases';
import { Banner } from '@/components/Common/Banner/Banner';
import FAQs from '@/components/ServicePage/FAQS/FAQs';
import type { Metadata, ResolvingMetadata } from 'next';

const routePath = '/services';

const resolveTitle = (title: unknown): string => {
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object') {
    const maybeAbsolute = (title as { absolute?: unknown }).absolute;
    if (typeof maybeAbsolute === 'string') return maybeAbsolute;
    const maybeDefault = (title as { default?: unknown }).default;
    if (typeof maybeDefault === 'string') return maybeDefault;
  }
  return '';
};

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  const pageTitle = resolveTitle(parentMetadata.title);
  const pageDescription = typeof parentMetadata.description === 'string' ? parentMetadata.description : '';
  const socialTitle = pageTitle.endsWith(' | QAonCloud') ? pageTitle : `${pageTitle} | QAonCloud`;

  return {
    alternates: {
      canonical: routePath,
      languages: {
        en: routePath,
        'x-default': routePath,
      },
    },
    openGraph: {
      title: socialTitle,
      description: pageDescription,
      url: routePath,
    },
    twitter: {
      title: socialTitle,
      description: pageDescription,
    },
  };
}

function ServicesPage() {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pageContent}>
          <div className={classes.homeHeroBg}> 
            <ServicePageHeader />
          </div>
          <QualityAssurance />
          <ContentWrapper>
            <ServiceEfficiency />
            <QualityTestingServices />
              <SmoothReleases />
            <CaseStudiesSection />
            <GreenCards />
          
            
          </ContentWrapper>
            <FAQs/>
            <ContentWrapper>
                <Banner
                  title="Ready to put your "
                  highlight="app to the test?"
                  description="We’re fast, thorough, and great at what we do. Let our experts spot bugs and vulnerabilities while you focus on what you do best. "
                  
                  
                  ctaLabel="Talk To An Expert"
                  ctaHref="/Contact-us"
                />
            </ContentWrapper>
            
           
          
        </div>
        
      </div>
    </div>
    
  );
}

export default ServicesPage;
