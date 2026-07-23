const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    console.log("Fetching models...");
    const models = await client.itemTypes.list();
    const projectModel = models.find(m => m.api_key === 'project');

    if (!projectModel) {
      console.error("Project model not found!");
      return;
    }

    // Check if block_video already exists
    let videoBlock = models.find(m => m.api_key === 'block_video');
    if (!videoBlock) {
      console.log("Creating Video Block model...");
      videoBlock = await client.itemTypes.create({
        name: 'Block: Video',
        api_key: 'block_video',
        modular_block: true,
      });

      console.log("Creating Title field for Video Block...");
      await client.fields.create(videoBlock.id, {
        label: 'Title',
        api_key: 'title',
        field_type: 'string',
      });

      console.log("Creating Video File field for Video Block...");
      await client.fields.create(videoBlock.id, {
        label: 'Video File',
        api_key: 'video',
        field_type: 'file',
      });
    } else {
      console.log("Video Block already exists.");
    }

    console.log("Fetching fields for Project model...");
    const fields = await client.fields.list(projectModel.id);
    const pageBuilderField = fields.find(f => f.api_key === 'page_builder');

    if (!pageBuilderField) {
      console.error("Page Builder field not found on Project model!");
      return;
    }

    console.log("Updating Page Builder field to include Video Block...");
    const existingItemTypes = pageBuilderField.validators.rich_text_blocks.item_types;
    if (!existingItemTypes.includes(videoBlock.id)) {
      const newItemTypes = [...existingItemTypes, videoBlock.id];
      await client.fields.update(pageBuilderField.id, {
        validators: {
          rich_text_blocks: {
            item_types: newItemTypes
          }
        }
      });
      console.log("Page Builder field updated successfully.");
    } else {
      console.log("Video Block is already allowed in Page Builder.");
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
