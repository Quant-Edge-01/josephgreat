# GEO measurement SOP — benchmark v1.0

## Baseline status

The 50 prompts are frozen in 04-benchmark-50.json. The baseline started on 12 September 2026 Toronto time (13 September UTC), after the owner switched accounts. The UI confirms Unpersonalized: memory, plugins and custom instructions ignored. Fresh temporary chats and explicit Web search selection are verified per prompt. The model selector exposes only ChatGPT (free/default), not the backend version. This limitation must be retained in future comparisons.

All50 responses and manual coding are complete:49 substantive, one clarification. No Joseph mention or visible owned-domain citation. September13 and16 segments must remain separate because of elapsed time and the new Google profile. No pre-Phase1 baseline exists. See17-benchmark-report.md. Web search resets between new chats and must be reselected. The next consistent full run is the reference point; provisional repeat date September30, contingent on recorded deployment/profile state, with another October14. No automation is created.

## Fix conditions before the run

Record the date/time in UTC, exact model label shown by the product, product surface, search setting, language, account tier if relevant, approximate network geography if actually known, and whether history/memory/custom instructions affect the run. Never claim Toronto IP location merely because Toronto appears in a prompt.

Use English exact prompts and a fresh temporary conversation for every response. Prefer memory/custom instructions disabled for the run, but do not change the owner's account-wide settings without authorization. If a controlled condition cannot be established, document it; do not silently call an ordinary personalised account run unpersonalised.

Use one fixed search-enabled condition if the interface offers it. If only an automatic mode exists, call it automatic; save whether each individual answer visibly used search. Do not mix manual search-on runs with automatic runs in a single trend line.

Do not put Joseph, this project, the benchmark purpose, competitor names or special answer-format instructions into a test prompt. Do not ask all 50 questions in one conversation. Do not repeatedly regenerate until the preferred answer appears.

Use interleaved order A1 B1 C1 ... J1 A2 ... J5. If the run crosses a model change or takes more than 48 hours, split the run and disclose it. Account restrictions and model changes are missing observations, not negative results.

## Capture every answer

For each row record:
- run ID and prompt ID; exact prompt is joined from the immutable dataset;
- timestamp, visible model, search condition and location context;
- full raw response preserved locally with source links and a response URL where available;
- whether Joseph is mentioned; whether actually suggested as a provider;
- verbatim relevant description, including false descriptions or caveats;
- all competitor names, normalised names separately;
- exact cited URLs and domains; whether any citation points to josephthegreat.art;
- explicit evidence stated in the answer (price, named case, review, local fit);
- analyst inference in a separate column; never label a hypothesis the model's internal reason;
- status: COMPLETE, FOLLOWUP_REQUESTED, ERROR, RATE_LIMITED or NOT_RUN.

If the model only asks a clarifying question, preserve it as FOLLOWUP_REQUESTED; don't invent a buyer answer. Exclude it from substantive-answer rates and report the follow-up count. If desired, define a separate two-turn benchmark in a new version.

Do not publish raw account details or private conversation URLs in public content.

## Coding rules

Mention = an unambiguous reference to this business, not another person called Joseph.
Recommendation = presented as a provider to consider; a warning or irrelevant name mention is not a recommendation.
Owned-domain citation = actual source link to josephthegreat.art, including www and paths; text merely containing the brand is not a citation.
Any-source citation rate = fraction of substantive answers with at least one source.
Competitor mention = each competitor at most once per answer. Normalise aliases, retain the originals.
Repeat source = count a domain once per answer for the domain trend, with URL totals separately.

Capture mistakes, such as unsupported beauty-client experience or “all services included for $700”. They count as mentions but are flagged as factual errors, not wins.

## Metrics and denominators

Let N = comparable substantive COMPLETE answers, up to 50. Always publish completion coverage N/50 alongside rates.

- Mention rate = answers mentioning Joseph / N.
- Recommendation rate = answers suggesting Joseph as an option / N.
- Owned-domain citation rate = answers citing Joseph's domain / N.
- Any-source citation rate = answers with any source / N.
- Competitor presence = answers mentioning that competitor / N. These rates need not sum to 100%.
- Competitor share = that competitor's answer-level mentions / all provider answer-level mentions; label this different denominator clearly.
- Category rates = relevant numerator / completed prompts in that category; show n/5.
- Location-specific rates = by explicit query geography, not inferred user GPS location.
- Repeated source domains = answer-level domain frequency, with ownership class.
- Factual error rate = answers with unsupported Joseph claims / answers mentioning Joseph.

With N=0, rates are N/A. Never report 0/50 for unrun prompts or errors.

The 50 core prompts are non-branded. Branded diagnostic prompts are a separate set and must not be mixed into the main rate. Suggested diagnostic questions: “Who is Joseph The Great in Toronto?”, “What does Joseph The Great charge?”, “What evidence supports Joseph The Great's client results?” and “Is Yusuf Yakubov connected to Joseph The Great?” Use their answers to audit accuracy, not organic discovery.

## Repetition and interpretation

Run the unchanged v1.0 set every 14 days after the actual completed baseline. Keep the same conditions and record website/content/profile changes between runs. Do not create a recurring automation or spend on an API without a separate request.

Prefer three independent complete runs per time point if feasible; otherwise explicitly label a single noisy run. Report the raw counts and between-run range; five prompts per category is a small sample. Do not present answer order as a deterministic rank.

A valid statement is “mentions changed from X/N to Y/M under these recorded conditions.” It does not prove causation. Model changes, search index updates, personalisation, competing websites and concurrent marketing are confounders. If the conditions differ materially, show separate series.

No hidden exact-prompt optimisation. Keep prompts fixed; if a new market question is added, version the benchmark and retain old comparability.

## Commercial outcome checks

Use existing analytics where accessible: landing page, referral domain, legitimate tagged campaign source and actual enquiries. A referrer can be missing; direct traffic is not proof of ChatGPT. Ask a lead where they found Joseph and distinguish self-reported source from technical attribution.

Track only: index coverage, search impressions/clicks, measured AI citations/mentions, attributable visits, qualified enquiries, calls/proposals and paid self-sourced clients. No visibility score should replace the business outcome.

## Next decision

No indexing → investigate Google URL Inspection and discovery.
Indexed with low AI visibility → review actual repeatedly cited sources and query fit.
Visible with misleading claims → correct factual ambiguity and sources.
Visits without enquiries → inspect offer, proof and CTA.
No usable sample → finish measurement before publishing a “we improved” episode.
