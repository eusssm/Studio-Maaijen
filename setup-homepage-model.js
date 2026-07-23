const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function createFieldIfNotExist(modelId, fieldData) {
  try {
    const fields = await client.fields.list(modelId);
    const existing = fields.find(f => f.api_key === fieldData.api_key);
    if (existing) {
      console.log(`Field ${fieldData.api_key} already exists on model ${modelId}.`);
      return existing;
    }
    console.log(`Creating field ${fieldData.api_key} on model ${modelId}...`);
    return await client.fields.create(modelId, fieldData);
  } catch (error) {
    console.error(`Error creating field ${fieldData.api_key}:`, error);
    throw error;
  }
}

async function run() {
  try {
    const models = await client.itemTypes.list();
    const homepageModel = models.find(m => m.api_key === 'homepage');

    if (!homepageModel) {
      console.error("Homepage model not found!");
      return;
    }

    console.log("Setting up fields on Homepage model...");
    const modelId = homepageModel.id;

    // 1. Stats Section
    const statsFields = [
      { label: 'Stat 1 Value', api_key: 'stat1_value', field_type: 'string' },
      { label: 'Stat 1 Label', api_key: 'stat1_label', field_type: 'string' },
      { label: 'Stat 1 Sub', api_key: 'stat1_sub', field_type: 'string' },
      { label: 'Stat 2 Value', api_key: 'stat2_value', field_type: 'string' },
      { label: 'Stat 2 Label', api_key: 'stat2_label', field_type: 'string' },
      { label: 'Stat 2 Sub', api_key: 'stat2_sub', field_type: 'string' },
      { label: 'Stat 3 Value', api_key: 'stat3_value', field_type: 'string' },
      { label: 'Stat 3 Label', api_key: 'stat3_label', field_type: 'string' },
      { label: 'Stat 3 Sub', api_key: 'stat3_sub', field_type: 'string' },
      { label: 'Stat 4 Value', api_key: 'stat4_value', field_type: 'string' },
      { label: 'Stat 4 Label', api_key: 'stat4_label', field_type: 'string' },
      { label: 'Stat 4 Sub', api_key: 'stat4_sub', field_type: 'string' },
    ];

    for (const f of statsFields) {
      await createFieldIfNotExist(modelId, f);
    }

    // 2. Services Section
    const servicesFields = [
      { label: 'Services Title', api_key: 'services_title', field_type: 'string' },
      { label: 'Services Subtitle', api_key: 'services_subtitle', field_type: 'text' },
      { label: 'Service 1 Title', api_key: 'service1_title', field_type: 'string' },
      { label: 'Service 1 Description', api_key: 'service1_desc', field_type: 'text' },
      { label: 'Service 1 Tags', api_key: 'service1_tags', field_type: 'string' },
      { label: 'Service 2 Title', api_key: 'service2_title', field_type: 'string' },
      { label: 'Service 2 Description', api_key: 'service2_desc', field_type: 'text' },
      { label: 'Service 2 Tags', api_key: 'service2_tags', field_type: 'string' },
      { label: 'Service 3 Title', api_key: 'service3_title', field_type: 'string' },
      { label: 'Service 3 Description', api_key: 'service3_desc', field_type: 'text' },
      { label: 'Service 3 Tags', api_key: 'service3_tags', field_type: 'string' },
    ];

    for (const f of servicesFields) {
      await createFieldIfNotExist(modelId, f);
    }

    // 3. About Section
    const aboutFields = [
      { label: 'About Portrait', api_key: 'about_portrait', field_type: 'file' },
      { label: 'About Block 1 Label', api_key: 'about_block1_label', field_type: 'string' },
      { label: 'About Block 1 Text', api_key: 'about_block1_text', field_type: 'text' },
      { label: 'About Block 2 Label', api_key: 'about_block2_label', field_type: 'string' },
      { label: 'About Block 2 Text', api_key: 'about_block2_text', field_type: 'text' },
      { label: 'About Block 3 Label', api_key: 'about_block3_label', field_type: 'string' },
      { label: 'About Block 3 Text', api_key: 'about_block3_text', field_type: 'text' },
      { label: 'About Clients', api_key: 'about_clients', field_type: 'string' },
    ];

    for (const f of aboutFields) {
      await createFieldIfNotExist(modelId, f);
    }

    // 4. Process Section
    const processFields = [
      { label: 'Process Title', api_key: 'process_title', field_type: 'string' },
      { label: 'Process Step 1 Name', api_key: 'process_step1_name', field_type: 'string' },
      { label: 'Process Step 1 Description', api_key: 'process_step1_desc', field_type: 'text' },
      { label: 'Process Step 2 Name', api_key: 'process_step2_name', field_type: 'string' },
      { label: 'Process Step 2 Description', api_key: 'process_step2_desc', field_type: 'text' },
      { label: 'Process Step 3 Name', api_key: 'process_step3_name', field_type: 'string' },
      { label: 'Process Step 3 Description', api_key: 'process_step3_desc', field_type: 'text' },
    ];

    for (const f of processFields) {
      await createFieldIfNotExist(modelId, f);
    }

    // 5. CTA Section
    const ctaFields = [
      { label: 'CTA Backdrop', api_key: 'cta_backdrop', field_type: 'string' },
      { label: 'CTA Eyebrow', api_key: 'cta_eyebrow', field_type: 'string' },
      { label: 'CTA Title', api_key: 'cta_title', field_type: 'string' },
      { label: 'CTA Email', api_key: 'cta_email', field_type: 'string' },
      { label: 'CTA LinkedIn', api_key: 'cta_linkedin', field_type: 'string' },
    ];

    for (const f of ctaFields) {
      await createFieldIfNotExist(modelId, f);
    }

    // 6. Testimonial Model
    let testimonialModel = models.find(m => m.api_key === 'testimonial');
    if (!testimonialModel) {
      console.log("Creating Testimonial model...");
      testimonialModel = await client.itemTypes.create({
        name: 'Testimonial',
        api_key: 'testimonial',
      });
      
      await client.fields.create(testimonialModel.id, {
        label: 'Quote',
        api_key: 'quote',
        field_type: 'text',
      });
      await client.fields.create(testimonialModel.id, {
        label: 'Author Name',
        api_key: 'author_name',
        field_type: 'string',
      });
      await client.fields.create(testimonialModel.id, {
        label: 'Author Role',
        api_key: 'author_role',
        field_type: 'string',
      });
      await client.fields.create(testimonialModel.id, {
        label: 'Author Avatar Letter',
        api_key: 'author_avatar_letter',
        field_type: 'string',
      });
    } else {
      console.log("Testimonial model already exists.");
    }

    console.log("Done! Models and fields setup completed successfully.");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error creating models/fields:", error);
    }
  }
}

run();
