/**
 * Branch presets & content generation for Studio Maaijen Website Preview Generator.
 * High-End UX/UI & Art Direction Standard (Awwwards / Godly level).
 * 
 * Bevat rijke presets, redactionele typografie, Zwitserse metadata en
 * een intelligente resolver die branches en trefwoorden automatisch koppelt
 * aan high-end beeldmateriaal en overtuigende copy.
 */

export const BRANCH_PRESETS = {
  'Sport / Fitness': {
    slugPrefix: 'sport',
    disciplineTag: 'SPORT · CLUB & ATLETIEK',
    heroBadge: '✦ ALL-WEATHER FACILITEITEN',
    heroTitleSans: 'Spel, passie en',
    heroTitleItalic: 'ambitie',
    heroTitleAfter: 'op topniveau',
    heroSub: 'De ontmoetingsplek voor sportief talent, recreanten en levensgenieters in {city}. State-of-the-art banen, deskundige begeleiding en een inspirerende clubcultuur.',
    tagline: 'Toonaangevende clubfaciliteiten, trainingen en sportbeleving in {city} en omstreken.',
    heroImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'ALL-WEATHER BANEN', sub: 'Volledig verlicht & onderhouden' },
      { num: '02', label: 'GECERTIFICEERDE TRAINERS', sub: 'KNLTB & NOC*NSF richtlijnen' },
      { num: '03', label: 'HECHTE COMMUNITY', sub: 'Competities & toernooien' },
      { num: '04', label: 'CENTRALE LOCATIE', sub: 'Eenvoudig bereikbaar in {city}' },
    ],
    manifestoQuote: 'Sport is meer dan beweging: het is karakter, ontmoeting en puur spelplezier. Bij {company} bouwen we aan een actieve gemeenschap waar jong en oud elkaar op en naast de baan inspireren.',
    aboutText: 'Als toonaangevende club in {city} verenigen we sportieve ambitie met een ontspannen, sociale sfeer. Met moderne banen, een sfeervol clubhuis en een gepassioneerd team staat alles klaar voor jouw beste sportseizoen.',
    defaultServices: [
      {
        num: '01',
        title: 'Baanverhuur & Vrij Spelen',
        category: 'FACILITEITEN',
        desc: 'Eenvoudig online reserveren via ons digitale baansysteem. Zowel overdekt als in de open lucht het hele jaar door bespeelbaar.',
      },
      {
        num: '02',
        title: 'Trainingen & Clinics',
        category: 'COACHING',
        desc: 'Doelgerichte technische en tactische begeleiding voor beginners tot gevorderde competitiespelers onder leiding van gediplomeerde trainers.',
      },
      {
        num: '03',
        title: 'Toernooien & Clubevents',
        category: 'COMMUNITY',
        desc: 'Sportieve krachtmetingen, open toernooien, seizoensevents en gezellige clubavonden voor alle niveaus en leeftijden.',
      },
    ],
  },

  'Installateur / Klusbedrijf': {
    slugPrefix: 'klus',
    disciplineTag: 'INSTALLATIE & TECHNIEK',
    heroBadge: '✦ NEN & VCA GECERTIFICEERD',
    heroTitleSans: 'Vakmanschap met oog voor',
    heroTitleItalic: 'techniek & detail',
    heroTitleAfter: '',
    heroSub: 'Geen half werk. Van duurzame warmtepompen en complete badkamerrenovaties tot storingsdiagnose in {city} en omstreken. Betrouwbaar, veilig en onberispelijk afgewerkt.',
    tagline: 'Vakmanschap, betrouwbaarheid en snelle service voor al je installaties en verbouwingen in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'ERKEND VAKWERK', sub: 'Gecertificeerd NEN-1010/3140' },
      { num: '02', label: '24/7 STORINGSDIENST', sub: 'Snel ter plaatse in {city}' },
      { num: '03', label: 'VASTE OFFERTE', sub: 'Geen verrassingen achteraf' },
      { num: '04', label: '10 JAAR GARANTIE', sub: 'Op alle geleverde installaties' },
    ],
    manifestoQuote: 'Echt vakmanschap herken je aan de afwerking die je níet direct ziet. We bouwen technische installaties die decennialang geruisloos, veilig en energiezuinig renderen.',
    aboutText: 'Met jarenlange ervaring in de regio leveren we degelijk vakwerk zonder verrassingen achteraf. Korte communicatielijnen, een schone oplevering en uitsluitend gebruik van A-merk componenten.',
    defaultServices: [
      {
        num: '01',
        title: 'Warmtetechniek & Verduurzaming',
        category: 'DUURZAAMHEID',
        desc: 'Installatie en inregeling van hybride warmtepompen, energiezuinige HR-ketels en slimme vloerverwarmingssystemen.',
      },
      {
        num: '02',
        title: 'Luxe Sanitair & Badkamers',
        category: 'RENOVATIE',
        desc: 'Van leidingwerk en strak tegelwerk tot inbouwkranen en designmeubels. Volledig turn-key gecoördineerd en gerealiseerd.',
      },
      {
        num: '03',
        title: 'Elektrotechniek & Groepenkasten',
        category: 'VEILIGHEID',
        desc: 'Meterkast moderniseren, 3-fase aansluitingen voor inductie en laadpalen, en acute storingsdiagnose bij uitval.',
      },
    ],
  },

  'Kapsalon / Schoonheid': {
    slugPrefix: 'salon',
    disciplineTag: 'HAIRSTYLING & BEAUTY',
    heroBadge: '✦ PREMIUM SALONBELEVING',
    heroTitleSans: 'Tijdloze elegantie en',
    heroTitleItalic: 'persoonlijke',
    heroTitleAfter: 'aandacht',
    heroSub: 'Ervaar rust en luxe in onze salon in {city}. Wij luisteren naar jouw natuurlijke uitstraling en zorgen voor een verfijnde coupe en behandeling die perfect bij jou past.',
    tagline: 'Persoonlijke aandacht, eigentijdse styling en ontspanning in een sfeervolle salon in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: '1-OP-1 AANDACHT', sub: 'Alle tijd voor jouw wensen' },
      { num: '02', label: 'ORGANIC CARE', sub: 'Dierproefvrije verzorging' },
      { num: '03', label: 'ONLINE BOEKEN', sub: 'In 3 klikken gepland' },
      { num: '04', label: 'MEESTER-STYLING', sub: 'In het hart van {city}' },
    ],
    manifestoQuote: 'Schoonheid is geen formule, maar puur maatwerk. We luisteren naar wie je bent en vertalen dat naar een stijl die moeiteloos en natuurlijk klopt.',
    aboutText: 'In onze salon nemen we de tijd voor je. Onder het genot van een verse koffie of thee bespreken we wat het beste bij jouw haar en uitstraling past. Je verlaat onze salon vol zelfvertrouwen.',
    defaultServices: [
      {
        num: '01',
        title: 'Knippen & Maatwerk Kleuringen',
        category: 'STYLING',
        desc: 'Van subtiele balayage en face-framing highlights tot complete stijltransformaties, afgestemd op gezichtsvorm en levensstijl.',
      },
      {
        num: '02',
        title: 'Verzorging & Head Spa',
        category: 'WELLNESS',
        desc: 'Diepwerkende hoofdhuid- en haarmaskers met verzorgende botanische oliën voor herstel, glans en totale ontspanning.',
      },
      {
        num: '03',
        title: 'Bruids- & Event Styling',
        category: 'EXCLUSIEF',
        desc: 'Stralend naar je grote dag of speciale gelegenheid met een uitgebreide proefsessie en complete professionele styling.',
      },
    ],
  },

  'Horeca': {
    slugPrefix: 'horeca',
    disciplineTag: 'GASTRONOMIE & HOSPITALITY',
    heroBadge: '✦ SEIZOENSGEBONDEN AMBACHT',
    heroTitleSans: 'Smaak, sfeer en het',
    heroTitleItalic: 'ambacht',
    heroTitleAfter: 'van gastvrijheid',
    heroSub: 'Schuif aan voor seizoensgebonden gerechten, karaktervolle wijnen en een ontspannen ambiance in {city}. Bereid met liefde voor het vak en lokale streekproducten.',
    tagline: 'Verse seizoensproducten, warme gastvrijheid en een ontspannen sfeer in het hart van {city}.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'SEIZOENSKAART', sub: 'Dagelijks vers ingekocht' },
      { num: '02', label: 'LOKAAL AMBACHT', sub: 'Samenwerking met streekboeren' },
      { num: '03', label: 'SFEERVOL TERRAS', sub: 'Zonnig & beschut gelegen' },
      { num: '04', label: 'PRIVATE DINING', sub: 'Voor groepen tot 50 personen' },
    ],
    manifestoQuote: 'Goede gastvrijheid proef je in elk detail: van het knapperige zuurdesembrood en de zorgvuldig gekozen wijn tot de oprechte warmte aan tafel.',
    aboutText: 'Bij ons draait alles om samen genieten. Van het eerste warme welkom aan de deur tot het laatste kopje espresso: we doen er alles aan om je een memorabele middag of avond te bezorgen.',
    defaultServices: [
      {
        num: '01',
        title: 'Lunch & Diner à la Carte',
        category: 'KEUKEN',
        desc: 'Een regelmatig wisselende menukaart met creatieve gerechten, rijke vegetarische opties en perfect passende wijnpairings.',
      },
      {
        num: '02',
        title: 'Wijnbar, Borrels & Bites',
        category: 'BAR',
        desc: 'Ambachtelijke charcuterie, lokale kazen, geselecteerde natuurwijnen en tapbieren in een ongedwongen ambiance.',
      },
      {
        num: '03',
        title: 'Private Dining & Feesten',
        category: 'EVENTS',
        desc: 'Een sfeervolle eigen ruimte voor familiediners, jubilea of zakelijke bijeenkomsten met een compleet menu op maat.',
      },
    ],
  },

  'Zorg / Praktijk': {
    slugPrefix: 'praktijk',
    disciplineTag: 'GEZONDHEID & THERAPIE',
    heroBadge: '✦ BIG-GEREGISTREERDE ZORG',
    heroTitleSans: 'Gerichte zorg en een',
    heroTitleItalic: 'heldere',
    heroTitleAfter: 'weg naar herstel',
    heroSub: 'Een luisterend oor, een wetenschappelijk behandelplan en gerichte begeleiding. Samen werken we stap voor stap aan duurzaam herstel en een vitaal lichaam in {city}.',
    tagline: 'Deskundige begeleiding en persoonlijke zorg met aandacht voor jouw welzijn in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'GEEN WACHTLIJST', sub: 'Binnen 48 uur eerste intake' },
      { num: '02', label: 'VERGOEDING', sub: 'Aangesloten bij verzekeraars' },
      { num: '03', label: '1-OP-1 THERAPIE', sub: 'Persoonlijk behandelplan' },
      { num: '04', label: 'MODERNE PRAKTIJK', sub: 'Centraal gelegen in {city}' },
    ],
    manifestoQuote: 'We behandelen geen symptomen, maar kijken naar de mens achter de klacht. Door de kernoorzaak aan te pakken, bouwen we aan blijvende veerkracht.',
    aboutText: 'Onze praktijk combineert actuele medische inzichten met oprechte empathie. In een rustige, vertrouwde omgeving bieden we specialistische zorg die direct perspectief biedt.',
    defaultServices: [
      {
        num: '01',
        title: 'Onderzoek & Intake',
        category: 'DIAGNOSE',
        desc: 'Een grondige analyse van je klachten, houding en bewegingspatroon om direct de vinger op de zere plek te leggen.',
      },
      {
        num: '02',
        title: 'Gerichte Therapie & Behandeling',
        category: 'BEHANDELING',
        desc: 'Individuele sessies op basis van bewezen protocollen en persoonlijke doelstellingen voor een snel en duurzaam herstel.',
      },
      {
        num: '03',
        title: 'Preventie & Revalidatie',
        category: 'BEGELEIDING',
        desc: 'Praktische oefeningen en ergonomisch advies voor thuis en werk om herhaling van klachten definitief te voorkomen.',
      },
    ],
  },

  'Winkel / Retail': {
    slugPrefix: 'winkel',
    disciplineTag: 'BOETIEK & DESIGN',
    heroBadge: '✦ GECUREERDE COLLECTIE',
    heroTitleSans: 'Geselecteerde items met',
    heroTitleItalic: 'karakter & ziel',
    heroTitleAfter: '',
    heroSub: 'Geen massaproductie, maar unieke vondsten en tijdloos design. Ontdek onze met zorg samengestelde collecties in onze winkel in {city} en online.',
    tagline: 'Zorgvuldig geselecteerde collecties, eerlijk advies en een persoonlijke winkelervaring in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'UNIEK AANBOD', sub: 'Zelfstandige labels & makers' },
      { num: '02', label: 'PERSOONLIJK ADVIES', sub: 'Met oog voor stijl en detail' },
      { num: '03', label: 'INPAKSERVICE', sub: 'Luxe geschenkverpakking' },
      { num: '04', label: 'LOKALE BEZORGING', sub: 'Snel in huis in {city}' },
    ],
    manifestoQuote: 'Echte kwaliteit overleeft vluchtige trends. We kiezen elk product met zorg en liefde voor het ambacht, zodat jij er jarenlang van kunt genieten.',
    aboutText: 'Als lokale speciaalzaak in {city} geloven we in service met een glimlach. We kennen onze makers en producten door en door en vertellen je graag het verhaal achter elk uniek item.',
    defaultServices: [
      {
        num: '01',
        title: 'Exclusieve Collecties',
        category: 'ASSORTIMENT',
        desc: 'Originele items van onafhankelijke ontwerpers en betrouwbare kwaliteitsmerken die je nergens anders aantreft.',
      },
      {
        num: '02',
        title: 'Persoonlijk Stijladvies',
        category: 'ADVIES',
        desc: 'We denken enthousiast met je mee en helpen je het perfecte cadeau, interieuraccent of kledingstuk te vinden.',
      },
      {
        num: '03',
        title: 'Cadeauservice & Bezorging',
        category: 'SERVICE',
        desc: 'Prachtig verpakt en desgewenst klaargezet voor afhalen in de boetiek of vlot bezorgd in de hele regio.',
      },
    ],
  },

  'Automotive / Garage': {
    slugPrefix: 'auto',
    disciplineTag: 'AUTOMOTIVE & SERVICE',
    heroBadge: '✦ BOVAG GECERTIFICEERD',
    heroTitleSans: 'Precisie, prestatie en',
    heroTitleItalic: 'onberispelijke',
    heroTitleAfter: 'zorg',
    heroSub: 'Van specialistisch fabrieksonderhoud en APK tot high-end detailing en storingen. Jouw auto in handen van gepassioneerde vakmensen in {city}.',
    tagline: 'Vakkundig auto-onderhoud, APK en schadeherstel met behoud van fabrieksgarantie in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'FABRIEKSGARANTIE', sub: 'Behoud met originele delen' },
      { num: '02', label: 'MODERNE DIAGNOSE', sub: 'Voor alle merken & EV’s' },
      { num: '03', label: 'VERVANGEND VERVOER', sub: 'Kosteloos beschikbaar' },
      { num: '04', label: 'HELDERE TARIEVEN', sub: 'Altijd prijsopgave vooraf' },
    ],
    manifestoQuote: 'Een auto is techniek en emotie in één. Wij behandelen elk voertuig met de uiterste precisie alsof het onze eigen wagen is.',
    aboutText: 'Met geavanceerde testapparatuur en passie voor autotechniek garanderen we betrouwbare kilometers. Geen onverwachte rekeningen, maar eerlijk overleg vóór we aan de slag gaan.',
    defaultServices: [
      {
        num: '01',
        title: 'Onderhoud & APK Keuring',
        category: 'ONDERHOUD',
        desc: 'Volgens officiële fabrieksspecificaties met kwaliteitsonderdelen, inclusief gratis seizoenscheck.',
      },
      {
        num: '02',
        title: 'Diagnose & Elektronica',
        category: 'TECHNIEK',
        desc: 'Geavanceerde storingsdiagnose voor benzine, diesel, hybride en volledig elektrische aandrijflijnen.',
      },
      {
        num: '03',
        title: 'Detailing & Lakverzorging',
        category: 'PREMIUM',
        desc: 'Dieptereiniging, meerstaps polijsten en glascoating voor een showroomglans en langdurige bescherming.',
      },
    ],
  },

  'Creatief / Media': {
    slugPrefix: 'studio',
    disciplineTag: 'CREATIE & PRODUCTIE',
    heroBadge: '✦ EDITORIAL PRODUCTIES',
    heroTitleSans: 'Visuele verhalen die',
    heroTitleItalic: 'beklijven & raken',
    heroTitleAfter: '',
    heroSub: 'Strategische fotografie, film en visuele identiteiten voor ambitieuze merken en makers. Beelden die emotie oproepen en een blijvende voorsprong creëren.',
    tagline: 'High-end fotografie, videoproductie en art direction voor veeleisende opdrachtgevers in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'HIGH-END STUDIO', sub: 'Professionele belichting & gear' },
      { num: '02', label: 'SNELLE OPLEVERING', sub: 'Binnen 5 werkdagen gemonteerd' },
      { num: '03', label: 'VOLLEDIGE RECHTEN', sub: 'Commercieel vrij te gebruiken' },
      { num: '04', label: 'REGIE OP MAAT', sub: 'Van concept tot postproductie' },
    ],
    manifestoQuote: 'In een wereld vol ruis wint het beeld dat een ziel heeft. Wij creëren visuele werelden die nieuwsgierigheid wekken en vertrouwen bouwen.',
    aboutText: 'Als creatieve studio geloven we in de kracht van cinematografie en doordachte compositie. We vertalen merkwaarden naar visuele verhalen die natuurlijk en krachtig resoneren.',
    defaultServices: [
      {
        num: '01',
        title: 'Commerciële Fotografie',
        category: 'BEELD',
        desc: 'High-end merkcampagnes, portretten en productseries met een uitgesproken redactionele afwerking.',
      },
      {
        num: '02',
        title: 'Cinematic Video & Brand Films',
        category: 'FILM',
        desc: 'Karaktervolle merkvideo’s, interviews en social content met vlijmscherpe montage en sound design.',
      },
      {
        num: '03',
        title: 'Art Direction & Concept',
        category: 'STRATEGIE',
        desc: 'Van storyboard en moodboards tot locatiescouting, styling en kleurnabewerking in DaVinci Resolve.',
      },
    ],
  },

  'Zakelijk / Advies': {
    slugPrefix: 'advies',
    disciplineTag: 'STRATEGIE & REGIE',
    heroBadge: '✦ BEWEZEN TRACKRECORD',
    heroTitleSans: 'Strategisch inzicht en',
    heroTitleItalic: 'doelgericht',
    heroTitleAfter: 'leiderschap',
    heroSub: 'Heldere antwoorden op complexe vraagstukken. Wij begeleiden ondernemers en directies in {city} naar duurzame groei, efficiëntie en financiële rust.',
    tagline: 'Betrouwbaar strategisch en financieel advies met korte lijnen en meetbaar resultaat in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'PERSOONLIJKE PARTNER', sub: 'Direct contact met senior partner' },
      { num: '02', label: 'HELDERE ANALYSES', sub: 'Concreet en direct toepasbaar' },
      { num: '03', label: 'DUURZAAM RENDEMENT', sub: 'Gericht op lange termijn' },
      { num: '04', label: 'LOKAAL VERBONDEN', sub: 'Actief in {city} en regio' },
    ],
    manifestoQuote: 'Echt advies gaat niet over dikke rapporten, maar over de juiste beslissingen op het juiste moment. Wij staan naast je als kritische en betrokken sparringpartner.',
    aboutText: 'Wij geloven in een nuchtere, transparante aanpak. Geen vakjargon, maar heldere analyses en praktische actieplannen die direct waarde toevoegen aan jouw organisatie.',
    defaultServices: [
      {
        num: '01',
        title: 'Strategisch Bedrijfsadvies',
        category: 'STRATEGIE',
        desc: 'Grondige evaluatie van marktkansen, verdienmodellen en procesoptimalisatie voor solide groei.',
      },
      {
        num: '02',
        title: 'Financiële Structurering',
        category: 'FINANCE',
        desc: 'Inzicht in liquiditeit, begrotingen en rentabiliteit om tijdig te sturen op gezonde marges.',
      },
      {
        num: '03',
        title: 'Proces- & Projectregie',
        category: 'REGIE',
        desc: 'Onafhankelijke sturing bij verandertrajecten, herstructureringen of complexe investeringsbeslissingen.',
      },
    ],
  },

  'Anders': {
    slugPrefix: 'bedrijf',
    disciplineTag: 'MAATWERK & VAKMANSCHAP',
    heroBadge: '✦ 100% MAATWERK GARANTIE',
    heroTitleSans: 'Karakter, kwaliteit en',
    heroTitleItalic: 'zichtbaar',
    heroTitleAfter: 'vakwerk',
    heroSub: 'Wij vertalen jouw wensen naar tastbaar en duurzaam resultaat. Eerlijk advies, persoonlijke betrokkenheid en één vast aanspreekpunt voor jouw project in {city} en omstreken.',
    tagline: 'Heldere dienstverlening, korte lijnen en meetbaar resultaat voor jouw onderneming in {city}.',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    stats: [
      { num: '01', label: 'EIGEN VAKWERK', sub: 'Geen trage tussenpersonen' },
      { num: '02', label: 'PERSOONLIJK CONTACT', sub: 'Korte communicatielijnen' },
      { num: '03', label: 'BEWEZEN RESULTAAT', sub: 'Tientallen tevreden klanten' },
      { num: '04', label: 'VASTE AFSPRAKEN', sub: 'Duidelijkheid vanaf dag één' },
    ],
    manifestoQuote: 'Wij geloven in het ambacht van kwaliteit. Wat we maken moet niet alleen vandaag kloppen, maar ook over tien jaar nog steeds trots oproepen.',
    aboutText: 'Wij geloven in een nuchtere, persoonlijke aanpak. Korte lijnen, heldere afspraken en altijd een eerlijk antwoord. Zo bouwen we samen aan een langdurige en succesvolle relatie.',
    defaultServices: [
      {
        num: '01',
        title: 'Maatwerk Realisatie',
        category: 'MAATWERK',
        desc: 'Oplossingen ontworpen rondom jouw specifieke situatie en doelstellingen, zonder overbodige ballast.',
      },
      {
        num: '02',
        title: 'Deskundig Advies & Begeleiding',
        category: 'EXPERTISE',
        desc: 'Praktische ondersteuning van een ervaren specialist die vanaf het eerste concept met je meedenkt.',
      },
      {
        num: '03',
        title: 'Service & Nazorg',
        category: 'SERVICE',
        desc: 'Heldere afspraken, snelle communicatie en uitstekende ondersteuning op de lange termijn.',
      },
    ],
  },
};

/**
 * Intelligente resolver: koppelt bedrijfsnaam, branche en ingevoerde diensten
 * automatisch aan de meest relevante preset en hoogwaardig beeldmateriaal.
 */
export function resolvePreviewPreset({ companyName = '', branch = '', services = '', city = 'de regio' } = {}) {
  const normalizedCity = city?.trim() || 'de regio';
  const companyClean = companyName?.trim() || 'Jouw Bedrijf';

  const corpus = `${companyName} ${branch} ${services}`.toLowerCase();
  let matchedKey = null;

  // 1. Directe match als de branche exact overeenkomt
  if (BRANCH_PRESETS[branch]) {
    matchedKey = branch;
  }

  // 2. Trefwoordanalyse als de branche 'Anders' is of als trefwoorden sterk wijzen op een specifieke niche
  if (!matchedKey || matchedKey === 'Anders') {
    if (/(tennis|padel|sport|fitness|gym|atletiek|voetbal|hockey|zwem|club|vereniging|boksen|crossfit|yoga|squash|badminton)/i.test(corpus)) {
      matchedKey = 'Sport / Fitness';
    } else if (/(installat|klus|bouw|loodgieter|warmtepomp|cv|dakdekker|elektra|verbouw|schilder|timmer|renovatie|aannemer|stukadoor|isolatie|zonnepanel|ketel|sanitair)/i.test(corpus)) {
      matchedKey = 'Installateur / Klusbedrijf';
    } else if (/(kapper|haar|salon|beauty|kapsalon|nagel|massage|barber|huid|cosmetic|visagie|pedicure|manicure|waxing)/i.test(corpus)) {
      matchedKey = 'Kapsalon / Schoonheid';
    } else if (/(restaurant|caf[eé]|bar|lunch|bistro|eten|diner|borrel|catering|bakker|patisserie|hotel|brasserie|pizz|koffie|traiteur|gastronom)/i.test(corpus)) {
      matchedKey = 'Horeca';
    } else if (/(fysio|zorg|tandarts|arts|kliniek|therapie|psychol|coach|logopedi|optiek|orthoped|osteopaat|di[eë]tist|gezondheid|huisarts)/i.test(corpus)) {
      matchedKey = 'Zorg / Praktijk';
    } else if (/(winkel|retail|boetiek|shop|mode|kleding|interieur|meubel|bloemen|juwelier|conceptstore)/i.test(corpus)) {
      matchedKey = 'Winkel / Retail';
    } else if (/(auto|garage|detailing|schadeherstel|banden|apk|motor|carrosserie|occasions|wielen)/i.test(corpus)) {
      matchedKey = 'Automotive / Garage';
    } else if (/(foto|video|film|media|reclame|architect|studio|design|animatie|creat)/i.test(corpus)) {
      matchedKey = 'Creatief / Media';
    } else if (/(advies|consult|account|boekhou|notaris|juridisch|advocaat|makelaar|hypotheek|verzeker|hrm|recruitment|financ)/i.test(corpus)) {
      matchedKey = 'Zakelijk / Advies';
    }
  }

  // Val terug op Anders indien niets matcht
  if (!matchedKey || !BRANCH_PRESETS[matchedKey]) {
    matchedKey = 'Anders';
  }

  const raw = BRANCH_PRESETS[matchedKey];

  const interpolate = (str = '') =>
    str.replace(/\{city\}/g, normalizedCity).replace(/\{company\}/g, companyClean);

  return {
    key: matchedKey,
    disciplineTag: interpolate(raw.disciplineTag),
    heroBadge: interpolate(raw.heroBadge),
    heroTitleSans: raw.heroTitleSans,
    heroTitleItalic: raw.heroTitleItalic,
    heroTitleAfter: raw.heroTitleAfter || '',
    heroTitlePlain: `${raw.heroTitleSans} ${raw.heroTitleItalic} ${raw.heroTitleAfter || ''}`.trim(),
    heroSub: interpolate(raw.heroSub),
    tagline: interpolate(raw.tagline),
    heroImage: raw.heroImage,
    stats: raw.stats.map(s => ({
      num: s.num,
      label: interpolate(s.label),
      sub: interpolate(s.sub),
    })),
    manifestoQuote: interpolate(raw.manifestoQuote),
    aboutText: interpolate(raw.aboutText),
    defaultServices: raw.defaultServices.map(srv => ({
      num: srv.num,
      title: interpolate(srv.title),
      category: interpolate(srv.category),
      desc: interpolate(srv.desc),
    })),
  };
}

/**
 * Genereert een vriendelijke en veilige slug op basis van bedrijfsnaam
 */
export function generateSlug(companyName = '') {
  const clean = companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'mijn-bedrijf';
  const rand = Math.random().toString(36).substring(2, 6);
  return `${clean.slice(0, 32)}-${rand}`;
}

/**
 * Berekent de vervaldatum (standaard 14 dagen)
 */
export function calculateExpiryDate(days = 14) {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

/**
 * Berekent hoeveel dagen een preview nog geldig is
 */
export function getDaysRemaining(expiryIso) {
  if (!expiryIso) return 14;
  const target = new Date(expiryIso).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
