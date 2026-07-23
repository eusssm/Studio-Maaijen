export async function performRequest({ query, variables = {}, includeDrafts = false }) {
  const token = process.env.NEXT_DATOCMS_API_TOKEN || "f87387b6acebe5d7d76c560339731c";
  
  try {
    const response = await fetch("https://graphql.datocms.com/", {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
      },
      method: "POST",
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 0 },
    });
    
    const responseBody = await response.json();
    
    if (!response.ok) {
      console.error("DatoCMS Request Failed:", response.status, responseBody);
      return { data: null, errors: responseBody.errors };
    }
    
    return responseBody;
  } catch (error) {
    console.error("DatoCMS Fetch Error:", error);
    return { data: null, error };
  }
}
