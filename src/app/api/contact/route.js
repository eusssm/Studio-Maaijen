import { buildClient } from '@datocms/cma-client-node';

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

    // 1. Save submission directly to DatoCMS (Contact Aanvraag model)
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
    } catch (cmsErr) {
      console.error('DatoCMS contact submission save warning:', cmsErr);
    }

    // 2. Send email notification
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'Studio Maaijen <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: email.trim(),
          subject,
          text: plainText,
        }),
      });
    } else if (process.env.WEB3FORMS_ACCESS_KEY) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: name.trim(),
          email: email.trim(),
          message: plainText,
        }),
      });
    } else {
      // Forward via FormSubmit AJAX endpoint to info@studio-maaijen.nl
      try {
        await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: 'https://www.studio-maaijen.nl',
            Referer: 'https://www.studio-maaijen.nl/contact',
          },
          body: JSON.stringify({
            _subject: subject,
            Naam: name.trim(),
            Email: email.trim(),
            Bedrijfsnaam: company?.trim() || '-',
            Website: website?.trim() || '-',
            Interesse: interestsList,
            Bericht: message.trim(),
          }),
        });
      } catch (mailErr) {
        console.error('FormSubmit forward warning:', mailErr);
      }
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
