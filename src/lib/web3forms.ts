/**
 * Delivers form submissions to the school's inbox via Web3Forms
 * (https://web3forms.com) — a free, no-backend form-delivery service.
 *
 * Requires WEB3FORMS_ACCESS_KEY to be set (get one free at web3forms.com by
 * entering the destination email address — no account/card required).
 * Without it configured, callers should fall back to logging server-side
 * (see admissions/actions.ts and contact/actions.ts) so nothing crashes in
 * local development or before the key is set up.
 *
 * This is a placeholder for the eventual internal school-management system
 * integration described in the README — swapping this file's contents for
 * a direct authenticated call into that system is the intended upgrade
 * path, and no page/component needs to change when that happens.
 */

type Web3FormsFields = Record<string, string | null | undefined>;

export async function sendToWeb3Forms(
  subject: string,
  fields: Web3FormsFields
): Promise<void> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("WEB3FORMS_ACCESS_KEY is not set");
  }

  const replyTo = fields.email || undefined;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Graceland Montessori — ${subject}`,
      from_name: "Graceland Montessori website",
      ...(replyTo ? { replyto: replyTo } : {}),
      ...fields,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Web3Forms request failed (${res.status}): ${body}`);
  }

  const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (!data?.success) {
    throw new Error(`Web3Forms reported failure: ${JSON.stringify(data)}`);
  }
}
