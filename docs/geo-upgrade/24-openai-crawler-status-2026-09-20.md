# OpenAI crawler status — 20 September 2026

## Verified

- Public `robots.txt` explicitly allows `OAI-SearchBot` and references the canonical sitemap.
- The live site returns HTTP 200 and server-rendered HTML to simulated `OAI-SearchBot`, `ChatGPT-User`, Googlebot and Bingbot User-Agent requests.
- The current official OpenAI SearchBot range file at `https://openai.com/searchbot.json` returned 39 prefixes and creation time `2026-01-02T11:00:00.000000` when read during this audit.
- OpenAI's current search help says eligibility requires allowing OAI-SearchBot and ensuring the host/CDN allows traffic from OpenAI's published searchbot IP addresses. It does not promise inclusion or position.

## Unverified

No Vercel/CDN/firewall request log is accessible from this checkout or authenticated tooling. Therefore this audit cannot establish that a genuine OpenAI IP requested the site, which routes it requested, or what status/WAF/rate-limit treatment it received.

The response headers identify Vercel. No Cloudflare layer was established. A matching User-Agent alone is insufficient because it can be spoofed.

## Required evidence

Export or inspect request logs containing timestamp, client IP, User-Agent, path, status and WAF/rate-limit outcome. Match candidate OAI-SearchBot requests against the official current prefix file at audit time. Preserve the range-file timestamp. Absence in a short log window means “not observed,” not permanently blocked.
