/* ==========================================================================
   LÓGICA DE LA TIENDA
   Normalmente NO necesitas editar este archivo.
   Datos del negocio: js/config.js · Productos: js/products.js · Textos legales: js/legal.js
   ========================================================================== */
(function () {
  'use strict';

  const C = STORE_CONFIG;
  const KEY_CART = 'rs_cart_v1';
  const KEY_ORDERS = 'rs_orders_v1';

  /* ---------- Utilidades ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const money = (n) => C.currencySymbol + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const norm = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* almacenamiento no disponible */ } }
  };

  (function validateCatalog() {
    const seen = new Set();
    PRODUCTS.forEach((p, i) => {
      const w = (m) => console.warn('[products.js] Producto #' + (i + 1) + ' (' + (p.id || 'sin id') + '): ' + m);
      if (!p.id) w('falta "id".');
      else if (seen.has(String(p.id))) w('"id" repetido.');
      seen.add(String(p.id));
      if (!p.name) w('falta "name".');
      if (!(Number(p.price) > 0)) w('"price" debe ser un número mayor que 0.');
      if (!Number.isInteger(Number(p.stock)) || p.stock < 0) w('"stock" debe ser un entero (0 o más).');
      if (p.status !== 'available' && p.status !== 'unavailable') w('"status" debe ser "available" o "unavailable".');
      if (!CATEGORIES.some((c) => c.id === p.category)) w('"category" no coincide con ninguna categoría de CATEGORIES.');
    });
  })();

  const productMap = new Map(PRODUCTS.map((p) => [String(p.id), p]));
  const byId = (id) => productMap.get(String(id));
  const isAvailable = (p) => !!p && p.status === 'available' && Number(p.stock) > 0;

  /* ---------- Ilustración automática de flores (si un producto no tiene foto) ---------- */
  function petals(cx, cy, r, o) {
    let s = '';
    for (let i = 0; i < o.n; i++) {
      s += '<ellipse cx="' + cx + '" cy="' + (cy - r * o.off).toFixed(1) + '" rx="' + (r * o.rx).toFixed(1) +
        '" ry="' + (r * o.ry).toFixed(1) + '" fill="' + o.fill + '" transform="rotate(' +
        (o.rot + (i * 360) / o.n).toFixed(1) + ' ' + cx + ' ' + cy + ')"/>';
    }
    return s;
  }
  function flower(cx, cy, r, type, c1, c2) {
    if (type === 'sun') {
      return petals(cx, cy, r, { n: 16, rx: 0.16, ry: 0.5, off: 0.62, fill: c1, rot: 0 }) +
        petals(cx, cy, r * 0.92, { n: 16, rx: 0.14, ry: 0.44, off: 0.55, fill: '#FFD447', rot: 11 }) +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.36).toFixed(1) + '" fill="' + c2 + '"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.2).toFixed(1) + '" fill="#4A2A0A"/>';
    }
    return petals(cx, cy, r, { n: 6, rx: 0.42, ry: 0.55, off: 0.5, fill: c1, rot: 0 }) +
      petals(cx, cy, r * 0.72, { n: 5, rx: 0.42, ry: 0.55, off: 0.5, fill: c2, rot: 30 }) +
      petals(cx, cy, r * 0.42, { n: 5, rx: 0.4, ry: 0.5, off: 0.45, fill: c1, rot: 12 }) +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.1).toFixed(1) + '" fill="' + c2 + '"/>';
  }
  const LAYOUTS = {
    single: [{ x: 100, y: 88, r: 56 }],
    trio: [{ x: 64, y: 106, r: 38 }, { x: 136, y: 106, r: 38 }, { x: 100, y: 64, r: 38 }],
    nine: [
      { x: 54, y: 52, r: 25 }, { x: 100, y: 52, r: 25 }, { x: 146, y: 52, r: 25 },
      { x: 54, y: 96, r: 25 }, { x: 100, y: 96, r: 25 }, { x: 146, y: 96, r: 25 },
      { x: 54, y: 138, r: 25 }, { x: 100, y: 138, r: 25 }, { x: 146, y: 138, r: 25 }
    ],
    cluster: [{ x: 100, y: 88, r: 54 }, { x: 46, y: 130, r: 30 }, { x: 154, y: 130, r: 30 }]
  };
  function artSVG(p) {
    const a = p.art || { type: 'rose', layout: 'single', palette: [['#C8102E', '#8E0B21']] };
    const pts = LAYOUTS[a.layout] || LAYOUTS.single;
    let s = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(p.name) + '" preserveAspectRatio="xMidYMid slice">';
    s += '<ellipse cx="52" cy="136" rx="13" ry="38" fill="#2E5B3B" transform="rotate(-52 52 136)"/>';
    s += '<ellipse cx="148" cy="136" rx="13" ry="38" fill="#3B7A4D" transform="rotate(52 148 136)"/>';
    s += '<ellipse cx="100" cy="120" rx="12" ry="44" fill="#2E5B3B"/>';
    pts.forEach((pt, i) => {
      const pal = a.palette[i % a.palette.length];
      s += flower(pt.x, pt.y, pt.r, a.type, pal[0], pal[1]);
    });
    s += '<polygon points="56,142 144,142 100,200" fill="#C9A27A"/><polygon points="56,142 100,150 100,200" fill="#B58C63"/>';
    s += '<path d="M84 150 Q100 162 116 150 L112 158 Q100 168 88 158Z" fill="#A61B5C"/>';
    return s + '</svg>';
  }
  function bgVars(p) {
    const bg = (p.art && p.art.bg) || ['#FBE7EC', '#F4C6D2'];
    return '--bg1:' + bg[0] + ';--bg2:' + bg[1];
  }
  function artHTML(p) {
    return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy">' : artSVG(p);
  }
  function heroSVG() {
    return '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="80" cy="220" rx="20" ry="70" fill="#2E5B3B" transform="rotate(-50 80 220)"/>' +
      '<ellipse cx="220" cy="220" rx="20" ry="70" fill="#3B7A4D" transform="rotate(50 220 220)"/>' +
      petals(150, 140, 120, { n: 5, rx: 0.5, ry: 0.62, off: 0.52, fill: '#D6337F', rot: 0 }) +
      petals(150, 140, 92, { n: 5, rx: 0.46, ry: 0.58, off: 0.5, fill: '#F08FB9', rot: 36 }) +
      petals(150, 140, 56, { n: 5, rx: 0.42, ry: 0.56, off: 0.48, fill: '#A61B5C', rot: 0 }) +
      '<circle cx="150" cy="140" r="15" fill="#7C1145"/>' +
      '<path d="M150 140 L196 104" stroke="#F0B429" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="198" cy="102" r="9" fill="#F0B429"/></svg>';
  }
  function markSVG() {
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      petals(50, 50, 44, { n: 5, rx: 0.5, ry: 0.62, off: 0.52, fill: '#D6337F', rot: 0 }) +
      petals(50, 50, 24, { n: 5, rx: 0.46, ry: 0.58, off: 0.5, fill: '#A61B5C', rot: 36 }) +
      '<circle cx="50" cy="50" r="7" fill="#F0B429"/></svg>';
  }

  /* ---------- Carrito ---------- */
  function loadCart() {
    const raw = store.get(KEY_CART, {});
    const out = {};
    Object.keys(raw || {}).forEach((id) => {
      const p = byId(id);
      const n = Math.floor(Number(raw[id]));
      if (isAvailable(p) && n > 0) out[id] = Math.min(n, Number(p.stock));
    });
    return out;
  }
  let cart = loadCart();
  const saveCart = () => store.set(KEY_CART, cart);
  const cartLines = () => Object.keys(cart).map((id) => {
    const p = byId(id);
    return { p, qty: cart[id], line: p.price * cart[id] };
  });
  const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = () => cartLines().reduce((a, l) => a + l.line, 0);

  function addToCart(id) {
    const p = byId(id);
    if (!isAvailable(p)) return toast('Este producto no está disponible', 'err');
    const cur = cart[id] || 0;
    if (cur >= p.stock) return toast('Stock máximo disponible: ' + p.stock, 'err');
    cart[id] = cur + 1;
    saveCart(); updateCart(true);
    toast(p.name + ' agregado al carrito', 'ok');
  }
  function changeQty(id, delta) {
    const p = byId(id);
    if (!p || !cart[id]) return;
    const next = cart[id] + delta;
    if (next <= 0) delete cart[id];
    else if (next > p.stock) return toast('Stock máximo disponible: ' + p.stock, 'err');
    else cart[id] = next;
    saveCart(); updateCart();
  }
  function removeItem(id) { delete cart[id]; saveCart(); updateCart(); }
  function clearCart() { cart = {}; saveCart(); updateCart(); }

  /* ---------- Aviso emergente ---------- */
  let toastTimer, toastHideTimer;
  function toast(msg, kind) {
    const t = $('#toast');
    t.textContent = msg;
    t.className = 'toast show' + (kind ? ' ' + kind : '');
    // popover="manual" lo coloca por encima de los diálogos abiertos (carrito, detalle)
    if (t.showPopover) { try { if (!t.matches(':popover-open')) t.showPopover(); } catch (e) { /* sin soporte */ } }
    clearTimeout(toastTimer); clearTimeout(toastHideTimer);
    toastTimer = setTimeout(() => {
      t.className = 'toast';
      toastHideTimer = setTimeout(() => {
        if (t.hidePopover) { try { t.hidePopover(); } catch (e) { /* sin soporte */ } }
      }, 300);
    }, 2600);
  }

  /* ---------- Encabezado / pie / textos ---------- */
  function tpl(s) {
    return String(s)
      .replace(/\{\{tienda\}\}/g, C.name)
      .replace(/\{\{whatsapp\}\}/g, '+' + C.sellerWhatsapp)
      .replace(/\{\{email\}\}/g, C.contact.email || '')
      .replace(/\{\{telefono\}\}/g, C.contact.phone || '');
  }
  const sellerNumberValid = () => /^\d{10,15}$/.test(C.sellerWhatsapp);

  function initStatic() {
    document.title = C.name + ' · ' + C.tagline;
    $('#brandName').textContent = C.name;
    $('#brandMark').innerHTML = C.logo ? '<img src="' + esc(C.logo) + '" alt="">' : markSVG();
    $('#heroTitle').textContent = C.texts.heroTitle;
    $('#heroText').textContent = C.texts.heroText;
    $('#heroCta').textContent = C.texts.heroCta;
    $('#heroArt').innerHTML = heroSVG();
    $('#catalogTitle').textContent = C.texts.catalogTitle;
    $('#catalogText').textContent = C.texts.catalogText;
    $('#aboutTitle').textContent = C.texts.aboutTitle;
    $('#aboutText').textContent = C.texts.aboutText;
    $('#perks').innerHTML = C.perks.map((k) => '<li><strong>' + esc(k.t) + '</strong><span>' + esc(k.d) + '</span></li>').join('');

    const wa = $('#heroWa');
    if (sellerNumberValid()) {
      wa.href = 'https://wa.me/' + C.sellerWhatsapp + '?text=' + encodeURIComponent('Hola, quisiera hacer una consulta.');
    } else { wa.hidden = true; }

    $('#footBrand').textContent = C.name;
    $('#footText').textContent = C.texts.footerText;
    const ct = [];
    if (sellerNumberValid()) ct.push('<li><a href="https://wa.me/' + C.sellerWhatsapp + '" target="_blank" rel="noopener">WhatsApp +' + esc(C.sellerWhatsapp) + '</a></li>');
    if (C.contact.phone) ct.push('<li>' + esc(C.contact.phone) + '</li>');
    if (C.contact.email) ct.push('<li><a href="mailto:' + esc(C.contact.email) + '">' + esc(C.contact.email) + '</a></li>');
    if (C.contact.address) ct.push('<li>' + esc(C.contact.address) + '</li>');
    if (C.contact.hours) ct.push('<li>' + esc(C.contact.hours) + '</li>');
    $('#footContact').innerHTML = ct.join('');
    const names = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' };
    $('#footSocial').innerHTML = Object.keys(names)
      .filter((k) => C.social[k])
      .map((k) => '<li><a href="' + esc(C.social[k]) + '" target="_blank" rel="noopener">' + names[k] + '</a></li>').join('');
    $('#copyright').textContent = '© ' + new Date().getFullYear() + ' ' + C.name + '. Todos los derechos reservados.';

    renderLegal('#termsRoot', LEGAL.terms);
    renderLegal('#privacyRoot', LEGAL.privacy);
  }

  function renderLegal(sel, doc) {
    $(sel).innerHTML =
      '<h1>' + esc(doc.title) + '</h1><p class="updated">' + esc(doc.updated) + '</p>' +
      '<div class="warn"><strong>Aviso:</strong> ' + esc(LEGAL_NOTICE) + '</div>' +
      doc.sections.map((s) => '<h2>' + esc(s.h) + '</h2>' + s.p.map((t) => '<p>' + esc(tpl(t)) + '</p>').join('')).join('');
  }

  /* ---------- Catálogo ---------- */
  const view = { q: '', cat: 'all', sort: 'default' };

  function filtered() {
    const q = norm(view.q);
    let list = PRODUCTS.filter((p) => {
      if (view.cat !== 'all' && p.category !== view.cat) return false;
      if (!q) return true;
      const hay = norm([p.name, p.description, (p.tags || []).join(' '), (p.includes || []).join(' ')].join(' '));
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
    if (view.sort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price);
    if (view.sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);
    if (view.sort === 'name') list = list.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
    return list;
  }

  function renderChips() {
    const items = [{ id: 'all', name: 'Todo' }].concat(CATEGORIES);
    $('#chips').innerHTML = items.map((c) =>
      '<button type="button" class="chip" data-action="cat" data-id="' + esc(c.id) + '" aria-pressed="' + (view.cat === c.id) + '">' + esc(c.name) + '</button>').join('');
  }

  function cardHTML(p) {
    const avail = isAvailable(p);
    const tags = (p.tags || []).map((t) => '<span class="tag">' + esc(t) + '</span>');
    if (p.oldPrice && p.oldPrice > p.price) tags.unshift('<span class="tag off">Oferta</span>');
    return '<article class="card">' +
      '<button type="button" class="card-media" style="' + bgVars(p) + '" data-action="open" data-id="' + esc(p.id) + '" aria-label="Ver detalles de ' + esc(p.name) + '">' +
      artHTML(p) +
      (tags.length ? '<span class="tags">' + tags.join('') + '</span>' : '') +
      (avail ? '' : '<span class="soldout">Agotado</span>') +
      '</button>' +
      '<div class="card-body"><h3>' + esc(p.name) + '</h3><p class="desc">' + esc(p.description) + '</p>' +
      (avail && p.stock <= 3 ? '<p class="stock-low">Quedan ' + p.stock + '</p>' : '') +
      '<div class="price"><strong>' + money(p.price) + '</strong>' + (p.oldPrice && p.oldPrice > p.price ? '<s>' + money(p.oldPrice) + '</s>' : '') + '</div>' +
      '<button type="button" class="btn btn-primary btn-block" data-action="add" data-id="' + esc(p.id) + '"' + (avail ? '' : ' disabled') + '>' + (avail ? 'Agregar al carrito' : 'No disponible') + '</button>' +
      '</div></article>';
  }

  function renderCatalog() {
    renderChips();
    const list = filtered();
    $('#results').textContent = list.length === 1 ? '1 producto' : list.length + ' productos';
    $('#grid').innerHTML = list.length ? list.map(cardHTML).join('') :
      '<div class="empty-state"><p>No encontramos productos con esa búsqueda.</p><button type="button" class="btn btn-ghost" data-action="reset-filters">Ver todo el catálogo</button></div>';
  }

  /* ---------- Detalle de producto ---------- */
  function openProduct(id) {
    const p = byId(id);
    if (!p) return;
    const avail = isAvailable(p);
    const d = $('#productDialog');
    d.innerHTML =
      '<div class="pd">' +
      '<div class="pd-media" style="' + bgVars(p) + '">' + artHTML(p) +
      '<button type="button" class="icon-btn pd-close" data-action="close-product" aria-label="Cerrar">✕</button></div>' +
      '<div class="pd-info"><h2 id="pdName">' + esc(p.name) + '</h2>' +
      '<div class="price"><strong>' + money(p.price) + '</strong>' + (p.oldPrice && p.oldPrice > p.price ? '<s>' + money(p.oldPrice) + '</s>' : '') + '</div>' +
      '<p>' + esc(p.description) + '</p>' +
      (p.includes && p.includes.length ? '<div><strong>Incluye</strong><ul>' + p.includes.map((i) => '<li>' + esc(i) + '</li>').join('') + '</ul></div>' : '') +
      '<button type="button" class="btn btn-primary btn-block" data-action="add" data-id="' + esc(p.id) + '"' + (avail ? '' : ' disabled') + '>' + (avail ? 'Agregar al carrito' : 'No disponible') + '</button>' +
      '</div></div>';
    d.showModal();
  }

  /* ---------- Carrito (panel lateral) ---------- */
  function updateCart(bump) {
    const n = cartCount();
    const el = $('#cartCount');
    el.textContent = n;
    if (bump) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }

    const lines = cartLines();
    if (!lines.length) {
      $('#cartBody').innerHTML = '<div class="empty"><p>Tu carrito está vacío.</p><button type="button" class="btn btn-primary" data-action="close-cart-catalog">Ver catálogo</button></div>';
      $('#cartFoot').innerHTML = '';
    } else {
      $('#cartBody').innerHTML = lines.map((l) =>
        '<div class="line"><div class="line-thumb" style="' + bgVars(l.p) + '">' + artHTML(l.p) + '</div><div>' +
        '<div class="line-name">' + esc(l.p.name) + '</div>' +
        '<div class="line-meta">' + money(l.p.price) + ' c/u</div>' +
        '<div class="line-row"><div class="qty">' +
        '<button type="button" data-action="dec" data-id="' + esc(l.p.id) + '" aria-label="Quitar una unidad de ' + esc(l.p.name) + '">−</button>' +
        '<output aria-label="Cantidad">' + l.qty + '</output>' +
        '<button type="button" data-action="inc" data-id="' + esc(l.p.id) + '" aria-label="Agregar una unidad de ' + esc(l.p.name) + '">+</button></div>' +
        '<strong>' + money(l.line) + '</strong></div>' +
        '<button type="button" class="link-danger" data-action="remove" data-id="' + esc(l.p.id) + '">Quitar</button></div></div>').join('');
      $('#cartFoot').innerHTML =
        '<div class="sum-row"><span>Subtotal</span><span>' + money(cartTotal()) + '</span></div>' +
        '<div class="sum-row sum-total"><span>Total</span><span>' + money(cartTotal()) + '</span></div>' +
        '<button type="button" class="btn btn-primary btn-block" data-action="checkout">Finalizar compra</button>' +
        '<button type="button" class="btn-text" data-action="clear">Vaciar carrito</button>';
    }
    if (currentRoute() === 'checkout' && checkout.stage !== 'done') renderCheckout();
  }
  const openCart = () => { updateCart(); $('#cartDrawer').showModal(); };
  const closeCart = () => { const d = $('#cartDrawer'); if (d.open) d.close(); };

  /* ---------- Checkout ---------- */
  const checkout = { stage: 'form', buyer: { name: '', phone: '', address: '', city: '', notes: '' }, errors: {}, order: null };

  function normPhone(raw) {
    let d = String(raw).replace(/\D/g, '');
    if (d.indexOf('00') === 0) d = d.slice(2);
    if (d.charAt(0) === '0') d = '595' + d.slice(1);
    else if (d.length === 9 && d.charAt(0) === '9') d = '595' + d;
    return d;
  }
  function validate(b) {
    const e = {};
    if (b.name.trim().split(/\s+/).filter(Boolean).length < 2 || b.name.trim().length < 5) e.name = 'Ingresa tu nombre y apellido.';
    const ph = normPhone(b.phone);
    if (!/^\d{10,15}$/.test(ph)) e.phone = 'Ingresa un número de WhatsApp válido. Ej: 0981 123 456';
    if (b.address.trim().length < 5) e.address = 'Ingresa la dirección o ubicación de entrega.';
    if (b.city.trim().length < 2) e.city = 'Ingresa la ciudad.';
    return e;
  }

  const summaryHTML = () => {
    const lines = cartLines();
    return '<aside class="panel"><h2>Resumen del pedido</h2>' +
      lines.map((l) => '<div class="sum-item"><span>' + esc(l.p.name) + ' × ' + l.qty + '</span><span>' + money(l.line) + '</span></div>').join('') +
      '<div class="sum-row" style="margin-top:.8rem"><span>Subtotal</span><span>' + money(cartTotal()) + '</span></div>' +
      '<div class="sum-row sum-total"><span>Total</span><span>' + money(cartTotal()) + '</span></div>' +
      '<p class="note">' + esc(C.texts.checkoutNote) + '</p></aside>';
  };
  const stepsHTML = (n) => {
    const names = ['Tus datos', 'Pago', 'Listo'];
    return '<ol class="steps" style="list-style:none;padding:0">' + names.map((t, i) =>
      '<li class="step' + (i + 1 < n ? ' done' : '') + '"' + (i + 1 === n ? ' aria-current="step"' : '') + '>' + (i + 1) + '. ' + t + '</li>').join('') + '</ol>';
  };
  function field(name, label, type, extra) {
    const b = checkout.buyer, err = checkout.errors[name];
    const common = 'id="f-' + name + '" name="' + name + '" ' + (extra || '') + ' aria-describedby="e-' + name + '"' + (err ? ' aria-invalid="true"' : '');
    const input = type === 'textarea'
      ? '<textarea ' + common + '>' + esc(b[name]) + '</textarea>'
      : '<input type="' + type + '" ' + common + ' value="' + esc(b[name]) + '">';
    return '<div class="field' + (err ? ' invalid' : '') + '"><label for="f-' + name + '">' + label + '</label>' + input +
      '<span class="error" id="e-' + name + '">' + esc(err || '') + '</span></div>';
  }

  function renderCheckout() {
    const root = $('#checkoutRoot');
    const live = $('#buyerForm');
    if (live) { // conserva lo que el comprador ya escribió
      const f = new FormData(live);
      ['name', 'phone', 'address', 'city', 'notes'].forEach((k) => { if (f.has(k)) checkout.buyer[k] = String(f.get(k)); });
    }
    if (checkout.stage === 'done') return renderDone(root);
    if (!cartLines().length) {
      root.innerHTML = '<div class="empty"><p>Tu carrito está vacío.</p><a class="btn btn-primary" href="#/catalogo">Ver catálogo</a></div>';
      return;
    }
    if (checkout.stage === 'pay') return renderPay(root);

    root.innerHTML = stepsHTML(1) + '<h1 class="co-title">Completa tus datos</h1><div class="co-grid">' +
      '<form class="panel" id="buyerForm" novalidate>' +
      '<h2>Datos de contacto y entrega</h2>' +
      field('name', 'Nombre y apellido *', 'text', 'autocomplete="name" required') +
      field('phone', 'Número de WhatsApp *', 'tel', 'autocomplete="tel" inputmode="tel" placeholder="0981 123 456" required') +
      field('address', 'Dirección o ubicación de entrega *', 'text', 'autocomplete="street-address" placeholder="Calle, número, referencia o link de ubicación" required') +
      field('city', 'Ciudad *', 'text', 'autocomplete="address-level2" required') +
      field('notes', 'Comentarios adicionales (opcional)', 'textarea', 'placeholder="Texto de la tarjeta dedicatoria, horario preferido, etc."') +
      '<button type="submit" class="btn btn-primary btn-block">Continuar al pago</button>' +
      '<p class="hint" style="color:var(--muted);font-size:.88rem;margin-top:.8rem">Usamos estos datos solo para gestionar tu pedido. Ver <a href="#/privacidad">Política de privacidad</a>.</p>' +
      '</form>' + summaryHTML() + '</div>';
  }

  function renderPay(root) {
    const P = C.payment, total = cartTotal();
    const isExample = /MI\.TIENDA|EJEMPLO|NOMBRE DEL TITULAR/i.test(P.alias + P.holder + P.bank);
    const badge = isExample ? '<span class="badge-example">DATOS DE EJEMPLO</span>' : '';
    root.innerHTML = stepsHTML(2) + '<h1 class="co-title">Realiza tu transferencia</h1><div class="co-grid">' +
      '<section class="panel">' +
      (isExample ? '<div class="warn"><strong>Datos de ejemplo:</strong> reemplaza el alias, titular y banco en <code>js/config.js</code> antes de publicar.</div>' : '') +
      (!sellerNumberValid() ? '<div class="warn err"><strong>Falta configurar el WhatsApp del vendedor</strong> en <code>js/config.js</code> (sellerWhatsapp).</div>' : '') +
      '<h2 class="pay-title">Pago mediante transferencia</h2>' +
      '<dl class="pay-rows">' +
      '<div class="pay-row"><dt>Titular</dt><dd>' + esc(P.holder) + badge + '</dd></div>' +
      '<div class="pay-row"><dt>Banco</dt><dd>' + esc(P.bank) + '</dd></div>' +
      '<div class="pay-row"><dt>ALIAS</dt><dd><span class="pay-alias" id="aliasText">' + esc(P.alias) + '</span></dd></div>' +
      '<div class="pay-row"><dt>Monto exacto a transferir</dt><dd class="pay-amount">' + money(total) + '</dd></div>' +
      '</dl>' +
      '<div class="pay-actions"><button type="button" class="btn btn-ghost" data-action="copy-alias">Copiar ALIAS</button>' +
      '<button type="button" class="btn btn-ghost" data-action="copy-amount">Copiar monto</button></div>' +
      '<p>' + esc(P.instructions) + '</p>' +
      '<div class="confirm-box"><p><strong>Una vez realizada la transferencia, presiona el botón para enviar tu pedido.</strong></p>' +
      '<button type="button" class="btn btn-primary btn-block" data-action="confirm"' + (sellerNumberValid() ? '' : ' disabled') + '>CONFIRMAR PEDIDO</button>' +
      '<button type="button" class="btn-text" data-action="back-form">← Volver y editar mis datos</button></div>' +
      '</section>' + summaryHTML() + '</div>';
  }

  /* ---------- Pedido ---------- */
  function newOrderNumber() {
    const n = Math.floor(Date.now() / 1000) % 1000000;
    return String(n).padStart(6, '0');
  }
  function buildMessage(o) {
    const b = o.buyer;
    return [
      '🛒 NUEVO PEDIDO', '',
      'Pedido: #' + o.number, '',
      'Cliente:',
      'Nombre: ' + b.name,
      'WhatsApp: +' + b.phone, '',
      'Productos:',
      o.items.map((i) => i.name + ' x' + i.qty + ' — ' + money(i.price * i.qty)).join('\n'), '',
      'TOTAL: ' + money(o.total), '',
      'Dirección:', b.address, '',
      'Ciudad:', b.city, '',
      'Comentarios:', b.notes || '—', '',
      'Método de pago:', 'Transferencia mediante ALIAS',
      'Estado: ' + ORDER_STATUSES[o.status].label
    ].join('\n');
  }
  const whatsappUrl = (msg) => 'https://wa.me/' + C.sellerWhatsapp + '?text=' + encodeURIComponent(msg);

  function confirmOrder() {
    if (!sellerNumberValid()) return toast('Falta configurar el WhatsApp del vendedor', 'err');
    const lines = cartLines();
    if (!lines.length) return;
    const b = checkout.buyer;
    const order = {
      number: newOrderNumber(),
      status: 'PAGO_INFORMADO',
      createdAt: new Date().toISOString(),
      buyer: { name: b.name.trim(), phone: normPhone(b.phone), address: b.address.trim(), city: b.city.trim(), notes: b.notes.trim() },
      items: lines.map((l) => ({ id: l.p.id, name: l.p.name, price: l.p.price, qty: l.qty })),
      total: cartTotal(),
      payment: 'ALIAS'
    };
    order.message = buildMessage(order);
    order.url = whatsappUrl(order.message);

    // Historial mínimo en el dispositivo (sin datos personales)
    const hist = store.get(KEY_ORDERS, []);
    hist.unshift({ number: order.number, createdAt: order.createdAt, total: order.total, status: order.status });
    store.set(KEY_ORDERS, hist.slice(0, 20));

    checkout.order = order;
    checkout.stage = 'done';
    clearCart();
    renderCheckout();
    window.scrollTo({ top: 0 });
    const w = window.open(order.url, '_blank');
    if (w) { try { w.opener = null; } catch (e) { /* sin acceso */ } }
    else toast('Presiona «Abrir WhatsApp» para enviar el pedido', 'ok');
  }

  function renderDone(root) {
    const o = checkout.order;
    root.innerHTML = stepsHTML(3) +
      '<div class="done"><div class="done-mark" aria-hidden="true"><svg width="44" height="44" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
      '<h1>¡Pedido registrado!</h1>' +
      '<p class="order-num">' + esc(C.orderPrefix) + esc(o.number) + '</p>' +
      '<p><span class="status-pill">' + esc(ORDER_STATUSES[o.status].label) + '</span></p>' +
      '<ol><li>Se abrió WhatsApp con tu pedido listo. <strong>Presiona enviar</strong> para que llegue a la tienda.</li>' +
      '<li>Adjunta el comprobante de la transferencia por ese mismo chat.</li>' +
      '<li>Verificaremos el pago y coordinaremos la entrega contigo.</li></ol>' +
      '<div class="done-actions"><a class="btn btn-primary" href="' + esc(o.url) + '" target="_blank" rel="noopener">Abrir WhatsApp</a>' +
      '<button type="button" class="btn btn-ghost" data-action="new-shop">Seguir comprando</button></div></div>';
  }

  /* ---------- Portapapeles ---------- */
  async function copyText(text, okMsg) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else throw new Error('sin clipboard');
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      if (!ok) return toast('No se pudo copiar. Copia el texto manualmente.', 'err');
    }
    toast(okMsg, 'ok');
  }

  /* ---------- Rutas ---------- */
  function currentRoute() {
    const r = (location.hash || '#/').replace(/^#\/?/, '').split('?')[0];
    return r || 'home';
  }
  function route() {
    let r = currentRoute();
    const map = { home: 'home', catalogo: 'home', contacto: null, checkout: 'checkout', terminos: 'terminos', privacidad: 'privacidad' };
    const name = map.hasOwnProperty(r) ? map[r] : 'home';
    if (name) $$('.view').forEach((v) => { v.hidden = v.dataset.view !== name; });
    else if ($$('.view').every((v) => v.hidden)) $('[data-view="home"]').hidden = false;

    if (r === 'checkout') {
      if (checkout.stage === 'done' && !checkout.order) checkout.stage = 'form';
      renderCheckout();
      window.scrollTo({ top: 0 });
    } else if (r === 'catalogo') {
      $('#catalogo').scrollIntoView();
    } else if (r === 'contacto') {
      $('#contacto').scrollIntoView();
    } else {
      if (checkout.stage === 'done') { checkout.stage = 'form'; checkout.order = null; }
      window.scrollTo({ top: 0 });
    }
    document.title = C.name + ' · ' + C.tagline;
  }

  /* ---------- Eventos ---------- */
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-action]');
    if (!el) {
      // Cerrar diálogos al hacer clic en el fondo
      if (ev.target.tagName === 'DIALOG') ev.target.close();
      return;
    }
    const id = el.dataset.id;
    switch (el.dataset.action) {
      case 'add': if (el.closest('#productDialog')) $('#productDialog').close(); addToCart(id); break;
      case 'open': openProduct(id); break;
      case 'close-product': $('#productDialog').close(); break;
      case 'open-cart': openCart(); break;
      case 'close-cart': closeCart(); break;
      case 'close-cart-catalog': closeCart(); location.hash = '#/catalogo'; break;
      case 'inc': changeQty(id, 1); break;
      case 'dec': changeQty(id, -1); break;
      case 'remove': removeItem(id); break;
      case 'clear': if (window.confirm('¿Vaciar todo el carrito?')) clearCart(); break;
      case 'checkout':
        closeCart();
        checkout.stage = 'form'; checkout.order = null;
        if (currentRoute() === 'checkout') renderCheckout(); else location.hash = '#/checkout';
        break;
      case 'cat': view.cat = id; renderCatalog(); break;
      case 'reset-filters': view.q = ''; view.cat = 'all'; $('#searchInput').value = ''; renderCatalog(); break;
      case 'copy-alias': copyText(C.payment.alias, 'ALIAS copiado correctamente'); break;
      case 'copy-amount': copyText(String(cartTotal()), 'Monto copiado correctamente'); break;
      case 'back-form': checkout.stage = 'form'; renderCheckout(); break;
      case 'confirm': confirmOrder(); break;
      case 'new-shop': checkout.stage = 'form'; checkout.order = null; location.hash = '#/catalogo'; break;
    }
  });

  document.addEventListener('submit', (ev) => {
    if (ev.target.id === 'buyerForm') {
      ev.preventDefault();
      const f = new FormData(ev.target);
      ['name', 'phone', 'address', 'city', 'notes'].forEach((k) => { checkout.buyer[k] = String(f.get(k) || ''); });
      checkout.errors = validate(checkout.buyer);
      if (Object.keys(checkout.errors).length) {
        renderCheckout();
        const first = $('.field.invalid input, .field.invalid textarea');
        if (first) first.focus();
        return;
      }
      checkout.stage = 'pay';
      renderCheckout();
      window.scrollTo({ top: 0 });
    }
  });

  $('#searchForm').addEventListener('submit', (e) => { e.preventDefault(); location.hash = '#/catalogo'; });
  $('#searchInput').addEventListener('input', (e) => {
    view.q = e.target.value;
    if (currentRoute() !== 'home' && currentRoute() !== 'catalogo') location.hash = '#/catalogo';
    renderCatalog();
    const cat = $('#catalogo');
    if (cat && cat.getBoundingClientRect().top > 160) cat.scrollIntoView();
  });
  $('#sortSelect').addEventListener('change', (e) => { view.sort = e.target.value; renderCatalog(); });
  window.addEventListener('hashchange', route);

  // Evita que el carrito de otra pestaña quede desactualizado
  window.addEventListener('storage', (e) => { if (e.key === KEY_CART) { cart = loadCart(); updateCart(); } });

  /* ---------- Inicio ---------- */
  initStatic();
  renderCatalog();
  updateCart();
  route();
})();
