const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    console.log("Fetching Project model...");
    const models = await client.itemTypes.list();
    const projectModel = models.find(m => m.api_key === 'project');

    if (!projectModel) {
      console.error("Project model not found!");
      return;
    }

    console.log("Creating Text Block model...");
    const textBlock = await client.itemTypes.create({
      name: 'Block: Text',
      api_key: 'block_text',
      modular_block: true,
    });
    await client.fields.create(textBlock.id, {
      label: 'Title',
      api_key: 'title',
      field_type: 'string',
    });
    await client.fields.create(textBlock.id, {
      label: 'Content',
      api_key: 'content',
      field_type: 'text',
    });

    console.log("Creating Image Block model...");
    const imageBlock = await client.itemTypes.create({
      name: 'Block: Image',
      api_key: 'block_image',
      modular_block: true,
    });
    await client.fields.create(imageBlock.id, {
      label: 'Image',
      api_key: 'image',
      field_type: 'file',
    });

    console.log("Creating Zebra Section Block model...");
    const zebraBlock = await client.itemTypes.create({
      name: 'Block: Zebra Section',
      api_key: 'block_zebra',
      modular_block: true,
    });
    await client.fields.create(zebraBlock.id, {
      label: 'Title',
      api_key: 'title',
      field_type: 'string',
    });
    await client.fields.create(zebraBlock.id, {
      label: 'Text',
      api_key: 'text',
      field_type: 'text',
    });
    await client.fields.create(zebraBlock.id, {
      label: 'Image',
      api_key: 'image',
      field_type: 'file',
    });

    console.log("Adding Page Builder field to Project model...");
    await client.fields.create(projectModel.id, {
      label: 'Page Builder',
      api_key: 'page_builder',
      field_type: 'rich_text', // This is Modular Content in the API
      validators: {
        rich_text_blocks: {
          item_types: [textBlock.id, imageBlock.id, zebraBlock.id]
        }
      }
    });

    console.log("Done! Page Builder added successfully.");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error updating models:", error);
    }
  }
}

run();
