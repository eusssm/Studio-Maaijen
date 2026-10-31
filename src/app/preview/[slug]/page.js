import { Suspense } from 'react';
import { buildClient } from '@datocms/cma-client-node';
import { performRequest } from '../../../../lib/datocms';
import { getDaysRemaining } from '../../../lib/preview-presets';
import PreviewPageClient from '../../../components/PreviewPageClient';

export const metadata = {
  title: 'Jouw Website Preview | Studio Maaijen',
  description: 'Exclusieve website-preview ontworpen door Studio Maaijen.',
  robots: {
    index: false,
    follow: false,
  },
};

const PREVIEW_AND_SUPPORT_QUERY = `
  query PreviewSupportingQuery($slug: String) {
    previewSubmission(filter: { slug: { eq: $slug } }) {
      companyName
      slug
      branch
      services
      vibe
      brandColor
      primaryAction
      name
      email
      phone
      city
      currentWebsite
      source
      leadStatus
      expiresAt
    }
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

function normalizeSubmission(item) {
  if (!item) return null;
  return {
    company_name: item.companyName || item.company_name,
    slug: item.slug,
    branch: item.branch,
    services: item.services,
    vibe: item.vibe,
    brand_color: item.brandColor || item.brand_color,
    primary_action: item.primaryAction || item.primary_action,
    name: item.name,
    email: item.email,
    phone: item.phone,
    city: item.city,
    current_website: item.currentWebsite || item.current_website,
    source: item.source,
    lead_status: item.leadStatus || item.lead_status,
    expires_at: item.expiresAt || item.expires_at,
  };
}

export default async function PreviewPage({ params }) {
  const { slug } = await params;

  let submission = null;
  let cases = [];
  let packages = [];
  let siteSetting = null;

  // 1. Probeer eerst via GraphQL CDA (werkt met NEXT_DATOCMS_API_TOKEN)
  try {
    const res = await performRequest({
      query: PREVIEW_AND_SUPPORT_QUERY,
      variables: { slug },
    });
    cases = res?.data?.allProjects || [];
    packages = res?.data?.allPackages || [];
    siteSetting = res?.data?.siteSetting || null;
    if (res?.data?.previewSubmission) {
      submission = normalizeSubmission(res.data.previewSubmission);
    }
  } catch (err) {
    console.error('Error fetching preview via GraphQL:', err);
  }

  // 2. Fallback via CMA als GraphQL de submission niet vond
  if (!submission && process.env.DATOCMS_CMA_TOKEN) {
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
      if (items[0]) {
        submission = normalizeSubmission(items[0]);
      }
    } catch (err) {
      console.error('Error fetching preview via CMA:', err);
    }
  }

  const daysRemaining = submission ? getDaysRemaining(submission.expires_at) : 14;

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0c0a09' }} />}>
      <PreviewPageClient
        initialSubmission={submission}
        slug={slug}
        daysRemaining={daysRemaining}
        cases={cases}
        packages={packages}
        siteSetting={siteSetting}
      />
    </Suspense>
  );
}
