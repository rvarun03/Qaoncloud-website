'use client';
import { useRouter } from 'next/navigation';
import classes from './PrivacyPolicy.module.css';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../Common/PageHeader/PageHeader';

const sections = [
  {
    id: 'information-collected',
    title: 'Information We Collect',
    intro:
      'QAonCloud has created this Privacy Policy to ensure your online privacy. The following outlines the information we gather and our dissemination practices.',
    items: [
      'Personal Information — name, telephone number, e-mail address, date of birth, home or business, and mailing address may be collected when accessing certain areas of the website or signing registration forms.',
      'Device Information — model name, operating system, unique device identifiers, and mobile network information may be collected when using our services through custom applications. We may also use IP address or MAC Address to record device-event data.',
      'Specialised Information — QAonCloud collects and stores data on local device data using browser web storage and application data caches. We may also gather aggregated data that cannot be used to identify you.',
    ],
  },
  {
    id: 'how-we-collect',
    title: 'How QAonCloud Collects Personal Information',
    items: [
      'QAonCloud may gather information about you, your computer access points, mobile devices, and web browser through various technologies including cookies to customize your site experience.',
      'You do not have to accept our cookies; you can change your browser to block or delete them. Some portions of our Sites may not function properly if cookies are blocked.',
      'Each time you visit our site, QAonCloud may gather extra information such as pages you visit, time spent on each page, and promotions or advertising you click on.',
      'Our Internet service providers may use other conventional web-based technologies to evaluate your movements while visiting our site to determine the efficacy of campaigns and marketing programs.',
      'You can opt to share your personal information with a non-connected third party for purposes other than QAonCloud-related communications, business, or services.',
      'QAonCloud treats sensitive personal data obtained from a person carefully and securely.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'Your Personal Information: How We Use and Disclose It',
    intro:
      'QAonCloud may use your personal information to send you updates about special events, new services, payment confirmations, or other promotions via mail, e-mail, or mobile device. Return e-mail addresses are also used to respond to e-mails we receive from you. Except to comply with US laws, your e-mail address will not be shared with unrelated third parties for direct marketing campaigns.',
    obligationTitle: 'QAonCloud is obligated to disclose your personal information for the following reasons:',
    obligations: [
      'Comply with a subpoena or court order',
      'Cooperate with law enforcement or other government agencies',
      'Establish or exercise our legal rights',
      `Protect our company and employees, contractors, vendors, suppliers, and customers' property or safety`,
      'Defend against legal claims',
      'Assist with internal and external investigations',
      'As otherwise required or permitted by law',
      'Your information may be disclosed as part of any transaction involving the sale or assignment of some or all of our assets',
    ],
  },
  {
    id: 'data-storage',
    title: 'Data Storage and Security',
    items: [
      'QAonCloud makes reasonable attempts to ensure that our Internet service providers have security measures to protect your personal information from unauthorized access and disclosure.',
      'Your personal information is only accessible by authorized workers and Internet service providers that execute legitimate business duties for QAonCloud.',
      'Despite our best efforts, there are inherent security vulnerabilities on the Internet. We urge you to be cautious about handling and disclosing your personal information and any login credentials you use to access our site.',
    ],
  },
  {
    id: 'access-change',
    title: 'How You May Access and Change Your Information',
    items: [
      'You may be offered the chance to subscribe to and receive extra information about our products and services the first time you provide us with registration information through our site.',
      'You can adjust your initial options after your first use by contacting our customer care team.',
      'You can opt out of receiving commercial e-mails from us at the bottom of each commercial e-mail we send you.',
      'In some cases, we may have previously shared your information with third parties before you altered your privacy preferences.',
    ],
  },
  {
    id: 'data-integrity',
    title: 'Data Integrity',
    items: [
      'QAonCloud will only process personal information in compatible ways and relevant to the purposes for which it was obtained or authorised by you.',
      'QAonCloud will take reasonable steps to ensure that personal data is accurate, complete, current, and reliable for its intended use.',
    ],
  },
  {
    id: 'enforcement',
    title: 'Enforcement',
    items: [
      'QAonCloud uses a self-assessment technique and periodically validates that the policy is accurate and complete for the information meant to be covered by our privacy principles.',
      'Anyone with concerns about the use and sharing of personal information can contact us to settle any complaints or disputes in compliance with our standards.',
    ],
  },
  {
    id: 'contact',
    title: 'General Information and Privacy Support Contact',
    items: [
      'This privacy policy may be updated by QAonCloud periodically, and you should review it each time you visit one of our Sites.',
      'QAonCloud is dedicated to safeguarding your personal information. Please get in touch with us if you have any questions or complaints concerning our efforts to protect your privacy or if you require additional information about the QAonCloud privacy policy.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isCompact, setIsCompact] = useState<boolean>(false);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Add compact class to hero
    if (heroRef.current) {
      heroRef.current.classList.add(classes.compact);
      setIsCompact(true);
    }
    
    // Set active section
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${sectionId}`);
  };

  const handleScroll = () => {
    // Only restore original height if we're at the top and compact was set by TOC click
    if (window.scrollY === 0 && isCompact) {
      if (heroRef.current) {
        heroRef.current.classList.remove(classes.compact);
        setIsCompact(false);
      }
      setActiveSection('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCompact]);

  return (
    <div className={classes.page}>

      {/* ── HERO (BlogPage style) ── }
      <section ref={heroRef} className={classes.hero}>
       
        <div className={classes.heroOverlay} />
        <div className={classes.heroContent}>
          <span className={classes.heroLabel}>Legal</span>
          <h1 className={classes.heroTitle}>Privacy Policy</h1>
          <p className={classes.heroSubtitle}>
            QAonCloud is committed to protecting your privacy. Learn how we collect,
            use, and safeguard your personal information.
          </p>
        </div>
      </section> */}

      <PageHeader
        title="Privacy Policy"
        subtitle="QAonCloud is committed to protecting your privacy. Learn how we collect,
            use, and safeguard your personal information"
      />

      {/* ── BODY ── */}
      <div className={classes.body}>
        <div className={classes.bodyInner}>

          {/* Sidebar TOC */}
         <nav className={classes.toc} aria-label="Table of contents">
  <p className={classes.tocTitle}>On this page</p>
  <ul className={classes.tocList}>
    {sections.map((s) => (
      <li key={s.id}>
        
          <a
          href={`#${s.id}`}
          onClick={(e) => handleTocClick(e, s.id)}
          className={activeSection === s.id ? classes.active : ''}
        >
          {s.title}
        </a>
      </li>
    ))}
  </ul>
</nav>

          {/* Sections */}
          <div className={classes.content}>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className={classes.section}>
                <h3 className={classes.sectionTitle}>{s.title}</h3>

                {s.intro && <p className={classes.sectionText}>{s.intro}</p>}

                {s.items && s.items.length > 0 && (
                  <ul className={classes.sectionList}>
                    {s.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {s.obligationTitle && (
                  <>
                    <p className={classes.sectionText} style={{ marginTop: '1rem' }}>
                      {s.obligationTitle}
                    </p>
                    <ul className={classes.obligationList}>
                      {s.obligations?.map((ob, i) => (
                        <li key={i}>{ob}</li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}