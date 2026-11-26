(function () {
  'use strict';
  var SHOW_SUBTITLE = false;

  var ICONS = {
    star: function (on) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" fill="' + (on ? '#ffc21a' : 'none') + '" stroke="' + (on ? '#e59b00' : '#a89f9b') + '" stroke-width="1.6" stroke-linejoin="round"/></svg>'; },
    cloud: '<svg viewBox="0 0 48 32" style="width:1.4em" aria-hidden="true"><path d="M12 28a8 8 0 0 1-1-15.9A11 11 0 0 1 32 9a9 9 0 0 1 5 17.6V28z" fill="#9bd3ff"/></svg>',
    rainbow: '<svg viewBox="0 0 48 28" style="width:1.5em" aria-hidden="true"><g fill="none" stroke-width="4"><path d="M4 26a20 20 0 0 1 40 0" stroke="#f2475f"/><path d="M9 26a15 15 0 0 1 30 0" stroke="#ffc21a"/><path d="M14 26a10 10 0 0 1 20 0" stroke="#34b36b"/><path d="M19 26a5 5 0 0 1 10 0" stroke="#3b9cf0"/></g></svg>',
    balloon: '<svg viewBox="0 0 24 32" style="width:.9em" aria-hidden="true"><ellipse cx="12" cy="11" rx="9" ry="10" fill="#f2475f"/><path d="M12 21l-2 3h4z" fill="#f2475f"/><path d="M12 24c-3 3 3 4 0 7" fill="none" stroke="#8a7f7a" stroke-width="1.5"/></svg>',
    trophy: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6h20v12a10 10 0 0 1-20 0z" fill="#ffc21a" stroke="#e59b00" stroke-width="2"/><path d="M14 10H6c0 8 3 12 9 12M34 10h8c0 8-3 12-9 12" fill="none" stroke="#e59b00" stroke-width="3"/><path d="M21 28h6v7h-6z" fill="#e59b00"/><rect x="14" y="37" width="20" height="6" rx="2" fill="#e59b00"/></svg>',
    cow: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 14l8 10M54 14l-8 10" stroke="#e8c36a" stroke-width="5" stroke-linecap="round"/><ellipse cx="32" cy="34" rx="20" ry="18" fill="#fff"/><path d="M16 22a9 8 0 0 1 14-4 12 12 0 0 0-10 12z" fill="#4a3b36"/><ellipse cx="32" cy="46" rx="13" ry="9" fill="#f6b8b0"/><circle cx="27" cy="46" r="2" fill="#4a3b36"/><circle cx="37" cy="46" r="2" fill="#4a3b36"/><circle cx="23" cy="32" r="3" fill="#4a3b36"/><circle cx="41" cy="32" r="3" fill="#4a3b36"/></svg>',
    door: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="16" y="6" width="32" height="52" rx="3" fill="#c98a4b" stroke="#8a5a2b" stroke-width="3"/><rect x="22" y="14" width="20" height="16" rx="2" fill="#e3b074"/><rect x="22" y="36" width="20" height="14" rx="2" fill="#e3b074"/><circle cx="42" cy="34" r="3" fill="#ffc21a"/></svg>',
    people: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="20" cy="20" r="8" fill="#ffd2a8"/><path d="M6 52a14 14 0 0 1 28 0z" fill="#3b9cf0"/><circle cx="44" cy="20" r="8" fill="#ffd2a8"/><path d="M30 52a14 14 0 0 1 28 0z" fill="#f2475f"/><circle cx="32" cy="34" r="6" fill="#ffd2a8"/><path d="M22 58a10 10 0 0 1 20 0z" fill="#ffc21a"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>'
  };

  var ANIMALS = [
    { id: 'cat', name: 'قطة', alt: 'قطة مبرقشة تنظر للكاميرا', color: '#ff8a3d', soft: '#ffe5d1' },
    { id: 'dog', name: 'كلب', alt: 'وجه كلب جولدن ريتريفر', color: '#f2b705', soft: '#fff3c4' },
    { id: 'cow', name: 'بقرة', alt: 'بقرة بالأبيض والأسود واقفة في مرعى أخضر', color: '#34b36b', soft: '#d9f5e3' },
    { id: 'sheep', name: 'خروف', alt: 'وجه خروف بأذنين طويلتين', color: '#9b6dff', soft: '#ece3ff' },
    { id: 'horse', name: 'حصان', alt: 'رأس حصان أبيض', color: '#3b9cf0', soft: '#dcecfd' },
    { id: 'rooster', name: 'ديك', alt: 'رأس ديك بعرف أحمر', color: '#f2475f', soft: '#ffdfe4' },
    { id: 'lion', name: 'أسد', alt: 'وجه أسد بعرف ذهبي', color: '#f2b705', soft: '#fff3c4' },
    { id: 'elephant', name: 'فيل', alt: 'فيل رمادي بنابين', color: '#3b9cf0', soft: '#dcecfd' },
    { id: 'donkey', name: 'حمار', alt: 'حمار رمادي يأكل العشب', color: '#9b6dff', soft: '#ece3ff' },
    { id: 'duck', name: 'بطة', alt: 'بطة برأس أخضر على الماء', color: '#34b36b', soft: '#d9f5e3' },
    { id: 'bird', name: 'عصفور', alt: 'عصفور صغير على جذع شجرة', color: '#ff8a3d', soft: '#ffe5d1' },
    { id: 'frog', name: 'ضفدع', alt: 'ضفدع أخضر على خلفية بيضاء', color: '#f2475f', soft: '#ffdfe4' }
  ].map(function (a) {
    a.photo = ASSETS['p-' + a.id];
    a.sound = ASSETS['s-' + a.id];
    a.nameSound = ASSETS['n-' + a.id];
    return a;
  });

  var SECTIONS = [
    { id: 'animals', title: 'حيوانات', color: '#34b36b', icon: ICONS.cow, ready: true },
    { id: 'daily', title: 'إيه الصوت ده؟', color: '#3b9cf0', icon: ICONS.door, ready: false },
    { id: 'people', title: 'مين بيكلمني؟', color: '#ff8a3d', icon: ICONS.people, ready: false }
  ];

  // ---- Audio: Web Audio first (unlocked by a tap), plain <audio> as backup ----
  var ctx = null, decoded = {}, curSource = null, curEl = null, token = 0;
  function mark(v) { try { document.body.dataset.audio = v; } catch (e) {} }
  function getCtx() {
    if (ctx) return ctx;
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    try { ctx = new C(); } catch (e) { ctx = null; }
    return ctx;
  }
  function unlockAudio() {
    var c = getCtx();
    if (!c) return;
    try {
      if (c.state !== 'running') c.resume();
      var s = c.createBufferSource();
      s.buffer = c.createBuffer(1, 1, 22050);
      s.connect(c.destination);
      s.start(0);
    } catch (e) {}
  }
  function load(c, url) {
    if (decoded[url]) return Promise.resolve(decoded[url]);
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.arrayBuffer();
    }).then(function (ab) {
      return new Promise(function (res, rej) {
        var p = c.decodeAudioData(ab, function (b) { decoded[url] = b; res(b); }, function (e) { rej(e || new Error('decode')); });
        if (p && p.catch) p.catch(rej);
      });
    });
  }
  function stopAudio() {
    token++;
    try { if (curSource) curSource.stop(); } catch (e) {}
    curSource = null;
    if (curEl) { curEl.pause(); curEl = null; }
  }
  function playClip(url, onEnded) {
    stopAudio();
    var my = token;
    function viaElement() {
      return new Promise(function (resolve) {
        try {
          var el = new Audio(url);
          curEl = el;
          if (onEnded) el.addEventListener('ended', function () { if (my === token) onEnded(); });
          var p = el.play();
          if (p && p.then) p.then(function () { mark('element-started'); resolve(true); }, function () { mark('failed'); resolve(false); });
          else { mark('element-started'); resolve(true); }
        } catch (e) { mark('failed'); resolve(false); }
      });
    }
    var c = getCtx();
    if (!c) return viaElement();
    var resumed = c.state === 'running' ? Promise.resolve() : Promise.race([c.resume(), new Promise(function (r) { setTimeout(r, 500); })]);
    return resumed.then(function () {
      if (c.state !== 'running') return viaElement();
      return load(c, url).then(function (buf) {
        if (my !== token) return true;
        var n = c.createBufferSource();
        n.buffer = buf;
        n.connect(c.destination);
        n.onended = function () { mark('webaudio-ended'); if (my === token && onEnded) onEnded(); };
        curSource = n;
        n.start(0);
        mark('webaudio-started');
        return true;
      });
    }).catch(function () { return viaElement(); });
  }

  // ---- UI ----
  var app = document.getElementById('app');
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function makeRounds() {
    return shuffle(ANIMALS).slice(0, 6).map(function (t) {
      var others = shuffle(ANIMALS.filter(function (a) { return a.id !== t.id; })).slice(0, 2);
      return { target: t, choices: shuffle([t].concat(others)) };
    });
  }
  function theme(node, a) { node.style.setProperty('--c', a.color); node.style.setProperty('--soft', a.soft); }

  function showHome() {
    stopAudio();
    app.innerHTML = '';
    var deco = el('div', 'deco', '<span>' + ICONS.cloud + '</span><span>' + ICONS.star(true) + '</span><span>' + ICONS.rainbow + '</span><span>' + ICONS.balloon + '</span>');
    deco.setAttribute('aria-hidden', 'true');
    app.appendChild(deco);
    app.appendChild(el('h1', '', 'مين بيتكلم؟'));
    if (SHOW_SUBTITLE) app.appendChild(el('p', 'sub', 'اسمع الصوت واختار الصورة الصح'));
    var menu = el('div', 'menu');
    SECTIONS.forEach(function (s) {
      var b = el('button', 'section', '<span class="ic">' + s.icon + '</span><span><strong>' + s.title + '</strong><small>' + (s.ready ? ANIMALS.length + ' حيوانات' : 'قريباً') + '</small></span>');
      b.type = 'button';
      b.style.setProperty('--c', s.color);
      b.disabled = !s.ready;
      b.addEventListener('click', function () { unlockAudio(); startGame(); });
      menu.appendChild(b);
    });
    app.appendChild(menu);
    var about = el('button', 'about-btn', 'i'); about.setAttribute('aria-label', 'عن اللعبة');
    about.type = 'button';
    about.addEventListener('click', function () { var d = document.getElementById('about'); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); });
    app.appendChild(about);
  }

  function startGame() {
    var rounds = makeRounds(), index = 0, stars = 0, solved = false;
    function render() {
      stopAudio();
      app.innerHTML = '';
      if (index >= rounds.length) return renderFinish();
      var round = rounds[index], palette = ANIMALS[index % ANIMALS.length];
      var stage = el('div', 'stage'); theme(stage, palette);
      var top = el('div', 'top');
      var back = el('button', 'btn small', 'القائمة'); back.type = 'button'; back.addEventListener('click', showHome);
      var st = el('div', 'stars'); st.setAttribute('aria-label', stars + ' من ' + rounds.length);
      rounds.forEach(function (r, i) { st.appendChild(el('span', i < stars ? 'on' : '', ICONS.star(i < stars))); });
      top.appendChild(back); top.appendChild(st); stage.appendChild(top);
      var sp = el('button', 'speaker', '<span class="waves" aria-hidden="true"><i></i><i></i><i></i></span>' + ICONS.speaker + '<span>اسمع الصوت</span>');
      sp.type = 'button'; sp.setAttribute('aria-label', 'اسمع الصوت');
      var err = el('p', 'error', 'الصوت مش شغال على الموبايل ده. ارفعي صوت الميديا وتأكدي إن الموبايل مش صامت، وبعدين اضغطي السماعة تاني.');
      err.setAttribute('role', 'alert'); err.hidden = true;
      function play(url, then, auto) {
        playClip(url, then).then(function (ok) { if (ok) err.hidden = true; else if (!auto) err.hidden = false; });
      }
      sp.addEventListener('click', function () { unlockAudio(); play(round.target.sound); });
      stage.appendChild(sp);
      var grid = el('div', 'grid'); grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'اختار الصورة');
      var msg = el('p', 'msg', 'قريب! اسمع تاني وجرّب'); msg.hidden = true;
      var after = el('div', 'after');
      round.choices.forEach(function (a) {
        var card = el('button', 'card'); card.type = 'button'; card.setAttribute('aria-label', 'صورة');
        var img = el('img'); img.src = a.photo; img.alt = ''; card.appendChild(img);
        card.addEventListener('click', function () {
          if (solved) return;
          if (a.id === round.target.id) {
            solved = true; stars++; msg.hidden = true;
            Array.prototype.forEach.call(grid.children, function (c, i) {
              var isRight = round.choices[i].id === a.id;
              c.classList.add(isRight ? 'right' : 'faded');
              if (isRight) { c.setAttribute('aria-label', a.name); c.appendChild(Object.assign(el('span', 'name', a.name), { style: 'background:' + a.color })); img.alt = a.alt; }
            });
            var conf = el('div', 'confetti'); conf.setAttribute('aria-hidden', 'true');
            ['#ff8a3d', '#f2b705', '#34b36b', '#9b6dff', '#3b9cf0', '#f2475f'].forEach(function (h, k) {
              for (var j = 0; j < 3; j++) { var s = el('span'); s.style.left = ((k * 3 + j) * 37 % 100) + '%'; s.style.animationDelay = (k * .08) + 's'; s.style.background = h; conf.appendChild(s); }
            });
            stage.appendChild(conf);
            after.appendChild(el('p', 'big', 'برافو!'));
            var row = el('div', 'row');
            var again = el('button', 'btn', 'اسمعه تاني'); again.type = 'button';
            again.addEventListener('click', function () { unlockAudio(); play(a.sound, function () { play(a.nameSound); }); });
            var next = el('button', 'btn primary', 'التالي'); next.type = 'button';
            next.addEventListener('click', function () { solved = false; index++; render(); });
            row.appendChild(again); row.appendChild(next); after.appendChild(row);
            play(a.sound, function () { play(a.nameSound); });
          } else {
            card.classList.add('wrong'); msg.hidden = false;
            setTimeout(function () { card.classList.remove('wrong'); msg.hidden = true; }, 700);
          }
        });
        grid.appendChild(card);
      });
      stage.appendChild(grid); stage.appendChild(err); stage.appendChild(msg); stage.appendChild(after);
      app.appendChild(stage);
      play(round.target.sound, null, true);
    }
    function renderFinish() {
      var stage = el('div', 'stage finish'); theme(stage, ANIMALS[0]);
      stage.appendChild(el('div', 'trophy', ICONS.trophy));
      stage.appendChild(el('p', 'big', 'برافو! عرفتي الحيوانات كلها'));
      var st = el('div', 'stars'); rounds.forEach(function () { st.appendChild(el('span', 'on', ICONS.star(true))); }); stage.appendChild(st);
      var row = el('div', 'row');
      var again = el('button', 'btn primary', 'نلعب تاني'); again.type = 'button'; again.addEventListener('click', startGame);
      var menu = el('button', 'btn', 'القائمة'); menu.type = 'button'; menu.addEventListener('click', showHome);
      row.appendChild(again); row.appendChild(menu); stage.appendChild(row);
      app.appendChild(stage);
    }
    render();
  }

  showHome();
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
