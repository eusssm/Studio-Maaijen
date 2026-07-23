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

    console.log("Creating Cover Image field...");
    await client.fields.create(projectModel.id, {
      label: 'Cover Image',
      api_key: 'cover_image',
      field_type: 'file',
      // removed validators for simplicity
    });

    console.log("Creating Intro Text field...");
    await client.fields.create(projectModel.id, {
      label: 'Intro Text',
      api_key: 'intro_text',
      field_type: 'text'
    });

    console.log("Creating Homepage model...");
    const homeModel = await client.itemTypes.create({
      name: 'Homepage',
      api_key: 'homepage',
      singleton: true,
    });

    await client.fields.create(homeModel.id, {
      label: 'Hero Eyebrow',
      api_key: 'hero_eyebrow',
      field_type: 'string'
    });

    await client.fields.create(homeModel.id, {
      label: 'Hero Headline',
      api_key: 'hero_headline',
      field_type: 'text'
    });

    await client.fields.create(homeModel.id, {
      label: 'About Intro',
      api_key: 'about_intro',
      field_type: 'text'
    });

    console.log("Done! Models created successfully.");
  } catch (error) {
    if (error.errors) {
      console.error("API error:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error creating models:", error);
    }
  }
}

run();
