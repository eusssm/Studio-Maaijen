const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

async function run() {
  try {
    const models = await client.itemTypes.list();
    const homepageModel = models.find(m => m.api_key === 'homepage');
    const testimonialModel = models.find(m => m.api_key === 'testimonial');

    if (!homepageModel) {
      console.error("Homepage model not found!");
      return;
    }

    // 1. Find or create Homepage singleton record
    const items = await client.items.list({
      filter: {
        type: homepageModel.id
      }
    });

    const homepageData = {
      hero_eyebrow: 'Portfolio 2026 — Amsterdam, NL',
      hero_headline: '<div><span class="word-wrap"><span class="word-inner">Design&nbsp;dat</span></span></div><div><span class="word-wrap"><span class="word-inner"><em>raakt&nbsp;vandaag</em></span></span></div><div><span class="word-wrap"><span class="word-inner">&amp;&nbsp;<em>inspireert</em></span></span></div><div><span class="word-wrap"><span class="word-inner">morgen.</span></span></div>',
      about_intro: 'Ik ben <em>Eugène Maaijen</em> — UX/UI designer, video editor en brand creator. Met meer dan 20 jaar ervaring help ik merken om <em>digitale ervaringen te creëren</em> die raken, overtuigen en blijven hangen.',
      
      // Stats
      stat1_value: '20',
      stat1_label: 'Jaar werkervaring',
      stat1_sub: 'UX/UI & Brand',
      stat2_value: '50',
      stat2_label: 'Projecten afgeleverd',
      stat2_sub: 'Diverse opdrachtgevers',
      stat3_value: '30',
      stat3_label: 'Huisstijlen gecreëerd',
      stat3_sub: 'Concept tot delivery',
      stat4_value: '100',
      stat4_label: 'Passie voor craft',
      stat4_sub: 'Elke pixel telt',

      // Services
      services_title: 'Wat ik doe & hoe ik het doe',
      services_subtitle: '20 jaar ervaring op het snijvlak van strategie, esthetiek en techniek.',
      service1_title: 'UX/UI Design',
      service1_desc: 'Van wireframe tot high-fidelity prototype — ik ontwerp digitale ervaringen die intuïtief aanvoelen en gebruikers meenemen van A naar B.',
      service1_tags: 'User Research, Wireframing, Prototyping, Design Systems',
      service2_title: 'Brand Identity',
      service2_desc: 'Merken die niet alleen mooi zijn — maar ook iets zeggen. Ik bouw identiteiten die emotioneel resoneren én visueel consistent zijn.',
      service2_tags: 'Logo Design, Typografie, Kleurpaletten, Brand Guidelines',
      service3_title: 'Video Editing',
      service3_desc: 'Van rauwe opnames naar een gepolijste productie — met oog voor ritme, sfeer en impact. Bewegend beeld dat het verhaal versterkt.',
      service3_tags: 'Post-productie, Motion Graphics, Color Grading, Sound Design',

      // About
      about_block1_label: 'Achtergrond',
      about_block1_text: 'Ik ontwerp websites, huisstijlen en video\'s voor zowel grote organisaties als ambitieuze startups. Elk project begin ik met één vraag: wat moet de gebruiker voelen?',
      about_block2_label: 'Werkwijze',
      about_block2_text: 'Geen stijve praatjes of standaard templates. Korte lijnen, relaxed sparren en strakke uitwerkingen — van het eerste idee tot het eindresultaat live staat.',
      about_block3_label: 'Tools',
      about_block3_text: 'Figma, Adobe Creative Suite, Webflow, After Effects, Premiere Pro, DaVinci Resolve & diverse AI tools.',
      about_clients: 'Blubricks, Spotta, De Kindertelefoon, & meer',

      // Process
      process_title: 'Van brief naar briljant resultaat',
      process_step1_name: 'Luisteren & Begrijpen',
      process_step1_desc: 'Ik duik in jouw merk, doelgroep en doelstellingen. Geen aannames — alleen een scherp begrip van wat jij nodig hebt en waarom.',
      process_step2_name: 'Creëren & Verfijnen',
      process_step2_desc: 'Van concept tot pixel-perfecte uitwerking. Ik werk iteratief, met jou als sparringpartner gedurende het hele creatieve proces.',
      process_step3_name: 'Lanceren & Groeien',
      process_step3_desc: 'Alles klaar voor implementatie — met heldere documentatie zodat je volledig zelfstandig verder kunt of met je team.',

      // CTA
      cta_backdrop: 'Samen',
      cta_eyebrow: 'Klaar om samen te werken?',
      cta_title: 'Laten we <em>iets moois</em> maken.',
      cta_email: 'eusssm@gmail.com',
      cta_linkedin: 'https://linkedin.com',
    };

    if (items.length > 0) {
      const homeRecord = items[0];
      console.log(`Updating existing Homepage record ${homeRecord.id}...`);
      await client.items.update(homeRecord.id, homepageData);
      await client.items.publish(homeRecord.id);
    } else {
      console.log("Creating new Homepage record...");
      const newRecord = await client.items.create({
        item_type: { type: 'item_type', id: homepageModel.id },
        ...homepageData
      });
      await client.items.publish(newRecord.id);
    }

    // 2. Seed Testimonials if model exists
    if (testimonialModel) {
      console.log("Checking testimonials...");
      const existingTestimonials = await client.items.list({
        filter: {
          type: testimonialModel.id
        }
      });

      if (existingTestimonials.length === 0) {
        console.log("Seeding testimonials...");
        const testimonials = [
          {
            quote: '“Eugène heeft onze brand identity volledig getransformeerd. Het eindresultaat overtrof al onze verwachtingen — veruit beter dan we hadden durven hopen.”',
            author_name: 'Martijn de Vries',
            author_role: 'CEO, Blubricks',
            author_avatar_letter: 'M',
          },
          {
            quote: '“De nieuwe UX van Spotta heeft onze conversie significant verhoogd. Eugène begrijpt echt hoe mensen denken en hoe je ze door een product loodst.”',
            author_name: 'Sophie Janssen',
            author_role: 'Product Lead, Spotta',
            author_avatar_letter: 'S',
          },
          {
            quote: '“Professioneel, creatief en toegankelijk. De samenwerking voelde als een echte partnership — geen uitvoerder, maar een mededenker met visie.”',
            author_name: 'Anna Pietersen',
            author_role: 'Communicatie, De Kindertelefoon',
            author_avatar_letter: 'A',
          },
          {
            quote: '“De videoproductie was van een ongelofelijk hoog niveau. Eugène weet precies hoe hij een verhaal visueel moet vertellen — met ritme, sfeer en impact.”',
            author_name: 'Roel Bakker',
            author_role: 'Marketing Director',
            author_avatar_letter: 'R',
          }
        ];

        for (const t of testimonials) {
          const item = await client.items.create({
            item_type: { type: 'item_type', id: testimonialModel.id },
            quote: t.quote,
            author_name: t.author_name,
            author_role: t.author_role,
            author_avatar_letter: t.author_avatar_letter,
          });
          await client.items.publish(item.id);
        }
      } else {
        console.log("Testimonials already seeded.");
      }
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    if (error.errors) {
      console.error("API error during seeding:", JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error seeding data:", error);
    }
  }
}

run();
