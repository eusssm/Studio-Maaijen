const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    
    const targetModelKeys = ['block_text', 'block_zebra', 'block_image_text', 'block_video'];

    for (const key of targetModelKeys) {
      const model = models.find(m => m.api_key === key);
      if (!model) {
        console.error(`Model ${key} not found!`);
        continue;
      }

      const fields = await client.fields.list(model.id);
      
      // Check cta_label
      const existingLabel = fields.find(f => f.api_key === 'cta_label');
      if (!existingLabel) {
        console.log(`Adding cta_label to ${key}...`);
        await client.fields.create(model.id, {
          label: 'CTA Knoptekst (bijv. Bekijk website / Vimeo)',
          api_key: 'cta_label',
          field_type: 'string',
        });
        console.log(`Successfully added cta_label to ${key}`);
      } else {
        console.log(`Field cta_label already exists in ${key}`);
      }

      // Check cta_url
      const existingUrl = fields.find(f => f.api_key === 'cta_url');
      if (!existingUrl) {
        console.log(`Adding cta_url to ${key}...`);
        await client.fields.create(model.id, {
          label: 'CTA Link URL (bijv. https://vimeo.com/... of website)',
          api_key: 'cta_url',
          field_type: 'string',
        });
        console.log(`Successfully added cta_url to ${key}`);
      } else {
        console.log(`Field cta_url already exists in ${key}`);
      }
    }

    console.log("Done updating DatoCMS models for CTA fields!");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error updating models:", error);
    }
  }
}

run();
