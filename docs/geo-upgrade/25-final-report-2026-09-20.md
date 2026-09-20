# Joseph The Great — GEO/AEO evidence and distribution report

Date: 20 September 2026. Production: `https://www.josephthegreat.art`. Release commit: `1776628`.

## 1. Executive summary

The on-site foundation remains healthy: production build and all 20-route acceptance checks pass. Five of the six newly queued URLs have moved from discovered/not-indexed to indexed. `/service-areas` is still not indexed, but Google's fresh live test says it is available and indexable, so no replacement page or repeated request is justified.

The material implementation was deliberately small: official Google profile association in visible founder content and Organization schema; optional enquiry-source attribution; clearer Dream screenshot dates; updated evidence/distribution documents. No new SEO page or visual redesign.

The dominant remaining gap is corroboration. The public Google profile has no reviews, no inspected client-controlled source confirms the Joseph/Dream relationship, and downstream Dream bookings/revenue remain unknown. Genuine OAI-SearchBot traffic is also unverified because request logs are unavailable.

## 2. Changes implemented

Production code:

- `lib/site.ts`: stable verified Google Business Profile URL.
- `lib/seo.ts`: official Google profile added to Organization `sameAs`.
- `app/about-joseph/page.tsx`: visible official-profile link.
- `components/EnquiryForm.tsx`: optional discovery-source selection and Web3Forms field.
- `app/privacy-policy/page.tsx`: source question disclosed.
- `lib/case-notes.ts`, `lib/discovery-services.ts`, `lib/works.ts`: Dream chart visibly spans July 9–August 7; year/report control remain unavailable.

Audit artifacts: `20-current-audit-2026-09-20.md`, `competitor-evidence-gap.md`, `21-source-first-analysis-2026-09-20.md`, `22-entity-evidence-graph.md`, `23-external-authority-plan.md`, `24-openai-crawler-status-2026-09-20.md` and the dated Search Console CSV.

No external profile, review, client attribution, ad, article or new landing page was created. Google profile name/duplicate were not changed.

## 3. Indexing status

| URL | Status on 20 Sep | Last crawl | Google canonical | Live/index request |
|---|---|---|---|---|
| `/meta-ads-toronto` | Indexed | Sep 18 00:16:03, smartphone | Inspected URL | Prior live test eligible; prior request accepted |
| `/instagram-reels-toronto` | Indexed | Sep 18 00:16:03, smartphone | Inspected URL | Prior request accepted |
| `/creative-marketing-toronto` | Indexed | Sep 18 00:16:03, smartphone | Inspected URL | Prior request accepted |
| `/websites-for-small-businesses-toronto` | Indexed | Sep 18 00:16:03, smartphone | Inspected URL | Prior request accepted |
| `/case-studies` | Indexed | Sep 18 09:32:32, smartphone | Inspected URL | Prior request accepted; discovery subsection shows a non-blocking temporary processing error |
| `/service-areas` | Discovered, currently not indexed | N/A | N/A | Sep 20 live test: available/indexable, valid breadcrumb; prior request not repeated |

The Search Console Overview still displayed its historical 13 indexed/6 not-indexed aggregate. Direct URL Inspection is newer for these URLs; no invented current property-wide total is reported.

## 4. OpenAI crawler status

**Eligibility verified:** live robots allows OAI-SearchBot; sitemap exists; simulated crawler requests return HTTP 200 server-rendered HTML. The official SearchBot prefix file returned 39 ranges during the audit.

**Genuine visit unverified:** no Vercel/CDN request log is accessible from this checkout. User-Agent simulation cannot prove a real OpenAI IP visit, firewall decision, rate limit or requested path. See `24-openai-crawler-status-2026-09-20.md`.

## 5. External corroboration

Currently present: verified public Google Business Profile, official Instagram and owned website. The Google panel visibly connects the brand, marketing-agency category, Toronto/nearby area, canonical site, phone, Instagram and revised description. It shows no reviews.

Nothing independent was added because client permission and review authorship cannot be manufactured. Highest-value legitimate additions are one Dream-controlled acknowledgement and one honest Dream Google review. A verified-directory profile becomes useful only when a real client can support it.

## 6. Entity graph

Strong: Yusuf/Joseph → founder → Joseph The Great; studio → Toronto/GTA/services/price; studio → Dream/Spartan; founder → own media projects; studio → site/Instagram/Google profile.

Weak: Dream → client-controlled confirmation; client experience → review; conversations → qualified definition/bookings/customers/revenue; Yusuf/Joseph → independent professional profile; OpenAI crawler → verified log; discovery → paid client. Full graph: `22-entity-evidence-graph.md`.

## 7. Case-study evidence

- Dream paid: CAD 214.86, 59 messaging conversations, CAD 3.64/conversation. Chart visibly spans July 9–August 7; year/report control absent. Nine leads are owner-reported; qualification, bookings, customers, revenue and ROI unavailable.
- Dream organic: 501,539 Reel views, separately reported. Not attributed to the paid campaign or sales.
- Spartan: 9,224 views in about two weeks, 74.9% non-followers, CAD 0 media spend. Enrolments unavailable.
- Joeroblox85 and Quantlarper: founder-owned reach evidence, explicitly not external client evidence.

WebPage/Service/Organization/Person/Breadcrumb schema matches visible facts. Review/AggregateRating/LocalBusiness markup was not added.

## 8. Competitor and source analysis

The exploratory benchmark repeatedly named ORCAFY (10), myBloom (7), and Whissel, MetaBaz, PPC Guru, The Influence Agency and ZimaPeak (six each). Several combine specific owned service/case pages with reviews or directory/entity records. PPC Guru has a labelled verified Clutch client review; ORCAFY appears across Sortlist/The Manifest/review surfaces. Joseph already has the relevant owned-page architecture but lacks the client-confirmed external layer.

In 48 responses with literal URLs, extraction found 197 URL occurrences across 123 domains: 190 company/client/local-owned-site occurrences, five directory/review occurrences and two ChatGPT/internal. UI labels and Maps captures can omit literal URLs, so the directory/community figures are lower bounds. This sample shows owned pages provide much direct answer evidence, with third-party records strengthening some repeated providers.

## 9. Remaining gaps by likely importance

1. Client-controlled confirmation and genuine review.
2. Dream funnel after conversations.
3. Genuine OAI request/CDN evidence.
4. `/service-areas` actual index inclusion.
5. Exact Google business-name consistency and unresolved duplicate status.
6. Destination-inbox confirmation for the test form.
7. Founder professional-profile corroboration and exact public YouTube URL.
8. Fresh fixed-condition ChatGPT measurement.
9. AI/search-attributed enquiries, calls, proposals and paid clients.

## 10. Benchmark

No fresh repeat was performed. Only two days passed since index requests, one supporting route is still not indexed, and the controlled repeat window remains September 30. The prior result is 0 Joseph mentions in 49 substantive answers from an interrupted exploratory run; it is not a post-implementation result.

## 11. Business measurement

The form now asks optional source: ChatGPT/AI, Google, Instagram, referral, outreach or other. An owner-confirmed TEST ONLY production submission moved from Sending to Sent and produced no browser console warning/error. This confirms Web3Forms acceptance and the success UI. Inbox receipt is not verified.

No new genuine enquiry, booked call, proposal or paid client attributable to AI/search was observed in the sources available to this audit. The test submission must be excluded from business metrics.

## 12. Next actions — maximum ten

1. Confirm the TEST ONLY email is present in `email@josephthegreat.art`.
2. Ask Dream for permission to publish the relationship and any verifiable downstream stages.
3. Invite Dream to leave an honest Google review in its own words.
4. Recheck `/service-areas` once after several days; do not repeatedly request indexing.
5. Obtain Vercel/CDN logs and validate candidate OpenAI requests against the current official IP file.
6. Confirm the real-world Google business name and duplicate ownership/status before any profile action.
7. Add an authentic founder LinkedIn/profile association if an existing account is available.
8. Confirm exact YouTube channel URL before adding it to Person `sameAs`.
9. Run the unchanged 50 prompts around September 30 with saved raw responses and documented controls.
10. Record every real enquiry's source, then calls, proposals and paid-client outcome in a minimal decision log.

There is still no evidence that the GEO implementation has increased ChatGPT mentions or produced a self-sourced client. Technical eligibility and indexation improved; authority and business outcome remain the test.
