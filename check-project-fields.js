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
    console.log("Fields in Project model:");
    fields.forEach(f => {
      console.log(`- ${f.label} (${f.api_key}) - type: ${f.field_type}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
