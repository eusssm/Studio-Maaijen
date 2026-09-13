import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--ff-d",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://www.studio-maaijen.nl'),
  openGraph: {
    title: 'Studio Maaijen | UX/UI Design & Creatie',
    description: 'Portfolio van Eugène Maaijen, gespecialiseerd in naadloze digitale ervaringen en webdesign.',
    url: 'https://www.studio-maaijen.nl',
    siteName: 'Studio Maaijen',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Maaijen | UX/UI Design & Creatie',
  },
  title: { template: '%s | Studio Maaijen', default: 'Eugène Maaijen — UX/UI Designer & Creative' },
  description: "Eugène Maaijen — UX/UI Designer, Video Editor en Brand Creator gebaseerd in Nederland.",
};


export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Studio Maaijen",
  "description": "UX/UI Designer, Video Editor en Brand Creator",
  "url": "https://www.studio-maaijen.nl",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Amsterdam",
    "addressCountry": "NL"
  },
  "founder": {
    "@type": "Person",
    "name": "Eugène Maaijen"
  },
  "sameAs": [
    "https://www.linkedin.com/in/eug%C3%A8ne-maaijen-4b658345/"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={instrumentSans.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
