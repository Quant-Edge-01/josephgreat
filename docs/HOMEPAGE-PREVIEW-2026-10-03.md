# Joseph The Great — homepage preview, 3 October 2026

## Status at preview time

On 3 October, this was a local preview at `http://127.0.0.1:3100/`. Screenshots: `previews/home-desktop.jpg` and `previews/home-mobile.jpg`. See the release note below for the later production status.

## What changed

- Replaced the left-aligned dark homepage sequence with a centred, spacious editorial story on mostly white backgrounds.
- Kept the original tap-to-enter syrup jar, sound behaviour, real masked founder photo, the red/amber identity, and the existing enquiry form.
- Put the category, Toronto/GTA audience, and three core services in the first screen in plain language.
- Added a scroll-driven syrup pour at the right of the explanation and a tappable mask in the founder section. Both work without making the important copy depend on JavaScript.
- Made pricing, separate ad spend, local client proof, and limits of the available metrics explicit.
- Left the 20 existing commercial, case-study and support routes intact.

## Verification

- Production build: passed locally.
- TypeScript check: passed after the build.
- `scripts/check-geo.py` against the local preview: 20/20 public routes passed canonical, metadata, JSON-LD, server HTML, internal-link and simulated crawler User-Agent checks.
- Browser review: desktop and 390px mobile layouts; no mobile horizontal overflow; the mask button changes state; no browser errors observed.
- No production deploy and no external form submission were made for this preview.

## Discovery evidence and limits

- A prior exploratory ChatGPT run mentioned Joseph in 0 of 49 substantive answers. It preceded later GEO changes and cannot be used as their result. The unchanged 50-prompt post-change repeat is still outstanding.
- In two sampled unbranded web-search queries on 3 October, surfaced results included MetaBaz, ORCAFY, TBL Digital and others, but Joseph was not among the visible results. This is a limited search snapshot, not a ChatGPT ranking or a full SERP audit.
- Search Console indexation and real OAI-SearchBot visits were not reverified during this design pass. Prior reports must not be presented as current status.

## Next discovery work

1. Run the unchanged 50-prompt ChatGPT benchmark under documented conditions and save all answers/citations.
2. Recheck important URLs in Search Console; diagnose any unindexed pages before creating new ones.
3. Seek permission for a Dream Alterations testimonial, review or client-site credit; publish only authentic, approved corroboration.
4. Verify genuine OpenAI crawler traffic in host/CDN logs if accessible.
5. Attribute AI/search enquiries through the existing optional form question and actual leads, not mentions alone.

## Follow-up copy pass, 3 October 2026

Joseph asked to keep the approved homepage design, use only **Yusuf** without a surname, and make supporting pages lighter. The public homepage, About copy, Organization description and Person structured data now use Yusuf only. The full surname is absent from public app, component and SEO source files.

The Toronto marketing, pricing, About and case-study listing pages have shorter copy and shorter headings. Service and industry pages combine repeated scope, pricing and location sections while keeping a real evidence link and factual limitations. Shared support-page headers are centred with more breathing room; the long list of additional services is now expandable. The homepage design was not otherwise revised in this pass.

Build, type check and the read-only 20-route local acceptance check passed again. The final About, Pricing, Toronto Marketing and case-study listing pages were viewed at 390px with no horizontal overflow. Local screenshots: `previews/about-mobile.jpg` and `previews/pricing-mobile.jpg`. These were preview results before publication.

## Release verification, 4 October 2026

- Owner approved publication. Commit `7e9e38a` was pushed to `main`; GitHub reported the Vercel status as successful with “Deployment has completed.”
- The public homepage returned HTTP 200 and contained the new hero, the new homepage styling and no surname in its initial HTML. The public About page showed “Yusuf” without the surname.
- `python3 scripts/check-geo.py https://www.josephthegreat.art` passed for all 20 public routes: canonical, metadata, JSON-LD, initial HTML, internal links, robots/sitemap and simulated crawler User-Agents.
- The public homepage and About page were reviewed at 390px; neither had horizontal overflow. The tap-to-enter interaction opened the homepage. No production form submission was made for this release because the form itself was not changed.
- These checks verify publication and technical behaviour. They do not establish Google indexation changes, genuine OAI-SearchBot visits, ChatGPT recommendations, enquiries or sales.
