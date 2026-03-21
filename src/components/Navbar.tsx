'use client';
import Button from "@/components/Common/Button/Button";

import styles from './Navbar.module.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIndustries, setShowIndustries] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setShowIndustries(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 950) {
        setIsOpen(false);
        setShowIndustries(false);
        document.body.classList.remove('menu-open');
      }
    };

    if (isOpen) {
      document.body.classList.add('menu-open');
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('menu-open');
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      setShowIndustries(false);
    }
  };

  const toggleIndustries = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setShowIndustries(!showIndustries);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logoWrapper}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/QAoncloud_logo.png"
                alt="QAonCloud"
                width={150}
                height={40}
                priority
              />
            </Link>
          </div>

          <div className={`${styles.navLinks} ${isOpen ? styles.mobileMenuOpen : ''}`}>
            <div className={styles.navLeft}>
              {/*<Link href="/services" className={styles.navLink} onClick={() => setIsOpen(false)}>
                SERVICES
              </Link>*/}

              <div
                className={styles.industriesDropdown}
                ref={industriesRef}
                onMouseEnter={() => !isMobile && setShowIndustries(true)}
                onMouseLeave={() => !isMobile && setShowIndustries(false)}
              >
                <button
                  className={styles.industriesButton}
                  onClick={toggleIndustries}
                  aria-expanded={showIndustries}
                >
                  INDUSTRIES
                  <span className={styles.chevron}>
                    {showIndustries ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                  </span>
                </button>

                <div className={`${styles.industriesMenu} ${showIndustries ? styles.show : ''}`}>
                  <Link href="/fintech-testing-services" className={styles.industryLink} onClick={() => { setIsOpen(false); setShowIndustries(false); }}>
                    FinTech
                  </Link>
                  <Link href="/healthcare-testing-services" className={styles.industryLink} onClick={() => { setIsOpen(false); setShowIndustries(false); }}>
                    HealthTech
                  </Link>
                  <Link href="/saas-testing-services" className={styles.industryLink} onClick={() => { setIsOpen(false); setShowIndustries(false); }}>
                    SaaS
                  </Link>
                  
                </div>
              </div>
              <Link href="/How-we-work" className={styles.navLink} onClick={() => setIsOpen(false)}>
               HOW WE WORK
              </Link>
              {/* <Link href="/About-us" className={styles.navLink} onClick={() => setIsOpen(false)}>
                ABOUT
              </Link> */}
              
              {/* <Link href="/resources" className={styles.navLink} onClick={() => setIsOpen(false)}>
              RESOURCES
            </Link> */}

            </div>






            <div className={styles.navRight}>
              <div className={styles.continue_btn}>
                <Button href="/Contact-us" variant="heroPrimary" size="content">
                            Talk To An Expert
                          </Button>
              </div>
            </div>
          </div>

          <div className={styles.menuButtonWrapper}>
            <button
              className={styles.menuButton}
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => { setIsOpen(false); setShowIndustries(false); }}
        />
      )}
    </>
  );
};

export default Navbar;