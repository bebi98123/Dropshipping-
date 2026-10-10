/* ==========================================================================
   TEPORE — logica comune: layout, carrello, animazioni
   ========================================================================== */
(function () {
  const S = window.STORE;
  const P = window.PRODUCTS;

  /* ---------- Utility ---------- */
  const fmt = new Intl.NumberFormat("it-IT", { style: "currency", currency: S.currency });
  const money = (n) => fmt.format(Math.round(n * 100) / 100);
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

  /* ---------- Icone (SVG inline) ---------- */
  const ICONS = {
    cart: '<path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
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
    leaf: '<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15Z"/><path d="M5 19 13 11"/>',
    bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/>',
    support: '<path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.5-2 2.5-5 2.5"/>',
    box: '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
    home: '<path d="M4 11 12 4l8 7v9H4v-9Z"/><path d="M10 20v-5h4v5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    tag: '<path d="M3.5 12.5V4h8.5l8.5 8.5-8 8-9-8Z"/><circle cx="8" cy="8.5" r="1.4"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  };
  const icon = (name, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const stars = (r = 5) => {
    let s = "";
    for (let i = 1; i <= 5; i++) s += `<svg class="icon" viewBox="0 0 24 24" style="opacity:${i <= Math.round(r) ? 1 : 0.25}" aria-hidden="true">${ICONS.star}</svg>`;
    return `<span class="stars" aria-label="${r} su 5">${s}</span>`;
  };
  const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#e8452c"/><stop offset=".55" stop-color="#ff7a30"/><stop offset="1" stop-color="#ffcf86"/></linearGradient></defs>
      <circle cx="20" cy="20" r="19" fill="url(#lg)"/>
      <path d="M14 27c0-5 3-6 3-10M20 27c0-5 3-6 3-10M26 27c0-5 3-6 3-10" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" transform="translate(-2 -1)"/>
    </svg>`;

  /* ---------- Prezzi e carrello ---------- */
  // Sconto quantità sullo stesso prodotto (mostrato anche nella pagina prodotto)
  const TIERS = [
    { qty: 1, off: 0, label: "1 pezzo", note: "Prezzo standard" },
    { qty: 2, off: 10, label: "2 pezzi", note: "Uno per te, uno da regalare", tag: "Più scelto" },
    { qty: 3, off: 15, label: "3 pezzi", note: "Per tutta la famiglia", tag: "Miglior prezzo" },
  ];
  const tierOff = (qty) => [...TIERS].reverse().find((t) => qty >= t.qty).off;

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
          const full = B.items.reduce((a, id) => a + byId(id).price, 0);
          return { ...i, name: B.name, image: B.image, fit: "", variantLabel: i.variant ? `${B.subtitle} · ${i.variant}` : B.subtitle, unit: B.price, total: B.price * i.qty, compare: full * i.qty };
        }
        const p = byId(i.id);
        if (!p) return null;
        const v = p.variants.find((x) => x.id === i.variant);
        const off = tierOff(i.qty);
        const total = p.price * i.qty * (1 - off / 100);
        return { ...i, p, name: p.name, image: p.image, fit: fitClass(p), variantLabel: v ? `${p.variantLabel}: ${v.label}` : "", unit: p.price, total, compare: p.compareAt * i.qty, off };
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
  function buildChrome() {
    const msgs = [
      `${icon("truck")} <strong>Spedizione gratuita</strong> sopra ${money(S.freeShippingThreshold)}`,
      `${icon("return")} <strong>${S.returnDays} giorni</strong> per il reso, senza domande`,
      `${icon("tag")} Codice <strong>TEPORE10</strong>: -10% sul primo ordine`,
    ];
    const announce = `
      <div class="announce"><div class="container">
        <div class="announce-rotator" aria-live="polite">${msgs.map((m) => `<span>${m}</span>`).join("")}</div>
        <div class="countdown-wrap" data-countdown hidden>· ${S.promoLabel} finiscono tra <span class="countdown"></span></div>
      </div></div>`;
    const header = `
      <header class="header"><div class="container">
        <a href="index.html" class="logo" aria-label="Tepore home">${LOGO}<span>tepore</span></a>
        <nav class="nav" aria-label="Principale">
          <a href="index.html#prodotti">Prodotti</a>
          <a href="index.html#kit">Kit Inverno</a>
          <a href="index.html#recensioni">Recensioni</a>
          <a href="index.html#faq">FAQ</a>
          <a href="info.html#contatti">Contatti</a>
        </nav>
        <div class="header-actions">
          <button class="icon-btn" data-open-cart aria-label="Apri carrello">${icon("cart")}<span class="cart-count">0</span></button>
          <button class="icon-btn menu-toggle" data-open-menu aria-label="Menu">${icon("menu")}</button>
        </div>
      </div></header>
      <div class="mobile-menu" id="mobileMenu">
        <div class="mm-top"><a href="index.html" class="logo">${LOGO}<span>tepore</span></a><button class="icon-btn" data-close-menu aria-label="Chiudi menu">${icon("close")}</button></div>
        ${P.map((p) => `<a class="mm-link" href="${productUrl(p)}">${p.name}</a>`).join("")}
        <a class="mm-link" href="index.html#kit">Kit Inverno</a>
        <a class="mm-link" href="info.html">Assistenza</a>
        <div class="mm-foot">${S.email} · Spedizione ${S.shippingDays}</div>
      </div>`;
    const footer = `
      <footer class="footer"><div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="logo">${LOGO}<span>tepore</span></a>
            <p>Piccoli oggetti che scaldano le giornate fredde. Selezionati, testati e spediti con cura in tutta Italia.</p>
          </div>
          <div><h4>Shop</h4><ul>${P.map((p) => `<li><a href="${productUrl(p)}">${p.name}</a></li>`).join("")}<li><a href="index.html#kit">Kit Inverno</a></li></ul></div>
          <div><h4>Assistenza</h4><ul>
            <li><a href="info.html#spedizioni">Spedizioni</a></li>
            <li><a href="info.html#resi">Resi e rimborsi</a></li>
            <li><a href="index.html#faq">Domande frequenti</a></li>
            <li><a href="info.html#contatti">Contatti</a></li>
          </ul></div>
          <div><h4>Legale</h4><ul>
            <li><a href="info.html#termini">Termini di vendita</a></li>
            <li><a href="info.html#privacy">Privacy e cookie</a></li>
            <li><a href="info.html#garanzia">Garanzia</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Tepore · Tutti i diritti riservati</span>
          ${paymentsHtml()}
        </div>
      </div></footer>`;
    const drawer = `
      <div class="overlay" data-close-cart></div>
      <aside class="drawer" id="cartDrawer" aria-label="Carrello" aria-hidden="true">
        <div class="drawer-head"><h3>Il tuo carrello</h3><button class="icon-btn" data-close-cart aria-label="Chiudi carrello">${icon("close")}</button></div>
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
    return `<div class="payments" aria-label="Metodi di pagamento">
      <span class="pay visa">VISA</span><span class="pay mc"><span><i></i><i></i></span></span>
      <span class="pay pp">Pay<em>Pal</em></span><span class="pay apple">Apple Pay</span><span class="pay klarna">Klarna.</span>
    </div>`;
  }

  /* ---------- Rendering carrello ---------- */
  function render() {
    const t = Cart.totals();
    const count = Cart.count();
    $$(".cart-count").forEach((el) => { el.textContent = count; el.classList.toggle("has", count > 0); });

    const prog = $("#shipProgress");
    if (!prog) return;
    const left = S.freeShippingThreshold - t.subtotal;
    prog.innerHTML = t.lines.length
      ? (left > 0
        ? `Ti mancano <b>${money(left)}</b> per la <b>spedizione gratuita</b>`
        : `🎉 Hai sbloccato la <b>spedizione gratuita</b>!`) +
        `<div class="bar"><span style="width:${Math.min(100, (t.subtotal / S.freeShippingThreshold) * 100)}%"></span></div>`
      : `Spedizione gratuita sopra <b>${money(S.freeShippingThreshold)}</b>`;

    $("#drawerItems").innerHTML = t.lines.length
      ? t.lines.map((l) => `
        <div class="line">
          <img src="${l.image}" alt="${l.name}" class="${l.fit}">
          <div>
            <b>${l.name}</b>
            <small>${l.variantLabel}</small>
            ${l.off ? `<small style="color:var(--green);font-weight:600">Sconto quantità -${l.off}%</small>` : ""}
            <div style="display:flex;align-items:center">
              <div class="qty">
                <button data-qty="${l.key}" data-d="-1" aria-label="Diminuisci">−</button><span>${l.qty}</span><button data-qty="${l.key}" data-d="1" aria-label="Aumenta">+</button>
              </div>
              <button class="line-remove" data-remove="${l.key}">Rimuovi</button>
            </div>
          </div>
          <div class="line-price">${money(l.total)}<s>${money(l.compare)}</s></div>
        </div>`).join("")
      : `<div class="drawer-empty">${icon("cart")}<p>Il carrello è vuoto.<br>Qualcosa di caldo ti aspetta.</p><br><a href="index.html#prodotti" class="btn btn-dark btn-sm" data-close-cart>Scopri i prodotti</a></div>`;

    // Upsell: primo prodotto non ancora nel carrello
    const inCart = new Set(Cart.items.map((i) => i.id));
    const up = inCart.has(window.BUNDLE.id) ? null : P.find((p) => !inCart.has(p.id));
    $("#upsell").style.display = t.lines.length && up ? "" : "none";
    if (up) {
      $("#upsell").innerHTML = `<h5>Completa il tuo rituale</h5>
        <div class="upsell-item"><img src="${up.image}" alt="" class="${fitClass(up)}">
        <div><b>${up.name}</b><small>${money(up.price)}</small></div>
        <button class="btn btn-dark btn-sm" data-add="${up.id}" data-variant="${up.variants[0].id}">Aggiungi</button></div>`;
    }

    $("#drawerFoot").innerHTML = t.lines.length ? `
      <form class="code-form" id="codeForm"><input name="code" placeholder="Codice sconto" value="${Cart.code || ""}" aria-label="Codice sconto"><button class="btn btn-ghost btn-sm" type="submit">Applica</button></form>
      <div class="code-msg" id="codeMsg">${t.codePct ? `<span class="ok">Codice ${Cart.code} applicato: -${t.codePct}%</span>` : ""}</div>
      <div class="sum-row"><span>Subtotale</span><span>${money(t.subtotal)}</span></div>
      ${t.discount ? `<div class="sum-row"><span>Sconto (${Cart.code})</span><span class="disc">−${money(t.discount)}</span></div>` : ""}
      <div class="sum-row"><span>Spedizione</span><span>${t.shipping ? money(t.shipping) : "Gratuita"}</span></div>
      <div class="sum-row total"><span>Totale</span><span>${money(t.total)}</span></div>
      <a href="checkout.html" class="btn btn-primary btn-block">${icon("lock")} Procedi al checkout</a>
      <div class="note">${icon("shield")} Pagamento sicuro · Risparmi ${money(t.saved)}</div>` : "";

    document.dispatchEvent(new CustomEvent("cart:change", { detail: t }));
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
    else toast(`<img src="${img}" alt=""><span><b>${name}</b><br>aggiunto al carrello</span><span class="ok">${icon("check")}</span>`);
  }

  function bindGlobal() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-open-cart],[data-close-cart],[data-add],[data-qty],[data-remove],[data-open-menu],[data-close-menu],.faq-q");
      if (!t) return;
      if (t.matches("[data-open-cart]")) { e.preventDefault(); openCart(); }
      else if (t.matches("[data-close-cart]")) { closeCart(); }
      else if (t.matches("[data-add]")) { e.preventDefault(); addToCart(t.dataset.add, t.dataset.variant || "", 1); }
      else if (t.matches("[data-qty]")) { const it = Cart.items.find((i) => i.key === t.dataset.qty); if (it) Cart.setQty(it.key, it.qty + Number(t.dataset.d)); }
      else if (t.matches("[data-remove]")) { Cart.remove(t.dataset.remove); }
      else if (t.matches("[data-open-menu]")) { $("#mobileMenu").classList.add("open"); }
      else if (t.matches("[data-close-menu]")) { $("#mobileMenu").classList.remove("open"); }
      else if (t.matches(".faq-q")) {
        const item = t.closest(".faq-item");
        item.classList.toggle("open");
        t.setAttribute("aria-expanded", item.classList.contains("open"));
      }
    });
    $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => $("#mobileMenu").classList.remove("open")));
    document.addEventListener("submit", (e) => {
      if (e.target.id !== "codeForm") return;
      e.preventDefault();
      const code = e.target.code.value.trim().toUpperCase();
      if (S.discountCodes[code]) { Cart.code = code; Cart.save(); }
      else { Cart.code = null; Cart.save(); $("#codeMsg").innerHTML = `<span class="err">Codice non valido</span>`; }
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); $("#mobileMenu")?.classList.remove("open"); } });

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
      cd.innerHTML = `<b>${d}g</b><i>:</i><b>${pad(h)}</b><i>:</i><b>${pad(m)}</b><i>:</i><b>${pad(s)}</b>`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Animazioni allo scroll ---------- */
  function reveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));
  }
  function counters() {
    const els = $$("[data-count]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; io.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const dec = (el.dataset.count.split(".")[1] || "").length;
        const suffix = el.dataset.suffix || "";
        const t0 = performance.now();
        const step = (now) => {
          const k = Math.min(1, (now - t0) / 1600);
          const v = target * (1 - Math.pow(1 - k, 3));
          el.textContent = v.toLocaleString("it-IT", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
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
          <div class="badges"><span class="badge badge-hot">-${pct(p.price, p.compareAt)}%</span><span class="badge">${p.badge}</span></div>
          <a href="${productUrl(p)}" aria-label="${p.name}"><img src="${p.image}" alt="${p.name} — ${p.subtitle}" class="${fitClass(p)}" loading="lazy"></a>
          <div class="card-quick">${p.variants.length === 1
            ? `<button class="btn btn-dark btn-block btn-sm" data-add="${p.id}" data-variant="${p.variants[0].id}">${icon("cart")} Aggiunta rapida</button>`
            : `<a class="btn btn-dark btn-block btn-sm" href="${productUrl(p)}">Scegli la ${p.variantLabel.toLowerCase()} ${icon("arrow")}</a>`}</div>
        </div>
        <div class="card-body">
          <div class="rating">${stars(p.rating)} <span>${p.rating} · ${p.reviewsCount.toLocaleString("it-IT")} recensioni</span></div>
          <h3><a href="${productUrl(p)}">${p.name}</a></h3>
          <p class="card-sub">${p.subtitle}</p>
          <div class="price-row"><span class="price-now">${money(p.price)}</span><span class="price-old">${money(p.compareAt)}</span><span class="price-save">Risparmi ${money(p.compareAt - p.price)}</span></div>
          <div class="card-actions"><a href="${productUrl(p)}" class="btn btn-primary btn-sm">Scopri e acquista ${icon("arrow")}</a></div>
        </div>
      </article>`;
  }
  function reviewCard(r) {
    const p = byId(r.product);
    const initials = r.name.split(" ").map((x) => x[0]).join("").slice(0, 2);
    return `<article class="review reveal">
      <div class="review-head"><div class="review-avatar">${initials}</div><div><b>${r.name}</b><small>${r.city}</small></div></div>
      ${stars(r.rating)} <span class="verified">${icon("check")} Acquisto verificato</span>
      <h4>${r.title}</h4><p>${r.text}</p>
      ${p ? `<a class="review-product" href="${productUrl(p)}"><img src="${p.image}" alt="" class="${fitClass(p)}">${p.name}</a>` : ""}
    </article>`;
  }
  function faqItem(f, open = false) {
    return `<div class="faq-item ${open ? "open" : ""}"><button class="faq-q" aria-expanded="${open}">${f.q}<span class="plus"></span></button><div class="faq-a"><div><p>${f.a}</p></div></div></div>`;
  }

  /* ---------- Avvio ---------- */
  window.Tepore = { LOGO, Cart, money, icon, stars, byId, bySlug, pct, productUrl, fitClass, productCard, reviewCard, faqItem, addToCart, openCart, TIERS, tierOff, paymentsHtml, reveal, counters, $, $$ };

  document.addEventListener("DOMContentLoaded", () => {
    buildChrome();
    bindGlobal();
    announceBar();
    render();
    document.dispatchEvent(new Event("tepore:ready"));
    reveal();
    counters();
  });
})();
