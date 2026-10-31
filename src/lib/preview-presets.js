/**
 * Branch presets & content generation for Studio Maaijen Website Preview Generator.
 * Fase 1: Slimme redactionele templates per branche zonder externe AI-afhankelijkheid.
 */

export const BRANCH_PRESETS = {
  'Installateur / Klusbedrijf': {
    slugPrefix: 'klus',
    tagline: 'Vakmanschap, betrouwbaarheid en snelle service voor al je installaties en verbouwingen in {city} en omstreken.',
    heroTitle: 'Kwaliteit en zekerheid voor jouw woning of bedrijfspand',
    heroSub: 'Van vakkundige installatie tot vlot onderhoud en complete verbouwingen. Eerlijk advies, heldere afspraken en vakwerk waar je jarenlang op kunt vertrouwen.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80',
    defaultServices: [
      {
        title: 'Installatie & Montage',
        desc: 'Cv-ketels, warmtepompen, sanitair en leidingwerk vakkundig geïnstalleerd volgens de strengste veiligheids- en milieunormen.',
        icon: '⚡',
      },
      {
        title: 'Onderhoud & Storingsdienst',
        desc: 'Periodieke inspectie en snelle hulp bij acute storingen om stilstand, kou en ongemak te voorkomen.',
        icon: '🔧',
      },
      {
        title: 'Complete Verbouwingen',
        desc: 'Van badkamer tot complete technische renovatie: één aanspreekpunt van eerste sloop tot de perfecte afwerking.',
        icon: '🏠',
      },
    ],
    aboutText: 'Met jarenlange ervaring in de regio leveren we degelijk vakwerk zonder verrassingen achteraf. Geen gedoe, korte communicatielijnen en een nette werkvloer na afloop.',
    uspList: ['Gecertificeerd vakmanschap', 'Binnen 24 uur reactie', 'Eerlijke vaste prijzen vooraf', 'Garantie op alle werkzaamheden'],
  },

  'Kapsalon / Schoonheid': {
    slugPrefix: 'salon',
    tagline: 'Persoonlijke aandacht, eigentijdse styling en ontspanning in een sfeervolle salon in {city}.',
    heroTitle: 'Laat je natuurlijke schoonheid stralen met stijl op maat',
    heroSub: 'Ervaar rust en luxe in onze salon. Wij luisteren naar jouw wensen en zorgen voor een persoonlijke behandeling die perfect aansluit bij jouw stijl.',
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80',
    defaultServices: [
      {
        title: 'Knippen & Maatwerk Kleuringen',
        desc: 'Van subtiele highlights en balayage tot complete make-overs, afgestemd op de vorm van je gezicht en levensstijl.',
        icon: '✂️',
      },
      {
        title: 'Verzorging & Head Spa',
        desc: 'Diepwerkende haar- en hoofdhuidbehandelingen met verzorgende, dierproefvrije kwaliteitsproducten.',
        icon: '🌿',
      },
      {
        title: 'Bruids- & Feeststyling',
        desc: 'Stralend en zorgeloos naar je grote dag of evenement met een proefsessie en complete professionele styling.',
        icon: '✨',
      },
    ],
    aboutText: 'In onze salon nemen we de tijd voor je. Onder het genot van een verse koffie of thee bespreken we wat het beste bij jouw haar en uitstraling past. Je verlaat onze salon vol zelfvertrouwen.',
    uspList: ['Persoonlijk adviesgesprek', 'Uitsluitend premium producten', 'Makkelijk online afspreken', 'Avondopenstelling beschikbaar'],
  },

  'Zorg / Praktijk': {
    slugPrefix: 'praktijk',
    tagline: 'Deskundige begeleiding en persoonlijke zorg met aandacht voor jouw welzijn en herstel in {city}.',
    heroTitle: 'Persoonlijke en professionele zorg voor een vitaal leven',
    heroSub: 'Een luisterend oor, een helder behandelplan en gerichte begeleiding. Samen werken we stap voor stap aan duurzaam herstel en een gezond lichaam.',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=80',
    defaultServices: [
      {
        title: 'Onderzoek & Intake',
        desc: 'Een grondige analyse van je klachten en hulpvraag, zodat we direct de vinger op de zere plek kunnen leggen.',
        icon: '🩺',
      },
      {
        title: 'Gerichte Therapie & Behandeling',
        desc: 'Individuele behandelingen op basis van bewezen methodes en persoonlijke doelen voor optimaal resultaat.',
        icon: '🤲',
      },
      {
        title: 'Preventie & Leefstijladvies',
        desc: 'Praktische oefeningen en tips voor het dagelijks leven om herhaling van klachten te voorkomen.',
        icon: '🌱',
      },
    ],
    aboutText: 'Onze praktijk combineert wetenschappelijke vakkennis met oprechte empathie. We behandelen geen symptomen, maar kijken naar de mens achter de klacht in een rustige, vertrouwde omgeving.',
    uspList: ['BIG-geregistreerd & aangesloten', 'Korte wachttijden', 'Vergoeding via verzekering', 'Individuele één-op-één aandacht'],
  },

  'Horeca': {
    slugPrefix: 'horeca',
    tagline: 'Verse seizoensproducten, warme gastvrijheid en een ontspannen sfeer in het hart van {city}.',
    heroTitle: 'Geniet van pure smaken en ongekende gastvrijheid',
    heroSub: 'Schuif aan voor een gezellige lunch, een smaakvol diner of een ontspannen borrel. Bereid met liefde voor het ambacht en de beste lokale ingrediënten.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80',
    defaultServices: [
      {
        title: 'Lunch & Diner à la Carte',
        desc: 'Een regelmatig wisselende menukaart met verrassende gerechten, vegetarische keuzes en bijpassende wijnen.',
        icon: '🍽️',
      },
      {
        title: 'Borrels & Bites',
        desc: 'Ambachtelijke hapjes, lokale speciaalbieren en verfijnde cocktails in een ongedwongen ambiance.',
        icon: '🍷',
      },
      {
        title: 'Private Dining & Feesten',
        desc: 'Een intieme ruimte voor verjaardagen, familiediners of zakelijke bijeenkomsten met een menu op maat.',
        icon: '🥂',
      },
    ],
    aboutText: 'Bij ons draait alles om samen genieten. Van het warme welkom aan de deur tot het laatste kopje espresso: we doen er alles aan om je een memorabele middag of avond te bezorgen.',
    uspList: ['Verse ingrediënten uit de regio', 'Zonnig terras & sfeervol interieur', 'Reserveren in 3 klikken', 'Vrij parkeren voor de deur'],
  },

  'Winkel / Retail': {
    slugPrefix: 'winkel',
    tagline: 'Zorgvuldig geselecteerde collecties, eerlijk advies en een persoonlijke winkelervaring in {city}.',
    heroTitle: 'Ontdek bijzondere producten met zorg en liefde gekozen',
    heroSub: 'Geen massaproductie, maar unieke vondsten en tijdloze kwaliteit. Kom langs in onze winkel en laat je inspireren door ons wisselende assortiment.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80',
    defaultServices: [
      {
        title: 'Unieke Collecties',
        desc: 'Originele items van zelfstandige ontwerpers en betrouwbare kwaliteitsmerken die je nergens anders vindt.',
        icon: '🛍️',
      },
      {
        title: 'Persoonlijk Stijladvies',
        desc: 'We denken met je mee en helpen je het perfecte cadeau, interieurstuk of kledingstuk te vinden.',
        icon: '💡',
      },
      {
        title: 'Cadeauservice & Bestellen',
        desc: 'Mooi ingepakt en desgewenst klaargezet voor afhalen of snel bezorgd in de regio.',
        icon: '🎁',
      },
    ],
    aboutText: 'Als lokale speciaalzaak geloven we in service met een glimlach. We kennen onze producten door en door en vertellen je graag het verhaal achter elk item.',
    uspList: ['Wekelijks nieuwe items', 'Gratis inpakservice', 'Lokale bezorging mogelijk', 'Persoonlijk advies'],
  },

  'Anders': {
    slugPrefix: 'bedrijf',
    tagline: 'Heldere dienstverlening, korte lijnen en meetbaar resultaat voor jouw onderneming in {city} en omstreken.',
    heroTitle: 'Kwaliteit, betrokkenheid en resultaat voor jouw succes',
    heroSub: 'Van advies tot uitvoering: wij leveren maatwerkoplossingen die naadloos aansluiten op jouw wensen. Betrouwbaar, flexibel en met één vast aanspreekpunt.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80',
    defaultServices: [
      {
        title: 'Maatwerk Dienstverlening',
        desc: 'Oplossingen afgestemd op jouw specifieke situatie en doelstellingen, zonder overbodige poespas.',
        icon: '🎯',
      },
      {
        title: 'Deskundig Advies & Begeleiding',
        desc: 'Praktische ondersteuning van een ervaren specialist die met je meedenkt vanaf de eerste stap.',
        icon: '🤝',
      },
      {
        title: 'Snelle Service & Nazorg',
        desc: 'Heldere afspraken, korte communicatielijnen en uitstekende ondersteuning op de lange termijn.',
        icon: '⭐',
      },
    ],
    aboutText: 'Wij geloven in een nuchtere, persoonlijke aanpak. Korte lijnen, heldere tarieven en altijd een eerlijk antwoord. Zo bouwen we samen aan een langdurige en succesvolle samenwerking.',
    uspList: ['Jarenlange vakkennis', 'Snelle communicatie', 'Transparante werkwijze', 'Tevredenheid gegarandeerd'],
  },
};

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
