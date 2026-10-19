import { performRequest } from '../../../lib/datocms';
import ContactClient from '../../components/ContactClient';

export const metadata = {
  title: 'Contact',
  description:
    'Neem contact op met Studio Maaijen voor een nieuwe website inclusief CMS, huisstijl of videoproductie.',
};

const CONTACT_PAGE_QUERY = `
  query ContactPageQuery {
    homepage {
      aboutPortrait {
        url
      }
      ctaEmail
      ctaLinkedin
      footerTagline
      footerLocation
      footerCopyright
    }
    siteSetting {
      contactEmail
      contactPhone
      linkedinUrl
    }
  }
`;

export default async function ContactPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const initialPackage = resolvedParams?.pakket || '';
  let homepage = null;
  let siteSetting = null;

  try {
    const res = await performRequest({ query: CONTACT_PAGE_QUERY });
    homepage = res?.data?.homepage || null;
    siteSetting = res?.data?.siteSetting || null;
  } catch (e) {
    console.error('Contact page query error:', e);
  }

  return (
    <ContactClient
      homepage={homepage}
      siteSetting={siteSetting}
      initialPackage={initialPackage}
    />
  );
}
