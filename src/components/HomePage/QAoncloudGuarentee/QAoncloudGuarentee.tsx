import SectionHeader from '@/components/Common/SectionHeader/SectionHeader'
import styles from './QAoncloudGuarentee.module.css'
import React from 'react'
import GuaranteeCard from '../../Common/GradIconCard/GradIconCard'
import {
  FiStar,
  FiUsers,
  FiCheckCircle,
  FiRepeat,
} from "react-icons/fi";
import Button from '@/components/Common/Button/Button';
import { FeatureGrid } from '@/components/Common/FeatureGrid/FeatureGrid';

function QAoncloudGuarentee() {
  return (
    
       <section className={styles.section}>
        <SectionHeader
          title="How do we deliver"
          highlight="2X faster?"
          description="Accelerated by AI, validated by human expertise, our QA testing services are reliable, thorough, and a lot faster than traditional QA. "
        />
        
        {/* <FeatureGrid /> */}
        <FeatureGrid />
          {/* <div className={styles.cardsGrid}>
            <GuaranteeCard
              icon={<FiStar />}
              title="We're built for your stage"
              description="Whether you're a 10-person startup or a 500-person enterprise, we scale our approach to match your reality. No one-size-fits-all frameworks here."
            />

            <GuaranteeCard
              icon={<FiUsers />}
              title="We're built for your stage"
              description="Whether you're a 10-person startup or a 500-person enterprise, we scale our approach to match your reality. No one-size-fits-all frameworks here."
            />

            <GuaranteeCard
              icon={<FiCheckCircle />}
              title="QA is our forte"
              description="We're not a generalist agency that dabbles in QA. Software testing is all we do — and we've spent 12+ years perfecting it across every tech stack."
            />

            <GuaranteeCard
              icon={<FiRepeat />}
              title="We're not a body shop"
              description="We're in it for the long haul. From sprint-by-sprint testing to continuous integration, we grow with your product and your team."
            />
        </div> */}
        <div className={styles.buttonContainer}>
          <Button href="/Contact-us" variant="primary" size="cta">
             Talk To An Expert 
          </Button>
        </div>
      
    </section>
  )
}

export default QAoncloudGuarentee
