import { buildClient } from '@datocms/cma-client-node';
import { DATOCMS_FORM_TOKEN, sendMail } from '../../../lib/notify';

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

    // 1. Altijd opslaan in DatoCMS (Contact Aanvraag model)
    let saved = false;
    try {
      const client = buildClient({ apiToken: DATOCMS_FORM_TOKEN });
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

    // 2. E-mailnotificatie naar info@studio-maaijen.nl
    const mailResult = await sendMail({
      to: recipientEmail,
      subject,
      text: plainText,
      replyTo: email.trim(),
      referer: 'https://www.studio-maaijen.nl/contact',
      fields: {
        Naam: name.trim(),
        Email: email.trim(),
        Bedrijfsnaam: company?.trim() || '-',
        Website: website?.trim() || '-',
        Interesse: interestsList,
        Bericht: message.trim(),
      },
    });

    if (!mailResult.ok) {
      console.warn('[contact] ⚠️ Let op: mailnotificatie NIET verzonden naar', recipientEmail, mailResult);
    }

    if (!saved && !mailResult.ok) {
      return Response.json(
        { error: 'Je bericht kon helaas niet worden verstuurd. Mail direct naar info@studio-maaijen.nl.' },
        { status: 502 }
      );
    }

    return Response.json({
      ok: true,
      saved,
      mailed: mailResult.ok,
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
