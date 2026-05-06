import type { Metadata } from "next";
import { Raleway, Poppins, Inter } from 'next/font/google';
import "./globals.css";
import ClientLayout from './ClientLayout';
import Footer from "@/components/Common/Footer/Footer";
import Script from 'next/script';
import BackToTop from "@/components/Common/BackToTop/BackToTop";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '400', '500', '700'],
  variable: '--font-raleway',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "QAonCloud - Quality Assurance Solutions",
  description: "Delivering exceptional QA services with a focus on quality and innovation",
  // From doc
  robots: "index, follow",

  authors: [
    { name: "QAonCloud" }
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "QAonCloud",
    // Ignored as per requirement
    // title: "{{page_title}} | QAonCloud",
    // description: "{{page_description}}",
    images: ["/og-image.png"],
  },

  twitter: {
    card: "summary_large_image",
    // Ignored as per requirement
    // title: "{{page_title}} | QAonCloud",
    // description: "{{page_description}}",
  },

  icons: {
    icon: [
    { url: "/16.png", sizes: "16x16", type: "image/png" },
    { url: "/32.png", sizes: "32x32", type: "image/png" },
    { url: "/48.png", sizes: "48x48", type: "image/png" },
  ],
    shortcut: "/favicon.ico",
    
  },

  // REQUIRED for canonical to work (not extra, needed)
  metadataBase: new URL("https://www.qaoncloud.com"),

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${poppins.variable} ${inter.variable}`}>
    <head>
      <meta property="og:image" content="/og-image.png" />
        {/* Google Tag Manager Script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-NDPPV2T'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NDPPV2T');
          `}
        </Script>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDPPV2T"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          />
        </noscript>    
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
