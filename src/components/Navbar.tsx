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
  const [showServices, setShowServices] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideIndustries = !industriesRef.current?.contains(event.target as Node);
      const clickedOutsideServices = !servicesRef.current?.contains(event.target as Node);

      if (clickedOutsideIndustries && clickedOutsideServices) {
        setShowIndustries(false);
        setShowServices(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 950) {
        setIsOpen(false);
        setShowIndustries(false);
        setShowServices(false);
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
      setShowServices(false);
    }
  };

  const toggleDropdown = (e: React.MouseEvent, dropdown: 'industries' | 'services') => {
    if (isMobile) {
      e.preventDefault();
      if (dropdown === 'industries') {
        setShowIndustries(!showIndustries);
        setShowServices(false);
      } else {
        setShowServices(!showServices);
        setShowIndustries(false);
      }
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowIndustries(false);
    setShowServices(false);
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
              <div
                className={styles.industriesDropdown}
                ref={servicesRef}
                onMouseEnter={() => !isMobile && setShowServices(true)}
                onMouseLeave={() => !isMobile && setShowServices(false)}
              >
                <button
                  className={styles.industriesButton}
                  onClick={(event) => toggleDropdown(event, 'services')}
                  aria-expanded={showServices}
                >
                  SERVICES
                  <span className={styles.chevron}>
                    {showServices ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                  </span>
                </button>

                <div className={`${styles.industriesMenu} ${showServices ? styles.show : ''}`}>
                  <Link href="/functional-testing-services" className={styles.industryLink} onClick={closeMenu}>
                    Functional Testing
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.navLeft}>
              <div
                className={styles.industriesDropdown}
                ref={industriesRef}
                onMouseEnter={() => !isMobile && setShowIndustries(true)}
                onMouseLeave={() => !isMobile && setShowIndustries(false)}
              >
                <button
                  className={styles.industriesButton}
                  onClick={(event) => toggleDropdown(event, 'industries')}
                  aria-expanded={showIndustries}
                >
                  INDUSTRIES
                  <span className={styles.chevron}>
                    {showIndustries ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                  </span>
                </button>

                <div className={`${styles.industriesMenu} ${showIndustries ? styles.show : ''}`}>
                  <Link href="/fintech-software-testing" className={styles.industryLink} onClick={closeMenu}>
                    FinTech
                  </Link>
                  <Link href="/healthtech-software-testing" className={styles.industryLink} onClick={closeMenu}>
                    HealthTech
                  </Link>
                  <Link href="/saas-software-testing" className={styles.industryLink} onClick={closeMenu}>
                    SaaS
                  </Link>
                  
                </div>
              </div>
              <Link href="/How-we-work" className={styles.navLink} onClick={closeMenu}>
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
                <Button href="/Contact-us" variant="heroPrimary" size="cta">
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
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Navbar;
