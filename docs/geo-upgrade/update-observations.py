"""Mechanical extraction from saved responses. Competitor/evidence coding stays manual."""
import csv
import json
import re
from pathlib import Path
from urllib.parse import urlparse

p = Path(__file__).parent
f = p / '04-baseline-observations.csv'
rows = list(csv.DictReader(f.open()))
prompts = json.loads((p / '04-benchmark-50.json').read_text())
exact = {x['id']: x['exact_prompt'] for x in prompts['prompts']}
for row in rows:
    pid = row['prompt_id']
    raw = p / 'raw' / (pid + '.json')
    old = p / 'raw' / (pid + '.md')
    if raw.exists():
        record = json.loads(raw.read_text())
        body = record['body']
        assert exact[pid] in body, pid
        urls = [x['url'] for x in record['links'] if x['url'].startswith('http')]
        followup = 'Please share your location so I can search accurately' in body
        row.update(status='FOLLOWUP_REQUESTED' if followup else 'COMPLETE', date_utc=record['date_utc'],
                   product='ChatGPT web', model_label='ChatGPT/default; exact backend undisclosed',
                   search_mode='Explicit Web search', context_controls=record['condition'],
                   raw_response_path='raw/' + raw.name,
                   response_url='https://chatgpt.com/?temporary-chat=true')
        mentioned = bool(re.search(r'Joseph\s+The\s+Great|josephthegreat\.art', body, re.I))
        row['joseph_mentioned'] = str(mentioned).lower()
        row['joseph_recommended'] = '' if mentioned else 'false'
        row['notes'] = 'Raw UI text preserved. Visible links only; grouped/map citations may be incomplete. Competitor claims unverified. Manual recommendation coding required if mentioned.'
        row['run_id'] = 'segment-2-2026-09-16' if record['date_utc'] >= '2026-09-16' else 'segment-1-2026-09-13'
        if followup:
            row['notes'] += ' Asked for location; no substantive shortlist. No location permission granted. Exclude from substantive-answer denominator.'
    elif old.exists():
        body = old.read_text()
        urls = re.findall(r'\]\((https?://[^)]+)\)', body)
        row['run_id'] = 'segment-1-2026-09-13'
    else:
        continue
    row['source_urls'] = '|'.join(dict.fromkeys(urls))
    domains = list(dict.fromkeys(urlparse(u).hostname.removeprefix('www.') for u in urls))
    row['source_domains'] = '|'.join(domains)
    row['joseph_domain_cited'] = str('josephthegreat.art' in domains).lower()

with f.open('w', newline='') as target:
    writer = csv.DictWriter(target, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)
done = [x['prompt_id'] for x in rows if x['status'] == 'COMPLETE']
captured = [x['prompt_id'] for x in rows if x['status'] in ('COMPLETE', 'FOLLOWUP_REQUESTED')]
prompts['completed_prompt_ids'] = done
prompts['captured_prompt_ids'] = captured
prompts['status'] = 'CAPTURE_COMPLETE_PENDING_CODING' if len(captured) == 50 else 'IN_PROGRESS'
(p / '04-benchmark-50.json').write_text(json.dumps(prompts, ensure_ascii=False, indent=2) + '\n')
print(f'{len(captured)}/50 responses captured; {len(done)} substantive; {sum(x["joseph_mentioned"] == "true" for x in rows)} Joseph mentions; manual coding still required.')
