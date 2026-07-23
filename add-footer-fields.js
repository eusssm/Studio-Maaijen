import { buildClient } from '@datocms/cma-client-node';

async function run() {
  const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });
  const models = await client.itemTypes.list();
  const homepageModel = models.find(m => m.api_key === 'homepage');

  if (!homepageModel) {
    console.error("Homepage model not found");
    return;
  }

  console.log("Adding footer fields...");

  try {
    await client.fields.create(homepageModel.id, {
      label: 'Footer Tagline',
      api_key: 'footer_tagline',
      field_type: 'text',
      appearance: { editor: 'textarea', parameters: {}, addons: [] },
      default_value: 'Design dat raakt vandaag\n& inspireert morgen.'
    });
    console.log("Added footer_tagline");
  } catch(e) { console.log(e.message); }

  try {
    await client.fields.create(homepageModel.id, {
      label: 'Footer Location',
      api_key: 'footer_location',
      field_type: 'text',
      appearance: { editor: 'textarea', parameters: {}, addons: [] },
      default_value: '📍 Amsterdam, Nederland\nBeschikbaar voor remote & on-site'
    });
    console.log("Added footer_location");
  } catch(e) { console.log(e.message); }

  try {
    await client.fields.create(homepageModel.id, {
      label: 'Footer Copyright',
      api_key: 'footer_copyright',
      field_type: 'string',
      appearance: { editor: 'single_line', parameters: {}, addons: [] },
      default_value: '© 2026 Eugène Maaijen — Alle rechten voorbehouden'
    });
    console.log("Added footer_copyright");
  } catch(e) { console.log(e.message); }

  console.log("Done!");
}
run();
