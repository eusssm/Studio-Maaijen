const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function createFieldIfNotExist(modelId, fieldData) {
  try {
    const fields = await client.fields.list(modelId);
    const existing = fields.find(f => f.api_key === fieldData.api_key);
    if (existing) {
      console.log(`Field ${fieldData.api_key} already exists on model ${modelId}. Updating...`);
      return await client.fields.update(existing.id, fieldData);
    }
    console.log(`Creating field ${fieldData.api_key} on model ${modelId}...`);
    return await client.fields.create(modelId, fieldData);
  } catch (error) {
    console.error(`Error with field ${fieldData.api_key}:`, error);
    throw error;
  }
}

async function run() {
  try {
    const models = await client.itemTypes.list();
    const blockImageText = models.find(m => m.api_key === 'block_image_text');

    if (!blockImageText) {
      console.error("block_image_text model not found!");
      return;
    }

    const modelId = blockImageText.id;

    await createFieldIfNotExist(modelId, {
      label: 'Layout Verhouding',
      api_key: 'layout_ratio',
      field_type: 'string',
      appearance: {
        editor: 'single_line',
        parameters: { heading: false },
        addons: []
      },
      validators: {
        enum: {
          values: [
            "50/50 Indeling",
            "2/3 Beeld - 1/3 Tekst",
            "1/3 Beeld - 2/3 Tekst"
          ]
        }
      }
    });

    await createFieldIfNotExist(modelId, {
      label: 'Vimeo/YouTube URL',
      api_key: 'external_video_url',
      field_type: 'string',
      validators: {
        format: {
          custom_pattern: "",
          predefined_pattern: "url"
        }
      }
    });

    console.log("Successfully added layout_ratio and external_video_url to block_image_text!");
  } catch(e) {
    console.error(e);
  }
}
run();
