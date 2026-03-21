'use client'

import React, { useState } from 'react'
import styles from './CaseStudiesSection.module.css'
import SectionHeader from '@/components/Common/SectionHeader/SectionHeader'
import { useRouter } from "next/navigation"

interface TeamCard {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  link: string
}

const cards: TeamCard[] = [
  {
    id: 'fintech',
    title: 'FinTech',
    description: 'Compliance-ready from day one',
    imageSrc: '/Images/HomePage/CaseStudies/FinTech.png',
    imageAlt: 'FinTech - glowing credit card',
     link: '/fintech-testing-services',
  },
  {
    id: 'healthtech',
    title: 'HealthTech',
    description: 'HIPAA-compliant by design.',
    imageSrc: '/Images/HomePage/CaseStudies/HealthTech.png',
    imageAlt: 'HealthTech - medical capsule visualization',
    link: '/healthcare-testing-services',

  },
  {
    id: 'saas',
    title: 'SaaS',
    description: 'Ship continuously, without breaking things',
    imageSrc: '/Images/HomePage/CaseStudies/Saas.png',
    imageAlt: 'SaaS - data bar chart visualization',
     link: '/saas-testing-services',
  },
]

export const CaseStudies: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string>('healthtech')
  const router = useRouter()

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader title='Built for teams ' highlight='like yours' />

        <div className={styles.grid}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.card} ${activeCard === card.id ? styles.active : ''}`}
              onClick={() => {
                setActiveCard(card.id)
                router.push(card.link)
              }}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={card.imageSrc} 
                  alt={card.imageAlt}
                  className={styles[`img_${card.id}`]}  
                />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies