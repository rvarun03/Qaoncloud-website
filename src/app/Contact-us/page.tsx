import ContactUsPage from '@/components/ContactUsPage/ContactUsPage';



const pageTitle = "Get in Touch with QAonCloud QA Experts";
const pageDescription =
  "Contact QAonCloud to discuss your software testing needs. Connect with our QA experts for reliable manual and automated testing services.";
const socialTitle = pageTitle.endsWith(" | QAonCloud") ? pageTitle : `${pageTitle} | QAonCloud`;

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/Contact-us",
    languages: {
      en: "/Contact-us",
      "x-default": "/Contact-us",
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: "/Contact-us",
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
};
export default function ContactPage() {
  return <ContactUsPage />;
}
