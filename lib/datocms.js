/* Lokale media-verrijking voor cases waarvan de media direct vanuit /public/images/cases/
   wordt geserveerd (bijv. wanneer het gratis DatoCMS upload-quotum vol zit). */
const LOCAL_CASE_MEDIA = {
  "twelve-turns": {
    coverImage: {
      url: "/images/cases/twelve-turns/tafel.jpg",
      alt: "Twelve Turns 3D-geprint cadeaudoosje met 12 bouten aan de kersttafel",
    },
    headerVideo: {
      url: "/images/cases/twelve-turns/kado-bij-kerstboom.mp4",
      mimeType: "video/mp4",
      video: {
        mp4Url: "/images/cases/twelve-turns/kado-bij-kerstboom.mp4",
      },
    },
    extraBlocksAfterIndex: {
      0: [
        {
          id: "twelve-turns-video-block",
          _modelApiKey: "block_video",
          title: "Het uitpakmoment onder de boom",
          externalVideoUrl: null,
          video: {
            url: "/images/cases/twelve-turns/kado-bij-kerstboom.mp4",
            mimeType: "video/mp4",
            video: {
              mp4Url: "/images/cases/twelve-turns/kado-bij-kerstboom.mp4",
            },
          },
          ctaLabel: "",
          ctaUrl: "",
        },
      ],
      1: [
        {
          id: "twelve-turns-double-image-block",
          _modelApiKey: "block_double_image",
          imageLeft: {
            url: "/images/cases/twelve-turns/handen.jpg",
            alt: "Handen draaien de 12 bouten los met het sleuteltje uit de strik",
            mimeType: "image/jpeg",
          },
          imageRight: {
            url: "/images/cases/twelve-turns/onthulling.jpg",
            alt: "De cadeaukaart wordt onthuld in het geopende Twelve Turns doosje",
            mimeType: "image/jpeg",
          },
        },
      ],
      2: [
        {
          id: "twelve-turns-image-block",
          _modelApiKey: "block_image",
          image: {
            url: "/images/cases/twelve-turns/kerstboom.jpg",
            alt: "Twelve Turns cadeaudoosje onder de kerstboom",
            mimeType: "image/jpeg",
          },
        },
      ],
    },
  },
};

function enrichProjectRecord(proj, slugHint) {
  if (!proj || typeof proj !== "object") return proj;
  const slug = (proj.slug || slugHint || "").toLowerCase();
  const local = LOCAL_CASE_MEDIA[slug];
  if (!local) return proj;

  if (!proj.coverImage?.url && local.coverImage) {
    proj.coverImage = local.coverImage;
  }
  if (!proj.headerVideo?.url && local.headerVideo && "headerVideo" in proj) {
    proj.headerVideo = local.headerVideo;
  }
  if (Array.isArray(proj.pageBuilder) && local.extraBlocksAfterIndex) {
    const hasMediaBlocks = proj.pageBuilder.some((b) =>
      ["block_image", "block_double_image", "block_video"].includes(b?._modelApiKey)
    );
    if (!hasMediaBlocks) {
      const merged = [];
      proj.pageBuilder.forEach((b, idx) => {
        merged.push(b);
        if (local.extraBlocksAfterIndex[idx]) {
          merged.push(...local.extraBlocksAfterIndex[idx]);
        }
      });
      proj.pageBuilder = merged;
    }
  }
  return proj;
}

function enrichDatoResponse(data, variables = {}) {
  if (!data || typeof data !== "object") return data;
  if (Array.isArray(data.allProjects)) {
    data.allProjects = data.allProjects.map((p) => enrichProjectRecord(p));
  }
  if (data.project) {
    data.project = enrichProjectRecord(data.project, variables?.slug);
  }
  return data;
}

export async function performRequest({ query, variables = {}, includeDrafts = false }) {
  const token = process.env.NEXT_DATOCMS_API_TOKEN;

  if (!token) {
    console.error(
      "NEXT_DATOCMS_API_TOKEN ontbreekt. Zet deze als environment variable (lokaal in .env.local, in productie bij de hosting)."
    );
    return { data: null, error: new Error("Missing NEXT_DATOCMS_API_TOKEN") };
  }
  
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
    
    if (responseBody?.data) {
      responseBody.data = enrichDatoResponse(responseBody.data, variables);
    }
    return responseBody;
  } catch (error) {
    console.error("DatoCMS Fetch Error:", error);
    return { data: null, error };
  }
}
