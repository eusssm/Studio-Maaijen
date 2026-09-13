import { performRequest } from "../../lib/datocms";

export default async function sitemap() {
  const SITEMAP_QUERY = `
    query SitemapQuery {
      allProjects(first: 100) {
        slug
        _updatedAt
      }
    }
  `;
  
  let projects = [];
  try {
    const { data } = await performRequest({ query: SITEMAP_QUERY });
    projects = data?.allProjects || [];
  } catch (e) {
    console.error("Sitemap query failed");
  }

  const baseUrl = "https://www.studio-maaijen.nl";
  
  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...projectUrls
  ];
}
