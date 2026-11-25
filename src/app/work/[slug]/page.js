import { performRequest } from "../../../../lib/datocms";
import {
  CURATED_ORDER,
  STANDALONE_CASES,
  curateProjects,
  getCuratedProjectBySlug,
} from "../../../lib/curated-cases";
import CaseClient from "../../../components/CaseClient";
import { notFound } from 'next/navigation';

const PROJECT_QUERY = `
  query ProjectQuery($slug: String) {
    project(filter: { slug: { eq: $slug } }) {
      id
      title
      client
      projectType
      introText
      categories {
        name
      }
      coverImage {
        url
      }
      headerVideo {
        url
        mimeType
        video {
          mp4Url
        }
      }
      headerVideoUrl
      pageBuilder {
        ... on BlockTextRecord {
          id
          _modelApiKey
          title
          content
          showSubtitle
          subtitle
          darkTheme
          textAlignment
          ctaLabel
          ctaUrl
        }
        ... on BlockImageRecord {
          id
          _modelApiKey
          image {
            url
            alt
            mimeType
            video {
              mp4Url
            }
          }
        }
        ... on BlockZebraRecord {
          id
          _modelApiKey
          title
          text
          image {
            url
            alt
            mimeType
            video {
              mp4Url
            }
          }
          showSubtitle
          subtitle
          darkTheme
          textAlignment
          ctaLabel
          ctaUrl
          displayLayout
        }
        ... on BlockVideoRecord {
          id
          _modelApiKey
          title
          externalVideoUrl
          video {
            url
            mimeType
            video {
              mp4Url
            }
          }
          ctaLabel
          ctaUrl
        }
        ... on BlockDoubleImageRecord {
          id
          _modelApiKey
          imageLeft {
            url
            alt
            mimeType
            video {
              mp4Url
            }
          }
          imageRight {
            url
            alt
            mimeType
            video {
              mp4Url
            }
          }
        }
        ... on BlockImageTextRecord {
          id
          _modelApiKey
          title
          text
          image {
            url
            alt
            mimeType
            video {
              mp4Url
            }
          }
          externalVideoUrl
          layoutRatio
          imageOnRight
          showSubtitle
          subtitle
          darkTheme
          textAlignment
          ctaLabel
          ctaUrl
          displayLayout
        }
      }
    }
    allProjects(first: 100, orderBy: position_ASC) {
      slug
      title
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
  }
`;


export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (STANDALONE_CASES[slug]) {
    const p = STANDALONE_CASES[slug];
    return {
      title: p.title,
      description: p.introText?.substring(0, 160) || "Project case study door Studio Maaijen.",
      openGraph: {
        title: `${p.title} | Studio Maaijen`,
        description: p.introText?.substring(0, 160) || "Project case study door Studio Maaijen.",
        images: p.coverImage ? [{ url: p.coverImage.url }] : [],
      },
    };
  }
  try {
    const { data } = await performRequest({ 
      query: `query { project(filter: { slug: { eq: "${slug}" } }) { title introText coverImage { url } } }`
    });
    const p = getCuratedProjectBySlug(slug, data?.project);
    if (p) {
      return {
        title: p.title,
        description: p.introText?.substring(0, 160) || "Project case study door Studio Maaijen.",
        openGraph: {
          title: `${p.title} | Studio Maaijen`,
          description: p.introText?.substring(0, 160) || "Project case study door Studio Maaijen.",
          images: p.coverImage ? [{ url: p.coverImage.url }] : [],
        }
      }
    }
  } catch (e) {
    console.error("Metadata fetch error:", e);
  }
  return { title: 'Project' };
}

export async function generateStaticParams() {
  return CURATED_ORDER.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  let data = null;
  try {
    const res = await performRequest({ 
      query: PROJECT_QUERY,
      variables: { slug }
    });
    data = res?.data || null;
  } catch (e) {
    console.error("Project page query error:", e);
  }

  const project = getCuratedProjectBySlug(slug, data?.project, data?.allProjects || []);
  if (!project) {
    notFound();
  }

  // Find next project binnen de gecureerde selectie
  const allProjects = curateProjects(data?.allProjects || []);
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const nextProject = allProjects.length > 0 ? allProjects[(currentIndex + 1) % allProjects.length] : null;
  return (
    <CaseClient
      key={slug}
      project={project}
      nextProject={nextProject}
      index={Math.max(0, currentIndex)}
      total={allProjects.length}
    />
  );
}
