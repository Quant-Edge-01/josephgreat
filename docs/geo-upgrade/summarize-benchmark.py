"""Summarize captured output plus explicit human-readable manual coding, no AI calls."""
import csv
import json
from collections import Counter, defaultdict
from pathlib import Path

p = Path(__file__).parent
f = p / '04-baseline-observations.csv'
rows = list(csv.DictReader(f.open()))
coding = json.loads((p / 'benchmark-coding.json').read_text())
dataset = json.loads((p / '04-benchmark-50.json').read_text())
assert len(rows) == len(coding['prompts']) == 50
assert len({r['prompt_id'] for r in rows}) == 50
assert all(r['status'] in ('COMPLETE', 'FOLLOWUP_REQUESTED') for r in rows)
counts, domains = defaultdict(list), defaultdict(list)
segments, categories = defaultdict(Counter), defaultdict(Counter)
for row in rows:
    pid = row['prompt_id']
    competitors, evidence = coding['prompts'][pid]
    assert (p / row['raw_response_path']).exists(), pid
    row['competitors_mentioned'] = competitors
    row['selection_evidence_observed'] = evidence
    row['selection_inference'] = 'Answer-stated rationale only; actual retrieval/selection mechanism not observable.'
    row['joseph_description'] = 'Not mentioned in captured output'
    row['citation_capture'] = 'Labels present; URLs unavailable' if pid == 'B4' else 'No citations in clarification' if pid == 'D3' else 'Visible URLs captured; grouped/map sources incomplete'
    row['provider_list_present'] = str(bool(competitors)).lower()
    row['notes'] = ('Manual narrative-provider coding complete; source/price/review claims are not independently verified. '
                    'Map-only names and client examples excluded. Full wording retained in raw response. ')
    if pid in ('D3', 'F5', 'E3', 'H2', 'I4', 'J2', 'J3', 'B4', 'E4'):
        row['notes'] += evidence
    for name in set(filter(None, competitors.split('|'))):
        counts[name].append(pid)
    for domain in set(filter(None, row['source_domains'].split('|'))):
        domains[domain].append(pid)
    for counter in (segments[row['run_id']], categories[pid[0]]):
        counter['attempts'] += 1
        counter['substantive_answers'] += row['status'] == 'COMPLETE'
        counter['provider_lists'] += bool(competitors)
        counter['joseph_mentions'] += row['joseph_mentioned'] == 'true'
        counter['joseph_owned_domain_visible_citations'] += row['joseph_domain_cited'] == 'true'
        counter['responses_with_visible_url'] += bool(row['source_urls'])
with f.open('w', newline='') as target:
    w = csv.DictWriter(target, fieldnames=rows[0].keys())
    w.writeheader()
    w.writerows(rows)
ranked = sorted(counts.items(), key=lambda x: (-len(x[1]), -len(set(i[0] for i in x[1])), x[0]))
stats = {
    'label': 'Interrupted exploratory benchmark; not clean pre-change baseline',
    'coding_method': coding['method'],
    'segments': dict(segments), 'categories': dict(categories),
    'competitors': [{'name': n, 'count': len(ids), 'share_of_50_attempts': len(ids)/50, 'prompt_ids': ids} for n, ids in ranked],
    'visible_source_domains': [{'domain': n, 'count': len(ids), 'prompt_ids': ids} for n, ids in sorted(domains.items(), key=lambda x: (-len(x[1]), x[0]))],
    'limitations': ['Grouped and map citations not fully exposed', 'B4 citation labels but no captured URLs', 'D3 clarification without provider list', 'F5 substantive advice without named marketing provider', 'Backend version undisclosed', 'New Google profile between segments; creation/verification date unknown', 'No branded prompts in this non-branded50; branded visibility requires a separate control set']
}
(p / 'benchmark-results.json').write_text(json.dumps(stats, ensure_ascii=False, indent=2) + '\n')
dataset['status'] = 'CAPTURE_AND_MANUAL_CODING_COMPLETE_INTERRUPTED_EXPLORATORY'
dataset['measurement_label'] = stats['label']
dataset['summary_path'] = 'benchmark-results.json'
(p / '04-benchmark-50.json').write_text(json.dumps(dataset, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'segments':stats['segments'], 'top10':stats['competitors'][:10], 'domains':stats['visible_source_domains'][:10]}, indent=2))
