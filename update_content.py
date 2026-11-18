import json, os, datetime, urllib.request, xml.etree.ElementTree as ET

NEWS_FEED = 'https://feeds.bbci.co.uk/news/rss.xml'
TMDB_KEY = os.environ.get('TMDB_KEY', '')

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'nova-tv-updater'})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()

def news(url, limit=12):
    out = []
    root = ET.fromstring(get(url))
    for it in root.iter('item'):
        title = (it.findtext('title') or '').strip()
        if not title:
            continue
        img = ''
        for el in it:
            if el.tag.endswith('thumbnail') or el.tag.endswith('content'):
                img = el.get('url', '') or img
        out.append({'title': title, 'sub': 'News', 'kicker': 'Top news',
                    'desc': (it.findtext('description') or '').strip()[:160],
                    'link': (it.findtext('link') or '').strip(), 'image': img})
        if len(out) >= limit:
            break
    return out

def trending(key, limit=10):
    if not key:
        return []
    data = json.loads(get('https://api.themoviedb.org/3/trending/movie/week?api_key=' + key))
    out = []
    for m in data.get('results', [])[:limit]:
        out.append({'title': m.get('title', ''), 'sub': (m.get('release_date') or '')[:4] + ' · Movie',
                    'kicker': 'Trending', 'desc': (m.get('overview') or '')[:160],
                    'image': 'https://image.tmdb.org/t/p/w500' + (m.get('poster_path') or '')})
    return out

with open('photos.json') as f:
    photos = json.load(f)

content = {
    'updated': datetime.datetime.utcnow().isoformat() + 'Z',
    'news': news(NEWS_FEED),
    'trending': trending(TMDB_KEY),
    'photos': photos,
    'attribution': 'This product uses the TMDB API but is not endorsed or certified by TMDB.'
}
with open('content.json', 'w') as f:
    json.dump(content, f, indent=2)
print('Wrote content.json:', len(content['news']), 'news,', len(content['trending']), 'movies,', len(photos), 'photos')
