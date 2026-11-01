import { buildClient } from '@datocms/cma-client-node';
import { DATOCMS_FORM_TOKEN, sendMail } from '../../../lib/notify';
import { generateSlug, calculateExpiryDate } from '../../../lib/preview-presets';

const PREVIEW_MODEL_ID = 'N6S34Sl8SWmvPK376ZaRmg'; // preview_submission model in DatoCMS

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      companyName,
      branch,
      services = '',
      vibe = 'Strak & modern',
      brandColor = '#ff4d00',
      primaryAction = 'Offerte aanvragen',
      name,
      email,
      phone = '',
      city = 'Ridderkerk',
      currentWebsite = '',
      source = 'direct',
      privacyAgreed = false,
    } = body || {};

    // 1. Validatie
    if (!companyName?.trim()) {
      return Response.json({ error: 'Vul alsjeblieft de naam van je bedrijf in.' }, { status: 400 });
    }
    if (!name?.trim()) {
      return Response.json({ error: 'Vul alsjeblieft jouw naam in.' }, { status: 400 });
    }
    if (!email?.trim()) {
      return Response.json({ error: 'Vul alsjeblieft een e-mailadres in.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json({ error: 'Vul een geldig e-mailadres in.' }, { status: 400 });
    }
    if (!privacyAgreed) {
      return Response.json(
        { error: 'Ga alsjeblieft akkoord met de privacyverklaring om je preview te genereren.' },
        { status: 400 }
      );
    }

    const slug = generateSlug(companyName.trim());
    const expiresAt = calculateExpiryDate(14);
    const cleanCompany = companyName.trim();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone?.trim() || '';
    const cleanCity = city?.trim() || 'regio';
    const cleanWebsite = currentWebsite?.trim() || '';
    const cleanBranch = branch || 'MKB / Dienstverlening';

    const previewPayload = {
      company_name: cleanCompany,
      slug,
      branch: cleanBranch,
      services: services?.trim() || '',
      vibe: vibe || 'Strak & modern',
      brand_color: brandColor || '#ff4d00',
      primary_action: primaryAction || 'Offerte aanvragen',
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      city: cleanCity,
      current_website: cleanWebsite,
      source: source || 'direct',
      lead_status: 'Nieuw',
      expires_at: expiresAt,
    };

    const dataToken = Buffer.from(JSON.stringify(previewPayload)).toString('base64url');
    const previewUrl = `https://www.studio-maaijen.nl/preview/${slug}?p=${dataToken}`;

    // 2. Altijd opslaan in DatoCMS (Preview Aanvraag model)
    let saved = false;
    try {
      const client = buildClient({ apiToken: DATOCMS_FORM_TOKEN });
      await client.items.create({
        item_type: { type: 'item_type', id: PREVIEW_MODEL_ID },
        company_name: cleanCompany,
        slug,
        branch: cleanBranch,
        services: services?.trim() || '',
        vibe: vibe || 'Strak & modern',
        brand_color: brandColor || '#ff4d00',
        primary_action: primaryAction || 'Offerte aanvragen',
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        city: cleanCity,
        current_website: cleanWebsite,
        source: source || 'direct',
        lead_status: 'Nieuw',
        notes: '',
        expires_at: expiresAt,
      });
      saved = true;
    } catch (cmsErr) {
      console.error('DatoCMS preview submission error:', cmsErr);
    }

    // 3. E-mail notificatie naar Eugène (info@studio-maaijen.nl)
    const adminSubject = `⚡ Nieuwe website-preview aangevraagd: ${cleanCompany} (${cleanBranch})`;
    const adminText = [
      `Er is zojuist een nieuwe website-preview gegenereerd via studio-maaijen.nl!`,
      ``,
      `--- BEDRIJFSGEGEVENS ---`,
      `Bedrijfsnaam: ${cleanCompany}`,
      `Branche: ${cleanBranch}`,
      `Plaats: ${cleanCity}`,
      `Bestaande website: ${cleanWebsite || 'Geen'}`,
      `Gekozen sfeer: ${vibe}`,
      `Huiskleur: ${brandColor}`,
      `Hoofdactie: ${primaryAction}`,
      `Ingevoerde diensten: ${services?.trim() || 'Standaard branche-diensten'}`,
      ``,
      `--- CONTACTGEGEVENS ---`,
      `Naam: ${cleanName}`,
      `E-mail: ${cleanEmail}`,
      `Telefoon: ${cleanPhone || 'Niet ingevuld'}`,
      `Bron: ${source}`,
      ``,
      `--- PREVIEW LINK ---`,
      `Bekijk de preview direct: ${previewUrl}`,
      ``,
      `Vervalt op: ${new Date(expiresAt).toLocaleDateString('nl-NL')}`,
    ].join('\n');

    const adminMail = await sendMail({
      to: 'info@studio-maaijen.nl',
      subject: adminSubject,
      text: adminText,
      replyTo: cleanEmail,
      referer: 'https://www.studio-maaijen.nl/start',
      fields: {
        Bedrijfsnaam: cleanCompany,
        Branche: cleanBranch,
        Plaats: cleanCity,
        Naam: cleanName,
        Email: cleanEmail,
        Telefoon: cleanPhone || '-',
        Diensten: services?.trim() || 'Standaard',
        Sfeer: vibe,
        Kleur: brandColor,
        Hoofdactie: primaryAction,
        BestaandeWebsite: cleanWebsite || '-',
        PreviewLink: previewUrl,
      },
    });

    // Optionele klant-bevestiging als Resend actief is
    if (process.env.RESEND_API_KEY) {
      const customerSubject = `Jouw website-preview voor ${cleanCompany} staat klaar — Studio Maaijen`;
      const customerText = [
        `Beste ${cleanName},`,
        ``,
        `Leuk dat je een website-preview hebt gegenereerd voor ${cleanCompany}!`,
        ``,
        `Je eerste schets staat direct voor je klaar via onderstaande link:`,
        `${previewUrl}`,
        ``,
        `Deze preview is 14 dagen vrijblijvend beschikbaar.`,
        ``,
        `Met vriendelijke groet,`,
        `Eugène Maaijen`,
        `Studio Maaijen — Ridderkerk`,
        `www.studio-maaijen.nl`,
      ].join('\n');

      await sendMail({
        to: cleanEmail,
        subject: customerSubject,
        text: customerText,
        replyTo: 'info@studio-maaijen.nl',
      });
    }

    return Response.json({
      ok: true,
      saved,
      mailed: adminMail.ok,
      slug,
      dataToken,
      previewUrl,
    });
  } catch (error) {
    console.error('API /preview error:', error);
    return Response.json(
      { error: 'Er ging iets mis bij het genereren van je preview. Probeer het opnieuw.' },
      { status: 500 }
    );
  }
}
