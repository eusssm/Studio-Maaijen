import { buildClient } from '@datocms/cma-client-node';
import { sendMail } from '../../../lib/notify';

const CMA_TOKEN = process.env.DATOCMS_CMA_TOKEN;
const CONTACT_MODEL_ID = 'AmmEJM1lQkqyR2xRZUdNxA';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, website, interests = [], message } = body || {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'Vul alle verplichte velden (naam, e-mailadres en bericht) in.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { error: 'Vul een geldig e-mailadres in.' },
        { status: 400 }
      );
    }

    const recipientEmail = 'info@studio-maaijen.nl';
    const subject = `Nieuwe aanvraag via Studio Maaijen — ${name.trim()}${
      company ? ` (${company.trim()})` : ''
    }`;
    const interestsList =
      Array.isArray(interests) && interests.length > 0
        ? interests.join(', ')
        : 'Niet opgegeven';

    const plainText = [
      `Naam: ${name.trim()}`,
      `E-mail: ${email.trim()}`,
      `Bedrijfsnaam: ${company?.trim() || '-'}`,
      `Website: ${website?.trim() || '-'}`,
      `Geïnteresseerd in: ${interestsList}`,
      '',
      'Bericht:',
      message.trim(),
    ].join('\n');

    // 1. Opslaan in DatoCMS (Contact Aanvraag model)
    let saved = false;
    if (CMA_TOKEN) {
      try {
        const client = buildClient({ apiToken: CMA_TOKEN });
        await client.items.create({
          item_type: { type: 'item_type', id: CONTACT_MODEL_ID },
          name: name.trim(),
          email: email.trim(),
          company: company?.trim() || '',
          website: website?.trim() || '',
          interests: interestsList,
          message: message.trim(),
        });
        saved = true;
      } catch (cmsErr) {
        console.error('[contact] DatoCMS opslaan mislukt:', cmsErr);
      }
    } else {
      console.error('[contact] DATOCMS_CMA_TOKEN ontbreekt: aanvraag wordt niet opgeslagen.');
    }

    // 2. E-mailnotificatie
    const mailed = await sendMail({
      to: recipientEmail,
      subject,
      text: plainText,
      replyTo: email.trim(),
    });

    // Als niets is gelukt, laat de bezoeker dat weten i.p.v. nep-succes
    if (!saved && !mailed) {
      console.error('[contact] AANVRAAG VERLOREN:', plainText);
      return Response.json(
        { error: 'Je bericht kon helaas niet worden verstuurd. Mail me direct via info@studio-maaijen.nl.' },
        { status: 502 }
      );
    }

    return Response.json({
      ok: true,
      message: 'Bedankt voor je bericht! Je aanvraag is ontvangen en ik neem binnen één werkdag contact met je op.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Er ging iets mis bij het versturen. Probeer het opnieuw of mail direct.' },
      { status: 500 }
    );
  }
}
