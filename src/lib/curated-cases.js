/* ─────────────────────────────────────────────────────────────
   Gecureerde Top-11 Portfolio Selectie voor Studio Maaijen
   - Gesynchroniseerd met eugenemaaijen-cv.nl (DatoCMS blijft intact)
   - Voegt VodafoneZiggo (ZTV), StudioChair, Ontdeklab, Sparkinson & LMSH toe
   - Voorziet Twelve Turns, Enova, Spotta, Blue Bricks en Antwerpen van actuele copy & mockups
   - Vrij van AI-slop, "//" tech-lijntjes en ruis
   ───────────────────────────────────────────────────────────── */

export const CURATED_ORDER = [
  'twelve-turns',
  'vodafoneziggo-ztv',
  'studiochair',
  'de-kindertelefoon',
  'calathea',
  'wooncompas',
  'ontdeklab',
  'enova',
  'spotta',
  'sparkinson',
  'bluebricks',
  'lmsh',
  'stad-antwerpen-sekswerkers',
];

const CURATED_SUMMARIES = {
  'de-kindertelefoon': {
    title: 'De Kindertelefoon',
    client: 'De Kindertelefoon',
    projectType: 'UX/UI & Research',
    categories: [{ name: 'UX/UI Design' }, { name: 'User Research' }],
    introText:
      'Mobile-first redesign voor 900+ dagelijkse hulpgesprekken: één heldere architectuur voor kinderen, ouders en vrijwilligers — gevalideerd met de Jongerenraad.',
  },
  'vodafoneziggo-ztv': {
    title: 'VodafoneZiggo (ZTV)',
    client: 'VodafoneZiggo',
    projectType: 'Enterprise Webapp',
    categories: [{ name: 'UX/UI Design' }, { name: 'Webapp' }],
    introText:
      'Maatwerk field-service portaal voor honderden monteurs onderweg: vernieuwde mobiele UX, snelle zoek-/filterlogica, favorieten en een inline PDF-lezer.',
  },
  'twelve-turns': {
    title: 'Twelve Turns',
    client: 'Twelve Turns',
    projectType: 'Creative Front-end & UX',
    categories: [{ name: 'Creative Dev' }, { name: 'Product UX' }],
    introText:
      'Interactieve Three.js WebGL-beleving, 12-punts SVG-weerstandstest en directe Stripe Checkout-drawer — volledig ontworpen en in browsercode gebouwd.',
  },
  studiochair: {
    title: 'StudioChair',
    client: 'StudioChair',
    projectType: 'Product Design & SaaS',
    categories: [{ name: 'UX/UI Design' }, { name: 'Creative Dev' }],
    introText:
      'Zelfstandig ontworpen en gebouwd boekingsplatform voor kappers: 4-staps afsprakenplanner met live Google Calendar-sync, Mollie iDEAL-aanbetaling en € 0,75 micro-fee.',
  },
  ontdeklab: {
    title: 'Ontdeklab',
    client: 'Ontdeklab / Digitale School Zuid-Nederland',
    projectType: 'EdTech Product UX & UI',
    categories: [{ name: 'UX/UI Design' }, { name: 'Design Systems' }],
    introText:
      'Digitaal leerplatform voor thuiszittende basisschoolleerlingen (bovenbouw): zelfstandige weekplanner Mijn Zelfstudie, Leerlab, Babbellab, Spiegellab en gedeelde dossieropvolging.',
  },
  enova: {
    title: 'Enova',
    client: 'Enova',
    projectType: 'B2B Platform & Systems',
    categories: [{ name: 'UX/UI Design' }, { name: 'Design Systems' }],
    introText:
      'Internationaal B2B-energieplatform (NL, UK, DE) voor 7 services en 6 industriële sectoren, opgebouwd vanuit een schaalbare modulaire componentbibliotheek.',
  },
  spotta: {
    title: 'Spotta',
    client: 'Spotta',
    projectType: 'High-Traffic Platform',
    categories: [{ name: 'UX/UI Design' }, { name: 'Information Architecture' }],
    introText:
      'Eén heldere homepage-routing voor 14,7 miljoen huishoudens, 19.000 bezorgers en zakelijke adverteerders — visueel verenigd met zusterplatform InMijnBus.',
  },
  sparkinson: {
    title: 'Sparkinson',
    client: 'Stichting Sparkinson',
    projectType: 'UX/UI & Accessibility',
    categories: [{ name: 'UX/UI Design' }, { name: 'User Research' }],
    introText:
      'Empathisch donatie- en verhalenplatform uitgewerkt van persona’s, sitemap en wireframes tot een hoog-contrast, toegankelijk responsive ontwerp.',
  },
  bluebricks: {
    title: 'Blue Bricks',
    client: 'Blue Bricks',
    projectType: 'Design System & Handoff',
    categories: [{ name: 'UX/UI Design' }, { name: 'Design Systems' }],
    introText:
      'Van strategische discovery en interactieve prototypes tot een volledig gedocumenteerd Figma Design System met tokens voor directe development-overdracht.',
  },
  lmsh: {
    title: 'LMSH — Love Me Some Hair',
    client: 'LMSH',
    projectType: 'Motion Design & Art Direction',
    categories: [{ name: 'Motion Design' }, { name: 'Brand Identity' }],
    introText:
      'Kleurrijke merk- en promotie-animatie in After Effects voor het eerste online platform dat afro-kappers, hairstylisten en klanten in Nederland en België verbindt.',
  },
  'stad-antwerpen-sekswerkers': {
    title: 'Stad Antwerpen',
    client: 'Stad Antwerpen',
    projectType: 'Motion Design & 2D-Animatie',
    categories: [{ name: 'Motion Design' }, { name: '2D Animatie' }],
    introText:
      'Van eigen straatfotografie en interieurresearch op locatie naar een toegankelijke 2D-voorlichtingsanimatie in After Effects over veiligheid voor sekswerkers.',
  },
  calathea: {
    title: 'Calathea',
    client: 'Calathea',
    projectType: 'UX/UI & Website Redesign',
    categories: [{ name: 'UX/UI Design' }, { name: 'User Research' }],
    introText:
      'Levendig UX/UI-redesign voor de grootste Calathea-community: van gebruikersonderzoek en Before & After tot wireframes, verzorgingstips en winacties.',
  },
  wooncompas: {
    title: 'Wooncompas',
    client: 'Wooncompas',
    projectType: 'UX/UI & Werkenbij Website',
    categories: [{ name: 'UX/UI Design' }, { name: 'Design Systems' }],
    introText:
      'Sollicitantgerichte werken-bij website voor woningcorporatie Wooncompas in Ridderkerk: van persona’s en user flows tot een toegankelijk design system en vacatureplatform.',
  },
};

/* Standalone cases (niet in gedeelde DatoCMS, wel in het CV) */
export const STANDALONE_CASES = {
  wooncompas: {
    id: 'local-wooncompas',
    slug: 'wooncompas',
    title: 'Wooncompas',
    client: 'Wooncompas',
    projectType: 'UX/UI & Werkenbij Website',
    categories: [{ name: 'UX/UI Design' }, { name: 'Design Systems' }],
    introText: CURATED_SUMMARIES.wooncompas.introText,
    coverImage: {
      url: '/images/cases/wooncompas/01-hero-macbook.webp',
      alt: 'Wooncompas werken-bij website — MacBook Pro mockup',
    },
    pageBuilder: [
      {
        id: 'wooncompas-1',
        _modelApiKey: 'block_text',
        title: 'De opdracht: een menselijke werken-bij ervaring',
        subtitle: 'Context & doelstelling',
        darkTheme: false,
        content:
          '<p>Woningcorporatie Wooncompas uit Ridderkerk zocht een nieuwe werken-bij website waarop vacatures, de maatschappelijke missie en de persoonlijke werkcultuur direct samenkomen. Sollicitanten moeten snel zien waar Wooncompas voor staat en zonder drempels kunnen reageren.</p>',
      },
      {
        id: 'wooncompas-2',
        _modelApiKey: 'block_text',
        title: 'Onderzoek, persona’s en informatiearchitectuur',
        subtitle: 'UX Research & structuur',
        darkTheme: true,
        content:
          '<p>Het traject startte met doelgroeponderzoek, persona’s en user stories om de belangrijkste behoeften van sollicitanten scherp te krijgen. Op basis daarvan zijn een overzichtelijke sitemap, user flows en wireframes opgebouwd rond vier kernroutes:</p><ul><li><strong>Direct naar vacatures:</strong> snel filteren en direct inzicht in functie-eisen, arbeidsvoorwaarden en het sollicitatieproces.</li><li><strong>Verhalen van collega’s:</strong> echte medewerkers aan het woord voor een authentiek beeld van de werkvloer.</li><li><strong>Over de organisatie:</strong> missie, visie en maatschappelijke impact helder gepresenteerd.</li><li><strong>Open sollicitatie &amp; contact:</strong> laagdrempelige instap zonder onnodige formulierdrempels.</li></ul>',
      },
      {
        id: 'wooncompas-3',
        _modelApiKey: 'block_double_image',
        imageLeft: {
          url: '/images/cases/wooncompas/02-mobile-screens.webp',
          alt: 'Mobiele schermen van de Wooncompas werken-bij website in iPhone-mockups',
        },
        imageRight: {
          url: '/images/cases/wooncompas/03-macbook-vacature.webp',
          alt: 'MacBook Pro mockup van de Wooncompas vacaturedetailpagina',
        },
      },
      {
        id: 'wooncompas-4',
        _modelApiKey: 'block_text',
        title: 'Design system & visuele uitvoering',
        subtitle: 'UI Design & resultaat',
        darkTheme: false,
        content:
          '<p>Voor de visuele laag is een herkenbaar design system opgezet waarin het krachtige Wooncompas-magenta en frisse groenaccenten samenkomen met heldere Montserrat-typografie en authentieke fotografie. Door iteratieve feedbackloops ontstond een toegankelijk, responsief platform dat op tijd en klaar voor gebruik is opgeleverd.</p>',
      },
    ],
  },
  calathea: {
    id: 'local-calathea',
    slug: 'calathea',
    title: 'Calathea',
    client: 'Calathea',
    projectType: 'UX/UI & Website Redesign',
    categories: [{ name: 'UX/UI Design' }, { name: 'User Research' }],
    introText: CURATED_SUMMARIES.calathea.introText,
    coverImage: {
      url: '/images/cases/calathea/01-hero.webp',
      alt: 'Calathea website redesign — iMac mockup',
    },
    pageBuilder: [
      {
        id: 'calathea-1',
        _modelApiKey: 'block_text',
        title: 'De opdracht: een levendig community-platform',
        subtitle: 'Context & doelstelling',
        darkTheme: false,
        content:
          '<p>De bestaande website van Calathea oogde vlak en bood weinig inspiratie of interactie. De opdracht: ontwerp een frisse, speelse en toegankelijke online omgeving waar plantenliefhebbers terechtkunnen voor verzorgingstips, verhalen, winacties en community-gevoel.</p>',
      },
      {
        id: 'calathea-2',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/calathea/02-research.webp',
          alt: 'Calathea UX-onderzoek, rol, bevindingen en mobiele hero',
        },
      },
      {
        id: 'calathea-3',
        _modelApiKey: 'block_text',
        title: 'Van gebruikersonderzoek naar Before & After',
        subtitle: 'UX Research & structuur',
        darkTheme: true,
        content:
          '<p>Op basis van enquêtes en een analyse van de oude site kwamen vijf duidelijke verbeterpunten naar voren: overzichtelijkere navigatie, meer speelsheid en beleving, ruimte voor community, directe verzorgingsinspiratie en laagdrempelige interactie via winacties.</p>',
      },
      {
        id: 'calathea-4',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/calathea/03-before-after.webp',
          alt: 'Calathea homepage Before & After vergelijking',
        },
      },
      {
        id: 'calathea-5',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/calathea/04-wireframes-ui.webp',
          alt: 'Calathea desktop en mobiele wireframes en uitgewerkte User Interface',
        },
      },
      {
        id: 'calathea-6',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/calathea/05-screens.webp',
          alt: 'Calathea schermen voor Winacties, Voedingstips en Blogverhalen',
        },
      },
      {
        id: 'calathea-7',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/calathea/06-conclusion.webp',
          alt: 'Calathea tablet en mobiele schermen en conclusie',
        },
      },
    ],
  },
  'vodafoneziggo-ztv': {
    id: 'local-vodafoneziggo-ztv',
    slug: 'vodafoneziggo-ztv',
    title: 'VodafoneZiggo (ZTV)',
    client: 'VodafoneZiggo',
    projectType: 'Enterprise Webapp',
    categories: [{ name: 'UX/UI Design' }, { name: 'Webapp' }],
    introText: CURATED_SUMMARIES['vodafoneziggo-ztv'].introText,
    coverImage: {
      url: '/images/cases/ztv-hero-mockup.jpg',
      alt: 'VodafoneZiggo ZTV portaal — MacBook Pro en iPhone studio-mockup',
    },
    pageBuilder: [
      {
        id: 'ztv-1',
        _modelApiKey: 'block_text',
        title: 'Het vraagstuk: technische documentatie onderweg',
        subtitle: 'Context & doelgroep',
        darkTheme: false,
        content:
          '<p>VodafoneZiggo heeft dagelijks honderden buitendienstmonteurs onderweg door heel Nederland. Zij werken met een grote variëteit aan netwerkproducten en moeten op locatie direct toegang hebben tot de meest actuele werkinstructies, coax-eisen en installatiekaarten.</p><p>Het bestaande ZTV-portaal sloot niet meer aan op mobiel en tabletgebruik in het veld. Documenten waren lastig te vinden en moesten telkens verplicht als losse PDF gedownload worden.</p>',
      },
      {
        id: 'ztv-2',
        _modelApiKey: 'block_text',
        title: 'Co-creatie van wireframe naar interface',
        subtitle: 'Mijn rol & aanpak',
        darkTheme: true,
        content:
          '<p>In nauwe co-creatie met de werkgroep en het IT-team van VodafoneZiggo begeleidde ik het UX/UI-redesign van de eerste schetsen en wireframes tot het definitieve ontwerp. In korte sprints testten we elke iteratie direct met de doelgroep.</p><ul><li><strong>Mobile &amp; tablet eerst:</strong> ontworpen voor eenhandig gebruik en directe leesbaarheid in het veld.</li><li><strong>Vernieuwde zoek- en filterfunctie:</strong> monteurs filteren direct op installatiekaart, productgroep of probleemstelling.</li><li><strong>Favorieten &amp; archief:</strong> veelgebruikte instructies vastpinnen voor directe toegang zonder opnieuw zoeken.</li><li><strong>Inline PDF-lezer:</strong> documenten direct in de browser bekijken zonder verplicht downloaden op de telefoon.</li></ul>',
      },
      {
        id: 'ztv-3',
        _modelApiKey: 'block_double_image',
        imageLeft: {
          url: '/images/cases/ztv-mobile-pair.jpg',
          alt: 'Losse iPhone device-mockups van de mobiele zoekfilter en werkinstructie PDF-lezer',
        },
        imageRight: {
          url: '/images/cases/ztv-desktop-studio.jpg',
          alt: 'MacBook Pro mockup van de vernieuwde VodafoneZiggo ZTV portaalomgeving',
        },
      },
      {
        id: 'ztv-4',
        _modelApiKey: 'block_text',
        title: 'Resultaat & oplevering',
        subtitle: 'Impact',
        darkTheme: false,
        ctaLabel: 'Bekijk case op Behance',
        ctaUrl: 'https://www.behance.net/gallery/209461457/VodafoneZiggo-(ZTV)-UXUI',
        content:
          '<p>Het resultaat is een maatwerk webapplicatie (v1.0) waarin honderden monteurs onderweg sneller en zonder tussenstappen de juiste technische documentatie raadplegen. Dankzij de sprint-aanpak met vroege feedbacksessies lag er direct een gedragen release samen met het IT-team van VodafoneZiggo.</p>',
      },
    ],
  },
  sparkinson: {
    id: 'local-sparkinson',
    slug: 'sparkinson',
    title: 'Sparkinson',
    client: 'Stichting Sparkinson',
    projectType: 'UX/UI & Accessibility',
    categories: [{ name: 'UX/UI Design' }, { name: 'User Research' }],
    introText: CURATED_SUMMARIES.sparkinson.introText,
    coverImage: {
      url: '/images/cases/sparkinson-mockup-hero.jpg',
      alt: 'Stichting Sparkinson — MacBook Pro en iPhone studio-mockup van het platform',
    },
    pageBuilder: [
      {
        id: 'sp-1',
        _modelApiKey: 'block_text',
        title: 'De mens achter de ziekte zichtbaar maken',
        subtitle: 'Vraagstuk & doelen',
        darkTheme: false,
        content:
          '<p>Stichting Sparkinson, opgericht door Paul van Wijnen, helpt Parkinsonpatiënten in financiële en emotionele nood aan een dagje weg of een moment van rust. Bestaande platforms zijn vaak puur medisch of zakelijk van toon en missen de persoonlijke laag.</p><p>De opdracht: ontwerp een toegankelijke, menselijke website die donatiegemak combineert met visuele storytelling en directe betrokkenheid.</p>',
      },
      {
        id: 'sp-2',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/sparkinson-mockup-tablet.jpg',
          alt: 'iPad Pro en iPhone studio-mockup van Stichting Sparkinson',
        },
      },
      {
        id: 'sp-3',
        _modelApiKey: 'block_text',
        title: 'Persona’s, informatiearchitectuur & toegankelijk ontwerp',
        subtitle: 'Onderzoek & structuur',
        darkTheme: true,
        content:
          '<p>Om de navigatie en toon zuiver af te stemmen, werkte ik twee doelgroep-persona’s uit (de steunende donateur en de geïnspireerde bezoeker) en bracht ik de volledige sitemap terug tot vijf logische hoofdpagina’s: Verhalen, Over ons, Sponsor worden, Doneren en Contact.</p><p>Voor de visuele uitwerking koos ik voor het helder leesbare lettertype Akatab en een hoog-contrast kleursysteem (#1F1F1F, #290460, #4E12A6 met geel actie-accent) dat op zowel desktop als mobiel direct rust en actie uitstraalt.</p>',
      },
      {
        id: 'sp-4',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/sparkinson-mockup-mobile-trio.jpg',
          alt: 'Drieluik iPhone device-mockups: mobiel menu, missie & visie en directe contactsectie',
        },
      },
      {
        id: 'sp-6',
        _modelApiKey: 'block_text',
        title: 'Een laagdrempelige flow van verhaal naar donatie',
        subtitle: 'Oplevering',
        darkTheme: false,
        ctaLabel: 'Bekijk case op Behance',
        ctaUrl: 'https://www.behance.net/gallery/235132389/Sparkinson-UXUI',
        content:
          '<p>Via een split-screen opbouw rondom het verhaal van Paul, drie duidelijke impact-pijlers en een vereenvoudigde donatie- en sponsorflow is het platform volledig uitgewerkt van wireframe tot responsive UI voor desktop, tablet en mobiel.</p>',
      },
    ],
  },
  lmsh: {
    id: 'local-lmsh',
    slug: 'lmsh',
    title: 'LMSH — Love Me Some Hair',
    client: 'LMSH',
    projectType: 'Motion Design & Art Direction',
    categories: [{ name: 'Motion Design' }, { name: 'Brand Identity' }],
    introText: CURATED_SUMMARIES.lmsh.introText,
    coverImage: {
      url: '/images/cases/lmsh-cover.jpg',
      alt: 'LMSH (Love Me Some Hair) — art direction en promotie-animatie',
    },
    pageBuilder: [
      {
        id: 'lmsh-1',
        _modelApiKey: 'block_text',
        title: 'Het eerste platform voor afro-kappers en hairstylisten',
        subtitle: 'Vraagstuk & merkpositie',
        darkTheme: false,
        content:
          '<p>LMSH (Love Me Some Hair) is het eerste online platform dat afro-kappers, zelfstandige hairstylisten en klanten in Nederland en België op één plek samenbrengt. Waar het aanbod jarenlang versnipperd was, biedt LMSH één overzichtelijk en trots digitaal podium.</p><p>De opdracht: ontwerp en animeer een energieke promotieclip die direct de trots, kleur en energie van de community vangt en het platform op social en web lanceert.</p>',
      },
      {
        id: 'lmsh-video',
        _modelApiKey: 'block_video',
        title: 'Promotie-animatie — LMSH (Love Me Some Hair)',
        video: {
          url: '/videos/lmsh-promo.mp4',
          mimeType: 'video/mp4',
        },
      },
      {
        id: 'lmsh-2',
        _modelApiKey: 'block_text',
        title: 'Ritmische typografie, kleurvlak-transities & portret-art direction',
        subtitle: 'Motion Design & uitvoering',
        darkTheme: true,
        content:
          '<p>In After Effects, Illustrator en Photoshop combineerde ik krachtige studio-portretten op verzadigde kleurvlakken met strakke, ritmische typografie en handgetekende frame-accenten (Wacom Intuos). De cuts en overgangen volgen het tempo van de track, zodat elk portret en elke statement-regel op zowel desktop als mobiele feeds direct de aandacht pakt.</p>',
      },
      {
        id: 'lmsh-grid',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/lmsh-grid.jpg',
          alt: 'LMSH kleurenpalet en serie studio-portretten uit de motion-campagne',
        },
      },
      {
        id: 'lmsh-3',
        _modelApiKey: 'block_text',
        title: 'Lancering & merkherkenning',
        subtitle: 'Resultaat',
        darkTheme: false,
        content:
          '<p>De promotieclip vormde het visuele startschot voor LMSH in Nederland en België en legde tegelijkertijd de kleurentaal en typografische kaders vast voor de verdere online uitingen van het platform.</p>',
      },
    ],
  },
  studiochair: {
    id: 'local-studiochair',
    slug: 'studiochair',
    title: 'StudioChair',
    client: 'StudioChair (Eigen product)',
    projectType: 'Product Design & SaaS',
    categories: [{ name: 'UX/UI Design' }, { name: 'Creative Dev' }],
    introText: CURATED_SUMMARIES.studiochair.introText,
    coverImage: {
      url: '/images/cases/studiochair-mockup-hero.jpg',
      alt: 'StudioChair B2B-platform — eigen boekingssoftware voor kappers en barbershops met € 0,75 micro-fee',
    },
    pageBuilder: [
      {
        id: 'sc-1',
        _modelApiKey: 'block_text',
        title: 'Van 35% platformcommissie naar € 0,75 per boeking',
        subtitle: 'Eigen SaaS-product & propositie',
        darkTheme: false,
        content:
          '<p>Veel kappers en barbershops betalen via marktplaatsen tot 35% commissie (€ 15 tot € 25) per nieuwe klant en zitten vast aan starre contracten. Met StudioChair ontwikkelde ik zelfstandig een alternatief: een maatwerk salon-website mét eigen 4-staps afsprakenplanner voor € 0,75 micro-fee per boeking.</p><p>De B2B-landingspagina draait om één directe rekensom: bezoekers berekenen realtime hoeveel jaarlijkse winst ze terugwinnen en testen direct de interactieve salon-showroom zonder eerst een demo-call te hoeven inplannen.</p>',
      },
      {
        id: 'sc-demo-img',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/studiochair-mockup-demo.jpg',
          alt: 'StudioChair live kappersdemo Atelier Eugène — directe stoelbeschikbaarheid en merkpresentatie',
        },
      },
      {
        id: 'sc-2',
        _modelApiKey: 'block_text',
        title: 'Vier-staps boekingsflow met Google Calendar & Mollie',
        subtitle: 'UX-architectuur & front-end',
        darkTheme: true,
        content:
          '<p>In de 4-staps planner (Behandeling → Kapper → Moment → Bevestiging) kiest een klant in minder dan dertig seconden een tijdslot. Rechts loopt een live overzichtslijst ("Jouw bon") mee zodat prijs, duur en gekozen stylist op elk schermformaat helder blijven.</p><p>Technisch ontworpen en uitgebouwd met Next.js, Tailwind CSS, Framer Motion, live tweeweg-synchronisatie met Google Calendar en geïntegreerde iDEAL-aanbetaling via Mollie om no-shows te minimaliseren.</p>',
      },
      {
        id: 'sc-book-img',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/studiochair-mockup-boeken.jpg',
          alt: 'StudioChair 4-staps boekingsflow met categorie-filters, behandelduur en live prijsbon',
        },
      },
      {
        id: 'sc-3',
        _modelApiKey: 'block_text',
        title: 'Van eigen ontwerp naar werkende webapplicatie',
        subtitle: 'Live product',
        darkTheme: false,
        ctaLabel: 'Bekijk studiochair.nl live',
        ctaUrl: 'https://studiochair.nl/',
        content:
          '<p>StudioChair brengt positionering, merkidentiteit, conversiegericht UI-ontwerp en production-grade React-code samen in één product — inclusief interactieve besparingscalculator, showroom-omgeving (Atelier Eugène) en directe boekingsengine.</p>',
      },
    ],
  },
  ontdeklab: {
    id: 'local-ontdeklab',
    slug: 'ontdeklab',
    title: 'Ontdeklab',
    client: 'Ontdeklab / Digitale School Zuid-Nederland',
    projectType: 'EdTech Product UX & UI',
    categories: [{ name: 'UX/UI Design' }, { name: 'Design Systems' }],
    introText: CURATED_SUMMARIES.ontdeklab.introText,
    coverImage: {
      url: '/images/cases/ontdeklab-mockup-hero.jpg',
      alt: 'Ontdeklab webapplicatie — interactieve dag- en weekplanner Mijn Zelfstudie voor bovenbouwleerlingen',
    },
    pageBuilder: [
      {
        id: 'ol-1',
        _modelApiKey: 'block_text',
        title: 'Digitaal maatwerkonderwijs voor thuiszittende leerlingen',
        subtitle: 'Vraagstuk & maatschappelijke context',
        darkTheme: false,
        content:
          '<p>Ontdeklab is een digitaal leerplatform in ontwikkeling binnen Digitale School Zuid-Nederland (opgericht door acht regionale samenwerkingsverbanden voor primair onderwijs). Het platform ondersteunt thuiszittende bovenbouwleerlingen bij het houden van structuur, leerplezier en contact met school.</p><p>De uitdaging in het productontwerp: een veilige, prikkelarme leeromgeving neerzetten die direct intuïtief werkt voor kinderen van 9 tot 12 jaar én overzicht biedt voor docenten en intern begeleiders.</p>',
      },
      {
        id: 'ol-video',
        _modelApiKey: 'block_video',
        title: 'Productrondleiding — Ontdeklab Introductie (01:52)',
        externalVideoUrl: 'https://player.vimeo.com/video/1189653354',
        ctaLabel: 'Open video op Vimeo',
        ctaUrl: 'https://player.vimeo.com/video/1189653354',
      },
      {
        id: 'ol-2',
        _modelApiKey: 'block_text',
        title: 'Mijn Zelfstudie, Leerlab, Babbellab & Spiegellab',
        subtitle: 'Module-architectuur & interface',
        darkTheme: true,
        content:
          '<p>In de weekplanner Mijn Zelfstudie zien leerlingen één helder dagschema met vaste docentmomenten (zoals rekenen in Gynzy of klassikale quizzes) en open sleutelblokken waarin ze zelf extra oefentijd voor lezen, spelling of tekenen slepen — gekoppeld aan een rustige dagvoortgangsbalk.</p><p>Dezelfde vormentaal verbindt de andere hoofdmodules: Leerlab voor lesstof en opdrachten, Babbellab voor veilig contact en Spiegellab voor reflectie, aangevuld met een gedeeld leerlingenoverzicht tussen digitaal docent, basisschooldocent en intern begeleider.</p>',
      },
      {
        id: 'ol-3',
        _modelApiKey: 'block_text',
        title: 'Eigenaarschap voor het kind, rust voor het begeleidingsteam',
        subtitle: 'Productstatus',
        darkTheme: false,
        ctaLabel: 'Bekijk ontdeklab.nl',
        ctaUrl: 'https://ontdeklab.nl/',
        content:
          '<p>Ontdeklab laat zien hoe hoog-contrast typografie, consistente kleurcodering (vastgezet door docent versus zelf gepland) en taakgerichte navigatie complexe begeleidingsprocessen terugbrengen tot een toegankelijke dagelijkse leerroutine.</p>',
      },
    ],
  },
};

/* Tekst-opschoning & aanscherping voor bestaande DatoCMS-cases (zonder DatoCMS te breken) */
const TEXT_ENHANCEMENTS = {
  'twelve-turns': {
    coverImage: {
      url: '/images/cases/twelveturns-mockup-hero.jpg',
      alt: 'Twelve Turns — MacBook Pro en iPhone studio-mockup van de Three.js WebGL beleving',
    },
    extraMedia: [
      {
        id: 'tt-sim',
        _modelApiKey: 'block_image',
        image: {
          url: '/images/cases/twelveturns-mockup-simulator.jpg',
          alt: 'MacBook Pro en iPhone mockup van de interactieve 12-punts SVG weerstandstest',
        },
      },
      {
        id: 'tt-specs-checkout',
        _modelApiKey: 'block_double_image',
        imageLeft: {
          url: '/images/cases/twelveturns-mockup-specs.jpg',
          alt: 'MacBook Pro mockup van het millimeter-blueprint en productspecificaties',
        },
        imageRight: {
          url: '/images/cases/twelveturns-mockup-checkout.jpg',
          alt: 'MacBook Pro en iPhone mockup van de pakketkeuze en Stripe Checkout-drawer',
        },
      },
    ],
    blocks: [
      {
        id: 'tt-b1',
        _modelApiKey: 'block_text',
        title: 'Van fysieke frustratie naar tastbare webbeleving',
        subtitle: 'Vraagstuk & concept',
        darkTheme: false,
        content:
          '<p>Een cadeaubon overhandigen duurt twee seconden: envelop open, pasje eruit, klaar. Twelve Turns maakt van dat moment een fysieke én digitale ervaring — een robuust doosje vergrendeld met twaalf echte inbusbouten, waarvan het sleuteltje in de strik verstopt zit.</p><p>De uitdaging voor het webplatform: bezoekers moesten die tactiele spanning en het mechanische vakmanschap online direct kunnen voelen voordat ze bestellen.</p>',
      },
      {
        id: 'tt-b2',
        _modelApiKey: 'block_text',
        title: 'Realtime 3D WebGL, custom shaders & interactieve SVG-test',
        subtitle: 'Creative Front-end & UX',
        darkTheme: true,
        content:
          '<p>In de hero stuurt Lenis smooth scroll een realtime Three.js-scène aan via GSAP ScrollTrigger. Tijdens het scrollen draaien de twaalf bouten met een 720° schroefbeweging omhoog, gevolgd door een exploded-view van het deksel, de cadeaukaart en de behuizing.</p><p>Daarnaast bouwde ik een interactieve 12-punts SVG-simulator met live stopwatch en contextuele cursor ("Houd vast"): bezoekers ervaren zelf hoe lang het kost om bouten los te draaien voordat ze naar de slide-over Stripe Checkout-drawer (iDEAL, Apple Pay, Bancontact) gaan.</p>',
      },
      {
        id: 'tt-b3',
        _modelApiKey: 'block_text',
        title: 'Techniek & conversiegerichte checkout',
        subtitle: 'Architectuur & resultaat',
        darkTheme: false,
        ctaLabel: 'Bekijk twelveturns.nl live',
        ctaUrl: 'https://www.twelveturns.nl',
        content:
          '<p>Ontworpen en gebouwd zonder zware externe UI-frameworks voor maximale laadsnelheid, met een parametrisch CAD-ontwerp (21 mm brievenbusformaat), zelf-tekenend SVG-blueprint, bundelkeuze met live prijsberekening en directe Stripe Checkout-koppeling.</p>',
      },
    ],
  },
  enova: {
    coverImage: {
      url: '/images/cases/enova-cover-hand.jpg',
      alt: 'Enova — Mobiele website op iPhone 16 Pro in hand in architecturale studio-omgeving',
    },
    blocks: [
      {
        id: 'en-1',
        _modelApiKey: 'block_text',
        title: 'Een scherp B2B-platform voor realtime energiesturing',
        subtitle: 'Vraagstuk & context',
        darkTheme: false,
        content:
          '<p>Enova — onderdeel van Vitec Software Group en actief in 12 landen — transformeert industriële assets naar actieve spelers op de day-ahead, intraday en balanceringsmarkt. Hun propositie is direct: stop met achteraf kijken, begin met realtime sturen.</p><p>De opdracht: bouw een digitale presence voor Nederland, het Verenigd Koninkrijk en Duitsland die autoriteit en technische diepgang uitstraalt voor operations directors, CFO’s en energiemanagers.</p>',
      },
      {
        id: 'en-2',
        _modelApiKey: 'block_text',
        title: 'Modulaire UI-architectuur voor 7 services en 6 sectoren',
        subtitle: 'Mijn rol & aanpak',
        darkTheme: true,
        content:
          '<p>Vanuit een eerste conceptuele opzet werkte ik de volledige visuele taal, typografische hiërarchie en modulaire componentbibliotheek uit. De navigatiestructuur verbindt twee assen — services en sectoren — zodat een glastuinder en een logistiek directeur beiden in twee klikken de juiste businesscase vinden.</p><p>Daarnaast ontwierp ik voor iedere module het responsive gedrag als zelfstandige UX-beslissing, zodat complexe datablokken ook op een 390px smartphone scherp en scanbaar blijven.</p>',
      },
      {
        id: 'en-3',
        _modelApiKey: 'block_text',
        title: 'Internationaal schaalbaar over drie markten',
        subtitle: 'Resultaat',
        darkTheme: false,
        content:
          '<p>Eén consistente visuele en component-architectuur draait nu voor Nederland, het Verenigd Koninkrijk en Duitsland, verbonden via een centrale Europese landingspagina met interactieve kaart. Nieuwe landenmarkten kunnen zonder ontwerp- of structuurverlies op hetzelfde systeem worden aangesloten.</p>',
      },
    ],
  },
  spotta: {
    blocks: [
      {
        id: 'spotta-1',
        _modelApiKey: 'block_text',
        title: 'Drie tegengestelde doelgroepen op één homepage',
        subtitle: 'Vraagstuk & UX-strategie',
        darkTheme: false,
        content:
          '<p>Spotta bereikt wekelijks 14,7 miljoen Nederlandse huishoudens met 19.000 bezorgers. De oude website was lineair opgebouwd, lastig te navigeren en visueel losgeraakt van zusterplatform InMijnBus (dat ik eerder vernieuwde).</p><p>Ik ontwierp een modulaire structuur waarin de homepage zelf routeert: zakelijke adverteerders, toekomstige bezorgers en consumenten herkennen binnen seconden hun eigen ingang met één duidelijke volgende stap.</p>',
      },
      {
        id: 'spotta-2',
        _modelApiKey: 'block_text',
        title: 'Eén merkfamilie met InMijnBus & verklarende 2D-animatie',
        subtitle: 'Uitvoering & impact',
        darkTheme: true,
        content:
          '<p>Kleurgebruik, kaartcomponenten en typografische ritmes van InMijnBus en Spotta zijn op elkaar afgestemd tot één samenhangende merkfamilie. Daarnaast ontwierp en animeerde ik een verklarende 2D-animatie voor adverteerders die laat zien hoe datagedreven wijkselectie (200+ databronnen) in de praktijk werkt.</p>',
      },
    ],
  },
  bluebricks: {
    coverImage: {
      url: '/images/cases/bluebricks-cover-hand.jpg',
      alt: 'Blue Bricks — Mobiele website op iPhone 16 Pro in hand met klantverhalen en kerncijfers',
    },
    blocks: [
      {
        id: 'bb-1',
        _modelApiKey: 'block_text',
        title: 'Van strategische discovery naar Figma Design System',
        subtitle: 'Aanpak & oplevering',
        darkTheme: false,
        content:
          '<p>Blue Bricks begeleidt organisaties bij verandering van binnenuit — hands-on, zonder dikke rapporten. Na een gerichte discovery-sessie vertaalde ik die daadkracht naar een krachtig grid, low-fidelity flows en interactieve prototypes om direct op gebruik te testen voordat er code werd geschreven.</p><p>Voor een snelle, foutloze overdracht aan development leverde ik een volledig gespecificeerd Figma-systeem op met gedocumenteerde componenten, design tokens en interactiestaten.</p>',
      },
    ],
  },
  'stad-antwerpen-sekswerkers': {
    customPageBuilder: [
      {
        id: 'sa-1',
        _modelApiKey: 'block_text',
        title: 'Veiligheid tastbaar en herkenbaar maken voor de doelgroep',
        subtitle: 'Vraagstuk & publieke context',
        darkTheme: false,
        content:
          '<p>Voor Stad Antwerpen (in samenwerking met L&amp;R Vastgoed NV) ontwikkelde ik een toegankelijke voorlichtingsanimatie over veiligheid voor sekswerkers in het Schipperskwartier. Geen generieke overheidsvideo, maar een visueel verhaal dat direct aansluit op de dagelijkse werkelijkheid van de doelgroep.</p><p>Ik voerde het traject van A tot Z zelfstandig uit: van veldonderzoek op locatie en art direction tot illustratie en de volledige 2D-animatie in After Effects.</p>',
      },
      {
        id: 'sa-2',
        _modelApiKey: 'block_text',
        title: 'Van eigen straatfotografie op locatie naar After Effects',
        subtitle: 'Veldonderzoek & Motion Design',
        darkTheme: true,
        content:
          '<p>Ik begon niet achter een tekentablet, maar op straat in Antwerpen. Door zelf de gevels, straten en zichtlijnen te fotograferen — aangevuld met interieurmateriaal van de werkruimtes vanuit L&amp;R Vastgoed NV — kreeg elke scène een herkenbare architectonische basis.</p><p>Vervolgens vertaalde ik de gefotografeerde panden, kamers en veiligheidsprocedures stap voor stap naar heldere 2D-vectorillustraties en vloeiende scène-overgangen in After Effects.</p>',
      },
      {
        id: 'sa-img-1',
        _modelApiKey: 'block_double_image',
        imageLeft: {
          url: 'https://www.datocms-assets.com/212359/1784753649-sekswerkers03.webp',
          alt: 'Geanimeerde interieurdetails en hygiëne-instructies op basis van de echte werkruimtes',
        },
        imageRight: {
          url: 'https://www.datocms-assets.com/212359/1784837548-antwerpen05.webp',
          alt: '2D-scène van de binnenruimtes, gangen en brandveiligheidsvoorzieningen',
        },
      },
      {
        id: 'sa-img-2',
        _modelApiKey: 'block_double_image',
        imageLeft: {
          url: 'https://www.datocms-assets.com/212359/1784837855-antwerpen06.webp',
          alt: 'Hulpverlening en aanspreekpunten tegen de skyline van Antwerpen',
        },
        imageRight: {
          url: 'https://www.datocms-assets.com/212359/1784837904-antwerpen07.webp',
          alt: 'Heldere medische voorlichting in toegankelijke vormentaal',
        },
      },
      {
        id: 'sa-3',
        _modelApiKey: 'block_text',
        title: 'Heldere publieke communicatie zonder taalbarrière',
        subtitle: 'Resultaat & impact',
        darkTheme: false,
        ctaLabel: 'Bekijk op Vimeo',
        ctaUrl: 'https://vimeo.com/385931938',
        content:
          '<p>Dankzij de herkenbare weergave van de eigen werkomgeving en een rustige visuele opbouw brengt de animatie essentiële veiligheids- en gezondheidsinformatie over voor een meertalige doelgroep in Antwerpen.</p>',
      },
    ],
  },
};

export function curateProjects(datoProjects = []) {
  const bySlug = new Map((datoProjects || []).map(p => [p.slug, p]));
  const result = [];

  for (const slug of CURATED_ORDER) {
    const summary = CURATED_SUMMARIES[slug];
    if (STANDALONE_CASES[slug]) {
      result.push({
        ...STANDALONE_CASES[slug],
        ...summary,
      });
      continue;
    }

    const dato = bySlug.get(slug);
    if (!dato) continue;

    const enhancement = TEXT_ENHANCEMENTS[slug];
    result.push({
      ...dato,
      ...summary,
      coverImage: enhancement?.coverImage || dato.coverImage,
      pageBuilder: buildEnhancedPageBuilder(slug, dato.pageBuilder, enhancement),
    });
  }

  return result;
}

function buildEnhancedPageBuilder(slug, rawBlocks = [], enhancement) {
  if (!enhancement) return rawBlocks;
  if (enhancement.customPageBuilder) return enhancement.customPageBuilder;

  // Behoud alle originele DatoCMS afbeeldingen/video's, maar vervang slordige tekstblokken door strakke copy
  const mediaBlocks = (rawBlocks || []).filter(b =>
    ['block_image', 'block_video', 'block_double_image'].includes(b?._modelApiKey)
  );
  const zebraImages = (rawBlocks || [])
    .filter(b => (b?._modelApiKey === 'block_zebra' || b?._modelApiKey === 'block_image_text') && b.image?.url)
    .map(b => ({
      id: `${b.id}-img`,
      _modelApiKey: 'block_image',
      image: b.image,
    }));

  const allMedia = [...(enhancement.extraMedia || []), ...mediaBlocks, ...zebraImages];
  const texts = enhancement.blocks || [];
  const merged = [];
  const maxLen = Math.max(texts.length, allMedia.length);

  for (let i = 0; i < maxLen; i++) {
    if (texts[i]) merged.push(texts[i]);
    if (allMedia[i]) merged.push(allMedia[i]);
  }
  return merged;
}

export function getCuratedProjectBySlug(slug, datoProject = null, datoAllProjects = []) {
  if (STANDALONE_CASES[slug]) {
    return STANDALONE_CASES[slug];
  }
  if (!datoProject) return null;

  const summary = CURATED_SUMMARIES[slug];
  const enhancement = TEXT_ENHANCEMENTS[slug];
  return {
    ...datoProject,
    ...(summary || {}),
    coverImage: enhancement?.coverImage || datoProject.coverImage,
    pageBuilder: enhancement
      ? buildEnhancedPageBuilder(slug, datoProject.pageBuilder, enhancement)
      : datoProject.pageBuilder,
  };
}
