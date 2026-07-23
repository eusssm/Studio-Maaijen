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
  const { data } = await performRequest({ query: WORK_PAGE_QUERY });
  const projects = data?.allProjects || [];

  return (
    <WorkOverviewClient projects={projects} />
  );
}
