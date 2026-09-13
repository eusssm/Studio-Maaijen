import { performRequest } from "../../../lib/datocms";
import PortfolioClient from "../../components/PortfolioClient";

export const metadata = {
  title: "Portfolio & CV | Eugène Maaijen",
  description: "Portfolio en Curriculum Vitae van Eugène Maaijen, UX/UI Designer en Creative.",
};

const CV_QUERY = `
  query CvQuery {
    cvPage {
      subtitle
      location
      availability
      level
      focus
      portrait {
        url
      }
      technicalSkills
      softSkills
      experience {
        ... on ExperienceEntryRecord {
          role
          company
          period
          description
        }
      }
      education {
        ... on EducationEntryRecord {
          degree
          school
          year
        }
      }
    }
    allProjects(first: 100, orderBy: position_ASC) {
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
  }
`;

export default async function CVPage() {
  let cvPage = null;
  let projects = [];
  try {
    const { data } = await performRequest({ query: CV_QUERY });
    cvPage = data?.cvPage || null;
    projects = data?.allProjects || [];
  } catch (e) {
    // CMS model may not exist yet – fall back to hardcoded data
    console.log("CV DatoCMS query failed, using fallback data:", e.message);
  }

  return <PortfolioClient cvPage={cvPage} projects={projects} />;
}
