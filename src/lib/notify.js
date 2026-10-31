/**
 * Betrouwbare mailnotificatie. Geeft true terug ALLEEN als de provider de mail echt accepteert,
 * en logt de foutreden zodat storingen zichtbaar zijn in de server-logs.
 */
export async function sendMail({ to, subject, text, replyTo }) {
  const from = process.env.CONTACT_FROM_EMAIL || 'Studio Maaijen <onboarding@resend.dev>';

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
      if (res.ok) return true;
      console.error('[mail] Resend weigerde de mail:', res.status, await res.text());
      return false;
    } catch (err) {
      console.error('[mail] Resend fout:', err);
      return false;
    }
  }

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: 'Studio Maaijen website',
          email: replyTo,
          message: text,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) return true;
      console.error('[mail] Web3Forms weigerde de mail:', res.status, json);
      return false;
    } catch (err) {
      console.error('[mail] Web3Forms fout:', err);
      return false;
    }
  }

  console.error('[mail] Geen mailprovider geconfigureerd (RESEND_API_KEY of WEB3FORMS_ACCESS_KEY ontbreekt).');
  return false;
}
