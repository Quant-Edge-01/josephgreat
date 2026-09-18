"""Archive only explicitly marked browser observations already returned in this task.

Does not contact ChatGPT, inspect a browser, or extract account data. Input is the
task's own JSONL tool transcript; outputs are the marked benchmark records only.
"""
import json
import sys
from pathlib import Path

out = Path(__file__).parent / 'raw'
out.mkdir(exist_ok=True)
decoder = json.JSONDecoder()
saved = set()
for line in Path(sys.argv[1]).open():
    item = json.loads(line)
    payload = item.get('payload', {})
    if payload.get('type') != 'function_call_output':
        continue
    value = payload.get('output', '')
    if isinstance(value, list):
        value = '\n'.join(x.get('text', '') for x in value if isinstance(x, dict))
    if not isinstance(value, str):
        continue
    marker = '{"marker":"JTG_GEO_CAPTURE_V1"'
    start = value.find(marker)
    if start < 0:
        continue
    record, _ = decoder.raw_decode(value[start:])
    pid = record['id']
    if len(pid) != 2 or pid[0] not in 'ABCDEFGHIJ' or pid[1] not in '12345':
        raise ValueError('Invalid benchmark ID')
    target = out / (pid + '.json')
    if target.exists() and json.loads(target.read_text()) != record:
        raise ValueError('Refusing to replace an existing observation: ' + pid)
    target.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n')
    saved.add(pid)
print('Archived observed benchmark records:', ', '.join(sorted(saved)))
