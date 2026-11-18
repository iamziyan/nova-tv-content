const $ = s => document.querySelector(s);
const $$ = s => Array.prototype.slice.call(document.querySelectorAll(s));
const KEY = { BACK: [461, 8, 27], PLAY: 415, PAUSE: 19, PLAYPAUSE: 10252, YELLOW: 405 };
const IDLE = [120, 300, 0], IDLE_NAMES = ['After 2 min', 'After 5 min', 'Off'];
const ACCENTS = [['#3d8bff', 'Blue'], ['#ff6ec7', 'Pink'], ['#b58cff', 'Violet'], ['#7dff9e', 'Green'], ['#ffc76e', 'Amber']];
const cfg = { idle: 0, shift: true, reduced: false, accent: 0 };

/* CONTENT: Custom names, colors, art and metadata */
let autoId = 0;
function item(o) {
  const n = ++autoId;
  return Object.assign({ id: 'i' + n, seed: 100 + n, kicker: 'Trending', sub: '', desc: '', meta: null,
    len: 5400, progress: 0, c2: '#05050a' }, o);
}

const FEATURED = [
  item({ id: 'f1', kicker: 'Now showing', title: 'Neon Harbor', sub: 'Film · 2026', meta: ['Feature film', '2026', '2h 04m'],
    len: 7440, progress: 42, art: 'beams', c: '#ff6ec7', c2: '#3a0f4a', seed: 11,
    desc: 'A detective follows a signal into a city that never sleeps, where every light hides a second story.' }),
  item({ id: 'f2', kicker: 'New album', title: 'Midnight Frequencies', sub: 'Album · 2026', meta: ['Album', '2026', '48 min'],
    len: 2880, progress: 15, art: 'eq', c: '#3d8bff', c2: '#0b2a6b', seed: 23,
    desc: 'Ambient synth textures that move with the beat, mixed for the big screen.' }),
  item({ id: 'f3', kicker: 'Memories', title: 'Orbit Diaries', sub: 'Photo story · 2025', meta: ['Photo story', '2025', '120 photos'],
    len: 600, progress: 60, art: 'orbs', c: '#b58cff', c2: '#2b1a5c', seed: 31,
    desc: 'Your best moments in a slow cinematic slideshow with soft light and gentle transitions.' }),
  item({ id: 'f4', kicker: 'Play now', title: 'Grid Runner', sub: 'Game · Co-op', meta: ['Game', '2026', 'Co-op'],
    len: 5400, progress: 78, art: 'grid', c: '#7dff9e', c2: '#0f4a2a', seed: 41,
    desc: 'Pick up where you left off in a neon world built for the living room.' }),
  item({ id: 'f5', kicker: 'Trending', title: 'Deep Signal', sub: 'Documentary · 2026', meta: ['Documentary', '2026', '1h 32m'],
    len: 5520, art: 'rings', c: '#ffc76e', c2: '#6b3d0a', seed: 53,
    desc: 'Explore the hidden corners of the web, one signal at a time.' })
];

const CATEGORIES = [
  { name: 'Sports', color: '#7ba83a' },
  { name: 'Games', color: '#6a5bd8' },
  { name: 'Gallery', color: '#d9463a' },
  { name: 'Music', color: '#b25bd1' },
  { name: 'Workspace', color: '#2a97b8' }
];

const APPS = [
  item({ name: 'All Apps', title: 'All Apps', c: '#3d8bff', art: 'grid', seed: 101,
    glyph: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>' }),
  item({ name: 'Channels', title: 'Channels', c: '#ff6ec7', art: 'beams', seed: 102,
    glyph: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>' }),
  item({ name: 'Movies', title: 'Movies', c: '#ffc76e', art: 'beams', seed: 103,
    glyph: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M8 5l2 4M13 5l2 4"/>' }),
  item({ name: 'Show+', title: 'Show+', c: '#e50914', art: 'nebula', seed: 104,
    glyph: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>' }),
  item({ name: 'Clips', title: 'Clips', c: '#b58cff', art: 'waves', seed: 105,
    glyph: '<circle cx="7" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><path d="M9 9l11 9M9 15l11-9"/>' }),
  item({ name: 'Arcade', title: 'Arcade', c: '#7dff9e', art: 'grid', seed: 106,
    glyph: '<path d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5 2l-1-1h-4l-1 1a3 3 0 0 1-5-2v-1a4 4 0 0 1 4-4z"/><path d="M8 12v3M6.5 13.5h3"/>' }),
  item({ name: 'Pool', title: 'Pool', c: '#38bdf8', art: 'rings', seed: 107,
    glyph: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>' }),
  item({ name: 'Sports Hub', title: 'Sports Hub', c: '#f59e0b', art: 'dial', seed: 108,
    glyph: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M9 20h6"/>' }),
  item({ name: 'Live', title: 'Live', c: '#ef4444', art: 'eq', seed: 109,
    glyph: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8" stroke-dasharray="3 3"/>' }),
  item({ name: 'Screen', title: 'Screen', c: '#a855f7', art: 'dial', seed: 110,
    glyph: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>' })
];

const PROMOS = [
  item({ title: 'Free Games', kicker: 'Play Free', desc: 'Instant games ready to play directly with your remote control.',
    sub: 'Arcade · Free', art: 'grid', c: '#7dff9e', c2: '#0f4a2a', seed: 201, sponsored: true }),
  item({ title: 'Halloween Event', kicker: 'Special Event', desc: 'Seasonal challenges, spooky themes, and bonus tournament prizes.',
    sub: 'Event · Live', art: 'orbs', c: '#ff6ec7', c2: '#3b0a2a', seed: 202, sponsored: false }),
  item({ title: 'Pixel Run', kicker: 'Arcade Classic', desc: 'High-speed retro obstacle runner built for quick living room fun.',
    sub: 'Game · Co-op', art: 'beams', c: '#ffc76e', c2: '#3d1a05', seed: 203, sponsored: false })
];

const TRENDING = [
  item({ title: 'Quiet Engine', kicker: 'Trending', sub: 'Sci-fi · 2025', meta: ['Sci-fi', '2025', '1h 50m'], art: 'nebula', c: '#8fd3ff', c2: '#0b1d33',
    desc: 'A quiet mechanic discovers the machine she repairs is dreaming.' }),
  item({ title: 'Paper Comets', kicker: 'Animation', sub: 'Animation · 2024', meta: ['Animation', '2024', '1h 22m'], art: 'waves', c: '#ff9ad5', c2: '#3b0a2a',
    desc: 'Origami spacecraft race across a notebook universe.' })
];

const ALL = FEATURED.concat(APPS, PROMOS, TRENDING);

/* Generated artwork, zero external dependencies */
let uid = 0;
function rng(seed) {
  let s = (seed || 1) >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function artInner(it, animated) {
  const id = 'g' + (++uid), r = rng(it.seed), c = it.c || '#3d8bff', c2 = it.c2 || '#040408';
  const an = css => (animated ? ` style="${css}"` : '');
  let s = `<defs>
    <radialGradient id="${id}a" cx="72%" cy="40%" r="75%"><stop offset="0" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="#040408"/>
  <rect width="1920" height="1080" fill="url(#${id}a)"/>`;
  for (let i = 0; i < 70; i++) {
    s += `<circle cx="${(r() * 1920) | 0}" cy="${(r() * 1080) | 0}" r="${(r() * 1.6 + 0.4).toFixed(1)}" fill="#fff" opacity="${(r() * 0.6 + 0.2).toFixed(2)}"/>`;
  }
  switch (it.art) {
    case 'beams':
      s += `<polygon points="1250,-40 1480,-40 1120,1120 820,1120" fill="url(#${id}b)"${an('animation:sway 9s ease-in-out infinite alternate')}/>
        <polygon points="1500,-40 1620,-40 1380,1120 1160,1120" fill="url(#${id}b)" opacity=".55"${an('animation:sway 12s ease-in-out infinite alternate-reverse')}/>
        <g fill="none" stroke="${c}" stroke-opacity=".3" stroke-width="2">
          <rect x="1300" y="150" width="440" height="250" rx="22"/><rect x="1300" y="480" width="440" height="250" rx="22"/>
        </g>`;
      break;
    case 'eq': {
      let bars = '';
      for (let i = 0; i < 40; i++) {
        const h = 120 + r() * 460;
        const dur = (0.5 + r() * 0.9).toFixed(2), delay = (-r() * 1.5).toFixed(2);
        bars += `<rect x="${980 + i * 22}" y="${(860 - h).toFixed(0)}" width="14" height="${h.toFixed(0)}" rx="5"${an(`animation:eq ${dur}s ease-in-out ${delay}s infinite alternate`)}/>`;
      }
      s += `<g class="eq" fill="${c}" opacity=".8">${bars}</g>
        <line x1="0" y1="860" x2="1920" y2="860" stroke="${c}" stroke-opacity=".45" stroke-width="2"/>`;
      break;
    }
    case 'orbs':
      s += `<circle cx="1420" cy="300" r="190" fill="${c}" opacity=".18"${an('animation:float 10s ease-in-out infinite alternate')}/>
        <circle cx="1640" cy="660" r="120" fill="#8fd3ff" opacity=".18"${an('animation:float 13s ease-in-out infinite alternate-reverse')}/>
        <circle cx="1160" cy="770" r="72" fill="#ff9ad5" opacity=".22"${an('animation:float 8s ease-in-out infinite alternate')}/>`;
      break;
    case 'grid':
      s += `<circle cx="960" cy="520" r="260" fill="${c}" opacity=".08"/>
        <g fill="none" stroke="${c}" stroke-opacity=".14"${an('animation:gridScroll 4s linear infinite')}>
          <path d="M-200 560H2120M-200 640H2120M-200 720H2120M-200 800H2120M-200 880H2120M-200 960H2120M-200 1040H2120"/>
        </g>
        <path d="M-600 1180L960 540L2520 1180" fill="none" stroke="${c}" stroke-opacity=".5" stroke-width="2"/>
        <path d="M-600 1300L960 600L2520 1300" fill="none" stroke="${c}" stroke-opacity=".25" stroke-width="2"/>`;
      break;
    case 'rings':
      s += `<g fill="none" stroke="${c}" stroke-width="2">
          <circle cx="1450" cy="540" r="120" stroke-opacity=".25"/>
          <circle cx="1450" cy="540" r="240" stroke-opacity=".15"/>
          <circle cx="1450" cy="540" r="200" stroke-opacity=".35"${an('animation:ripple 5s ease-out infinite')}/>
          <circle cx="1450" cy="540" r="200" stroke-opacity=".35"${an('animation:ripple 5s ease-out -1.7s infinite')}/>
        </g>`;
      break;
    case 'dial':
      s += `<g fill="none" stroke="${c}" stroke-opacity=".35"${an('animation:spin 40s linear infinite')}>
          <circle cx="1420" cy="540" r="300" stroke-dasharray="6 14"/>
          <circle cx="1420" cy="540" r="220" stroke-dasharray="2 10" stroke-opacity=".5"/>
        </g>
        <circle cx="1420" cy="540" r="140" fill="none" stroke="${c}" stroke-opacity=".4"/>`;
      break;
    case 'waves': {
      let p = '';
      for (let k = 0; k < 4; k++) {
        const base = 600 + k * 90;
        let d = `M0 ${base}`;
        for (let x = 120; x <= 1920; x += 120) d += ` L${x} ${(base + Math.sin(x / 260 + k) * (40 + k * 12)).toFixed(1)}`;
        p += `<path d="${d}" fill="none" stroke="${c}" stroke-width="${(3 - k * 0.4).toFixed(1)}" stroke-opacity="${(0.55 - k * 0.1).toFixed(2)}"${an(`animation:float ${8 + k * 2}s ease-in-out infinite alternate`)}/>`;
      }
      s += p;
      break;
    }
    case 'nebula':
    default:
      s += `<g transform="rotate(-18 1500 420)"><ellipse cx="1500" cy="420" rx="640" ry="170" fill="${c}" opacity=".16"/></g>
        <g transform="rotate(12 1300 720)"><ellipse cx="1300" cy="720" rx="560" ry="140" fill="${c}" opacity=".12"/></g>`;
      break;
  }
  return s;
}

const wrapSvg = inner => `<svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
function bgSvg(it) { if (!it.bg) it.bg = wrapSvg(artInner(it, true)); return it.bg; }
function cardSvg(it) { if (!it.card) it.card = wrapSvg(artInner(it, false)); return it.card; }

/* DOM references */
const sbIcons = [$('#sbBell'), $('#sbGear'), $('#sbSearch'), $('#sbList')];
const heroEl = $('#hero');
const heroBtn = $('#heroBtn');
const heroKick = $('#heroKick');
const heroTitle = $('#heroTitle');
const heroDesc = $('#heroDesc');
const heroBg = $('#heroBg');
const dotsEl = $('#dots');
const categoriesEl = $('#categories');
const appsRowEl = $('#appsRow');
const recentArtEl = $('#recentArt');
const recentTitleEl = $('#recentTitle');
const promosRowEl = $('#promosRow');
const layers = [$('#bgA'), $('#bgB')];
const ovEl = $('#ov');

/* State */
// Zones: 'sidebar', 'hero', 'categories', 'apps', 'promos'
const S = {
  zone: 'hero',
  sbIdx: 0,
  catIdx: 0,
  appIdx: 0,
  promoIdx: 0,
  sIdx: 0,
  dIdx: 0
};

let heroIdx = 0, activeLayer = 0, bgId = null;
let overlay = null, detailItem = null, playItem = null, elapsed = 0, playing = true, playTimer = null;
let ambientOn = false, lastInput = Date.now(), ambBgAt = 0, busy = false, lastMin = '', toastTimer = null;

/* Render Categories, Apps, Promos */
function initDOM() {
  // Categories (5 tiles)
  categoriesEl.innerHTML = CATEGORIES.map((cat, i) =>
    `<div class="cat-tile" style="background:${cat.color}" data-idx="${i}">${cat.name}</div>`).join('');

  // Apps (10 square tiles with glyphs)
  appsRowEl.innerHTML = APPS.map((app, i) =>
    `<div class="app-tile" data-idx="${i}">
      <div class="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${app.glyph}</svg></div>
      <div class="app-name">${app.name}</div>
    </div>`).join('');

  // Promos (3 cards)
  promosRowEl.innerHTML = PROMOS.map((pr, i) =>
    `<div class="promo-card" data-idx="${i}">
      <div class="promo-art">${cardSvg(pr)}</div>
      <div class="promo-shade"></div>
      <div class="promo-body">
        ${pr.sponsored ? '<div class="promo-tag">Sponsored</div>' : '<div></div>'}
        <div class="promo-title">${pr.title}</div>
      </div>
    </div>`).join('');

  // Attach click listeners
  $$('.cat-tile').forEach((el, i) => el.addEventListener('click', () => { S.zone = 'categories'; S.catIdx = i; refresh(); activate(); }));
  $$('.app-tile').forEach((el, i) => el.addEventListener('click', () => { S.zone = 'apps'; S.appIdx = i; refresh(); activate(); }));
  $$('.promo-card').forEach((el, i) => el.addEventListener('click', () => { S.zone = 'promos'; S.promoIdx = i; refresh(); activate(); }));
  sbIcons.forEach((el, i) => el.addEventListener('click', () => { S.zone = 'sidebar'; S.sbIdx = i; refresh(); activate(); }));
  heroBtn.addEventListener('click', () => { S.zone = 'hero'; refresh(); activate(); });

  // Top menu tabs if present
  $$('.tab').forEach(t => t.addEventListener('click', () => {
    const txt = t.textContent.trim();
    if (txt === 'Search') Screens.openSearch();
    else if (txt === 'Media') Screens.openMedia();
    else if (txt === 'Store') Screens.openStore();
    else if (txt === 'Settings') openSettings();
  }));
}

/* Background & Hero Display */
function setBg(it) {
  if (!it || it.id === bgId) return;
  bgId = it.id;
  const next = 1 - activeLayer;
  layers[next].innerHTML = bgSvg(it);
  layers[next].classList.add('on');
  layers[activeLayer].classList.remove('on');
  activeLayer = next;
}

function updateRecentPreview(it) {
  if (!it) return;
  recentArtEl.innerHTML = cardSvg(it);
  recentTitleEl.textContent = it.title || it.name || 'Nova TV';
}

function renderHero() {
  const it = FEATURED[heroIdx];
  heroKick.textContent = it.kicker;
  heroTitle.textContent = it.title;
  heroDesc.textContent = it.desc;
  heroEl.style.setProperty('--accent', it.c);

  // Check if images/hero.jpg exists or fallback to bgSvg
  heroBg.innerHTML = bgSvg(it);

  // Dots
  dotsEl.innerHTML = FEATURED.map((_, i) =>
    `<span class="dot${i < heroIdx ? ' done' : i === heroIdx ? ' on' : ''}"><i></i></span>`).join('');
}

function getFocusedItem() {
  if (S.zone === 'hero' || S.zone === 'sidebar') return FEATURED[heroIdx];
  if (S.zone === 'categories') return CATEGORIES[S.catIdx];
  if (S.zone === 'apps') return APPS[S.appIdx];
  if (S.zone === 'promos') return PROMOS[S.promoIdx];
  return FEATURED[heroIdx];
}

/* Refresh Focus & Visuals */
function refresh() {
  // Sidebar
  sbIcons.forEach((el, i) => el.classList.toggle('focus', S.zone === 'sidebar' && i === S.sbIdx));

  // Hero button
  heroBtn.classList.toggle('focus', S.zone === 'hero');

  // Categories
  $$('.cat-tile').forEach((el, i) => el.classList.toggle('focus', S.zone === 'categories' && i === S.catIdx));

  // Apps
  $$('.app-tile').forEach((el, i) => el.classList.toggle('focus', S.zone === 'apps' && i === S.appIdx));

  // Promos
  $$('.promo-card').forEach((el, i) => el.classList.toggle('focus', S.zone === 'promos' && i === S.promoIdx));

  // Active item update
  const it = getFocusedItem();
  setBg(it);
  updateRecentPreview(it);
}

/* Actions */
function move(d) {
  if (S.zone === 'sidebar') {
    if (d === 'U') S.sbIdx = Math.max(0, S.sbIdx - 1);
    else if (d === 'D') S.sbIdx = Math.min(3, S.sbIdx + 1);
    else if (d === 'R') S.zone = 'hero';
  } else if (S.zone === 'hero') {
    if (d === 'L') { S.zone = 'sidebar'; S.sbIdx = 0; }
    else if (d === 'D') S.zone = 'categories';
  } else if (S.zone === 'categories') {
    if (d === 'L') {
      if (S.catIdx > 0) S.catIdx--;
      else { S.zone = 'sidebar'; S.sbIdx = 2; }
    } else if (d === 'R') {
      S.catIdx = Math.min(CATEGORIES.length - 1, S.catIdx + 1);
    } else if (d === 'U') {
      S.zone = 'hero';
    } else if (d === 'D') {
      S.zone = 'apps';
    }
  } else if (S.zone === 'apps') {
    if (d === 'L') {
      if (S.appIdx > 0) S.appIdx--;
      else { S.zone = 'sidebar'; S.sbIdx = 3; }
    } else if (d === 'R') {
      S.appIdx = Math.min(APPS.length - 1, S.appIdx + 1);
    } else if (d === 'U') {
      S.zone = 'categories';
    } else if (d === 'D') {
      S.zone = 'promos';
    }
  } else if (S.zone === 'promos') {
    if (d === 'L') {
      if (S.promoIdx > 0) S.promoIdx--;
      else { S.zone = 'sidebar'; S.sbIdx = 3; }
    } else if (d === 'R') {
      S.promoIdx = Math.min(PROMOS.length - 1, S.promoIdx + 1);
    } else if (d === 'U') {
      S.zone = 'apps';
    }
  }
  refresh();
}

function activate() {
  if (S.zone === 'sidebar') {
    if (S.sbIdx === 0) Screens.openNotifications();
    else if (S.sbIdx === 1) openSettings();
    else if (S.sbIdx === 2) Screens.openSearch();
    else if (S.sbIdx === 3) Screens.openGuide();
    return;
  }
  if (S.zone === 'hero') {
    openDetail(FEATURED[heroIdx]);
    return;
  }
  if (S.zone === 'categories') {
    Screens.openFor(CATEGORIES[S.catIdx].name);
    return;
  }
  if (S.zone === 'apps') {
    Screens.openFor(APPS[S.appIdx].name);
    return;
  }
  if (S.zone === 'promos') {
    openDetail(PROMOS[S.promoIdx]);
  }
}

/* Overlays: detail, player, settings */
function showPanel(name) {
  overlay = name;
  $$('.panel').forEach(p => p.classList.toggle('show', p.id === name));
  ovEl.setAttribute('data-mode', name);
  ovEl.classList.add('open');
  $('#stage').classList.add('dim');
}

function closeOverlay() {
  overlay = null;
  stopPlayTimer();
  ovEl.classList.remove('open');
  $('#stage').classList.remove('dim');
  refresh();
}

function fmt(s) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(x).padStart(2, '0');
}

function openDetail(it) {
  detailItem = it;
  S.dIdx = 0;
  $('#detail').style.setProperty('--c', it.c || '#3d8bff');
  $('#dPoster').innerHTML = cardSvg(it);
  $('#dKick').textContent = it.kicker || 'Featured';
  $('#dTitle').textContent = it.title || it.name;
  $('#dMeta').innerHTML = (it.meta || [it.sub || 'Nova']).map(m => `<span class="pill">${m}</span>`).join('');
  $('#dDesc').textContent = it.desc || 'Cinema-grade streaming tuned for OLED.';
  refreshDetail();
  showPanel('detail');
}

function refreshDetail() {
  $('#dPlay').classList.toggle('focus', S.dIdx === 0);
  $('#dClose').classList.toggle('focus', S.dIdx === 1);
}

function plen() { return playItem ? (playItem.len || 5400) : 5400; }

function openPlayer(it) {
  playItem = it;
  elapsed = Math.round((it.progress || 0) / 100 * plen());
  playing = true;
  $('#pTitle').textContent = it.title || it.name;
  $('#pTotal').textContent = fmt(plen());
  showPanel('player');
  renderPlayer();
  stopPlayTimer();
  playTimer = setInterval(() => {
    if (playing) { elapsed = Math.min(plen(), elapsed + 1); renderPlayer(); }
  }, 1000);
}

function renderPlayer() {
  $('#pTime').textContent = fmt(elapsed);
  $('#pFill').style.transform = `scaleX(${Math.min(1, elapsed / plen())})`;
  $('#pState').textContent = elapsed >= plen() ? 'Finished' : (playing ? 'Playing' : 'Paused');
}

function stopPlayTimer() { if (playTimer) { clearInterval(playTimer); playTimer = null; } }

function settingItems() {
  return [
    { label: 'Ambient clock when idle', value: IDLE_NAMES[cfg.idle],
      act() { cfg.idle = (cfg.idle + 1) % IDLE.length; } },
    { label: 'Pixel shift (OLED care)', value: cfg.shift ? 'On' : 'Off',
      act() { cfg.shift = !cfg.shift; document.body.classList.toggle('noshift', !cfg.shift); } },
    { label: 'Reduced motion', value: cfg.reduced ? 'On' : 'Off',
      act() { cfg.reduced = !cfg.reduced; document.body.classList.toggle('reduced', cfg.reduced); } },
    { label: 'Accent color', value: ACCENTS[cfg.accent][1],
      act() {
        cfg.accent = (cfg.accent + 1) % ACCENTS.length;
        document.documentElement.style.setProperty('--accent', ACCENTS[cfg.accent][0]);
      } }
  ];
}

function renderSettings() {
  $('#setList').innerHTML = settingItems().map((s, i) =>
    `<div class="set${i === S.sIdx ? ' focus' : ''}"><span>${s.label}</span><span class="v">${s.value}</span></div>`).join('');
}

function openSettings() { S.sIdx = 0; renderSettings(); showPanel('settings'); }

function overlayKey(k) {
  if (KEY.BACK.indexOf(k) > -1) { closeOverlay(); return; }
  if (overlay === 'detail') {
    if (k === 37 || k === 39) { S.dIdx = 1 - S.dIdx; refreshDetail(); }
    else if (k === 13) { if (S.dIdx === 0) openPlayer(detailItem); else closeOverlay(); }
  } else if (overlay === 'player') {
    if (k === 13 || k === KEY.PLAYPAUSE) playing = !playing;
    else if (k === KEY.PLAY) playing = true;
    else if (k === KEY.PAUSE) playing = false;
    else if (k === 39) elapsed = Math.min(plen(), elapsed + 10);
    else if (k === 37) elapsed = Math.max(0, elapsed - 10);
    renderPlayer();
  } else if (overlay === 'settings') {
    const n = settingItems().length;
    if (k === 38) S.sIdx = Math.max(0, S.sIdx - 1);
    else if (k === 40) S.sIdx = Math.min(n - 1, S.sIdx + 1);
    else if (k === 13 || k === 37 || k === 39) settingItems()[S.sIdx].act();
    renderSettings();
  }
}

/* Ambient OLED-safe clock */
function moveAmbient() {
  const x = Math.round(120 + Math.random() * 900), y = Math.round(120 + Math.random() * 520);
  const box = $('#ambBox');
  box.style.left = 'calc(var(--u) * ' + x + ')';
  box.style.top = 'calc(var(--u) * ' + y + ')';
}

function showAmbient() {
  ambientOn = true;
  $('#ambient').classList.add('open');
  moveAmbient();
  ambBgAt = Date.now();
}

function hideAmbient() {
  ambientOn = false;
  $('#ambient').classList.remove('open');
  lastInput = Date.now();
  refresh();
}

/* Clock & Toast */
function tick() {
  const now = new Date();
  const hm = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (hm === lastMin) return;
  lastMin = hm;
  $('#ambClock').textContent = hm;
  $('#ambDate').textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  if (ambientOn) moveAmbient();
}

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
window.toast = toast;

function throttle(fn) {
  if (busy) return;
  busy = true;
  fn();
  setTimeout(() => { busy = false; }, 140);
}

/* Remote Input */
document.addEventListener('keydown', e => {
  const k = e.keyCode;
  if (k >= 37 && k <= 40) e.preventDefault();
  lastInput = Date.now();

  if (ambientOn) { hideAmbient(); return; }

  if (overlay) { overlayKey(k); return; }

  if (k === 37) throttle(() => move('L'));
  else if (k === 39) throttle(() => move('R'));
  else if (k === 38) throttle(() => move('U'));
  else if (k === 40) throttle(() => move('D'));
  else if (k === 13) activate();
  else if (k === KEY.YELLOW || e.key === 's' || e.key === 'S') openSettings();
  else if (e.key === 'a' || e.key === 'A') showAmbient();
});

/* Timers: Hero rotation and idle screen saver */
setInterval(tick, 1000);

setInterval(() => {
  // Hero rotates every 8s while focus is on hero or sidebar
  if (overlay || ambientOn || (window.Screens && Screens.isOpen())) return;
  if (S.zone === 'hero' || S.zone === 'sidebar') {
    heroIdx = (heroIdx + 1) % FEATURED.length;
    renderHero();
    refresh();
  }
}, 8000);

setInterval(() => {
  if (ambientOn) {
    if (Date.now() - ambBgAt > 20000) {
      ambBgAt = Date.now();
      setBg(ALL[Math.floor(Math.random() * ALL.length)]);
    }
  } else if (IDLE[cfg.idle] && !overlay && (!window.Screens || !Screens.isOpen()) && Date.now() - lastInput > IDLE[cfg.idle] * 1000) {
    showAmbient();
  }
}, 5000);

/* Boot */
function boot() {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) cfg.reduced = true;
  document.body.classList.toggle('reduced', cfg.reduced);
  initDOM();
  renderHero();
  refresh();
  tick();
}

boot();
window.addEventListener('resize', () => { refresh(); });
