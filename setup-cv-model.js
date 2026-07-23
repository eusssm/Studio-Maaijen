const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    // --- 1. Create "Experience Entry" block model ---
    console.log("Creating Experience Entry block model...");
    const experienceBlock = await client.itemTypes.create({
      name: 'Experience Entry',
      api_key: 'experience_entry',
      modular_block: true,
    });

    await client.fields.create(experienceBlock.id, {
      label: 'Role', api_key: 'role', field_type: 'string',
    });
    await client.fields.create(experienceBlock.id, {
      label: 'Company', api_key: 'company', field_type: 'string',
    });
    await client.fields.create(experienceBlock.id, {
      label: 'Period', api_key: 'period', field_type: 'string',
    });
    await client.fields.create(experienceBlock.id, {
      label: 'Description', api_key: 'description', field_type: 'text',
    });

    // --- 2. Create "Education Entry" block model ---
    console.log("Creating Education Entry block model...");
    const educationBlock = await client.itemTypes.create({
      name: 'Education Entry',
      api_key: 'education_entry',
      modular_block: true,
    });

    await client.fields.create(educationBlock.id, {
      label: 'Degree', api_key: 'degree', field_type: 'string',
    });
    await client.fields.create(educationBlock.id, {
      label: 'School', api_key: 'school', field_type: 'string',
    });
    await client.fields.create(educationBlock.id, {
      label: 'Year', api_key: 'year', field_type: 'string',
    });

    // --- 3. Create "CV Page" singleton model ---
    console.log("Creating CV Page singleton model...");
    const cvModel = await client.itemTypes.create({
      name: 'CV Page',
      api_key: 'cv_page',
      singleton: true,
    });

    await client.fields.create(cvModel.id, {
      label: 'Subtitle', api_key: 'subtitle', field_type: 'text',
    });
    await client.fields.create(cvModel.id, {
      label: 'Location', api_key: 'location', field_type: 'string',
    });
    await client.fields.create(cvModel.id, {
      label: 'Availability', api_key: 'availability', field_type: 'string',
    });
    await client.fields.create(cvModel.id, {
      label: 'Level', api_key: 'level', field_type: 'string',
    });
    await client.fields.create(cvModel.id, {
      label: 'Focus', api_key: 'focus', field_type: 'string',
    });
    await client.fields.create(cvModel.id, {
      label: 'Portrait', api_key: 'portrait', field_type: 'file',
    });
    await client.fields.create(cvModel.id, {
      label: 'Technical Skills', api_key: 'technical_skills', field_type: 'json',
    });
    await client.fields.create(cvModel.id, {
      label: 'Soft Skills', api_key: 'soft_skills', field_type: 'json',
    });
    await client.fields.create(cvModel.id, {
      label: 'Experience',
      api_key: 'experience',
      field_type: 'rich_text',
      validators: {
        rich_text_blocks: { item_types: [experienceBlock.id] },
      },
    });
    await client.fields.create(cvModel.id, {
      label: 'Education',
      api_key: 'education',
      field_type: 'rich_text',
      validators: {
        rich_text_blocks: { item_types: [educationBlock.id] },
      },
    });

    console.log("✅ Done! CV Page model created successfully.");
    console.log("   Go to your DatoCMS dashboard to fill in the content.");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error:", error);
    }
  }
}

run();
