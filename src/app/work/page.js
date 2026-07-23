import { performRequest } from "../../../lib/datocms";
import WorkOverviewClient from "../../components/WorkOverviewClient";

const WORK_PAGE_QUERY = `
  query WorkPageQuery {
    homepage {
      ctaEmail
      ctaLinkedin
      footerTagline
      footerLocation
      footerCopyright
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

export default async function WorkPage() {
  let homepage = null;
  let projects = [];
  try {
    const res = await performRequest({ query: WORK_PAGE_QUERY });
    projects = res?.data?.allProjects || [];
    homepage = res?.data?.homepage || null;
  } catch (e) {
    console.error("Work page query error:", e);
  }

  return (
    <WorkOverviewClient projects={projects} homepage={homepage} />
  );
}
