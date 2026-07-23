const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    const projectModel = models.find(m => m.api_key === 'project');

    if (!projectModel) {
      console.error("Project model not found!");
      return;
    }

    const fields = await client.fields.list(projectModel.id);
    const existingField = fields.find(f => f.api_key === 'header_video_url');
    const headerVideoField = fields.find(f => f.api_key === 'header_video');

    if (!existingField) {
      console.log("Adding header_video_url to project...");
      await client.fields.create(projectModel.id, {
        label: 'Header Video URL',
        api_key: 'header_video_url',
        field_type: 'string',
        hint: 'Plak hier een YouTube of Vimeo URL voor de hero-achtergrond video',
        position: headerVideoField ? headerVideoField.position + 1 : 7
      });
      console.log("Successfully added header_video_url!");
    } else {
      console.log("Field header_video_url already exists");
    }

    console.log("Done!");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error:", error);
    }
  }
}

run();
