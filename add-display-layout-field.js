const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    const targetModelKeys = ['block_image_text', 'block_zebra'];

    for (const key of targetModelKeys) {
      const model = models.find(m => m.api_key === key);
      if (!model) continue;

      const fields = await client.fields.list(model.id);
      const existing = fields.find(f => f.api_key === 'display_layout');

      if (!existing) {
        console.log(`Adding display_layout to ${key}...`);
        await client.fields.create(model.id, {
          label: 'Weergave Stijl',
          api_key: 'display_layout',
          field_type: 'string',
          validators: {
            enum: {
              values: ['Automatisch (Met beeld indien aanwezig)', 'Alleen Tekst (Verberg beeld)']
            }
          }
        });
        console.log(`Successfully added display_layout to ${key}`);
      } else {
        console.log(`Field display_layout already exists in ${key}`);
      }
    }

    console.log("Done adding display_layout field!");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error updating models:", error);
    }
  }
}

run();
