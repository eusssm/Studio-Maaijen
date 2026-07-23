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
    const headerVideoField = fields.find(f => f.api_key === 'header_video');

    if (!headerVideoField) {
      console.error("header_video field not found!");
      return;
    }

    console.log("Current header_video field details:");
    console.log(JSON.stringify(headerVideoField, null, 2));

    // Find the cover_image field to get its position
    const coverImageField = fields.find(f => f.api_key === 'cover_image');
    if (coverImageField) {
      console.log("\nCover image position:", coverImageField.position);
      console.log("Header video position:", headerVideoField.position);
    }

    // Reposition header_video right after cover_image
    const targetPosition = (coverImageField?.position || 0) + 1;
    console.log(`\nMoving header_video to position ${targetPosition}...`);
    
    await client.fields.update(headerVideoField.id, {
      position: targetPosition
    });

    console.log("Successfully repositioned header_video field!");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error:", error);
    }
  }
}

run();
