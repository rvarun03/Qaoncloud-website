"use client"
import styles from "./Footer.module.css";
import Link from "next/link";


import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="QAoncloud_logo.png" alt="QAoncloud" className={styles.qaoncloudLogo} />
            </a>
          </div>
          <div className={styles.subtitle}>
            Strategic QA Unit of 
            <a href="https://desicrew.in" target="_blank" rel="noopener noreferrer">
              <img src="/logos/desicrew-logo.png" alt="desicrew" className={styles.desicrewLogo} />
            </a>
          </div>
          <p className={styles.description}>
            Elevating software quality through next-gen testing solutions and
            AI-driven automation.
          </p>

          {/* Social Media Icons */}
          <div className={styles.socialContainer}>
            <a
              href="https://www.linkedin.com/company/qaoncloud/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={styles.btnSocial}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://twitter.com/QAonCloud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className={styles.btnSocial}
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.facebook.com/QAonCloud/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.btnSocial}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/qaoncloud/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.btnSocial}
            >
              <FaInstagram />
            </a>
            {/*<a
              href="https://wa.me/9884292684"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whatsapp"
              className={styles.btnSocial}
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.youtube.com/channel/UChWm_C88uOBgL5WzKy1zVxw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className={styles.btnSocial}
            >
              <FaYoutube />
            </a>*/}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>Company</h4>
            {/* <Link href="/About-us">About</Link> */}
            <Link href="/Contact-us">Contact Us</Link>
            <Link href="/Careers">Careers</Link>
            {/* <Link href="/Blogs">Blogs</Link> */}
          </div>

          <div className={styles.column}>
            <h4>Industries</h4>
            <Link href="/fintech-testing-services">FinTech</Link>
            <Link href="/healthcare-testing-services">HealthTech</Link>
            <Link href="/saas-testing-services">SaaS</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <span> © 2026 QAonCloud. All rights reserved.</span>
        <div className={styles.legal}>
          <Link href="/Privacy-policy">Privacy Policy</Link>
          <Link href="/Terms-of-use">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}