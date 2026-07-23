const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    
    // Find the models
    const blockText = models.find(m => m.api_key === 'block_text');
    const blockZebra = models.find(m => m.api_key === 'block_zebra');
    const blockImageText = models.find(m => m.api_key === 'block_image_text');

    const blocksToUpdate = [
      { name: 'block_text', model: blockText },
      { name: 'block_zebra', model: blockZebra },
      { name: 'block_image_text', model: blockImageText }
    ];

    for (const block of blocksToUpdate) {
      if (!block.model) {
        console.error(`Model ${block.name} not found!`);
        continue;
      }

      const fields = await client.fields.list(block.model.id);
      const existingField = fields.find(f => f.api_key === 'text_alignment');

      if (!existingField) {
        console.log(`Adding text_alignment to ${block.name}...`);
        await client.fields.create(block.model.id, {
          label: 'Uitlijning (Tekst)',
          api_key: 'text_alignment',
          field_type: 'string',
          validators: {
            enum: {
              values: ['Links', 'Midden', 'Rechts']
            }
          }
        });
        console.log(`Successfully added to ${block.name}`);
      } else {
        console.log(`Field text_alignment already exists in ${block.name}`);
      }
    }

    console.log("Done updating DatoCMS models!");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error updating models:", error);
    }
  }
}

run();
