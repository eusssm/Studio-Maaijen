const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();

    const targetModels = ['experience_entry', 'block_text', 'cv_page', 'block_zebra', 'block_image_text'];

    for (const modelKey of targetModels) {
      const model = models.find(m => m.api_key === modelKey);
      if (!model) continue;

      const fields = await client.fields.list(model.id);

      for (const field of fields) {
        if (field.field_type === 'text') {
          console.log(`Updating field ${field.api_key} on model ${modelKey} to WYSIWYG editor...`);
          await client.fields.update(field.id, {
            appearance: {
              addons: [],
              editor: 'wysiwyg',
              parameters: {}
            }
          });
          console.log(`Successfully updated ${field.api_key} on ${modelKey}!`);
        }
      }
    }

    console.log("Done updating DatoCMS editors to WYSIWYG!");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error updating field editors:", error);
    }
  }
}

run();
