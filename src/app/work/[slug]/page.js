import { performRequest } from "../../../../lib/datocms";
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
    allProjects(first: 10, orderBy: _createdAt_DESC) {
      slug
      title
      projectType
      coverImage {
        url
      }
    }
  }
`;

export async function generateStaticParams() {
  try {
    const { data } = await performRequest({
      query: `query AllSlugs { allProjects { slug } }`
    });
    return (data?.allProjects || []).map((project) => ({
      slug: project.slug,
    }));
  } catch (e) {
    return [];
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const { data } = await performRequest({ 
    query: PROJECT_QUERY,
    variables: { slug }
  });

  if (!data?.project) {
    notFound();
  }

  // Find next project
  const allProjects = data.allProjects;
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  return <CaseClient project={data.project} nextProject={nextProject} />;
}
