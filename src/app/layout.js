import localFont from "next/font/local";

/* Zelf gehoste lettertypes (SIL OFL), zelfde set als de CV-site */
const instrumentSans = localFont({
  variable: "--ff-d",
  display: "swap",
  src: [
    { path: "../fonts/InstrumentSans-Variable.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/InstrumentSans-Italic-Variable.woff2", weight: "400 700", style: "italic" },
  ],
});

const instrumentSerif = localFont({
  variable: "--ff-serif",
  display: "swap",
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
});

const dmMono = localFont({
  variable: "--ff-mono",
  display: "swap",
  src: [
    { path: "../fonts/DMMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/DMMono-Medium.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata = {
  metadataBase: new URL('https://www.studio-maaijen.nl'),
  openGraph: {
    title: 'Studio Maaijen | UX/UI Design, Merk & Video',
    description: 'Portfolio van Eugène Maaijen, gespecialiseerd in naadloze digitale ervaringen en webdesign.',
    url: 'https://www.studio-maaijen.nl',
    siteName: 'Studio Maaijen',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Maaijen | UX/UI Design, Merk & Video',
  },
  title: { template: '%s | Studio Maaijen', default: 'Studio Maaijen — UX/UI Design, Merk & Video' },
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
    <html lang="nl" className={`${instrumentSans.variable} ${instrumentSerif.variable} ${dmMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
