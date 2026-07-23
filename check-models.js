const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    models.forEach(m => {
      console.log(`${m.api_key} - ${m.name}`);
    });
  } catch(e) {
    console.error(e);
  }
}
run();
