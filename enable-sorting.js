const { buildClient } = require('@datocms/cma-client-node');
const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    const projectModel = models.find(m => m.api_key === 'project');
    
    if (projectModel) {
      await client.itemTypes.update(projectModel.id, { sortable: true });
      console.log("✅ Project model is now manually sortable in DatoCMS!");
    } else {
      console.log("Project model not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
