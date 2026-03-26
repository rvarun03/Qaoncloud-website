import TermsOfUse from '@/components/Policies/TermsOfUse';
import type { Metadata } from 'next'

const pageTitle = 'Terms of Use | QAonCloud';
const pageDescription =
  'Review the QAonCloud Terms of Use governing your access to and use of our services and website.';
const socialTitle = pageTitle.endsWith(' | QAonCloud') ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/Terms-of-use',
    languages: {
      en: '/Terms-of-use',
      'x-default': '/Terms-of-use',
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: '/Terms-of-use',
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
}

export default function TermsOfUsePage() {
  return <TermsOfUse />;
}
