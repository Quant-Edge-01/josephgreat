# Current-site audit

Audit date: 12 September 2026. Current source revision: 7d84944. This is a fresh audit of the already upgraded site, not the earlier pre-Phase-1 audit.

## Sources and evidence level

| Source | Inspected | What it supports |
|---|---|---|
| Current tracked source, routes, metadata, services, cases and schema | Yes | Implementation and published copy decisions |
| Public HTTP audit of all 14 sitemap pages | Yes, rerun this phase, passed | HTTP response, server HTML, canonical/OG URL, JSON parsing, links and anchors |
| OAI-SearchBot / Googlebot / bingbot / ChatGPT-User header simulations | Yes, existing script passed | Responses to those headers from the testing network only |
| Genuine OpenAI IP traffic and CDN/WAF logs | No authenticated logs inspected | Actual crawler access remains unknown |
| Saved Dream, YouTube and Quantlarper screenshots | Inspected during Phase 1 | Historical displayed metrics; not a fresh account export |
| Analytics/Meta/email transaction accounts | Not inspected in this phase | No traffic, revenue, conversion or lead-count revalidation |
| Search Console | Ownership auto-verified in earlier UI | Ownership only; sitemap submission and indexing remain unconfirmed |
| ChatGPT benchmark | Awaiting controlled run | No observed mention/citation rate |
| Five competitor primary pages | Yes | Claims and content they publish, not validated business outcomes |
| Independent reporting on Joseph | Earlier limited searches found no qualifying coverage | Insufficient basis for Wikipedia; not proof no coverage exists anywhere |

## Findings

| Priority | Finding | Evidence / practical consequence |
|---|---|---|
| P0 | Phase 1 technical foundations are working | All 14 public pages passed the HTTP acceptance script |
| P0 | No controlled AI baseline | No stored 50-answer run; cannot report 0/50 or improvement |
| P0 | Founder name incomplete | About and Person say Joseph; new owner input supplies Yusuf Yakubov |
| P0 | Case provenance is uneven | Nine leads are reported, while the visible aggregate screenshot proves 59 conversations and spend; generic “all figures from screenshots” is too broad |
| P0 | No confirmed independent commercial corroboration | Most evidence is hosted by Joseph; no verified client-side credit/review established |
| P1 | No dedicated Meta/Reels/websites pages | General hub covers all three, leaving service-specific scope and FAQs scattered |
| P1 | Every service schema currently uses the same broad serviceType | Factual but imprecise for an individual service page |
| P1 | New industry pages use text links for evidence | Real assets exist; a relevant thumbnail plus evidence note would make them more useful to humans |
| P1 | Geography is Toronto/GTA only | Exact areas and filming/travel terms need one factual service-area explanation |
| P1 | Pricing is clear as a range, less clear as deliverables | A buyer cannot infer counts, revisions, filming time or ownership terms; do not invent them |
| P1 | Existing jar on a cold case-page visit | Raw HTML is present, but a browser user still encounters the entrance; do not pretend there is no interaction for every browser-rendered route |

## Validation boundaries

- Canonicals: one correct www self-canonical for every existing sitemap page; root trailing slash treated as equivalent.
- Sitemap: 14 unique URLs, including home, privacy, four cases, five industries, hub, founder and price page.
- JSON-LD: valid JSON, matching broad factual content. This is not a schema.org validator certification or eligibility for a rich result.
- Internal links: tested known public paths and fragments; no broken internal targets reported. Footer links and hub/case links give current pages discovery paths.
- Initial HTML: meaningful page text is in the HTTP response, independent of client-side JavaScript.
- Crawl permission: no robots disallow or page noindex detected on the tested public pages.
- Performance: prior production build passed; prior responsive checks at 390px had no horizontal overflow. These are not fresh Core Web Vitals or Lighthouse measurements.
- No code changes made for this audit. Baseline content must remain fixed until the measurement run is captured or the owner explicitly chooses to proceed without it.

