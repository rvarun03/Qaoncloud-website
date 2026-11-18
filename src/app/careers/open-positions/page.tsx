import type { Metadata } from 'next';
import OpenPositionsPage from '@/components/OpenPositions/OpenPositionsPage';

export const metadata: Metadata = {
  title: 'Open Positions | QAonCloud',
  description: 'Explore current career opportunities at QAonCloud.',
  alternates: {
    canonical: '/careers/open-positions',
  },
};

export default function Page() {
  return <OpenPositionsPage />;
}
