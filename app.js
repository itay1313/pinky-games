/* Pinky Online Games — catalog, filters, favorites, player */
(function () {
  'use strict';

  // ---------- state ----------
  const FAV_KEY = 'pinky_favs_v1';
  const RECENT_KEY = 'pinky_recent_v1';
  const state = { age: 'all', cat: null, q: '', favOnly: false };

  const load = (k) => { try { const v = JSON.parse(localStorage.getItem(k) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
  let favs = load(FAV_KEY);
  let recent = load(RECENT_KEY);
  const saveFavs = () => localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  const saveRecent = () => localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 8)));

  // ---------- elements ----------
  const $ = (id) => document.getElementById(id);
  const gamesGrid = $('games-grid');
  const recentGrid = $('recent-grid');
  const recentSection = $('recent-section');
  const emptyEl = $('empty');
  const ageChips = $('age-chips');
  const catChips = $('cat-chips');
  const player = $('player');
  const frame = $('player-frame');
  const spin = $('player-spin');

  // ---------- filter chips ----------
  function buildChips() {
    ageChips.innerHTML = AGE_GROUPS.map(g =>
      `<button class="chip age-chip${g.key === state.age ? ' on' : ''}" data-age="${g.key}">${g.emoji} ${g.label}</button>`
    ).join('');

    const cats = [...new Set(GAMES.flatMap(g => g.cats))];
    catChips.innerHTML =
      `<button class="chip fav-chip${state.favOnly ? ' on' : ''}" data-fav>💗 המועדפים שלי</button>` +
      cats.map(c =>
        `<button class="chip cat-chip${c === state.cat ? ' on' : ''}" data-cat="${c}">${c}</button>`
      ).join('');
  }

  ageChips.addEventListener('click', (e) => {
    const b = e.target.closest('[data-age]'); if (!b) return;
    state.age = b.dataset.age; buildChips(); render();
  });
  catChips.addEventListener('click', (e) => {
    const f = e.target.closest('[data-fav]');
    if (f) { state.favOnly = !state.favOnly; buildChips(); render(); return; }
    const b = e.target.closest('[data-cat]'); if (!b) return;
    state.cat = state.cat === b.dataset.cat ? null : b.dataset.cat;
    buildChips(); render();
  });
  $('search').addEventListener('input', (e) => { state.q = e.target.value.trim(); render(); });
  $('clear-filters').addEventListener('click', () => {
    state.age = 'all'; state.cat = null; state.q = ''; state.favOnly = false;
    $('search').value = ''; buildChips(); render();
  });

  // ---------- filtering ----------
  function matches(g) {
    if (state.age !== 'all' && !g.ages.includes(state.age)) return false;
    if (state.cat && !g.cats.includes(state.cat)) return false;
    if (state.favOnly && !favs.includes(g.id)) return false;
    if (state.q) {
      const hay = (g.title + ' ' + g.tagline + ' ' + g.desc + ' ' + g.cats.join(' ')).toLowerCase();
      if (!hay.includes(state.q.toLowerCase())) return false;
    }
    return true;
  }

  // ---------- rendering ----------
  function cardHTML(g) {
    const fav = favs.includes(g.id);
    return `
    <article class="card" data-id="${g.id}">
      <button class="fav${fav ? ' on' : ''}" data-fav-btn aria-label="הוספה למועדפים">${fav ? '💗' : '🤍'}</button>
      <div class="cover" style="--g1:${g.g1};--g2:${g.g2}">
        <span class="cover-emoji">${g.emoji}</span>
        <span class="age-badge">${g.ageBadge}</span>
      </div>
      <div class="card-body">
        <h3>${g.title}</h3>
        <div class="card-tagline">${g.tagline}</div>
        <p class="card-desc">${g.desc}</p>
        <div class="tags">${g.cats.map(c => `<span>${c}</span>`).join('')}</div>
        <button class="play-btn" data-play>▶ שחקו עכשיו</button>
      </div>
    </article>`;
  }

  function render() {
    const visible = GAMES.filter(matches);
    gamesGrid.innerHTML = visible.map(cardHTML).join('');
    emptyEl.classList.toggle('hidden', visible.length > 0);
    $('all-title').textContent = state.favOnly ? '💗 המועדפים שלי' : '🎮 כל המשחקים';

    const recGames = recent.map(id => GAMES.find(g => g.id === id)).filter(Boolean);
    recentSection.classList.toggle('hidden', recGames.length === 0);
    recentGrid.innerHTML = recGames.map(cardHTML).join('');
  }

  // one delegated handler for both grids
  document.querySelector('main').addEventListener('click', (e) => {
    const card = e.target.closest('.card'); if (!card) return;
    const game = GAMES.find(g => g.id === card.dataset.id); if (!game) return;

    if (e.target.closest('[data-fav-btn]')) {
      favs = favs.includes(game.id) ? favs.filter(id => id !== game.id) : [...favs, game.id];
      saveFavs(); render();
      return;
    }
    if (e.target.closest('[data-play]')) openGame(game);
  });

  // ---------- player ----------
  function openGame(g) {
    recent = [g.id, ...recent.filter(id => id !== g.id)];
    saveRecent();

    if (!g.embed) { window.open(g.url, '_blank', 'noopener'); render(); return; }

    $('player-title').textContent = g.title + ' ' + g.emoji;
    $('player-newtab').href = g.url;
    spin.classList.remove('hidden');
    frame.onload = () => spin.classList.add('hidden');
    frame.src = g.url;
    player.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeGame() {
    player.classList.add('hidden');
    frame.src = 'about:blank';
    document.body.style.overflow = '';
    render(); // refresh "recently played"
  }

  $('player-close').addEventListener('click', closeGame);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !player.classList.contains('hidden')) closeGame();
  });

  // ---------- coming-soon placeholders ----------
  const soonGrid = $('soon-grid');
  soonGrid.innerHTML = COMING_SOON.map(s => `
    <div class="soon-card" tabindex="0">
      <span class="soon-emoji">${s.emoji}</span>
      <span class="soon-title">${s.title}</span>
      <span class="soon-badge">בקרוב ✨</span>
    </div>`).join('');
  soonGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.soon-card'); if (!card) return;
    card.classList.remove('wiggle'); void card.offsetWidth;
    card.classList.add('wiggle');
  });

  // ---------- go ----------
  buildChips();
  render();
})();
