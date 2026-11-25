/**
 * Cheap, friction-free checks that keep sales pitches out of the school's
 * inbox without making parents solve a puzzle. Used by the contact and
 * admissions forms before anything is sent.
 *
 * These are a first line of defence, not a guarantee: a determined spammer
 * can reword a pitch. If spam keeps arriving, add a captcha on top (see the
 * Web3Forms docs); these checks stay useful either way.
 */

/** A human takes longer than this to fill in a form, even with autofill. */
export const MIN_FILL_MS = 3000;

/** Phrases that almost only appear in unsolicited marketing, never in a parent's enquiry. */
const SPAM_PHRASES = [
  "reddit thread",
  "reddit marketing",
  "first page of google",
  "page one of google",
  "8 figure",
  "eight figure",
  "backlink",
  "link building",
  "guest post",
  "search engine optimi",
  "seo service",
  "seo expert",
  "seo agency",
  "rank your website",
  "rank higher",
  "increase your traffic",
  "boost your traffic",
  "increase your sales",
  "web design service",
  "website redesign",
  "lead generation",
  "buy followers",
  "casino",
  "crypto",
  "forex",
  "viagra",
  "let me know if you want me to send over",
  "i have been doing this for the past",
];

/** True if the text reads like an advertisement rather than a genuine enquiry. */
export function looksLikeSolicitation(...texts: string[]): boolean {
  const text = texts.join(" ").toLowerCase();
  if (SPAM_PHRASES.some((p) => text.includes(p))) return true;
  // Several links in a short enquiry is a strong spam signal; one link is normal.
  const links = text.match(/https?:\/\/|www\./g)?.length ?? 0;
  return links >= 2;
}

export const TOO_FAST_MESSAGE =
  "That was very quick! Please check your details and press Send again.";

export const SOLICITATION_MESSAGE =
  "Your message looks like an advertisement, so we couldn't send it. If this is a genuine enquiry, please call or email us directly.";
