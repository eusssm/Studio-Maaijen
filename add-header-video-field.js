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
    const existingField = fields.find(f => f.api_key === 'header_video');

    if (!existingField) {
      console.log(`Adding header_video to project...`);
      await client.fields.create(projectModel.id, {
        label: 'Header Video',
        api_key: 'header_video',
        field_type: 'file'
      });
      console.log(`Successfully added header_video to project model`);
    } else {
      console.log(`Field header_video already exists in project model`);
    }

    console.log("Done updating DatoCMS models!");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error updating models:", error);
    }
  }
}

run();
