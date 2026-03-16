'use client';
import PageHeader from '../Common/PageHeader/PageHeader';
import classes from './TermsOfUse.module.css';
import { useRef, useState, useEffect } from 'react';

const sections = [
  {
    id: 'electronic-communications',
    title: 'Electronic Communications',
    items: [
      'You agree to receive electronic communications from us.',
      'We may contact you via email, text message, or notices posted on the sites.',
      'You acknowledge that any legal requirement is in writing as satisfied by all agreements, notices, disclosures, and other communications that we provide to you electronically.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    items: [
      `QAonCloud, its divisions, its third-party licensors and others' trademarks, trade dress, logos, and service marks (collectively, the "trademarks") displayed on the sites are registered and unregistered trademarks of QAonCloud.`,
      'Without the authorisation of QAonCloud, you are not entitled to use any of the trademarks displayed on the sites.',
      `You may not utilise any hyper or HTML links, meta tags, or any other "hidden text" utilizing QAonCloud's trademarks.`,
    ],
  },
  {
    id: 'sites-materials',
    title: 'Sites Materials',
    intro:
      `All materials displayed on or contained within the sites, including but not limited to layout, colour schemes, design, text, editorial materials, informational text, photographs, illustrations, artwork, other graphic or digital materials, and names (collectively, the "materials"), are the property of QAonCloud and are protected by copyright, trademark, patent.`,
    items: [
      'You acknowledge and agree that the sites and materials are the property of QAonCloud and that you will not obtain any rights on the materials.',
      'Any reproduction of the content you produce must include all of our copyright and other notices.',
      'You may not reproduce, modify, publish, transmit, display, perform, distribute, disseminate, broadcast, circulate, or otherwise exploit any content on the sites.',
      'You may not participate in the transfer, license, or sale of any content on the sites.',
      'You may not create derivative works of any content on the sites.',
      'All rights not expressly granted are reserved in this document.',
    ],
  },
  {
    id: 'permissible-use',
    title: 'Permissible Use',
    intro: 'You agree not to use the sites for any of the following purposes:',
    items: [
      'To delete, modify, hack, or attempt to change or alter any of the materials on the sites',
      'To solicit others to perform or participate in any unlawful acts',
      'To violate any international, federal, or state regulations, rules, laws, or local ordinances',
      'To infringe or violate our intellectual property rights or the intellectual property rights of others',
      'To harass, abuse, insult, or harm others',
      'To submit false or misleading information',
      'To upload or transmit viruses or any other type of malicious code',
      'To collect or track the personal information of others',
      'To spam, phish, pharm, pretext, spider, crawl, or scrape',
    ],
    outro:
      'If you violate any of the banned uses, we retain the right to discontinue your usage of our sites. We may completely cooperate with any law enforcement agency or authority and any court order that requests or directs the identification of anybody suspected of using the services for criminal reasons.',
  },
  {
    id: 'no-endorsement',
    title: 'No Endorsement of Third-party Sites',
    items: [
      'Third-party websites, resources, and advertisements may be linked to or referenced on the sites. It is entirely your own responsibility to link to such third-party websites.',
      'Under no circumstances will QAonCloud be held liable, directly or indirectly, for any loss, injury, or damage you may suffer as a result of your use of, or reliance on, any content on such third-party sites.',
      'Any issues should be directed to the administrator or webmaster of the third-party site in question.',
    ],
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of Warranties',
    items: [
      'QAonCloud makes every effort to be as precise as possible but makes no representations or warranties as to the accuracy, completeness, reliability, or error-free nature of content on the sites.',
      'QAonCloud is not responsible for any content, advertising, goods, or other materials from third-party sites or resources.',
      `The sites are provided "as is" and "as available" and your use is entirely at your own risk.`,
      'QAonCloud reserves the right, at their sole discretion, to correct any mistakes, omissions, or remove any content at any time without notice.',
      'QAonCloud makes no warranty that the site will be free of viruses, uninterrupted, or error-free.',
    ],
  },
  {
    id: 'cookies',
    title: 'Use of Cookies and Tracking Technology',
    items: [
      'To enable QAonCloud to review visitors and pages, they may use industry practices such as cookies, clear GIFs, web beacons, IP addresses, log files and other tracking technology.',
      'You agree to the use of such web tracking technology and to all legal uses of personal and non-personal information obtained through tracking technology used by QAonCloud and third-party service providers.',
    ],
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    items: [
      'You acknowledge that your use of the sites and any information supplied or received in connection with them may be insecure and intercepted by third parties.',
      'In no event will QAonCloud be liable for any damages arising out of or in any way connected with the use of the sites or for any information, software, or services obtained through the sites.',
      'This waiver covers any damages or injuries caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, or communication-line failure.',
      'QAonCloud is not responsible for any defamatory, offensive, or unlawful activity by any user of the sites.',
    ],
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    items: [
      `You agree to hold QAonCloud harmless from and against any claims, liability, losses, actions, suits, costs, and expenses (including attorneys' fees) arising out of any breach by you of these Terms of Use.`,
      'QAonCloud reserves the right to assume the exclusive defence and control of any issue otherwise subject to your indemnification at its own expense.',
      'QAonCloud has no obligation to repay, defend, indemnify, or hold you blameless for any loss, damage, or liability resulting from these Terms of Use or the sites.',
    ],
  },
  {
    id: 'governance',
    title: 'Site Governance and Severability',
    items: [
      'Please take a look at the other policies on the website. These policies apply to your visit to the sites as well.',
      'If any part of these Terms of Use is unlawful, void, or unenforceable for any reason, that provision shall be deemed severable from the rest of the Terms of Use, and the legality and enforceability of the other sections shall not be affected.',
    ],
  },
];

export default function TermsOfUsePage() {
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

      {/* ── HERO (BlogPage style) ── 
      <section ref={heroRef} className={classes.hero}>
       
        <div className={classes.heroOverlay} />
        <div className={classes.heroContent}>
          <span className={classes.heroLabel}>Legal</span>
          <h1 className={classes.heroTitle}>Terms of Use</h1>
          <p className={classes.heroSubtitle}>
            Please read these terms carefully. Your use of our sites indicates that
            you agree to the terms and conditions stated below.
          </p>
        </div>
      </section>*/}

        <PageHeader
              title="Terms of Use"
              subtitle="Please read these terms carefully. Your use of our sites indicates that you agree to the terms and conditions stated below."
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
                <h2 className={classes.sectionTitle}>{s.title}</h2>
                {s.intro && <p className={classes.sectionText}>{s.intro}</p>}
                {s.items && s.items.length > 0 && (
                  <ul className={classes.sectionList}>
                    {s.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.outro && (
                  <p className={classes.sectionText} style={{ marginTop: '1rem' }}>
                    {s.outro}
                  </p>
                )}
              </section>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}