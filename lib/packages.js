/* Standaard pakketten. Worden vervangen door de DatoCMS-data zodra die beschikbaar is. */
export const DEFAULT_PACKAGES = [
  {
    id: 'pkg-1',
    name: 'Landingspagina',
    tagline: 'Snel en professioneel online met één krachtige pagina.',
    priceLabel: '€ 1.250',
    duration: '1–2 weken',
    isFeatured: false,
    positionOrder: 1,
    features: [
      { feature: 'Maatwerk UX/UI ontwerp op basis van jouw merk' },
      { feature: 'Responsive ontwikkeling voor mobiel, tablet en desktop' },
      { feature: 'Inclusief CMS voor tekst- en beeldbeheer' },
      { feature: 'Basis SEO-optimalisatie en snelle laadtijden' },
      { feature: 'Contactformulier en oplevering op eigen domein' },
    ],
  },
  {
    id: 'pkg-2',
    name: 'Bedrijfswebsite',
    tagline: 'Complete website inclusief CMS voor ondernemers en MKB.',
    priceLabel: '€ 2.450',
    duration: '2–4 weken',
    isFeatured: true,
    positionOrder: 2,
    features: [
      { feature: "Tot 6 pagina's op maat ontworpen en gebouwd" },
      { feature: "Volledig beheerbaar via een CMS (pagina's & cases)" },
      { feature: 'Heldere structuur gericht op conversie en aanvragen' },
      { feature: 'Technische SEO, Open Graph & snelheidsoptimalisatie' },
      { feature: 'Sleutelklaar opgeleverd inclusief 1-op-1 CMS uitleg' },
    ],
  },
  {
    id: 'pkg-3',
    name: 'Merk & Website Totaal',
    tagline: 'Nieuwe huisstijl, maatwerk website en video in één traject.',
    priceLabel: 'Op offerte',
    duration: '4–6 weken',
    isFeatured: false,
    positionOrder: 3,
    features: [
      { feature: 'Logo, kleurpalet, typografie en compacte brand guide' },
      { feature: 'Uitgebreide maatwerk website inclusief CMS' },
      { feature: 'Korte merk- of header-video & subtiele motion' },
      { feature: 'Design system in Figma voor consistente uitingen' },
      { feature: 'Persoonlijke begeleiding van concept tot livegang' },
    ],
  },
];

export const DEFAULT_MAINTENANCE_FEATURES = [
  'Hosting, SSL-certificaat en domeinbeheer inbegrepen',
  'Technische updates, beveiliging en periodieke back-ups',
  'Kleine tekst- of beeldwijzigingen snel doorgevoerd',
  'Doorlopende monitoring op snelheid en bereikbaarheid',
];

/* Maakt van CMS- of standaarddata één vorm die de componenten gebruiken */
export function normalizePackages(packages) {
  const list = packages && packages.length > 0 ? packages : DEFAULT_PACKAGES;
  return list.map((pkg, idx) => ({
    id: pkg.id || `pkg-${idx}`,
    name: pkg.name,
    tagline: pkg.tagline,
    priceLabel: pkg.priceLabel,
    duration: pkg.duration,
    isFeatured: !!pkg.isFeatured,
    num: String(pkg.positionOrder || idx + 1).padStart(2, '0'),
    features: (pkg.features || [])
      .map(f => (typeof f === 'string' ? f : f.feature || ''))
      .map(f => f.replace(/DatoCMS/gi, 'CMS'))
      .filter(Boolean),
  }));
}
