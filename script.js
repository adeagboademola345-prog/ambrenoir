/* ============ AMBRE NOIR — script.js ============ */
(function () {
  'use strict';

  var WHATSAPP = '2349027911490';
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ---------- Data ---------- */
  var FRAGRANCES = [
    {
      id: 'minuit', cat: 'Extrait de Parfum', name: 'Minuit Noir', price: 185000,
      notes: 'Bergamot, black pepper, night rose, smoked amber',
      top: 'Bergamot · Black Pepper', heart: 'Night Rose · Violet', base: 'Oud · Smoked Amber',
      img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
      reviews: [
        { a: 'Onome', s: 5, r: 'Midnight in a bottle. Lasts twelve hours on skin and turns heads every single time.' },
        { a: 'Chidi', s: 5, r: 'The rose-oud blend is so seamless. My signature now.' }
      ]
    },
    {
      id: 'seance', cat: 'Eau de Parfum', name: 'Séance', price: 165000,
      notes: 'Incense, saffron, Turkish rose, patchouli, vanilla',
      top: 'Incense · Saffron', heart: 'Turkish Rose · Jasmine', base: 'Patchouli · Vanilla',
      img: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80',
      reviews: [
        { a: 'Fatima', s: 5, r: 'Mysterious and slightly smoky — people always ask what it is.' },
        { a: 'Tunde', s: 4, r: 'Beautiful sillage. The dry-down is pure gold.' }
      ]
    },
    {
      id: 'veil', cat: 'Eau de Parfum', name: 'Veil of Ouverture', price: 165000,
      notes: 'Aldehydes, pear, peony, cashmere, white musk, sandalwood',
      top: 'Aldehydes · Pear', heart: 'Peony · Cashmere', base: 'White Musk · Sandalwood',
      img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      reviews: [
        { a: 'Amara', s: 5, r: 'Soft, clean and quietly expensive. Perfect for the office in Lagos heat.' },
        { a: 'Zara', s: 5, r: 'The musk is intoxicating. My most-reached-for bottle.' }
      ]
    },
    {
      id: 'ember', cat: 'Extrait de Parfum', name: 'Ember & Oud', price: 210000,
      notes: 'Cardamom, rum, leather, dried rose, oud, molten amber',
      top: 'Cardamom · Rum', heart: 'Leather · Dried Rose', base: 'Oud · Molten Amber',
      img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      reviews: [
        { a: 'Babatunde', s: 5, r: 'Dark, boozy, commanding. Wore it to a gala and got four compliments.' },
        { a: 'Kelechi', s: 5, r: 'A heater. One spray is enough — it projects forever.' }
      ]
    },
    {
      id: 'milk', cat: 'Eau de Parfum', name: 'Milk & Noir', price: 195000,
      notes: 'Cognac, pink pepper, iris, benzoin, tonka, vanilla',
      top: 'Cognac · Pink Pepper', heart: 'Iris · Benzoin', base: 'Tonka · Vanilla',
      img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80',
      reviews: [
        { a: 'Ngozi', s: 5, r: 'Sweet but never cloying. Cozy evenings made of it.' },
        { a: 'Ifeoma', s: 4, r: 'Gorgeous gourmand with real depth underneath.' }
      ]
    }
  ];

  var SIZES = [
    { ml: 30, mult: 0.6 },
    { ml: 50, mult: 1 },
    { ml: 100, mult: 1.55 }
  ];

  var GALLERY = [
    { img: 'photo-1541643600914-78b084683601', t: 'Minuit Noir — after-dark edit' },
    { img: 'photo-1615634260167-c8cdede054de', t: 'Composéd in darkness' },
    { img: 'photo-1587017539504-67cfbddac569', t: 'The amber family' },
    { img: 'photo-1592945403244-b3fbafd7f539', t: 'Discovery set, dressed' },
    { img: 'photo-1523293182086-7651a899d37f', t: 'Ember & Oud, first spray' },
    { img: 'photo-1585386959984-a4155224a1ad', t: 'Studio evenings, 19:00' }
  ];

  var fmt = function (n) { return '\u20A6' + n.toLocaleString('en-NG'); };

  /* ---------- NAV ---------- */
  var nav = $('#nav'), navToggle = $('#navToggle'), navMenu = $('#navMenu');
  navToggle.addEventListener('click', function () {
    var open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMenu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { navMenu.classList.remove('open'); navToggle.classList.remove('open'); }
  });
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- CAROUSEL ---------- */
  var carousel = $('#carousel');
  var active = 0;

  function buildCarousel() {
    FRAGRANCES.forEach(function (f, i) {
      var card = document.createElement('article');
      card.className = 'frag-card reveal in';
      card.innerHTML =
        '<span class="fc-no">N° 0' + (i + 1) + '</span>' +
        '<div class="fc-img"><img src="' + f.img + '" alt="' + f.name + ' bottle" loading="lazy"></div>' +
        '<h3 class="fc-name">' + f.name + '</h3>' +
        '<p class="fc-notes">' + f.notes + '</p>' +
        '<div class="fc-buy">' +
          '<span class="fc-price">' + fmt(f.price) + '</span>' +
          '<button class="btn btn-gold fc-add" data-open="' + i + '">Add to Bag</button>' +
          '<button class="fc-view" data-open="' + i + '">View</button>' +
        '</div>';
      carousel.appendChild(card);
    });

    FRAGRANCES.forEach(function (_, i) {
      var dot = document.createElement('i');
      dot.dataset.i = i;
      dot.addEventListener('click', function () { scrollToCard(i); });
      $('#carDots').appendChild(dot);
    });
    $('.car-dots i').classList.add('active');

    function scrollToCard(i) {
      var cards = $$('.frag-card');
      carousel.scrollTo({ left: cards[i].offsetLeft - (carousel.clientWidth - cards[i].clientWidth) / 2, behavior: 'smooth' });
    }
    $('#carPrev').addEventListener('click', function () { scrollToCard(Math.max(0, active - 1)); });
    $('#carNext').addEventListener('click', function () { scrollToCard(Math.min(FRAGRANCES.length - 1, active + 1)); });
    carousel.addEventListener('scroll', function () {
      var cards = $$('.frag-card');
      var mid = carousel.scrollLeft + carousel.clientWidth / 2;
      var closest = 0, d = Infinity;
      cards.forEach(function (c, i) {
        var dd = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
        if (dd < d) { d = dd; closest = i; }
      });
      if (closest !== active) {
        active = closest;
        $$('.car-dots i').forEach(function (dot, i) { dot.classList.toggle('active', i === active); });
      }
    });
  }
  buildCarousel();

  /* ---------- FRAGRANCE OVERLAY ---------- */
  var overlay = $('#fragOverlay');
  var currentFrag = 0, currentSize = 0;

  function sizePrice(f) { return SIZES[currentSize].mult * f.price; }

  function renderFrag() {
    var f = FRAGRANCES[currentFrag];
    $('#fragImg').src = f.img;
    $('#fragImg').alt = f.name + ' bottle';
    $('#fragName').textContent = f.name;
    $('#fragCat').textContent = f.cat;
    $('#fragTop').textContent = f.top;
    $('#fragHeart').textContent = f.heart;
    $('#fragBase').textContent = f.base;
    $('#fragPrice').textContent = fmt(sizePrice(f)) + ' — ' + SIZES[currentSize].ml + 'ml';

    var sizesWrap = $('#fragSizes');
    sizesWrap.innerHTML = '';
    SIZES.forEach(function (s, i) {
      var b = document.createElement('button');
      b.className = i === currentSize ? 'sel' : '';
      b.innerHTML = s.ml + 'ml <span>' + fmt(s.mult * f.price) + '</span>';
      b.dataset.size = i;
      b.addEventListener('click', function () {
        currentSize = i;
        renderFrag();
      });
      sizesWrap.appendChild(b);
    });

    $('#fragAddBtn').textContent = 'Add to Bag — ' + fmt(sizePrice(f));
    var rv = $('#fragReviews');
    rv.innerHTML = '';
    f.reviews.forEach(function (r) {
      var el = document.createElement('div');
      el.className = 'rv';
      el.innerHTML = '<b>' + r.a + '</b> <span class="stars">' + '\u2605'.repeat(r.s) + '</span><p>' + r.r + '</p>';
      rv.appendChild(el);
    });
  }

  function openFrag(i) {
    currentFrag = i; currentSize = 1;
    renderFrag();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeFrag() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  $$('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { openFrag(parseInt(b.dataset.open, 10)); });
  });
  $('#fragAddBtn').addEventListener('click', function () {
    var f = FRAGRANCES[currentFrag];
    bag.add(f, SIZES[currentSize], 1);
    closeFrag();
    openBag();
  });
  $$('.overlay [data-close]').forEach(function (b) { b.addEventListener('click', closeFrag); });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeFrag(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !bagDrawer.classList.contains('open')) {
      if (overlay.classList.contains('open')) closeFrag();
    }
  });

  /* ---------- NEW BAG PASS-THROUGHS (cards + discovery) ---------- */
  $$('[data-bag]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = b.dataset.bag.split(',');
      bag.add({ name: d[0], price: parseInt(d[1], 10), img: '' }, { ml: 0, mult: 1 }, 1);
    });
  });

  /* ---------- QUIZ ---------- */
  var quizBox = $('#quizBox');
  var steps = $$('.q-step');
  var score = 0, qIndex = 0;

  $$('.q-opts button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      score += parseInt(btn.dataset.v, 10);
      qIndex++;
      if (qIndex < steps.length) {
        steps.forEach(function (st) { st.hidden = st.dataset.q !== String(qIndex); });
      } else {
        steps.forEach(function (st) { st.hidden = true; });
        showResult();
      }
    });
  });

  var RESULT_MAP = [
    'milk', 'milk', 'veil', 'minuit', 'seance', 'ember', 'ember'
  ];

  function showResult() {
    var id = RESULT_MAP[Math.min(score, 6)];
    var f = FRAGRANCES.find(function (x) { return x.id === id; });
    $('#qResName').textContent = f.name;
    $('#qResNotes').textContent = f.top + ' → ' + f.base;
    $('#qResult').hidden = false;
  }
  $('#qResView').addEventListener('click', function () {
    var id = RESULT_MAP[Math.min(score, 6)];
    var idx = FRAGRANCES.findIndex(function (x) { return x.id === id; });
    openFrag(idx >= 0 ? idx : 3);
  });

  /* ---------- GALLERY ---------- */
  var galGrid = $('#galGrid');
  GALLERY.forEach(function (g) {
    var a = document.createElement('a');
    a.className = 'gal reveal';
    a.href = 'https://www.instagram.com';
    a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = '<img src="https://images.unsplash.com/' + g.img + '?auto=format&fit=crop&w=700&q=80" alt="' + g.t + '" loading="lazy"><span>' + g.t + '</span>';
    galGrid.appendChild(a);
  });

  /* ---------- NEWSLETTER ---------- */
  var newsForm = $('#newsForm');
  var newsOk = $('#newsOk');
  newsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = $('#newsEmail').value.trim();
    if (!email || email.indexOf('@') < 0) return;
    newsOk.hidden = false;
    newsForm.reset();
  });

  /* ---------- BAG ---------- */
  var STORE = 'ambrenoir_bag';
  var bagDrawer = $('#bagDrawer'), bagBackdrop = $('#bagBackdrop');

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch (e) { return []; }
  }
  function save(items) { localStorage.setItem(STORE, JSON.stringify(items)); }

  var bag = {
    items: load(),
    summary: function () {
      var items = {};
      this.items.forEach(function (it) {
        var key = it.name + '|' + it.ml;
        if (items[key]) items[key].qty += it.qty; else items[key] = { name: it.name, ml: it.ml, price: it.price, img: it.img, qty: it.qty };
      });
      return Object.keys(items).map(function (k) { return items[k]; });
    },
    add: function (f, size, qty) {
      this.items.push({ name: f.name, ml: size.ml, price: Math.round(size.mult * f.price), img: f.img, qty: qty });
      save(this.items);
      renderBag(); notify();
    },
    qty: function (idx, d) {
      var items = bag.summary();
      var it = items[idx];
      if (!it) return;
      var key = it.name + '|' + it.ml;
      this.items = this.items.map(function (x) {
        if (x.name + '|' + x.ml === key) return { name: x.name, ml: x.ml, price: x.price, img: x.img, qty: d > 0 ? x.qty + 1 : Math.max(0, x.qty - 1) };
        return x;
      }).filter(function (x) { return x.qty > 0; });
      save(this.items);
      renderBag(); notify();
    },
    remove: function (idx) {
      var it = bag.summary()[idx];
      if (!it) return;
      var key = it.name + '|' + it.ml;
      this.items = this.items.filter(function (x) { return x.name + '|' + x.ml !== key; });
      save(this.items);
      renderBag(); notify();
    },
    count: function () {
      var c = 0;
      this.items.forEach(function (it) { c += it.qty; });
      return c;
    },
    total: function () {
      var t = 0;
      this.items.forEach(function (it) { t += it.price * it.qty; });
      return t;
    }
  };

  function notify() {
    var c = bag.count();
    ['#bagCount', '#bagCountDup'].forEach(function (s) {
      var el = $(s);
      if (!el) return;
      el.textContent = c;
      el.hidden = c === 0;
    });
  }
  function renderBag() {
    var items = bag.summary();
    var wrap = $('#bagItems');
    wrap.innerHTML = '';
    if (!items.length) {
      wrap.innerHTML = '<div class="bg-empty">Your bag is empty.<br><em>Wear the night.</em></div>';
      $('#bagFoot').hidden = true;
    } else {
      $('#bagFoot').hidden = false;
      items.forEach(function (it, i) {
        var el = document.createElement('div');
        el.className = 'bg-item';
        var imgSrc = it.img || 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80';
        el.innerHTML =
          '<img src="' + imgSrc + '" alt="' + it.name + '" loading="lazy">' +
          '<div class="bg-info">' +
            '<b>' + it.name + '</b>' +
            '<div class="bg-meta">' + (it.ml ? it.ml + 'ml' : 'Discovery Set') + ' · ' + fmt(it.price) + '</div>' +
            '<div class="bg-qty">' +
              '<button data-qty="-1">−</button><span>' + it.qty + '</span><button data-qty="1">+</button>' +
            '</div>' +
          '</div>' +
          '<span>' + fmt(it.price * it.qty) + '</span>' +
          '<button class="bg-remove" aria-label="Remove">×</button>';
        el.querySelector('[data-qty="-1"]').addEventListener('click', function () { bag.qty(i, -1); });
        el.querySelector('[data-qty="1"]').addEventListener('click', function () { bag.qty(i, 1); });
        el.querySelector('.bg-remove').addEventListener('click', function () { bag.remove(i); });
        wrap.appendChild(el);
      });
    }
    $('#bagSubtotal').textContent = fmt(bag.total());
  }

  function openBag() {
    renderBag();
    bagDrawer.classList.add('open');
    bagBackdrop.hidden = false;
    bagDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeBag() {
    bagDrawer.classList.remove('open');
    bagBackdrop.hidden = true;
    bagDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  $('#bagBtn').addEventListener('click', openBag);
  $('#bagBtnMobile').addEventListener('click', openBag);
  $('#bagClose').addEventListener('click', closeBag);
  bagBackdrop.addEventListener('click', closeBag);

  $('#bagCheckout').addEventListener('click', function () {
    var items = bag.summary();
    if (!items.length) return;
    var lines = items.map(function (it) {
      return '• ' + it.name + ' (' + (it.ml || 'Discovery Set') + ') × ' + it.qty + ' — ' + fmt(it.price * it.qty);
    }).join('\n');
    var msg = 'Hello AMBRE NOIR! I\'d like to place an order:\n\n' + lines + '\n\nSubtotal: ' + fmt(bag.total()) + '\n\nName:\nDelivery address:';
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
  });

  /* ---------- REVEAL ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- FOOTER YEAR ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- INIT ---------- */
  renderBag();
  notify();
})();