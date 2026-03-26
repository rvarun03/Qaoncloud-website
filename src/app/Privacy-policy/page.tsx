import PrivacyPolicy from '@/components/Policies/PrivacyPolicy';
import type { Metadata } from 'next'

const pageTitle = 'Privacy Policy | QAonCloud';
const pageDescription =
  'Read the QAonCloud Privacy Policy to understand how we collect, use, and protect your personal information.';
const socialTitle = pageTitle.endsWith(' | QAonCloud') ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/Privacy-policy',
    languages: {
      en: '/Privacy-policy',
      'x-default': '/Privacy-policy',
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: '/Privacy-policy',
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
