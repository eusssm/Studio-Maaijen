import { buildClient } from '@datocms/cma-client-node';
import { performRequest } from '../../../../lib/datocms';
import { getDaysRemaining } from '../../../lib/preview-presets';
import PreviewPageClient from '../../../components/PreviewPageClient';
import Link from 'next/link';

export const metadata = {
  title: 'Jouw Website Preview | Studio Maaijen',
  description: 'Exclusieve website-preview ontworpen door Studio Maaijen.',
  robots: {
    index: false,
    follow: false,
  },
};

const CASES_AND_PACKAGES_QUERY = `
  query PreviewSupportingQuery {
    allPackages(orderBy: positionOrder_ASC) {
      id
      name
      tagline
      priceLabel
      duration
      isFeatured
      features {
        ... on FeatureItemRecord {
          id
          feature
        }
      }
    }
    allProjects(first: 4, orderBy: position_ASC) {
      id
      title
      slug
      client
      projectType
      introText
      coverImage {
        url
      }
      categories {
        name
      }
    }
    siteSetting {
      maintenancePrice
    }
  }
`;

export default async function PreviewPage({ params }) {
  const { slug } = await params;

  let submission = null;
  let cases = [];
  let packages = [];
  let siteSetting = null;

  // 1. Haal de submission op uit DatoCMS via CMA
  if (process.env.DATOCMS_CMA_TOKEN) {
    try {
      const client = buildClient({ apiToken: process.env.DATOCMS_CMA_TOKEN });
      const items = await client.items.list({
        filter: {
          type: 'preview_submission',
          fields: {
            slug: { eq: slug },
          },
        },
      });
      submission = items[0] || null;
    } catch (err) {
      console.error('Error fetching preview submission from DatoCMS:', err);
    }
  }

  // 2. Haal cases en pakketten op uit DatoCMS
  try {
    const res = await performRequest({ query: CASES_AND_PACKAGES_QUERY });
    cases = res?.data?.allProjects || [];
    packages = res?.data?.allPackages || [];
    siteSetting = res?.data?.siteSetting || null;
  } catch (err) {
    console.error('Error fetching cases/packages for preview:', err);
  }

  // Als er geen submission gevonden is
  if (!submission) {
    return (
      <div style={{ minHeight: '100vh', background: '#0c0a09', color: '#eee8dc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '520px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Preview niet gevonden</h1>
          <p style={{ color: 'rgba(238, 232, 220, 0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
            We konden deze website-preview niet vinden. Mogelijk is de link niet compleet of is de preview verplaatst.
          </p>
          <Link href="/start" style={{ display: 'inline-flex', padding: '14px 24px', background: '#ff4d00', color: '#0c0a09', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}>
            Genereer een nieuwe preview →
          </Link>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(submission.expires_at);

  // Als de preview na 14 dagen verlopen is
  if (daysRemaining <= 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#0c0a09', color: '#eee8dc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '520px', textAlign: 'center' }}>
          <div style={{ fontSize: '44px', marginBottom: '16px' }}>⏳</div>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Deze preview is verlopen</h1>
          <p style={{ color: 'rgba(238, 232, 220, 0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
            De 14-daagse preview-periode voor <strong>{submission.company_name}</strong> is verstreken. Wil je het ontwerp alsnog bekijken of direct doorpakken naar jouw definitieve website? Neem contact op met Eugène!
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-flex', padding: '14px 24px', background: '#ff4d00', color: '#0c0a09', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}>
              Neem contact op met Eugène →
            </Link>
            <Link href="/start" style={{ display: 'inline-flex', padding: '14px 24px', background: 'rgba(255,255,255,0.08)', color: '#eee8dc', borderRadius: '999px', textDecoration: 'none' }}>
              Nieuwe preview maken
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PreviewPageClient
      submission={submission}
      daysRemaining={daysRemaining}
      cases={cases}
      packages={packages}
      siteSetting={siteSetting}
    />
  );
}
