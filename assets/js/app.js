/* ==========================================================================
   TEPORE — logica comune: lingue, layout, carrello, animazioni
   ========================================================================== */
(function () {
  const S = window.STORE;
  const P = window.PRODUCTS;
  const DICTS = window.I18N || {};

  /* ---------- Utility ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const byId = (id) => P.find((p) => p.id === id);
  const bySlug = (slug) => P.find((p) => p.slug === slug);
  const pct = (now, old) => Math.round((1 - now / old) * 100);
  const productUrl = (p) => `product.html?p=${p.slug}`;
  const fitClass = (p) => (p.imageFit === "contain" ? "fit-contain" : "");
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage non disponibile */ } },
  };

  /* ---------- Lingua ---------- */
  // La scelta si salva nel browser; window.name la conserva anche se lo storage è bloccato.
  function detectLang() {
    const ok = (l) => l && S.languages.includes(l) && DICTS[l];
    const fromName = (window.name.match(/tepore_lang=(\w\w)/) || [])[1];
    const saved = store.get("tepore_lang", null) || fromName;
    if (ok(saved)) return saved;
    for (const l of navigator.languages || [navigator.language || ""]) {
      const code = String(l).slice(0, 2).toLowerCase();
      if (ok(code)) return code;
    }
    return S.languages[0];
  }
  const LANG = detectLang();
  const D = DICTS[LANG];
  const BASE = DICTS[S.languages[0]];
  const LOCALE = D.locale;
  function setLang(l) {
    store.set("tepore_lang", l);
    window.name = window.name.replace(/tepore_lang=\w\w;?/, "") + `tepore_lang=${l};`;
    location.reload();
  }

  const fmt = new Intl.NumberFormat(LOCALE, { style: "currency", currency: S.currency });
  const money = (n) => fmt.format(Math.round(n * 100) / 100);
  const num = (n, digits = 0) => Number(n).toLocaleString(LOCALE, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  // "−10%" in italiano e inglese, "−10 %" in tedesco, francese e spagnolo
  const off = (n) => "−" + new Intl.NumberFormat(LOCALE, { style: "percent" }).format(n / 100);
  const COLON = LANG === "fr" ? "\u202f:" : ":";
  const date = (d, opts = { weekday: "short", day: "numeric", month: "short" }) => d.toLocaleDateString(LOCALE, opts);

  // Tipografia francese: spazio fine non separabile prima di : ; ! ? » e dopo «
  const typo = (s) => (LANG === "fr" ? s.replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« ") : s);
  const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

  const bundleFull = () => window.BUNDLE.items.reduce((a, id) => a + byId(id).price, 0);
  const DEF = {
    free: money(S.freeShippingThreshold),
    shipCost: money(S.shippingCost),
    expressCost: money(S.expressCost),
    returnDays: S.returnDays,
    warrantyYears: S.warrantyYears,
    email: S.email,
    year: new Date().getFullYear(),
    kitPct: pct(window.BUNDLE.price, bundleFull()),
    kitSave: money(bundleFull() - window.BUNDLE.price),
  };
  const fill = (str, vars) => typo(String(str).replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : DEF[k] != null ? DEF[k] : m)));
  const deepFill = (v, vars) =>
    typeof v === "string" ? fill(v, vars)
      : Array.isArray(v) ? v.map((x) => deepFill(x, vars))
      : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deepFill(x, vars)]))
      : v;
  DEF.days = fill(get(D.ui, "ship.days") || get(BASE.ui, "ship.days"), { min: S.shippingDaysMin, max: S.shippingDaysMax });

  // t("cart.title") → testo nella lingua attiva (con riserva sull'italiano)
  function t(path, vars) {
    let v = get(D.ui, path);
    if (v == null) v = get(BASE.ui, path);
    if (v == null) return path;
    return deepFill(v, vars);
  }

  // Applica i testi tradotti a catalogo, kit, recensioni e FAQ
  (function localizeContent() {
    P.forEach((p) => {
      const c = deepFill((D.products || {})[p.id] || BASE.products[p.id]);
      const base = BASE.products[p.id];
      ["subtitle", "short", "storyTitle", "badge", "variantLabel", "chooseCta", "description", "specs", "inBox"].forEach((k) => (p[k] = c[k]));
      p.highlights = c.highlights.map((h, i) => ({ ...h, icon: p.icons[i] }));
      p.variants.forEach((v) => {
        const label = (c.variants || {})[v.id] || (base.variants || {})[v.id];
        if (label) v.label = label;
      });
    });
    Object.assign(window.BUNDLE, deepFill(D.bundle || BASE.bundle));
    window.REVIEWS.forEach((r) => Object.assign(r, deepFill((D.reviews || {})[r.id] || BASE.reviews[r.id])));
    window.FAQS = deepFill(D.faqs || BASE.faqs);
  })();

  /* ---------- Icone (SVG inline) ---------- */
  const ICONS = {
    cart: '<path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17"/><path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    star: '<path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8L12 2.8Z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M7 7l10 10M17 7 7 17"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    return: '<path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2.2-4.8.3 1.6 1 2.6 2 3.1C11 9 11 6 12 3Z"/>',
    dial: '<circle cx="12" cy="12" r="8"/><path d="M12 12 15.5 8.5"/><path d="M12 4v1.5M20 12h-1.5M4 12h1.5"/>',
    drop: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z"/>',
    battery: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10.5v3M7 10v4M10.5 10v4"/>',
    feather: '<path d="M20 4c-8 0-13 5-13 13v3"/><path d="M20 4c0 8-5 12-11 12"/><path d="M7 17l6-6"/>',
    grip: '<path d="M4 15c2-1 4-1 6 0s4 1 6 0 3-1 4-.5"/><path d="M4 19c2-1 4-1 6 0s4 1 6 0 3-1 4-.5"/><path d="M6 11V5M10 11V5M14 11V5M18 11V5"/>',
    sensor: '<path d="M5 18h14"/><path d="M8 18v-5a4 4 0 0 1 8 0v5"/><path d="M4 9a9 9 0 0 1 16 0M7 6.5a5.5 5.5 0 0 1 10 0" opacity=".6"/>',
    ring: '<ellipse cx="12" cy="14" rx="8" ry="3.5"/><path d="M4 14v2c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-2"/><path d="M12 4v5M9 6.5l3-2.5 3 2.5"/>',
    gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8C10 4 7 4.5 7 6.5S10 8 12 8Zm0 0c2-4 5-3.5 5-1.5S14 8 12 8Z"/>',
    bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/>',
    support: '<path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.5-2 2.5-5 2.5"/>',
    box: '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
    home: '<path d="M4 11 12 4l8 7v9H4v-9Z"/><path d="M10 20v-5h4v5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    tag: '<path d="M3.5 12.5V4h8.5l8.5 8.5-8 8-9-8Z"/><circle cx="8" cy="8.5" r="1.4"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  };
  const icon = (name, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const stars = (r = 5) => {
    let s = "";
    for (let i = 1; i <= 5; i++) s += `<svg class="icon" viewBox="0 0 24 24" style="opacity:${i <= Math.round(r) ? 1 : 0.25}" aria-hidden="true">${ICONS.star}</svg>`;
    return `<span class="stars" role="img" aria-label="${t("a11y.rating", { r: num(r, 1) })}">${s}</span>`;
  };
  const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#e8452c"/><stop offset=".55" stop-color="#ff7a30"/><stop offset="1" stop-color="#ffcf86"/></linearGradient></defs>
      <circle cx="20" cy="20" r="19" fill="url(#lg)"/>
      <path d="M14 27c0-5 3-6 3-10M20 27c0-5 3-6 3-10M26 27c0-5 3-6 3-10" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" transform="translate(-2 -1)"/>
    </svg>`;

  /* ---------- Prezzi e carrello ---------- */
  // Sconto quantità sullo stesso prodotto (mostrato anche nella pagina prodotto)
  const TIERS = [
    { qty: 1, off: 0, ...t("tiers.t1") },
    { qty: 2, off: 10, ...t("tiers.t2") },
    { qty: 3, off: 15, ...t("tiers.t3") },
  ];
  const tierOff = (qty) => [...TIERS].reverse().find((x) => qty >= x.qty).off;

  const Cart = {
    items: store.get("tepore_cart", []),
    code: store.get("tepore_code", null),
    save() { store.set("tepore_cart", this.items); store.set("tepore_code", this.code); render(); },
    add(id, variant, qty = 1) {
      const key = `${id}::${variant || ""}`;
      const found = this.items.find((i) => i.key === key);
      if (found) found.qty += qty; else this.items.push({ key, id, variant, qty });
      this.save();
    },
    setQty(key, qty) {
      const it = this.items.find((i) => i.key === key);
      if (!it) return;
      it.qty = Math.max(0, qty);
      if (!it.qty) this.items = this.items.filter((i) => i.key !== key);
      this.save();
    },
    remove(key) { this.items = this.items.filter((i) => i.key !== key); this.save(); },
    clear() { this.items = []; this.code = null; this.save(); },
    count() { return this.items.reduce((a, i) => a + i.qty, 0); },
    lines() {
      return this.items.map((i) => {
        if (i.id === window.BUNDLE.id) {
          const B = window.BUNDLE;
          const size = byId("tepore-slippers").variants.find((v) => v.id === i.variant);
          const label = size ? t("cart.bundleSize", { size: size.label }) : i.variant;
          return { ...i, name: B.name, image: B.image, fit: "", variantLabel: label ? `${B.subtitle} · ${label}` : B.subtitle, unit: B.price, total: B.price * i.qty, compare: bundleFull() * i.qty };
        }
        const p = byId(i.id);
        if (!p) return null;
        const v = p.variants.find((x) => x.id === i.variant);
        const off = tierOff(i.qty);
        const total = p.price * i.qty * (1 - off / 100);
        return { ...i, p, name: p.name, image: p.image, fit: fitClass(p), variantLabel: v ? `${p.variantLabel}${COLON} ${v.label}` : "", unit: p.price, total, compare: p.compareAt * i.qty, off };
      }).filter(Boolean);
    },
    totals() {
      const lines = this.lines();
      const subtotal = lines.reduce((a, l) => a + l.total, 0);
      const compare = lines.reduce((a, l) => a + l.compare, 0);
      const codePct = this.code && S.discountCodes[this.code] ? S.discountCodes[this.code] : 0;
      const discount = subtotal * codePct / 100;
      const after = subtotal - discount;
      const shipping = !lines.length || subtotal >= S.freeShippingThreshold ? 0 : S.shippingCost;
      return { lines, subtotal, compare, discount, codePct, shipping, total: after + shipping, saved: compare - subtotal + discount };
    },
  };

  /* ---------- Layout comune ---------- */
  function langSwitcher() {
    return `<div class="lang" id="langSwitch">
      <button class="icon-btn lang-btn" data-lang-toggle aria-haspopup="true" aria-expanded="false" aria-label="${t("a11y.language")}${COLON} ${D.name}">
        ${icon("globe")}<span class="lang-code">${LANG.toUpperCase()}</span>
      </button>
      <div class="lang-menu" role="menu" aria-label="${t("a11y.language")}">
        ${S.languages.filter((l) => DICTS[l]).map((l) => `
          <button role="menuitemradio" aria-checked="${l === LANG}" data-lang="${l}" lang="${l}" class="${l === LANG ? "current" : ""}">
            <span class="lang-badge">${l.toUpperCase()}</span><span>${DICTS[l].name}</span>${l === LANG ? icon("check") : ""}
          </button>`).join("")}
      </div>
    </div>`;
  }

  function buildChrome() {
    const msgs = [`${icon("truck")} ${t("announce.free")}`, `${icon("return")} ${t("announce.returns")}`, `${icon("tag")} ${t("announce.code")}`];
    const announce = `
      <div class="announce"><div class="container">
        <div class="announce-rotator" aria-live="polite">${msgs.map((m) => `<span>${m}</span>`).join("")}</div>
        <div class="countdown-wrap" data-countdown hidden>· ${t("announce.countdown")} <span class="countdown"></span></div>
      </div></div>`;
    const header = `
      <header class="header"><div class="container">
        <a href="index.html" class="logo" aria-label="Tepore">${LOGO}<span>tepore</span></a>
        <nav class="nav" aria-label="${t("a11y.mainNav")}">
          <a href="index.html#prodotti">${t("nav.products")}</a>
          <a href="index.html#kit">${t("nav.kit")}</a>
          <a href="index.html#recensioni">${t("nav.reviews")}</a>
          <a href="index.html#faq">${t("nav.faq")}</a>
          <a href="info.html#contatti">${t("nav.contact")}</a>
        </nav>
        <div class="header-actions">
          ${langSwitcher()}
          <button class="icon-btn" data-open-cart aria-label="${t("a11y.openCart")}">${icon("cart")}<span class="cart-count">0</span></button>
          <button class="icon-btn menu-toggle" data-open-menu aria-label="${t("a11y.openMenu")}">${icon("menu")}</button>
        </div>
      </div></header>
      <div class="mobile-menu" id="mobileMenu">
        <div class="mm-top"><a href="index.html" class="logo">${LOGO}<span>tepore</span></a><button class="icon-btn" data-close-menu aria-label="${t("a11y.closeMenu")}">${icon("close")}</button></div>
        ${P.map((p) => `<a class="mm-link" href="${productUrl(p)}">${p.name}</a>`).join("")}
        <a class="mm-link" href="index.html#kit">${t("nav.kit")}</a>
        <a class="mm-link" href="info.html">${t("nav.support")}</a>
        <div class="mm-foot">${t("menuFoot", { days: DEF.days })}</div>
      </div>`;
    const footer = `
      <footer class="footer"><div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="logo">${LOGO}<span>tepore</span></a>
            <p>${t("footer.about")}</p>
          </div>
          <div><h4>${t("footer.shop")}</h4><ul>${P.map((p) => `<li><a href="${productUrl(p)}">${p.name}</a></li>`).join("")}<li><a href="index.html#kit">${t("nav.kit")}</a></li></ul></div>
          <div><h4>${t("footer.help")}</h4><ul>
            <li><a href="info.html#spedizioni">${t("footer.shipping")}</a></li>
            <li><a href="info.html#resi">${t("footer.returns")}</a></li>
            <li><a href="index.html#faq">${t("footer.faq")}</a></li>
            <li><a href="info.html#contatti">${t("footer.contact")}</a></li>
          </ul></div>
          <div><h4>${t("footer.legal")}</h4><ul>
            <li><a href="info.html#termini">${t("footer.terms")}</a></li>
            <li><a href="info.html#privacy">${t("footer.privacy")}</a></li>
            <li><a href="info.html#garanzia">${t("footer.warranty")}</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>${t("footer.rights")}</span>
          ${paymentsHtml()}
        </div>
      </div></footer>`;
    const drawer = `
      <div class="overlay" data-close-cart></div>
      <aside class="drawer" id="cartDrawer" aria-label="${t("cart.title")}" aria-hidden="true">
        <div class="drawer-head"><h3>${t("cart.title")}</h3><button class="icon-btn" data-close-cart aria-label="${t("a11y.closeCart")}">${icon("close")}</button></div>
        <div class="ship-progress" id="shipProgress"></div>
        <div class="drawer-items" id="drawerItems"></div>
        <div class="upsell" id="upsell"></div>
        <div class="drawer-foot" id="drawerFoot"></div>
      </aside>
      <div class="toast" id="toast" role="status"></div>`;

    const slotTop = $("[data-chrome-top]");
    if (slotTop) slotTop.outerHTML = announce + header;
    const slotBottom = $("[data-chrome-bottom]");
    if (slotBottom) slotBottom.outerHTML = footer;
    document.body.insertAdjacentHTML("beforeend", drawer);
  }

  function paymentsHtml() {
    return `<div class="payments" aria-label="${t("a11y.payments")}">
      <span class="pay visa">VISA</span><span class="pay mc"><span><i></i><i></i></span></span>
      <span class="pay pp">Pay<em>Pal</em></span><span class="pay apple">Apple Pay</span><span class="pay klarna">Klarna.</span>
    </div>`;
  }

  // Testi statici delle pagine: data-i18n="chiave" (contenuto) e data-i18n-attr="attributo:chiave;..."
  function applyStatic(root = document) {
    document.documentElement.lang = LANG;
    $$("[data-i18n]", root).forEach((el) => (el.innerHTML = t(el.dataset.i18n)));
    $$("[data-i18n-attr]", root).forEach((el) =>
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      }));
    $$("[data-price]", root).forEach((el) => { const p = byId(el.dataset.price); if (p) el.textContent = money(p.price); });
  }

  /* ---------- Rendering carrello ---------- */
  function render() {
    const tot = Cart.totals();
    const count = Cart.count();
    $$(".cart-count").forEach((el) => { el.textContent = count; el.classList.toggle("has", count > 0); });

    const prog = $("#shipProgress");
    if (!prog) return;
    const left = S.freeShippingThreshold - tot.subtotal;
    prog.innerHTML = tot.lines.length
      ? (left > 0 ? t("cart.left", { amount: money(left) }) : t("cart.unlocked")) +
        `<div class="bar"><span style="width:${Math.min(100, (tot.subtotal / S.freeShippingThreshold) * 100)}%"></span></div>`
      : t("cart.threshold");

    $("#drawerItems").innerHTML = tot.lines.length
      ? tot.lines.map((l) => `
        <div class="line">
          <img src="${l.image}" alt="${l.name}" class="${l.fit}">
          <div>
            <b>${l.name}</b>
            <small>${l.variantLabel}</small>
            ${l.off ? `<small style="color:var(--green);font-weight:600">${t("cart.qtyDiscount", { off: l.off })}</small>` : ""}
            <div style="display:flex;align-items:center">
              <div class="qty">
                <button data-qty="${l.key}" data-d="-1" aria-label="${t("a11y.decrease")}">−</button><span>${l.qty}</span><button data-qty="${l.key}" data-d="1" aria-label="${t("a11y.increase")}">+</button>
              </div>
              <button class="line-remove" data-remove="${l.key}">${t("cart.remove")}</button>
            </div>
          </div>
          <div class="line-price">${money(l.total)}<s>${money(l.compare)}</s></div>
        </div>`).join("")
      : `<div class="drawer-empty">${icon("cart")}<p>${t("cart.empty")}</p><br><a href="index.html#prodotti" class="btn btn-dark btn-sm" data-close-cart>${t("cart.browse")}</a></div>`;

    // Upsell: primo prodotto non ancora nel carrello
    const inCart = new Set(Cart.items.map((i) => i.id));
    const up = inCart.has(window.BUNDLE.id) ? null : P.find((p) => !inCart.has(p.id));
    $("#upsell").style.display = tot.lines.length && up ? "" : "none";
    if (up) {
      const direct = up.variants.length === 1;
      $("#upsell").innerHTML = `<h5>${t("cart.upsell")}</h5>
        <div class="upsell-item"><img src="${up.image}" alt="" class="${fitClass(up)}">
        <div><b>${up.name}</b><small>${money(up.price)}</small></div>
        ${direct
          ? `<button class="btn btn-dark btn-sm" data-add="${up.id}" data-variant="${up.variants[0].id}">${t("cart.add")}</button>`
          : `<a class="btn btn-dark btn-sm" href="${productUrl(up)}">${up.chooseCta}</a>`}</div>`;
    }

    $("#drawerFoot").innerHTML = tot.lines.length ? `
      <form class="code-form" id="codeForm"><input name="code" placeholder="${t("a11y.discountCode")}" value="${Cart.code || ""}" aria-label="${t("a11y.discountCode")}"><button class="btn btn-ghost btn-sm" type="submit">${t("cart.apply")}</button></form>
      <div class="code-msg" id="codeMsg">${tot.codePct ? `<span class="ok">${t("cart.codeOk", { code: Cart.code, pct: tot.codePct })}</span>` : ""}</div>
      <div class="sum-row"><span>${t("cart.subtotal")}</span><span>${money(tot.subtotal)}</span></div>
      ${tot.discount ? `<div class="sum-row"><span>${t("cart.discount", { code: Cart.code })}</span><span class="disc">−${money(tot.discount)}</span></div>` : ""}
      <div class="sum-row"><span>${t("cart.shipping")}</span><span>${tot.shipping ? money(tot.shipping) : t("cart.free")}</span></div>
      <div class="sum-row total"><span>${t("cart.total")}</span><span>${money(tot.total)}</span></div>
      <a href="checkout.html" class="btn btn-primary btn-block">${icon("lock")} ${t("cart.checkout")}</a>
      <div class="note">${icon("shield")} ${t("cart.note", { amount: money(tot.saved) })}</div>` : "";

    document.dispatchEvent(new CustomEvent("cart:change", { detail: tot }));
  }

  /* ---------- Drawer / menu / toast ---------- */
  function openCart() {
    $("#cartDrawer").classList.add("open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    $(".overlay").classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    $("#cartDrawer").classList.remove("open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    $(".overlay").classList.remove("show");
    document.body.style.overflow = "";
  }
  function toggleLang(open) {
    const box = $("#langSwitch");
    if (!box) return;
    const willOpen = open ?? !box.classList.contains("open");
    box.classList.toggle("open", willOpen);
    $("[data-lang-toggle]", box).setAttribute("aria-expanded", willOpen);
  }
  let toastTimer;
  function toast(html) {
    const el = $("#toast");
    el.innerHTML = html;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }
  function addToCart(id, variant, qty = 1, { open = true } = {}) {
    Cart.add(id, variant, qty);
    const p = byId(id);
    const name = p ? p.name : window.BUNDLE.name;
    const img = p ? p.image : window.BUNDLE.image;
    $$(".cart-count").forEach((el) => { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); });
    if (open) openCart();
    else toast(`<img src="${img}" alt=""><span><b>${name}</b><br>${t("cart.added")}</span><span class="ok">${icon("check")}</span>`);
  }

  function bindGlobal() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#langSwitch")) toggleLang(false);
      const anchor = e.target.closest('a[href^="#"]');
      const dest = anchor && anchor.getAttribute("href").length > 1 && document.getElementById(anchor.getAttribute("href").slice(1));
      if (dest) {
        e.preventDefault();
        dest.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        return;
      }
      const el = e.target.closest("[data-open-cart],[data-close-cart],[data-add],[data-qty],[data-remove],[data-open-menu],[data-close-menu],[data-lang-toggle],[data-lang],.faq-q");
      if (!el) return;
      if (el.matches("[data-lang-toggle]")) { toggleLang(); }
      else if (el.matches("[data-lang]")) { if (el.dataset.lang !== LANG) setLang(el.dataset.lang); else toggleLang(false); }
      else if (el.matches("[data-open-cart]")) { e.preventDefault(); openCart(); }
      else if (el.matches("[data-close-cart]")) { closeCart(); }
      else if (el.matches("[data-add]")) { e.preventDefault(); addToCart(el.dataset.add, el.dataset.variant || "", 1); }
      else if (el.matches("[data-qty]")) { const it = Cart.items.find((i) => i.key === el.dataset.qty); if (it) Cart.setQty(it.key, it.qty + Number(el.dataset.d)); }
      else if (el.matches("[data-remove]")) { Cart.remove(el.dataset.remove); }
      else if (el.matches("[data-open-menu]")) { $("#mobileMenu").classList.add("open"); }
      else if (el.matches("[data-close-menu]")) { $("#mobileMenu").classList.remove("open"); }
      else if (el.matches(".faq-q")) {
        const item = el.closest(".faq-item");
        item.classList.toggle("open");
        el.setAttribute("aria-expanded", item.classList.contains("open"));
      }
    });
    $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => $("#mobileMenu").classList.remove("open")));
    document.addEventListener("submit", (e) => {
      if (e.target.id !== "codeForm") return;
      e.preventDefault();
      const code = e.target.code.value.trim().toUpperCase();
      if (S.discountCodes[code]) { Cart.code = code; Cart.save(); }
      else { Cart.code = null; Cart.save(); $("#codeMsg").innerHTML = `<span class="err">${t("cart.codeErr")}</span>`; }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeCart();
      toggleLang(false);
      $("#mobileMenu")?.classList.remove("open");
    });

    const header = $(".header");
    if (header) {
      const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---------- Barra annunci: rotazione + countdown ---------- */
  function announceBar() {
    const rot = $(".announce-rotator");
    if (rot) {
      const spans = $$("span", rot).filter((s) => s.parentElement === rot);
      let i = 0;
      setInterval(() => {
        i = (i + 1) % spans.length;
        spans.forEach((s) => (s.style.transform = `translateY(-${i * 100}%)`));
      }, 3800);
    }
    const end = new Date(S.promoEnds).getTime();
    const wrap = $("[data-countdown]");
    if (!wrap || !(end > Date.now())) return;
    wrap.hidden = false;
    const cd = $(".countdown", wrap);
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      if (!s) { wrap.hidden = true; return; }
      const d = Math.floor(s / 86400); s %= 86400;
      const h = Math.floor(s / 3600); s %= 3600;
      const m = Math.floor(s / 60); s %= 60;
      cd.innerHTML = `<b>${d}${t("time.d")}</b><i>:</i><b>${pad(h)}</b><i>:</i><b>${pad(m)}</b><i>:</i><b>${pad(s)}</b>`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Animazioni allo scroll ---------- */
  function reveal() {
    const els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));
  }
  function counters() {
    const els = $$("[data-count]");
    const show = (el, v) => {
      const dec = (el.dataset.count.split(".")[1] || "").length;
      el.textContent = num(v, dec) + (el.dataset.suffix || "");
    };
    els.forEach((el) => show(el, parseFloat(el.dataset.count)));
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; io.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const t0 = performance.now();
        const step = (now) => {
          const k = Math.min(1, (now - t0) / 1600);
          show(el, target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Componenti condivisi ---------- */
  function productCard(p, i = 0) {
    return `
      <article class="card reveal reveal-d${i % 3 + 1}">
        <div class="card-media">
          <div class="badges"><span class="badge badge-hot">${off(pct(p.price, p.compareAt))}</span><span class="badge">${p.badge}</span></div>
          <a href="${productUrl(p)}" aria-label="${p.name}"><img src="${p.image}" alt="${p.name} — ${p.subtitle}" class="${fitClass(p)}" loading="lazy"></a>
          <div class="card-quick">${p.variants.length === 1
            ? `<button class="btn btn-dark btn-block btn-sm" data-add="${p.id}" data-variant="${p.variants[0].id}">${icon("cart")} ${t("card.quick")}</button>`
            : `<a class="btn btn-dark btn-block btn-sm" href="${productUrl(p)}">${p.chooseCta} ${icon("arrow")}</a>`}</div>
        </div>
        <div class="card-body">
          <div class="rating" title="${t("card.reviews", { n: num(p.reviewsCount) })}">${stars(p.rating)} <span><b>${num(p.rating, 1)}</b> (${num(p.reviewsCount)})</span></div>
          <h3><a href="${productUrl(p)}">${p.name}</a></h3>
          <p class="card-sub">${p.subtitle}</p>
          <div class="price-row"><span class="price-now">${money(p.price)}</span><span class="price-old" title="${t("pdp.rrp", { amount: money(p.compareAt) })}">${money(p.compareAt)}</span><span class="price-save">${t("card.save", { amount: money(p.compareAt - p.price) })}</span></div>
          <div class="card-actions"><a href="${productUrl(p)}" class="btn btn-primary btn-sm">${t("card.cta")} ${icon("arrow")}</a></div>
        </div>
      </article>`;
  }
  function reviewCard(r) {
    const p = byId(r.product);
    const initials = r.name.split(" ").map((x) => x[0]).join("").slice(0, 2);
    return `<article class="review reveal">
      <div class="review-head"><div class="review-avatar">${initials}</div><div><b>${r.name}</b><small>${r.city}</small></div></div>
      ${stars(r.rating)} ${S.reviewsAreSamples
        ? `<span class="verified" style="color:var(--muted)">${t("review.sample")}</span>`
        : `<span class="verified">${icon("check")} ${t("review.verified")}</span>`}
      <h4>${r.title}</h4><p>${r.text}</p>
      ${p ? `<a class="review-product" href="${productUrl(p)}"><img src="${p.image}" alt="" class="${fitClass(p)}">${p.name}</a>` : ""}
    </article>`;
  }
  function faqItem(f, open = false) {
    return `<div class="faq-item ${open ? "open" : ""}"><button class="faq-q" aria-expanded="${open}">${f.q}<span class="plus"></span></button><div class="faq-a"><div><p>${f.a}</p></div></div></div>`;
  }

  /* ---------- Avvio ---------- */
  window.Tepore = {
    LANG, LOCALE, COLON, off, LOGO, Cart, langSwitcher, t, fill, money, num, date, icon, stars, byId, bySlug, pct, productUrl, fitClass,
    productCard, reviewCard, faqItem, addToCart, openCart, TIERS, tierOff, paymentsHtml, reveal, counters, DEF, $, $$,
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyStatic();
    buildChrome();
    bindGlobal();
    announceBar();
    render();
    document.dispatchEvent(new Event("tepore:ready"));
    reveal();
    counters();
    // I contenuti sono inseriti via JS: riporta la pagina all'ancora richiesta (#resi, #kit...)
    const target = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  });
})();
