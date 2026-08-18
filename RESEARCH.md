# Conversion research → site changes

Evidence base for the August 2026 rebuild. Each entry is: **source → what it
actually found → the specific thing that changed on this site.**

Rules I held myself to while writing this:

- No "this colour activates a brain region" claims. Where a mechanism is
  disputed or the effect is context-dependent, that is stated.
- Findings that argue *against* a change I wanted to make are kept in (see
  §3 choice overload, §7 form length).
- Nothing here justifies inventing proof. Every number on the site is read off
  a screenshot in `public/works/`.

---

## 1. The first screen has ~10 seconds to state the offer

**Source.** Nielsen, [*How Long Do Users Stay on Web Pages?*](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)
(NN/g, 2011); [*First Impressions Matter: How Designers Can Support Automatic
Cognitive Processing*](https://www.nngroup.com/articles/first-impressions-human-automaticity/) (NN/g).

**Finding.** Page dwell follows a negative Weibull distribution — the hazard of
leaving is highest in the first 10 seconds. Pages survive that window only if
the value proposition is already legible. Clear the 10-second bar and you buy
minutes; miss it and the visit is over before any scrolling happens. First
impressions also set perceived credibility, not just perceived aesthetics.

**Change.** The old home page spent its entire first viewport on the words
"Be unique." and nothing else — no service, no audience, no result, no action.
The new fold states audience (Toronto/GTA local business), scope
(everything a customer sees before they walk in — reels, the ads behind them,
the site they land on), outcome (people messaging you, not views), proof
($3.64 per conversation, screenshotted) and next action, while keeping the
"Be unique." lockup as the visual anchor. The poster still exists; it is no
longer the whole screen.

---

## 2. Scroll-gated content is content most people never see

**Source.** [*Scrolljacking 101*](https://www.nngroup.com/articles/scrolljacking-101/) (NN/g);
[*What Parallax Lacks*](https://www.nngroup.com/articles/parallax-usability/) (NN/g).

**Finding.** Overriding scroll pace or direction degrades user control,
discoverability, attention, efficiency and task success. In testing, users
scroll fast and scan for keywords rather than waiting for animated reveals, so
goal-oriented visitors routinely miss content that only appears at a specific
scroll offset. Both patterns are also a vestibular-accessibility risk.

**Change.** The `Approach` section was a 520vh pinned stage where each of the
three copy blocks was visible only inside a narrow scroll-progress window
(01 at 0.05–0.26, 02 at 0.30–0.52, 03 at 0.56–0.80). A fast flick on a phone
delivered all three at zero. The sequence is cut to 300vh, the reveal windows
were widened and made non-exiting (copy fades in and *stays*), and the same
three messages are now also carried by static, always-rendered sections above
and below it. The jar performance is now decoration on top of a page that
reads fine without it.

---

## 3. Choice overload is real but conditional — don't cargo-cult "one CTA"

**Source.** Scheibehenne, Greifeneder & Todd,
[*Can There Ever Be Too Many Options? A Meta-Analytic Review of Choice
Overload*](https://www.semanticscholar.org/paper/Effects-of-Perceptual-Fluency-on-Judgments-of-Truth-Reber-Schwarz/5a14c99cae5603943848d43273242a4c06e9e72c)
(J. Consumer Research, 2010; 50 experiments, ~5,000 participants);
Chernev, Böckenholt & Goodman, [*Choice overload: a conceptual review and
meta-analysis*](https://www.sciencedirect.com/science/article/abs/pii/S1057740814000916) (JCP, 2015).

**Finding.** The mean effect of assortment size on satisfaction is
approximately **zero** (d ≈ 0.02). "More choice always hurts" is not supported.
Choice overload appears reliably only under specific moderators — high choice
complexity, difficult decision task, **high preference uncertainty**, and
non-expert choosers.

**Change.** I did *not* strip the site to a single button on the strength of a
folk theorem. But cold paid traffic arriving from a Reel is precisely the
moderator profile where overload does bite: they don't know the category, don't
know what short-form should cost, and have no preference formed. So on `/hire`
(paid traffic only) there is one primary action and one fallback; on `/` (warm,
brand-curious traffic) the fuller menu of work, price and contact survives.
The reduction is targeted at the audience the evidence says needs it.

---

## 4. Low contrast doesn't just hurt reading — it lowers believed truth

**Source.** Reber & Schwarz,
[*Effects of Perceptual Fluency on Judgments of Truth*](https://carlo-hamalainen.net/stuff/Reber_Schwarz_Perceptual_fluency.pdf)
(Consciousness & Cognition, 1999); Schwarz et al., [*Processing fluency in
consumer judgment and decision making*](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/12/21_CPR_Schwarz_et_al_Metacognitive_experiences_review.pdf) (review).
Threshold from WCAG 2.2 SC 1.4.3.

**Finding.** Identical statements presented in high-contrast colour were judged
true significantly above chance; the same statements at moderate contrast were
judged true only at chance. Ease of processing is misattributed as evidence of
truth. This is one of the better-replicated findings in the fluency literature.

**Change.** This is the single most damaging thing the old site did to itself.
The one piece of hard proof on the home page — *"last local job — $3.64 per
conversation started"* — was set in 10px uppercase mono at `text-ash/40`, about
**1.6:1** against white. The most important true claim on the site was rendered
in the exact condition the experiment uses to *suppress* believed truth. All
proof numbers are now high-contrast, larger, and set in the display face.
Site-wide: `t-mono` went 10px → 11.5px, minimum body opacity on dark raised
from 0.25/0.30/0.35 to 0.62+, and every remaining low-alpha use is decorative
rather than load-bearing.

---

## 5. Expertise is the part of credibility that moves people — show it, don't assert it

**Source.** Wilson & Sherrell, [*Source effects in communication and persuasion
research: a meta-analysis of effect size*](https://link.springer.com/article/10.1007/BF02894421)
(J. Academy of Marketing Science, 1993); [Stanford Web Credibility
Guidelines](https://en.wikipedia.org/wiki/Stanford_Web_Credibility_Project)
(Fogg et al., ~4,500 participants).

**Finding.** Across source manipulations, **expertise** produced the largest
persuasion effect (~16% of explained variance), ahead of other source traits.
Stanford's guidelines add: show that real, identifiable people stand behind the
site, and make it easy to verify claims.

**Change.** Proof moved above argument. The Dream Alterations case (Ads
Manager: $214.86 → 59 conversations at $3.64 → 9 leads) is now the first
evidence a cold visitor meets, with a link straight to the screenshots. Added a
"who's actually doing this" block naming Joseph as the single person who does
the work and replies. Added a slot for a real portrait (`/public/joseph.jpg`) —
it degrades gracefully to a typographic mark if the file is absent, and the
file is listed as a manual step rather than faked.

---

## 6. SMB caution is rational, so answer the specific fear

**Source.** [*Are B2B Buyers Cowards? The Importance of
Trust*](https://www.forrester.com/blogs/are-b2b-buyers-cowards/) (Forrester);
Inciarte, [*Vendor Trust Erosion in Small-Business Technology
Purchasing*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6725058) (SSRN).

**Finding.** Small-business buyer hesitancy is better modelled as a calibrated
response to a real history of vendors over-promising than as irrationality —
roughly 60% of formal software purchases produce post-purchase regret. Trust is
what converts a risk-averse buyer, and trusted vendors are ~2× more likely to be
recommended or paid a premium.

**Change.** Added an explicit *"what these numbers are and are not"* block that
separates **views** from **messaging conversations** from **leads**, in Joseph's
own voice, and says outright that views are the cheap number and conversations
are the one that costs money. Volunteering the weaker interpretation of your own
evidence is the cheapest trust signal available and almost no competitor does
it. Also added a plain answer to "what happens after I hit send" — who replies,
how fast, no call, no calendar link, no follow-up sequence.

---

## 7. Fewer fields, but only fields the visitor doesn't value

**Source.** Syntheses of HubSpot / Quicksprout / Venture Harbour form data
([5 Studies on How Form Length Impacts Conversion
Rates](https://ventureharbour.com/how-form-length-impacts-conversion-rates/));
counter-evidence in CXL, [*Should You Really Reduce Form
Fields?*](https://cxl.com/blog/reduce-form-fields/); Baymard on
[label placement](https://baymard.com/blog/mobile-forms-avoid-inline-labels)
and inline validation.

**Finding.** Field count and completion are inversely related across large
samples, and required phone-number fields cost roughly 5–15% (B2C audiences read
them as a spam signal). But this is **not** a law: CXL documents a client where
cutting fields dropped conversions 14%, because the removed fields were ones
visitors wanted to answer. Baymard: top-aligned labels are read fastest
(label + field in one fixation); 31% of sites still ship no inline validation;
error text should state the requirement, not just the violation.

**Change.** Required fields went 3 → **2**, and the two that remain are things a
business owner can answer without thinking: *your Instagram or website*, and
*where to send the reply*. Business name was dropped — the URL implies it. A
third field ("what are you promoting") is kept but made **optional and
labelled optional**, since it is the field visitors actually want to answer.
No phone field anywhere. Labels stay top-aligned, validation now runs on blur
as well as submit, and messages state the requirement
("An email or an @handle — either is fine") rather than just "invalid".

---

## 8. Ad-to-page message match is the biggest single paid-traffic lever

**Source.** NextAfter, [*How congruence between ad and landing page affects
conversion*](https://www.nextafter.com/experiments/how-congruence-between-ad-and-landing-page-affects-conversion/);
KlientBoost and Disruptive/Moz message-match case studies.

**Finding.** Aligning the landing-page headline with the ad headline produces
large lifts with no change to offer, targeting or creative (documented cases in
the tens of percent and above). Congruence operates on four dimensions: visual,
headline, information scent (same keywords/pain points), and tone.

**Change.** This is the main reason **`/hire` survives as a separate page**. It
exists so the ad's promise can be repeated verbatim at the top of the page the
click lands on, without the home page's brand-first sequence in between. Its H1
now names the audience and the outcome in the same words the ads use, and the
page-level exits (hamburger nav, full site footer) were removed so paid traffic
has one road. See `CONVERSION-NOTES.md` for the full routing decision.

---

## 9. Show the price when the price is an advantage

**Source.** 2026 B2B buyer surveys collated in
[HockeyStack Labs](https://www.hockeystack.com/lab-blog-posts/state-of-pricing-demo-case-study-pages)
and [Pace Pricing](https://www.pacepricing.com/blog/hidden-prices-lost-buyers-why-b2b-saas-companies-should-embrace-transparency);
practitioner data on transparent vs. gated pricing pages.

**Finding.** Around 71% of B2B decision-makers now rate price transparency as
important in supplier selection, and ~45% cite unclear pricing as their biggest
frustration when evaluating vendors. Transparent pricing pages convert *fewer*
visitors but qualify them: people convert only once they know they can afford
it. Gated pricing inflates raw conversion with unqualified curiosity.

**Change.** Price stays visible and early — but deliberately *subordinate* to
the offer. The reasoning is specific to this business: $700–$1,000 is well below
the $3,000+ category anchor Joseph is competing against, so the number is an
argument, not an objection, and hiding it would forfeit that. It appears as a
one-line reassurance in the fold ("and $1,000 is the ceiling, not the starting
point") with the full pricing section further down, rather than as the fold's
headline.

---

## 10. Give before you ask, and cap the obligation explicitly

**Source.** Trust-as-risk-remedy findings in §6; conversion-path reasoning from
§8. Framed deliberately as *risk reduction*, not as a reciprocity "trigger" —
the strong version of reciprocity-as-automatic-compliance is not something I'd
stake a design on.

**Finding.** The barrier for a cold visitor is not persuasion, it is perceived
risk: entering a sales process they can't exit. An offer that delivers something
usable before any commitment converts the risk question from "will this person
waste my money" into "will this person waste fifteen minutes."

**Change.** The primary call to action is no longer "hire me" or "tell me what
you're promoting" — both of which ask the visitor to give first. It is now:

> **Send me your Instagram. I'll tell you the first three things I'd change —
> and you're free to go do them yourself.**

That final clause is doing the heavy lifting: it caps the obligation out loud.
It is also honest, which matters, because it is the one promise on this site
Joseph has to keep by hand, every time. Supporting microcopy states who replies
(him), roughly when (within a day), and what will not happen (no call, no
calendar link, no follow-up sequence). "Hire me / get a quote" is demoted to
the secondary action for visitors who are already convinced.

---

## 11. Accessibility items that are also conversion items

**Sources.** WCAG 2.2 SC 1.4.3 (Contrast Minimum), SC 2.3.3 (Animation from
Interactions), SC 2.5.8 (Target Size Minimum); NN/g on the
[illusion of completeness](https://www.nngroup.com/videos/illusion-completeness/).

**Findings and changes.**

| Issue | Change |
| --- | --- |
| 10px uppercase mono at 0.22em tracking used for every label | `t-mono` raised to 11.5px/12.5px, tracking eased to 0.16em |
| `prefers-reduced-motion` only killed CSS transitions; the scroll-driven jar still ran full amplitude | Motion's `useReducedMotion` now flattens the jar sequence and reveals all copy statically |
| Full-bleed 100dvh hero with no content edge visible | Fold now shows the top of the next section, plus a real scroll affordance |
| Contact modal had no focus trap and no focus restore | Focus is trapped while open and returned to the trigger on close |
| Mailto as a primary mobile action (opens a blank draft the visitor must write) | Demoted to fallback; the form is the primary path everywhere, including work pages |

---

## 13. Breadth has to read as one job, not four services

**Source.** Work on the "jack of all trades" effect and compensatory inference
in multi-category evaluation — see the review of
[multi-category endorsement effects](https://www.researchgate.net/publication/372762418_JACK_OF_ALL_TRADES_MASTER_OF_EVERYTHING_COMPETING_ROUTES_OF_CONSUMER_RESPONSES_TOWARD_MULTIPLE_PRODUCT_CATEGORIES_ENDORSEMENT_OF_FASHION_INFLUENCERS)
and the all-in-one-versus-specialist literature summarised in
[Kellogg Insight](https://insight.kellogg.northwestern.edu/article/jack_of_all_trades_or_master_of_one).

**Finding.** When people evaluate a choice set containing both specialised and
all-in-one options, they tend to assume overall performance is roughly
equivalent and resolve that by **marking the all-in-one down** on each
specialist's differentiating attribute. Breadth presented as a list of
capabilities therefore invites one comparison per item — and loses most of them.
Generalists hold their own when the domain is framed as a single one.

**Change.** The money now covers reels, the ads behind them, the site they point
at and the strategy underneath. The obvious way to say that is four bullet
points, which is precisely the losing move. Instead the fold names one domain —
*everything a customer sees before they walk in* — and the new `Scope` section
argues that these are not separable problems ("a reel that works, pointing at a
website that doesn't, is still a business nobody calls"). No packages, no
service grid, no icons. One job, stated once.

---

## 14. A low price attached to a big claim discounts the claim, not the price

**Source.** [*Impact of "High Quality, Low Price" Appeal on Consumer
Evaluations*](https://www.tandfonline.com/doi/full/10.1080/10496491.2015.1088922)
(Journal of Promotion Management); Dawar & Parker, [*Can Low Price Signal High
Quality?*](https://flora.insead.edu/fichiersti_wp/inseadwp1996/96-91.pdf)
(INSEAD working paper); price–quality inference reviews.

**Finding.** Where a "high quality" cue and a "low price" cue conflict, people
resolve the mismatch by **discounting the quality cue**. Price is used as a
quality signal most heavily when the buyer is highly involved, perceives real
risk, and cannot verify quality directly — i.e. exactly a local owner deciding
whether a stranger can rebuild their online presence for $700.

**Change.** This is why "a full website, included" could not simply be asserted:
the sentence would have been read as "a template, included". Two things carry it
instead. The price gets a **structural** justification rather than an apologetic
one — no office, no account manager, no sales team, and systems that already
exist, so a site is not rebuilt from nothing each time. And the claim is handed
to the visitor to check rather than argued: *"You're reading one of the
websites."* Verification beats assertion when the asymmetry is the problem.

Related: the age answer stopped saying "that's why it costs $700". Tying the
price to the seller's youth invites exactly the quality discount above. It now
reads as tenure — seven years, starting at eleven — and cultural fluency, with
the price explained by structure instead.

---

## 12. What this research does *not* license

- No invented testimonials, client counts, guarantees, scarcity or revenue
  figures. The four cases on the site are the four that exist.
- No claim that views cause enquiries. The site now says the opposite out loud.
- No dark patterns: no fake urgency timers, no "3 spots left", no pre-checked
  boxes, no exit-intent interstitial.
- Effects reported in practitioner case studies (§8, §9) are single-company
  results, not meta-analytic estimates, and are treated as directional only.
