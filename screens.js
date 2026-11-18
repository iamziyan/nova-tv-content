/* screens.js: Search, Store, Media, Notifications, Guide. Loads before app.js. */
(function () {
  var BACK = [461, 8, 27];
  var KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('').concat(['SPACE', 'DEL']);
  var CATS = { 'All Apps': null, Channels: 'Streaming', 'Show+': 'Streaming', Arcade: 'Games', Pool: 'Games',
    'Sports Hub': 'Sports', Sports: 'Sports', Games: 'Games', Gallery: 'Photos', Music: 'Music', Workspace: 'Utilities' };
  var MEDIA_ART = ['beams', 'orbs', 'rings', 'waves', 'nebula', 'dial', 'grid', 'eq'];
  var MEDIA_C = ['#ff6ec7', '#b58cff', '#ffc76e', '#5ee7df', '#8fd3ff', '#9aa6ff', '#7dff9e', '#3d8bff'];

  function mk(o, kind) { o.kind = kind; o.c2 = o.c2 || '#05050a'; o.seed = o.seed || 500; return o; }

  var STORE = [
    ['Cinema Plus', 'Streaming', 'beams', '#ff6ec7', 4.7],
    ['Sound Wave', 'Music', 'eq', '#3d8bff', 4.8],
    ['Pixel Gallery', 'Photos', 'orbs', '#b58cff', 4.6],
    ['Arcade Zone', 'Games', 'grid', '#7dff9e', 4.5],
    ['Web Surf', 'Utilities', 'rings', '#ffc76e', 4.4],
    ['Weather Deck', 'Utilities', 'waves', '#5ee7df', 4.3],
    ['Fitness Live', 'Sports', 'dial', '#9aa6ff', 4.6],
    ['Kids Corner', 'Streaming', 'nebula', '#8fd3ff', 4.7],
    ['Pool Club', 'Games', 'rings', '#ffc76e', 4.5],
    ['Match Day', 'Sports', 'waves', '#a3e635', 4.6]
  ].map(function (s, i) {
    return mk({ title: s[0], cat: s[1], sub: s[1] + ' · ★ ' + s[4], art: s[2], c: s[3], seed: 300 + i }, 'store');
  });

  var MEDIA = (window.NOVA_LIVE && window.NOVA_LIVE.photos && window.NOVA_LIVE.photos.length)
    ? window.NOVA_LIVE.photos.map(function (p, i) { return mk({ title: p.title, sub: p.credit || '', image: p.image, file: '', art: MEDIA_ART[i % 8], c: MEDIA_C[i % 8], seed: 400 + i }, 'media'); })
    : [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return mk({ title: 'Photo ' + n, sub: 'Your photos', file: 'images/photo' + n + '.jpg',
          art: MEDIA_ART[n - 1], c: MEDIA_C[n - 1], seed: 400 + n }, 'media');
      });

  var NOTIFS = [
    ['Album released', 'Midnight Frequencies is out now', 'eq', '#3d8bff', 'Midnight Frequencies'],
    ['Continue watching', 'Grid Runner is 78% done', 'grid', '#7dff9e', 'Grid Runner'],
    ['Store update', '2 apps have new versions', 'rings', '#ffc76e', 'Store'],
    ['Weekend pick', 'Neon Harbor is free to stream', 'beams', '#ff6ec7', 'Neon Harbor']
  ].map(function (n, i) {
    return mk({ title: n[0], sub: n[1], art: n[2], c: n[3], link: n[4], seed: 600 + i }, 'note');
  });

  function allItems() { return (typeof ALL !== 'undefined' ? ALL : []); }
  function art(it) { return typeof cardSvg === 'function' ? cardSvg(it) : ''; }

  var root = document.createElement('div');
  root.id = 'scr';
  root.innerHTML = '<div class="scr-head"><div class="scr-title"></div><div class="scr-hint"></div></div><div class="scr-body"></div>';
  var viewer = document.createElement('div');
  viewer.id = 'scr-viewer';
  viewer.innerHTML = '<div class="v-art"></div><img class="v-img" alt=""><div class="v-cap"></div>';
  document.body.appendChild(root);
  document.body.appendChild(viewer);
  var titleEl = root.querySelector('.scr-title');
  var hintEl = root.querySelector('.scr-hint');
  var body = root.querySelector('.scr-body');
  var vArt = viewer.querySelector('.v-art');
  var vImg = viewer.querySelector('.v-img');
  var vCap = viewer.querySelector('.v-cap');
  vImg.onerror = function () { vImg.style.display = 'none'; };

  var st = { open: false, mode: 'grid', items: [], idx: 0, cols: 4, onAction: null, query: '', viewer: -1 };
  var installed = {};

  function tileHTML(it) {
    var badge = '';
    if (it.kind === 'store') {
      badge = '<div class="get' + (installed[it.title] ? ' on' : '') + '">' + (installed[it.title] ? 'Installed' : 'Get') + '</div>';
    }
    var src = it.image || it.file;
    var photo = src ? '<img src="' + src + '" alt="" onerror="this.style.display=\'none\'">' : '';
    return '<div class="tile"><div class="art">' + art(it) + '</div>' + photo +
      '<div class="cap"><div class="t">' + it.title + '</div><div class="s">' + (it.sub || '') + '</div>' + badge + '</div></div>';
  }

  function paintFocus() {
    var els = body.querySelectorAll('.tile, .key');
    for (var i = 0; i < els.length; i++) els[i].classList.toggle('sf', i === st.idx);
    if (els[st.idx] && els[st.idx].scrollIntoView) els[st.idx].scrollIntoView({ block: 'nearest' });
  }

  function paintGrid() {
    body.className = 'scr-body scr-grid';
    body.style.gridTemplateColumns = 'repeat(' + st.cols + ', 1fr)';
    body.innerHTML = st.items.length ? st.items.map(tileHTML).join('') : '<div class="empty">Nothing here yet.</div>';
    paintFocus();
  }

  function renderResults() {
    var q = st.query.trim().toLowerCase();
    body.querySelector('.qbox').textContent = st.query || 'Choose letters with OK';
    var pool = allItems().concat(STORE, MEDIA);
    var hits = q ? pool.filter(function (x) { return x.title.toLowerCase().indexOf(q) > -1; }).slice(0, 8) : [];
    body.querySelector('.rlist').innerHTML = hits.length
      ? hits.map(function (h) { return '<div class="ritem"><span>' + h.title + '</span><small>' + (h.sub || '') + '</small></div>'; }).join('')
      : '<div class="rnone">' + (q ? 'No results for "' + st.query + '"' : 'Results appear here') + '</div>';
  }

  function paintSearch() {
    body.className = 'scr-body scr-search';
    body.style.gridTemplateColumns = '';
    body.innerHTML = '<div class="keys">' + KEYS.map(function (k) {
      return '<div class="key">' + (k === 'SPACE' ? 'Space' : k === 'DEL' ? 'Delete' : k) + '</div>';
    }).join('') + '</div><div class="res"><div class="qbox"></div><div class="rlist"></div></div>';
    renderResults();
    paintFocus();
  }

  function showViewer(i) {
    var it = st.items[i];
    st.viewer = i;
    vArt.innerHTML = art(it);
    vImg.style.display = '';
    vImg.src = it.image || it.file;
    vCap.textContent = it.title + '   ' + (i + 1) + ' / ' + st.items.length;
    viewer.classList.add('show');
  }
  function hideViewer() {
    st.viewer = -1;
    viewer.classList.remove('show');
    vImg.removeAttribute('src');
  }

  function open(o) {
    st.open = true;
    st.mode = o.mode || 'grid';
    st.cols = o.cols || 4;
    st.onAction = o.onAction || null;
    st.query = '';
    st.idx = 0;
    st.viewer = -1;
    if (st.mode === 'search') { st.items = KEYS; st.cols = 8; } else { st.items = o.items; }
    titleEl.textContent = o.title;
    hintEl.textContent = o.hint || 'Back to return';
    root.classList.add('open');
    if (st.mode === 'search') paintSearch(); else paintGrid();
    try { lastInput = Date.now(); } catch (e) {}
  }
  function close() {
    st.open = false;
    hideViewer();
    root.classList.remove('open');
  }

  function storeAction(it) {
    installed[it.title] = !installed[it.title];
    if (typeof toast === 'function') toast((installed[it.title] ? 'Installed ' : 'Removed ') + it.title);
    paintGrid();
  }
  function openSearch() { open({ title: 'Search', hint: 'OK adds letters · Back closes', mode: 'search' }); }
  function openMedia() {
    open({ title: 'Media', hint: 'OK opens a photo · Left/Right browses · Back closes', items: MEDIA, cols: 4,
      onAction: function (it, i) { showViewer(i); } });
  }
  function openStore(cat, label) {
    var list = STORE.filter(function (s) { return !cat || s.cat === cat; });
    open({ title: label && label !== 'All Apps' ? label : 'Store', hint: 'OK gets or removes an app · Back closes',
      items: list, cols: 4, onAction: storeAction });
  }
  function openGuide() {
    open({ title: 'Guide', hint: 'OK opens details · Back closes', items: allItems(), cols: 4,
      onAction: function (it) { close(); if (typeof openDetail === 'function') openDetail(it); } });
  }
  function openNotifications() {
    open({ title: 'Notifications', hint: 'OK opens the related item · Back closes', items: NOTIFS, cols: 4,
      onAction: function (it) {
        close();
        if (it.link === 'Store') { openStore(null, 'Store'); return; }
        var t = allItems().filter(function (x) { return x.title === it.link; })[0];
        if (t && typeof openDetail === 'function') openDetail(t);
      } });
  }
  function openFor(label) {
    if (label === 'Clips' || label === 'Movies' || label === 'Live' || label === 'Screen') return openMedia();
    var cat = Object.prototype.hasOwnProperty.call(CATS, label) ? CATS[label] : null;
    openStore(cat, label);
  }

  function act() {
    var it = st.items[st.idx];
    if (st.mode === 'search') {
      var k = KEYS[st.idx];
      if (k === 'SPACE') st.query += ' ';
      else if (k === 'DEL') st.query = st.query.slice(0, -1);
      else st.query += k;
      renderResults();
    } else if (st.onAction && it) {
      st.onAction(it, st.idx);
    }
  }

  document.addEventListener('keydown', function (e) {
    if (!st.open) return;
    var k = e.keyCode;
    e.preventDefault();
    e.stopImmediatePropagation();
    try { lastInput = Date.now(); } catch (err) {}
    if (st.viewer > -1) {
      if (k === 37 || k === 39) showViewer((st.viewer + (k === 39 ? 1 : -1) + st.items.length) % st.items.length);
      else if (k === 13 || BACK.indexOf(k) > -1) hideViewer();
      return;
    }
    if (BACK.indexOf(k) > -1) { close(); return; }
    var n = st.items.length;
    if (k === 37) st.idx = Math.max(0, st.idx - 1);
    else if (k === 39) st.idx = Math.min(n - 1, st.idx + 1);
    else if (k === 38) st.idx = st.idx - st.cols >= 0 ? st.idx - st.cols : st.idx;
    else if (k === 40) st.idx = st.idx + st.cols < n ? st.idx + st.cols : st.idx;
    else if (k === 13) act();
    paintFocus();
  }, true);

  window.Screens = {
    isOpen: function () { return st.open; },
    close: close,
    openSearch: openSearch,
    openMedia: openMedia,
    openStore: openStore,
    openGuide: openGuide,
    openNotifications: openNotifications,
    openFor: openFor
  };
})();
