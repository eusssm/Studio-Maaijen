const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

const EDUCATION_DATA = [
  {
    degree: "Certificaat Figma",
    school: "Cursus",
    year: "2023"
  },
  {
    degree: "Propedeuse, Communication and Multimedia Design (CMD)",
    school: "Hogeschool Rotterdam",
    year: "2011 — 2015"
  },
  {
    degree: "Allround Dtp-er / Webdesigner, Desktop Publishing Allround",
    school: "Grafisch Lyceum Rotterdam",
    year: "2007 — 2010"
  }
];

async function run() {
  try {
    console.log("Fetching CV Page singleton...");
    const items = await client.items.list({ filter: { type: 'cv_page' } });
    let cvPage = items[0];

    if (!cvPage) {
      console.log("No CV Page found in DatoCMS.");
      return;
    }

    console.log("Fetching Education Entry model...");
    const blockModels = await client.itemTypes.list();
    const eduModel = blockModels.find(m => m.api_key === 'education_entry');
    
    if (!eduModel) {
      throw new Error("Could not find 'education_entry' block model.");
    }

    const newBlocks = [];
    for (const edu of EDUCATION_DATA) {
      newBlocks.push({
        type: 'item',
        attributes: {
          degree: edu.degree,
          school: edu.school,
          year: edu.year
        },
        relationships: {
          item_type: {
            data: { id: eduModel.id, type: 'item_type' }
          }
        }
      });
    }

    console.log("Updating CV Page record with education data...");
    await client.items.update(cvPage.id, {
      education: newBlocks
    });
    
    console.log("✅ Education data successfully seeded to DatoCMS!");
  } catch (err) {
    if (err.errors) {
      console.error("API error:", JSON.stringify(err.errors, null, 2));
    } else {
      console.error("Error seeding data:", err);
    }
  }
}

run();
