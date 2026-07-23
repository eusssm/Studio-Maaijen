import { performRequest } from "../../lib/datocms";
import HomeClient from "../components/HomeClient";

const PAGE_QUERY = `
  query HomeQuery {
    homepage {
      heroEyebrow
      heroHeadline
      aboutIntro
      
      # Stats
      stat1Value
      stat1Label
      stat1Sub
      stat2Value
      stat2Label
      stat2Sub
      stat3Value
      stat3Label
      stat3Sub
      stat4Value
      stat4Label
      stat4Sub

      # Services
      servicesTitle
      servicesSubtitle
      service1Title
      service1Desc
      service1Tags
      service2Title
      service2Desc
      service2Tags
      service3Title
      service3Desc
      service3Tags

      # About
      aboutPortrait {
        url
      }
      aboutBlock1Label
      aboutBlock1Text
      aboutBlock2Label
      aboutBlock2Text
      aboutBlock3Label
      aboutBlock3Text
      aboutClients

      # Process
      processTitle
      processStep1Name
      processStep1Desc
      processStep2Name
      processStep2Desc
      processStep3Name
      processStep3Desc

      # CTA
      ctaBackdrop
      ctaEyebrow
      ctaTitle
      ctaEmail
      ctaLinkedin
    }
    allProjects(first: 6, filter: { showOnHomepage: { eq: true } }, orderBy: position_ASC) {
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
    allTestimonials {
      quote
      authorName
      authorRole
      authorAvatarLetter
    }
  }
`;

export default async function Home() {
  let homepage = null;
  let projects = [];
  let testimonials = [];

  try {
    const res = await performRequest({ query: PAGE_QUERY });
    const data = res?.data || null;
    homepage = data?.homepage || null;
    projects = data?.allProjects || [];
    testimonials = data?.allTestimonials || [];
  } catch (e) {
    console.error("Home page query error:", e);
  }

  return (
    <HomeClient homepage={homepage} projects={projects} testimonials={testimonials} />
  );
}
