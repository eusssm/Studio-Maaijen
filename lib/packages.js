/* Standaard WaaS-pakketten (Website-as-a-Service). Alle bedragen zijn excl. btw. */
export const DEFAULT_PACKAGES = [
  {
    id: 'pkg-waas-1',
    slug: 'landingspagina',
    name: 'Landingspagina',
    sublabel: 'One-pager',
    tagline: 'Snel online met één gerichte pagina die direct aanvragen oplevert.',
    monthlyPrice: 80,
    buildMonths: 12,
    afterMonth: 13,
    maintenancePrice: 30,
    priceLabel: '€ 80 / mnd',
    duration: '1–2 weken',
    isFeatured: false,
    positionOrder: 1,
    features: [
      { feature: '1 overzichtelijke pagina met maximaal 5 inhoudelijke secties' },
      { feature: 'Ingericht rond één hoofddoel: bellen, mailen of offerte aanvragen' },
      { feature: 'Basis Google-vindbaarheid op jouw bedrijfsnaam en vestigingsplaats' },
      { feature: 'Zonder los beheersysteem (CMS); kleine wijzigingen voert Studio Maaijen door' },
      { feature: 'Snelle mobiele weergave, contactformulier en SSL op eigen domein' },
    ],
  },
  {
    id: 'pkg-waas-2',
    slug: 'gewone-website',
    name: 'Gewone website',
    sublabel: "Meerdere pagina's",
    tagline: "Complete website met aparte dienstpagina's die je zelf kunt bijhouden.",
    monthlyPrice: 80,
    buildMonths: 18,
    afterMonth: 19,
    maintenancePrice: 30,
    priceLabel: '€ 80 / mnd',
    duration: '2–4 weken',
    isFeatured: true,
    positionOrder: 2,
    features: [
      { feature: "Tot 6 aparte pagina's voor je diensten, afgeronde projecten en contact" },
      { feature: "Zelf teksten, foto's en nieuwe klussen aanpassen in een overzichtelijk CMS" },
      { feature: 'Lokale SEO per dienst en werkgebied zodat regionale klanten je vinden in Google' },
      { feature: "Duidelijke opbouw met klantreviews, projectfoto's en laagdrempelige offerte-aanvraag" },
      { feature: 'Bezoekersstatistieken, SSL op eigen domein en persoonlijke uitleg bij livegang' },
    ],
  },
];

export const WAAS_ADDON = {
  id: 'slimme-uitbreiding',
  slug: 'slimme-uitbreiding',
  name: 'Slimme uitbreiding',
  monthlyPrice: 40,
  priceLabel: '+ € 40 / mnd excl. btw',
  kicker: 'Optionele uitbreiding · + € 40 / mnd excl. btw',
  description:
    'Voeg een directe WhatsApp-functie, slimme aanvraagwizard of AI-chatbot toe aan je website. Je kunt deze optie nu alvast aanzetten of later op elk gewenst moment bijschakelen.',
  toggleOffLabel: 'Slimme uitbreiding toevoegen (+ € 40 / mnd)',
  toggleOnLabel: 'Slimme uitbreiding actief (+ € 40 / mnd excl. btw)',
  contactInterestLabel: 'Slimme uitbreiding (+ € 40/mnd)',
};

export const DEFAULT_MAINTENANCE_PRICE = '€ 30 / mnd excl. btw';

export const DEFAULT_MAINTENANCE_FEATURES = [
  'Snelle hosting, SSL-certificaat en technisch domeinbeheer inbegrepen',
  'Dagelijkse automatische back-ups en doorlopende beveiligingsupdates',
  'Continue controle op laadsnelheid en directe actie bij technische storingen',
  'Kleine tekst- of fotowijzigingen vlot door Studio Maaijen doorgevoerd',
];

function findWaasTemplate(pkg, idx) {
  const name = String(pkg?.name || '').toLowerCase();
  const slug = String(pkg?.slug || '').toLowerCase();
  if (slug.includes('landingspagina') || name.includes('landingspagina')) {
    return DEFAULT_PACKAGES[0];
  }
  if (slug.includes('gewone') || name.includes('gewone')) {
    return DEFAULT_PACKAGES[1];
  }
  return DEFAULT_PACKAGES[idx] || DEFAULT_PACKAGES[0];
}

function isLegacyPackageList(packages) {
  if (!Array.isArray(packages) || packages.length === 0) return true;
  const hasLegacy = packages.some(pkg => {
    const priceText = String(pkg?.priceLabel || '');
    const nameText = String(pkg?.name || '');
    return (
      /(850|2\.?450|4\.?450)/.test(priceText) ||
      /merk\s*&\s*website\s*totaal/i.test(nameText) ||
      /bedrijfswebsite/i.test(nameText)
    );
  });
  const hasWaas = packages.some(
    pkg =>
      /landingspagina/i.test(String(pkg?.name || '')) &&
      /80/.test(String(pkg?.priceLabel || pkg?.monthlyPrice || ''))
  );
  return hasLegacy || !hasWaas;
}

/* Maakt van CMS- of standaarddata altijd één veilige WaaS-lijst */
export function normalizePackages(packages) {
  const sourceList = isLegacyPackageList(packages)
    ? DEFAULT_PACKAGES
    : packages.filter(pkg => {
        const name = String(pkg?.name || '').toLowerCase();
        return name.includes('landingspagina') || name.includes('gewone');
      });

  const list = sourceList.length > 0 ? sourceList : DEFAULT_PACKAGES;

  return list.slice(0, 2).map((pkg, idx) => {
    const template = findWaasTemplate(pkg, idx);
    const rawFeatures = (pkg.features && pkg.features.length > 0 ? pkg.features : template.features) || [];
    const features = rawFeatures
      .map(f => (typeof f === 'string' ? f : f?.feature || ''))
      .map(f => f.replace(/DatoCMS/gi, 'CMS'))
      .filter(Boolean);

    return {
      id: pkg.id || template.id,
      slug: pkg.slug || template.slug,
      name: pkg.name || template.name,
      sublabel: pkg.sublabel || template.sublabel,
      tagline: pkg.tagline || template.tagline,
      monthlyPrice: Number(pkg.monthlyPrice) || template.monthlyPrice,
      buildMonths: Number(pkg.buildMonths) || template.buildMonths,
      afterMonth: Number(pkg.afterMonth) || template.afterMonth,
      maintenancePrice: Number(pkg.maintenancePrice) || template.maintenancePrice,
      priceLabel: pkg.priceLabel || template.priceLabel,
      duration: pkg.duration || template.duration,
      isFeatured: typeof pkg.isFeatured === 'boolean' ? pkg.isFeatured : template.isFeatured,
      positionOrder: pkg.positionOrder || template.positionOrder,
      num: String(pkg.positionOrder || template.positionOrder || idx + 1).padStart(2, '0'),
      features,
    };
  });
}

/* Voorkomt dat oude € 25-teksten uit DatoCMS op de WaaS-pagina verschijnen */
export function resolveMaintenancePrice(rawPrice) {
  if (!rawPrice) return DEFAULT_MAINTENANCE_PRICE;
  const match = String(rawPrice).match(/\d+/);
  const numeric = match ? parseInt(match[0], 10) : 0;
  if (numeric < 30) return DEFAULT_MAINTENANCE_PRICE;
  const text = String(rawPrice).trim();
  return /excl\.?\s*btw/i.test(text) ? text : `${text} excl. btw`;
}

export function resolveMaintenanceFeatures(rawFeatures) {
  if (!Array.isArray(rawFeatures) || rawFeatures.length === 0) {
    return DEFAULT_MAINTENANCE_FEATURES;
  }
  const items = rawFeatures
    .map(f => (typeof f === 'string' ? f : f?.feature || ''))
    .filter(Boolean);
  if (items.length === 0) return DEFAULT_MAINTENANCE_FEATURES;
  const hasLegacyCopy = items.some(f => /periodieke back-ups|bereikbaarheid/i.test(f));
  return hasLegacyCopy ? DEFAULT_MAINTENANCE_FEATURES : items;
}
