const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    const blockImageText = models.find(m => m.api_key === 'block_image_text');

    if (!blockImageText) {
      console.error("block_image_text model not found!");
      return;
    }

    const modelId = blockImageText.id;
    const fields = await client.fields.list(modelId);
    const layoutRatioField = fields.find(f => f.api_key === 'layout_ratio');

    if (!layoutRatioField) {
      console.error("layout_ratio field not found!");
      return;
    }

    console.log(`Updating field ${layoutRatioField.api_key}...`);
    
    // Update the field with the new validators including the 1/4 and 3/4 options
    await client.fields.update(layoutRatioField.id, {
      validators: {
        enum: {
          values: [
            "50/50 Indeling",
            "2/3 Beeld - 1/3 Tekst",
            "1/3 Beeld - 2/3 Tekst",
            "3/4 Beeld - 1/4 Tekst",
            "1/4 Beeld - 3/4 Tekst"
          ]
        }
      }
    });

    console.log("Successfully updated layout_ratio enum options!");
  } catch(e) {
    console.error(e);
  }
}
run();
