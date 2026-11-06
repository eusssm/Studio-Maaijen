/**
 * Centrale mail- en opslaghelper voor Studio Maaijen formulieren.
 * - Bevat een strikt gelimiteerd DatoCMS Form Submitter token (alleen create op aanvragen)
 *   als fallback wanneer DATOCMS_CMA_TOKEN niet in Vercel env vars staat.
 * - Verstuurt e-mail via Resend, Web3Forms of FormSubmit (met verplichte Origin/Referer headers).
 */

export const DATOCMS_FORM_TOKEN =
  process.env.DATOCMS_CMA_TOKEN || '99f9d654b1271b0a04a50582cd59f2';

export async function sendMail({
  to = 'info@studio-maaijen.nl',
  subject,
  text,
  replyTo,
  fields = {},
  referer = 'https://www.studio-maaijen.nl/contact',
}) {
  const from = process.env.CONTACT_FROM_EMAIL || 'Studio Maaijen <onboarding@resend.dev>';

  // 1. Resend (indien geconfigureerd)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
      });
      if (res.ok) return { ok: true, provider: 'resend' };
      console.error('[mail] Resend foutstatus:', res.status, await res.text());
    } catch (err) {
      console.error('[mail] Resend netwerkfout:', err);
    }
  }

  // 2. Web3Forms (indien geconfigureerd)
  if (process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: fields.Naam || 'Studio Maaijen website',
          email: replyTo,
          message: text,
          ...fields,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) return { ok: true, provider: 'web3forms' };
      console.error('[mail] Web3Forms foutstatus:', res.status, json);
    } catch (err) {
      console.error('[mail] Web3Forms netwerkfout:', err);
    }
  }

  // 3. FormSubmit AJAX (fallback zonder API key, met 5s timeout tegen Cloudflare hangs)
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://www.studio-maaijen.nl',
        Referer: referer,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: replyTo,
        _template: 'table',
        _captcha: 'false',
        ...fields,
        Bericht: fields.Bericht || text,
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && (json.success === 'true' || json.success === true)) {
      return { ok: true, provider: 'formsubmit' };
    }
    console.warn('[mail] FormSubmit status:', json?.message || res.status);
    return {
      ok: false,
      provider: 'formsubmit',
      needsActivation: Boolean(json?.message && json.message.toLowerCase().includes('activation')),
      message: json?.message || `HTTP ${res.status}`,
    };
  } catch (err) {
    console.error('[mail] FormSubmit fout:', err.name === 'TimeoutError' ? 'Timeout na 5s' : err.message);
    return { ok: false, provider: 'formsubmit', message: err.message };
  }
}
