const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    const projectModel = models.find(m => m.api_key === 'project');

    if (!projectModel) return;

    const itemType = { type: 'item_type', id: projectModel.id };

    const projects = [
      { title: 'Blubricks', slug: 'blubricks', client: 'Blubricks', type: 'Brand Identity & Web', intro: 'Een solide identiteit voor een bouwplatform dat de industrie digitaliseert.' },
      { title: 'Spotta', slug: 'spotta', client: 'Spotta', type: 'Digital Platform', intro: 'Een gebruiksvriendelijk platform voor de grootste verspreider van Nederland.' },
      { title: 'De Kindertelefoon', slug: 'kindertelefoon', client: 'De Kindertelefoon', type: 'Social Impact', intro: 'Een veilige digitale omgeving voor kinderen in Nederland.' }
    ];

    for (const p of projects) {
      console.log(`Creating and publishing ${p.title}...`);
      const item = await client.items.create({
        item_type: itemType,
        title: p.title,
        slug: p.slug,
        client: p.client,
        project_type: p.type,
        intro_text: p.intro,
      });
      await client.items.publish(item.id);
    }

    console.log("Seeding and publishing done! Refresh your website.");
  } catch (error) {
    if (error.errors) {
       console.error("Error seeding:", JSON.stringify(error.errors, null, 2));
    } else {
       console.error("Error seeding:", error);
    }
  }
}

run();
