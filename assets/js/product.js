/* TEPORE — pagina prodotto */
document.addEventListener("tepore:ready", () => {
  const T = window.Tepore;
  const { $, $$, t, money, num, icon, stars, fitClass, pct, TIERS } = T;
  const S = window.STORE;

  // Il prodotto arriva da ?p=slug oppure da #slug
  const slug = new URLSearchParams(location.search).get("p") || location.hash.slice(1);
  window.addEventListener("hashchange", () => {
    const next = T.bySlug(location.hash.slice(1));
    if (next && next.slug !== slug) location.reload();
  });
  const p = T.bySlug(slug) || window.PRODUCTS[0];
  const fit = fitClass(p);
  document.title = t("meta.productTitle", { name: p.name, subtitle: p.subtitle });
  $('meta[name="description"]').setAttribute("content", `${p.name}${T.COLON} ${p.short}`);
  $("#bcName").textContent = p.name;

  const state = { variant: p.variants.length === 1 ? p.variants[0].id : null, tier: 1 };

  /* ---------- Galleria ---------- */
  const maxT = p.tempRange[1];
  const slides = [
    { thumb: `<img src="${p.image}" alt="" class="${fit}">`, html: `<img src="${p.image}" alt="${p.name} — ${p.subtitle}" class="${fit} zoomable">` },
    {
      thumb: `<div class="g-slide g-slide-dark"><span class="g-mini">${maxT}°C</span></div>`,
      html: `<div class="g-slide g-slide-dark"><div><div class="g-big">${p.tempRange[0]}–${maxT}<span style="font-size:.45em">°C</span></div><div class="g-cap">${p.highlights[1].title}</div></div></div>`,
    },
    {
      thumb: `<div class="g-slide g-slide-heat">${icon("flame")}</div>`,
      html: `<div class="g-slide g-slide-heat"><ul>${p.highlights.map((h) => `<li>${icon("check")} ${h.title}</li>`).join("")}</ul></div>`,
    },
    {
      thumb: `<div class="g-slide" style="background:var(--sand)">${icon("box")}</div>`,
      html: `<div class="g-slide" style="background:var(--sand)"><div><div class="g-cap" style="margin-bottom:18px;color:var(--ink)">${t("pdp.inBox")}</div><ul>${p.inBox.map((x) => `<li>${icon("check")} ${x}</li>`).join("")}</ul></div></div>`,
    },
  ];
  $("#galleryMain").innerHTML = slides.map((s, i) => `<div class="${i ? "" : "active"}">${s.html}</div>`).join("");
  $("#galleryThumbs").innerHTML = slides.map((s, i) => `<button class="${i ? "" : "active"}" data-slide="${i}" aria-label="${t("a11y.image", { n: i + 1 })}">${s.thumb}</button>`).join("");
  const show = (i) => {
    $$("#galleryMain > div").forEach((d, k) => d.classList.toggle("active", k === i));
    $$("#galleryThumbs button").forEach((d, k) => d.classList.toggle("active", k === i));
  };
  $("#galleryThumbs").addEventListener("click", (e) => { const b = e.target.closest("[data-slide]"); if (b) show(Number(b.dataset.slide)); });
  // Zoom al passaggio del mouse sulla foto principale
  const zoomImg = $("#galleryMain .zoomable");
  if (zoomImg && matchMedia("(hover: hover)").matches) {
    const box = zoomImg.parentElement;
    box.addEventListener("mousemove", (e) => {
      const r = box.getBoundingClientRect();
      zoomImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      zoomImg.style.transform = "scale(1.7)";
    });
    box.addEventListener("mouseleave", () => { zoomImg.style.transform = ""; });
  }
  // Swipe su mobile e tablet
  let x0 = null;
  $("#galleryMain").addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  $("#galleryMain").addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const cur = $$("#galleryThumbs button").findIndex((b) => b.classList.contains("active"));
    if (Math.abs(dx) > 40) show((cur + (dx < 0 ? 1 : -1) + slides.length) % slides.length);
    x0 = null;
  });

  /* ---------- Info e acquisto ---------- */
  const addBusinessDays = (d, n) => { const r = new Date(d); while (n > 0) { r.setDate(r.getDate() + 1); if (r.getDay() % 6) n--; } return r; };
  const today = new Date();
  const shipDate = addBusinessDays(today, 1);
  const from = addBusinessDays(today, S.shippingDaysMin), to = addBusinessDays(today, S.shippingDaysMax);
  const tierPrice = (x) => p.price * x.qty * (1 - x.off / 100);

  $("#pdpInfo").innerHTML = `
    <div class="badges" style="position:static"><span class="badge badge-hot">${T.off(pct(p.price, p.compareAt))}</span><span class="badge badge-dark">${p.badge}</span></div>
    <h1>${p.name}</h1>
    <p class="pdp-sub">${p.subtitle}</p>
    <div class="pdp-rating">${stars(p.rating)} <b>${num(p.rating, 1)}</b> <a href="#recensioni">${t("card.reviews", { n: num(p.reviewsCount) })}</a></div>
    <div class="pdp-price"><span class="price-now">${money(p.price)}</span><span class="price-old">${money(p.compareAt)}</span><span class="price-save">${t("card.save", { amount: money(p.compareAt - p.price) })}</span></div>
    <p class="omnibus">${t("pdp.vat")} · ${t("pdp.lowest", { amount: money(p.lowest30) })}</p>
    <p class="pdp-short">${p.short}</p>
    <ul class="pdp-bullets">${p.highlights.map((h) => `<li>${icon("check")} <span><b>${h.title}</b> — ${h.text}</span></li>`).join("")}</ul>

    <div class="opt-label">${p.variantLabel} <span id="variantName">${state.variant ? p.variants[0].label : t("pdp.select")}</span></div>
    <div class="variants" id="variants">${p.variants.map((v) => `<button class="variant ${state.variant === v.id ? "active" : ""}" data-v="${v.id}">${v.swatch ? `<i style="background:${v.swatch}"></i>` : ""}${v.label}</button>`).join("")}</div>

    <div class="opt-label">${t("pdp.offer")}</div>
    <div class="offers" id="offers">${TIERS.map((x) => `
      <button class="offer ${x.qty === state.tier ? "active" : ""}" data-tier="${x.qty}">
        ${x.tag ? `<span class="o-tag ${x.qty === 3 ? "dark" : ""}">${x.tag}</span>` : ""}
        <span class="radio"></span>
        <span><b>${x.label}${x.off ? ` · ${T.off(x.off)}` : ""}</b><small>${x.note}</small></span>
        <span class="o-price">${money(tierPrice(x))}<s>${money(p.compareAt * x.qty)}</s></span>
      </button>`).join("")}</div>

    <div class="stock"><span class="dot"></span> <span>${t("pdp.stock", { date: T.date(shipDate) })}</span></div>
    <div class="buy-row">
      <button class="btn btn-primary" id="addBtn">${icon("cart")} <span></span></button>
    </div>
    <button class="btn btn-dark btn-block buy-alt" id="buyNow">${t("pdp.buyNow")}</button>
    <div style="display:flex;justify-content:center;margin-top:14px">${T.paymentsHtml()}</div>

    <div class="delivery-box">
      <div class="delivery-steps">
        <div><div class="ds-ic">${icon("cart")}</div><b>${t("pdp.today")}</b>${t("pdp.ordered")}</div>
        <div><div class="ds-ic">${icon("box")}</div><b>${T.date(shipDate)}</b>${t("pdp.shipped")}</div>
        <div><div class="ds-ic">${icon("home")}</div><b>${T.date(from)} – ${T.date(to)}</b>${t("pdp.delivered")}</div>
      </div>
      <div>${icon("truck")}<span>${t("pdp.dFree")}</span></div>
      <div>${icon("return")}<span>${t("pdp.dReturn")}</span></div>
      <div>${icon("shield")}<span>${t("pdp.dWarranty")}</span></div>
    </div>

    <div class="accordion">
      ${acc(t("pdp.accDesc"), `<p>${p.description}</p>`, true)}
      ${acc(t("pdp.accSpecs"), `<table class="spec-table">${p.specs.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>`)}
      ${acc(t("pdp.accBox"), `<ul class="inbox">${p.inBox.map((x) => `<li>${x}</li>`).join("")}</ul>`)}
      ${acc(t("pdp.accShip"), `<p>${t("pdp.accShipText")}</p>`)}
    </div>`;

  function acc(title, body, open = false) {
    return `<div class="faq-item ${open ? "open" : ""}"><button class="faq-q" aria-expanded="${open}">${title}<span class="plus"></span></button><div class="faq-a"><div>${body}</div></div></div>`;
  }

  const updatePrice = () => {
    const x = TIERS.find((y) => y.qty === state.tier);
    $("#addBtn span").textContent = t("pdp.add", { amount: money(tierPrice(x)) });
    $("#stickyPrice").innerHTML = `${money(tierPrice(x))}<s>${money(p.compareAt * x.qty)}</s>`;
  };
  $("#variants").addEventListener("click", (e) => {
    const b = e.target.closest("[data-v]");
    if (!b) return;
    state.variant = b.dataset.v;
    $$("#variants .variant").forEach((x) => x.classList.toggle("active", x === b));
    $("#variantName").textContent = p.variants.find((v) => v.id === state.variant).label;
  });
  $("#offers").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tier]");
    if (!b) return;
    state.tier = Number(b.dataset.tier);
    $$("#offers .offer").forEach((x) => x.classList.toggle("active", x === b));
    updatePrice();
  });
  const requireVariant = () => {
    if (state.variant) return true;
    const el = $("#variants");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }], { duration: 350 });
    $("#variantName").innerHTML = `<span style="color:#c0392b;font-weight:600">${p.chooseCta}</span>`;
    return false;
  };
  const add = (open) => { if (requireVariant()) T.addToCart(p.id, state.variant, state.tier, { open }); };
  $("#addBtn").addEventListener("click", () => add(true));
  $("#buyNow").addEventListener("click", () => { if (requireVariant()) { T.addToCart(p.id, state.variant, state.tier, { open: false }); location.href = "checkout.html"; } });

  /* ---------- Sticky add-to-cart ---------- */
  $("#stickyAtc").innerHTML = `<div class="inner">
    <img src="${p.image}" alt="" class="${fit}">
    <div class="meta"><b>${p.name}</b><span id="stickyPrice"></span></div>
    <button class="btn btn-primary btn-sm" id="stickyAdd">${t("pdp.addShort")}</button></div>`;
  $("#stickyAdd").addEventListener("click", () => add(true));
  updatePrice();
  const io = new IntersectionObserver(([en]) => $("#stickyAtc").classList.toggle("show", !en.isIntersecting && en.boundingClientRect.top < 0));
  io.observe($("#addBtn"));

  /* ---------- Sezioni sotto ---------- */
  $("#highlights").innerHTML = p.highlights.map((h, i) => `<div class="benefit reveal reveal-d${i % 3 + 1}"><div class="benefit-icon">${icon(h.icon)}</div><h3>${h.title}</h3><p>${h.text}</p></div>`).join("");

  $("#story").innerHTML = `
    <div class="story-img reveal"><img src="${p.image}" alt="${p.name}" class="${fit}" loading="lazy"></div>
    <div class="reveal reveal-d1">
      <div class="ritual-time">${p.tempRange[0]}–${p.tempRange[1]}°</div>
      <span class="eyebrow">${t("pdp.storyEyebrow")}</span>
      <h2>${p.storyTitle}</h2>
      <p>${p.description}</p>
      <div style="margin-top:30px;display:flex;gap:12px;flex-wrap:wrap">
        <a href="#pdpRoot" class="btn btn-primary">${t("pdp.want")} ${icon("arrow")}</a>
        <a href="index.html#kit" class="btn btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.3)">${t("pdp.seeKit")}</a>
      </div>
    </div>`;

  const revs = [...window.REVIEWS].sort((a, b) => (b.product === p.id) - (a.product === p.id));
  $("#pdpReviews").innerHTML = revs.map(T.reviewCard).join("");
  $("#pdpReviewSum").innerHTML = `<span class="big">${num(p.rating, 1)}</span><div>${stars(p.rating)}<div style="color:var(--muted);font-size:14px">${t("card.reviews", { n: num(p.reviewsCount) })}</div></div>`;
  $("#sampleNote").hidden = !S.reviewsAreSamples;

  $("#crossSell").innerHTML = window.PRODUCTS.filter((x) => x.id !== p.id).map(T.productCard).join("");
  $("#faqList").innerHTML = window.FAQS.slice(0, 5).map((f, i) => T.faqItem(f, i === 0)).join("");
});
