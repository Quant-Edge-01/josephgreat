"""Read-only HTTP acceptance checks; never submits the enquiry form."""
import json, sys, urllib.request, urllib.error, urllib.parse, urllib.robotparser
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

base = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://127.0.0.1:3220'
canonical_origin = 'https://www.josephthegreat.art'
if urllib.parse.urlsplit(base).hostname in ('localhost', '127.0.0.1'):
    urllib.request.install_opener(urllib.request.build_opener(urllib.request.ProxyHandler({})))
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.canonicals=[]; self.links=[]; self.ids=set(); self.meta={}; self.ld=[]; self.script=None; self.h1=0; self.text=[]; self.feed(source)
    def handle_starttag(self, tag, pairs):
        a=dict(pairs)
        if a.get('id'): self.ids.add(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='link' and a.get('rel')=='canonical': self.canonicals.append(a.get('href'))
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='script': self.script=a.get('type','javascript')
    def handle_endtag(self,tag):
        if tag=='script': self.script=None
    def handle_data(self,data):
        if self.script=='application/ld+json': self.ld.append(json.loads(data))
        elif not self.script: self.text.append(data)

def fetch(path, ua='Mozilla/5.0'):
    try:
        with urllib.request.urlopen(urllib.request.Request(base+path, headers={'User-Agent':ua}),timeout=30) as r:
            return r.status, r.headers, r.read().decode(), r.url
    except urllib.error.HTTPError as e: return e.code,e.headers,e.read().decode(),e.url

status,headers,robots,_=fetch('/robots.txt'); assert status==200
assert 'text/plain' in headers.get('Content-Type','')
assert 'User-Agent: OAI-SearchBot' in robots
assert canonical_origin+'/sitemap.xml' in robots
rp=urllib.robotparser.RobotFileParser();rp.parse(robots.splitlines())
status,headers,xml,_=fetch('/sitemap.xml'); assert status==200
assert 'xml' in headers.get('Content-Type','')
urls=[n.text for n in ET.fromstring(xml).findall('{*}url/{*}loc')]
assert len(urls)==14 and len(set(urls))==14, urls
pages={}
for url in urls:
    assert url.startswith(canonical_origin+'/')
    path=url[len(canonical_origin):]
    for ua in ['OAI-SearchBot','Googlebot','bingbot','GPTBot']: assert rp.can_fetch(ua,url)
    status,headers,html,_=fetch(path)
    assert status==200,(path,status)
    assert 'noindex' not in headers.get('X-Robots-Tag','').lower(),path
    page=Page(html);pages[path]=page
    assert page.h1==1,(path,'h1',page.h1)
    assert [u.rstrip('/') for u in page.canonicals]==[url.rstrip('/')],(path,'canonical',page.canonicals)
    assert page.meta.get('og:url','').rstrip('/')==url.rstrip('/'),(path,'og:url',page.meta.get('og:url'))
    assert page.meta.get('description') and page.meta.get('og:image'),(path,'metadata')
    assert 'noindex' not in page.meta.get('robots','').lower(),path
    assert page.ld,(path,'JSON-LD')
    if path.startswith('/services/') or path in ['/toronto-marketing','/affordable-marketing-toronto','/about-joseph']:
        text=' '.join(page.text)
        assert 'Toronto' in text and '$700' in text and '$1,000' in text,(path,'visible facts')
        assert len(text.split())>250,(path,'insufficient content')
    print('PASS',path,'canonical, metadata, JSON-LD, server HTML')
# Follow site links and anchors based on fetched markup, including all routes.
for path,page in pages.items():
    for href in page.links:
        target=urllib.parse.urlsplit(urllib.parse.urljoin(canonical_origin+path,href))
        if target.netloc!='www.josephthegreat.art':continue
        dest=target.path or '/'
        if dest not in pages:
            status,_,html,_=fetch(dest);assert status==200,(path,href,status)
            pages_copy=Page(html)
        else:pages_copy=pages[dest]
        if target.fragment:assert urllib.parse.unquote(target.fragment) in pages_copy.ids,(path,href,'missing anchor')
for path in ['/services/not-a-real-service','/works/not-a-real-case']:
    status,_,html,_=fetch(path);assert status==404,(path,status)
    assert 'noindex' in Page(html).meta.get('robots','').lower(),path
for path in ['/hire','/pricing','/contact','/work']:
    status,_,_,url=fetch(path);assert status==200 and urllib.parse.urlsplit(url).path=='/',(path,status,url)
# A UA simulation checks HTTP behaviour, not access from genuine crawler IPs.
for ua in ['OAI-SearchBot/1.4','Googlebot','bingbot','ChatGPT-User']:
    status,_,html,_=fetch('/services/gym-marketing-toronto',ua)
    page=Page(html)
    assert status==200 and page.canonicals==[canonical_origin+'/services/gym-marketing-toronto']
    assert 'Spartan' in ' '.join(page.text)
print('PASS: 14 indexable pages, discovery links/anchors, 404s, legacy redirects, crawler UA responses')
