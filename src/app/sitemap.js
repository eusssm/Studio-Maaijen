import { performRequest } from "../../lib/datocms";
import { CURATED_ORDER } from "../lib/curated-cases";

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

  const updatedBySlug = new Map(projects.map((p) => [p.slug, p._updatedAt]));
  const baseUrl = "https://www.studio-maaijen.nl";
  
  const projectUrls = CURATED_ORDER.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: updatedBySlug.get(slug) ? new Date(updatedBySlug.get(slug)) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/pakketten`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...projectUrls
  ];
}
