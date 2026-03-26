import CareerPage from '@/components/CareerPage/CareerPage';
import type { Metadata } from 'next';

const pageTitle = 'Career | QAonCloud';
const pageDescription = 'Apply to join the QAonCloud team.';
const socialTitle = pageTitle.endsWith(' | QAonCloud') ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/Careers',
    languages: {
      en: '/Careers',
      'x-default': '/Careers',
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: '/Careers',
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
};

export default function Page() {
  return <CareerPage />;
}
