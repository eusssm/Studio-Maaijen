import { performRequest } from "../../../lib/datocms";
import WorkOverviewClient from "../../components/WorkOverviewClient";

const WORK_PAGE_QUERY = `
  query WorkPageQuery {
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
  let projects = [];
  try {
    const res = await performRequest({ query: WORK_PAGE_QUERY });
    projects = res?.data?.allProjects || [];
  } catch (e) {
    console.error("Work page query error:", e);
  }

  return (
    <WorkOverviewClient projects={projects} />
  );
}
