# Conversion notes

Companion to [RESEARCH.md](RESEARCH.md), which holds the evidence. This file
holds the decisions and the things only a human can finish.

---

## The routing decision: one page

**`/hire` is gone.** It was a separate, deliberately stripped landing page for
paid traffic — no menu, no footer, no jar, no animation — built so a cold click
had exactly one road. That was right when the home page opened with a
full-screen poster and no offer.

Two things changed and killed it.

The home page fold now carries the whole pitch: audience, scope, outcome, the
$3.64 proof and the button. The original reason for a separate landing page
simply stopped existing.

And the offer grew to include the website. The strongest sentence on the site is
now *"You're reading one of the websites"* — which means the page a visitor
lands on **is** the portfolio. Around half of credibility judgements are made on
visual design alone, first impressions form in roughly 50ms, and they halo onto
everything judged afterwards (RESEARCH.md §15). So paid traffic was being routed
to the plainest page on the domain, where that sentence proved the least. That
is backwards. Bought clicks now land on the full thing.

What was lost, and why it is acceptable:

- **Fewer exits.** The home page has a menu and a footer. But its "distractions"
  are the work gallery and the price — evidence, not leaks — and the menu's
  three links are all on-page anchors.
- **Weight.** 189 kB versus 127 kB. Real, but the fold is server-rendered HTML
  with a CSS-only entrance, so the offer paints without waiting for any of it.
- **Message match.** Preserved: the same H1 and the same offer that were on
  `/hire` are now the home page's fold.

**The address still resolves and always must.** `/hire`, `/start` and `/quote`
307 to `/`. Live ad creative points at `/hire`, and a click that cost money can
never be allowed to 404. Temporary rather than permanent, so this is reversible.

Also carried over from `/hire`: the **Identity** block — the portrait plate and
"Joseph. That's who replies." — which only existed there. It sits between the
objections and the price now, trimmed so it stops repeating the record the jar
sequence already delivers.

---

## What is actually being sold

One job, not a menu: **everything a customer sees before they walk in** — the
reels, the ads behind them, the website they land on, and the argument
underneath all three. Shoots repeat for as long as the work needs them, with no
contract that outlives it.

That breadth is deliberately never written as a service list. People comparing
an all-in-one against specialists mark the all-in-one down on each specialist's
home turf, so four bullet points would invite four comparisons and lose most of
them (RESEARCH.md §13). It is stated once, as one domain, in the fold and in
`components/Scope.tsx`.

The website sits inside the $700–$1,000, not beside it. That claim is *not*
asserted — a low price attached to a big claim gets resolved by discounting the
claim, so "a real website, included" would read as "a template, included"
(§14). It is handed to the visitor to verify instead: **"You're reading one of
the websites."** Keep that true. If the site is ever replaced with something
worse, the strongest line on the page stops working.

**Method stays vague on purpose.** How a site gets built in an afternoon, what
the systems are, how many reels a shoot yields — none of that is on the page.
Make the outcome clear, keep the method mysterious.

## The free way in

> **Send me your Instagram. I'll tell you the first three things I'd change —
> free, and you're welcome to go do them yourself.**

The old primary actions were "hire me — $1,000 max" and "tell me what you're
promoting". Both ask a stranger to give first. This one gives first, and the
last clause caps the obligation out loud, which is the part that answers the
actual fear: not "is this good" but "can I get out of this".

It is also a promise kept by hand, one reply at a time. **If it stops being
possible to answer these in a day, change the copy before the volume arrives** —
the honesty is the whole asset here, and one unanswered promise costs more than
the lead was worth.

Price sits under it as reassurance, not as the headline: $700–$1,000 is well
below the $3,000+ it competes against, so it argues *for* the offer.

---

## Tracking

Standard events only, and each means one thing:

| Event | Fires when | Where |
| --- | --- | --- |
| `PageView` | document load, and on each client-side route change | `components/Analytics.tsx` |
| `ViewContent` | visitor reaches the proof section, or opens a case study | `TrackReach.tsx`, `TrackView.tsx` |
| `Lead` | **only** after Web3Forms confirms `success: true` | `EnquiryForm.tsx` |
| `Contact` | outbound click, with `method: "instagram" \| "email"` | `Analytics.tsx` |

Guarantees, all verified in the browser:

- A submit **click** is not a Lead. A network failure is not a Lead. A `200`
  carrying `{"success": false}` — which is what a rejected key returns — is not
  a Lead. Only a confirmed send is.
- `PageView` does not double-fire on the landing route: the pixel snippet fires
  it once per document, and the route-change effect seeds itself with the first
  path so it only fires on an actual change.
- `ViewContent` is deduped at module scope, so React Strict Mode's double effect
  and any remount cannot report the same view twice.
- Every call is wrapped — an ad blocker, or `fbq` throwing, can never be the
  reason a form submission fails.

**To debug:** add `?pixeldebug=1` to any URL (or set `localStorage.pixeldebug =
"1"`). Every event is then logged to the console with its `eventID` before it is
sent, so you can match what the page thinks it sent against Meta's Test Events.

---

## What you have to do by hand

1. **Confirm `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set in Vercel.** This is the
   first thing to check and the most likely explanation for zero enquiries so
   far: with it unset the form cannot send at all, and every visitor who tried
   would have hit an error. Vercel → project → Settings → Environment
   Variables. Redeploy after adding it. Then submit the live form yourself and
   confirm the mail arrives.
2. **Restrict the Web3Forms key to your domain** in their dashboard. The key
   ships in the client bundle by design (their free plan rejects server-side
   posts), so the domain restriction is what stops anyone else posting to it.
3. **Set `NEXT_PUBLIC_META_PIXEL_ID`** if it isn't already, then open Meta
   Events Manager → Test Events, load the site with `?pixeldebug=1`, and confirm
   you see `PageView`, then `ViewContent` when you scroll to the proof, then
   `Lead` after a real submission — and *only* after.
4. **Add a photo of yourself** at `public/joseph.jpg` (portrait, roughly 4:5).
   The identity block is built around it and currently falls back to a
   typographic mark. A real face is one of the better-evidenced trust signals
   available to a solo operator, and it is the one thing on this site I could
   not supply for you.
5. **Local dev**: `.env.local` exists with placeholder values so the form path
   runs end to end locally. It is gitignored. Replace with real values if you
   want to test actual delivery from your machine.

---

## What to test next

Roughly in order of expected value. Change one thing at a time, and give each
enough traffic to mean something — 33–40 visitors cannot separate a good page
from a bad one.

1. **Scope headline.** "Everything a customer sees before they walk in" vs. a
   blunter version naming the website outright in the H1. The first is the
   one-domain framing the evidence prefers; the second is more concrete. This is
   the highest-value thing to test now that the offer has widened.
2. **Offer framing.** "The first three things I'd change" vs. a sharper,
   narrower version: *"I'll tell you why your last three reels didn't get
   saved."* Same work, more specific promise.
3. **Price in the fold vs. below it.** It is currently visible but subordinate
   on `/hire`. Worth testing removed from the fold entirely — the argument for
   keeping it is qualification, and that is measurable: watch reply quality, not
   just form count.
4. **Proof order.** Bridal first (current) vs. Spartan first. Spartan is the
   closer analogue for gyms, studios and camps; bridal is the only one with a
   cost-per-conversation.
5. **Reply-field default.** Instagram handle first vs. email first. The audience
   lives in the app; the handle may be the lower-friction identifier, and the
   form already accepts either.
6. **Ad creative → page continuity.** Run a variant whose first frame uses the
   same words as the H1. Message match is the highest-leverage paid change and
   costs nothing but a caption rewrite.
7. **The Ledger section.** It is the most differentiated thing on the site and
   also the most unusual — worth confirming it helps rather than introducing
   doubt. Test with it removed from `/hire` only.
