/**
 * Delivers form submissions to the school's inbox via Web3Forms
 * (https://web3forms.com) — a free, no-backend form-delivery service.
 *
 * IMPORTANT: this runs client-side, in the visitor's browser. Web3Forms's
 * free tier only accepts submissions posted directly from a browser — it
 * rejects server-to-server calls (e.g. from a Next.js Server Action) with
 * "This method is not allowed... Pro plan is required". So the access key
 * here is NEXT_PUBLIC_ on purpose: Web3Forms's own docs treat it as a
 * public, rate-/domain-restricted "form ID", not a secret — it ends up in
 * the browser bundle regardless of what env-var prefix is used, since the
 * request has to originate from the browser either way.
 *
 * Requires NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to be set (get one free at
 * web3forms.com by entering the destination email address — no
 * account/card required, but you must click the confirmation link
 * Web3Forms emails you before the key will accept submissions).
 *
 * This is a placeholder for the eventual internal school-management system
 * integration described in the README.
 */

type Web3FormsFields = Record<string, string | null | undefined>;

export async function sendToWeb3Forms(
  subject: string,
  fields: Web3FormsFields
): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set");
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
