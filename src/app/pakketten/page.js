import { performRequest } from '../../../lib/datocms';
import PakkettenClient from '../../components/PakkettenClient';

export const metadata = {
  title: 'Pakketten & tarieven',
  description:
    "Geen duizenden euro's vooraf. Kies een Landingspagina of Gewone website voor € 80 per maand excl. btw, daarna automatisch € 30 per maand voor hosting en onderhoud.",
};

const PAKKETTEN_QUERY = `
  query PakkettenPageQuery {
    homepage {
      ctaEyebrow
      footerTagline
      footerLocation
      footerCopyright
    }
    siteSetting {
      maintenancePrice
      maintenanceFeatures {
        ... on FeatureItemRecord {
          id
          feature
        }
      }
    }
    allPackages(orderBy: positionOrder_ASC) {
      id
      name
      tagline
      priceLabel
      duration
      isFeatured
      positionOrder
      features {
        ... on FeatureItemRecord {
          id
          feature
        }
      }
    }
  }
`;

export default async function PakkettenPage() {
  let packages = [];
  let siteSetting = null;
  let homepage = null;

  try {
    const res = await performRequest({ query: PAKKETTEN_QUERY });
    packages = res?.data?.allPackages || [];
    siteSetting = res?.data?.siteSetting || null;
    homepage = res?.data?.homepage || null;
  } catch (e) {
    console.error('Pakketten page query error:', e);
  }

  return <PakkettenClient packages={packages} siteSetting={siteSetting} homepage={homepage} />;
}
