import Image from 'next/image'
import Link from 'next/link'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  logoHref?: string
  logoSrc?: string
  logoAlt?: string
}

export default function PageHeader({
  title,
  subtitle,
  logoHref = '/',
  logoSrc = '/logos/qaoncloud3dlogo.png',
  logoAlt = 'QAonCloud',
}: PageHeaderProps) {
  return (
    <header className={styles.headerSection}>
  <div className={styles.logoWrapper}>
    <div className={styles.ellipse2017} />
    <div className={styles.ellipse2018} />
    <Link href={logoHref}>
      <Image src={logoSrc} alt={logoAlt} width={220} height={220} priority className={styles.logoImage} />
    </Link>
  </div>
  <div className={styles.textGroup}>
    <h1 className={styles.heroTitle}>{title}</h1>
    {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
  </div>
</header>
  )
}