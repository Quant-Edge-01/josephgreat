# Conversion notes

Companion to [RESEARCH.md](RESEARCH.md), which holds the evidence. This file
holds the decisions and the things only a human can finish.

---

## The routing decision: `/hire` stays

**It keeps its address and its job.** Nothing pointing at `/hire` needs
changing, so existing ad creative keeps working untouched.

Why not fold it into the home page:

- **Message match.** The single largest lever on paid traffic is repeating the
  ad's promise in the same words at the top of the page the click lands on. The
  home page opens with a full-screen "Be unique." lockup and a scroll sequence.
  Both are good, and neither can be the first thing a cold click sees.
- **Exits.** `/hire` now renders no dots menu and no site footer (see
  `components/SiteChrome.tsx`) — every link on it either sends the form or
  proves a claim. The home page keeps the full menu, because its traffic is
  warm (bio link, a share, a return visit) and for those people the gallery and
  the price are the reason to stay.
- **It's static.** `/hire` is server-rendered HTML with no animation library
  on it — 127 kB first load against the home page's 190 kB. The home page's
  scroll sequence cannot be.

Why not leave the home page as pure art: it is where the Instagram bio link
goes, and it converted at zero by construction — the first screen contained no
offer and the only ways to make contact were `mailto:` links, which open an
empty draft the visitor has to write themselves.

So both pages convert, with different jobs:

| | `/` | `/hire` |
| --- | --- | --- |
| Audience | warm — bio link, shares, returning | cold — paid clicks |
| Opens with | the lockup, then the offer | the offer |
| Chrome | full menu + footer | none |
| First load JS | 190 kB | 127 kB |

**Redirects** (`next.config.mjs`) catch the plausible near-misses so a click
that cost money can never 404: `/start` and `/quote` → `/hire`; `/contact` →
`/#start`; `/pricing` → `/#price`; `/work` and `/works` → `/#work`.

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
