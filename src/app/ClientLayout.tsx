'use client';

import dynamic from 'next/dynamic';

// Import Navbar with SSR disabled to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div>
        {children}
      </div>
    </>
  );
}
