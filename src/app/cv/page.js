import { performRequest } from "../../../lib/datocms";
import CVClient from "../../components/CVClient";

export const metadata = {
  title: "CV | Eugène Maaijen",
  description: "Curriculum Vitae van Eugène Maaijen, UX/UI Designer en Creative.",
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
  }
`;

export default async function CVPage() {
  let cvPage = null;
  try {
    const { data } = await performRequest({ query: CV_QUERY });
    cvPage = data?.cvPage || null;
  } catch (e) {
    // CMS model may not exist yet – fall back to hardcoded data
    console.log("CV DatoCMS query failed, using fallback data:", e.message);
  }

  return <CVClient cvPage={cvPage} />;
}
