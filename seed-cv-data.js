const { buildClient } = require('@datocms/cma-client-node');

const client = buildClient({ apiToken: 'f87387b6acebe5d7d76c560339731c' });

const NEW_EXPERIENCE = [
  {
    role: "UX/UI designer / Senior UX/UI Lead of business impact",
    company: "Webavance",
    period: "Aug 2018 — HEDEN",
    description: "UX/UI ontwerpen, begeleiding en advisering"
  },
  {
    role: "Freelance Designer",
    company: "Studio Maaijen",
    period: "Jan 2013 — HEDEN",
    description: "Mijn passie is het ontwerpen van indrukwekkende designs. Als freelance ontwerper van drukwerk en websites ontwerp, bewerk, realiseer en versterk ik het succes van bedrijven, logo's, flyers en designs van klanten. Gemakkelijk of complexe designs opmaken voor beurswanden tot social media posts. Van website en/of drukwerk tot aan animated HTML5 banners. Ervaring met html & css, en interactieve pdf's tot Adobe InDesign.\n• Ontwerp, visuele opbouw en pdf optimalisatie"
  },
  {
    role: "UX/UI - Allround ontwerper",
    company: "Delta3",
    period: "Apr 2017 — Aug 2018",
    description: "Ontwikkelen van de perfecte branding en identiteiten die nu en in de toekomst relevant blijven.\n• Leren werken met HTML5 banners\n• InDesign\n• Huisstijlen ontwerpen en logo's\n• PDF ontwerpen\n• Photoshop\n• Illustrator\n• Webdesign\n• Concepting\n• Animatie\n• Interactieve PDF\n• E-mail templates\n• Huisstijl ontwerpen en logo's"
  },
  {
    role: "Allround ontwerper",
    company: "Optima Forma bv",
    period: "Dec 2016 — Apr 2017",
    description: "Ontwikkelen en vormgeven van branding en identiteiten voor o.a. de Ministerie, Scania en het Week van het geld. Creëren van flyers, brochures, interactieve pdf's tot websites."
  },
  {
    role: "Grafisch ontwerper",
    company: "Npn communicatie",
    period: "2015 — 2016",
    description: "Ontwikkelen en vormgeven van infographic, huisstijlen en online media."
  },
  {
    role: "Webdesigner / Dtp-er",
    company: "Shoot Communications",
    period: "Aug 2014 — Okt 2015",
    description: "Redesignen van websites, webdesign, DTP werkzaamheden, ontwerpen van social media concepten en flyers. Creëren van huisstijlen, opzetten en verzenden van nieuwsbrieven."
  },
  {
    role: "Allround Grafisch ontwerper (Stagiair)",
    company: "Sportcreations / Casualcreations",
    period: "Sep 2013 — Jul 2014",
    description: "Mijn werkzaamheden bestonden uit het volgende:\n• Ontwerpen en onderhouden van websites\n• Ontwikkelen van social media concepten\n• E-flyers en nieuwsbrieven\n• Ontwerpen van posters en overig print producties\n• Ontwerpen van designs voor kleding/t-shirts/merchandises"
  },
  {
    role: "Grafisch ontwerper (Stagiair)",
    company: "Medevac",
    period: "Mei 2013 — Okt 2013",
    description: "Mijn werkzaamheden bestonden uit het volgende:\n• Ontwikkelen van social media concepten\n• E-flyers en nieuwsbrieven\n• Verrichten van marktonderzoeken"
  },
  {
    role: "Freelance grafisch ontwerper",
    company: "hetCV",
    period: "2013",
    description: "Mijn werkzaamheden bestonden uit het volgende:\n• Grafisch opmaken van Curriculum Vitaes\n• Het vernieuwen en vormgeven van Mailings"
  },
  {
    role: "Allround Dtp-er",
    company: "Stanvaste",
    period: "Sep 2009 — Mei 2010",
    description: "Mijn werkzaamheden bestonden uit het volgende:\n• Logo's / flyers ontwerpen\n• Web templates ontwerpen\n• Foto's bewerken en optimaliseren\n• Nieuwe huisstijlen creëren\n• Helpen bij het opzetten van een festival"
  },
  {
    role: "Allround Dtp-er (Stagiair)",
    company: "KuiperCompagnons",
    period: "Sep 2008 — Jun 2009",
    description: "Mijn werkzaamheden bestonden uit het volgende:\n• Intranet up-to-date houden\n• Logo's/flyers en web templates ontwerpen\n• Gegevens & plaatjes digitaliseren\n• Fotograferen tijdens cursussen\n• Leren werken met InDesign, Illustrator en Photoshop (Creative Suite)\nVaardigheden geleerd:\n• Met Photoshop & Flash leren animeren en een eigen game maken\n• Dtp werkzaamheden verrichten\n• Digitaliseren van data, foto's, kaarten etc."
  },
  {
    role: "ICT-er / Junior Dtp-er (Stagiair)",
    company: "Watchingme",
    period: "Sep 2006 — Jun 2007",
    description: "Mijn werkzaamheden bestonden uit het volgende:\n• Leren werken met Microsoft Visual Basic & Adobe Photoshop Elements\n• Het omrekenprogramma t.b.v. bedrijven"
  }
];

async function run() {
  try {
    console.log("Fetching CV Page singleton...");
    const items = await client.items.list({ filter: { type: 'cv_page' } });
    let cvPage = items[0];

    // 1. First, create modular block records for the experience
    console.log("Creating modular blocks for new experience list...");
    const blockModels = await client.itemTypes.list();
    const expModel = blockModels.find(m => m.api_key === 'experience_entry');
    
    if (!expModel) {
      throw new Error("Could not find 'experience_entry' block model. Did you run the setup script?");
    }

    const newBlocks = [];
    for (const exp of NEW_EXPERIENCE) {
      newBlocks.push({
        type: 'item',
        attributes: {
          role: exp.role,
          company: exp.company,
          period: exp.period,
          description: exp.description
        },
        relationships: {
          item_type: {
            data: { id: expModel.id, type: 'item_type' }
          }
        }
      });
    }

    // 2. Update or create the singleton record
    if (cvPage) {
      console.log("CV Page record exists. Updating it with new experience data...");
      await client.items.update(cvPage.id, {
        experience: newBlocks
      });
      console.log("✅ Updated successfully!");
    } else {
      console.log("CV Page record does not exist yet. Creating a new one...");
      const cvModel = blockModels.find(m => m.api_key === 'cv_page');
      await client.items.create({
        item_type: { type: 'item_type', id: cvModel.id },
        subtitle: "Ervaren UX/UI designer, video editor en brand creator met meer dan 20 jaar ervaring. Gepassioneerd door het creëren van digitale ervaringen die raken, overtuigen en blijven hangen.",
        location: "Nederland",
        availability: "Nu beschikbaar",
        level: "Senior Designer",
        focus: "UX/UI & Creatie",
        experience: newBlocks,
        technical_skills: JSON.stringify(["UX/UI Design", "Figma", "Photoshop", "Illustrator", "After Effects", "Adobe Premiere", "Indesign", "Branding", "Prototyping", "Research"]),
        soft_skills: JSON.stringify([{name: "Creativiteit", percent: 98}])
      });
      console.log("✅ Created new CV Page record successfully!");
    }
  } catch (err) {
    console.error("Error seeding data:", err);
  }
}

run();
