/* TEPORE — home page */
document.addEventListener("tepore:ready", () => {
  const T = window.Tepore;
  const { $, money, icon, stars, byId, productUrl, fitClass } = T;
  const P = window.PRODUCTS;
  const B = window.BUNDLE;
  const S = window.STORE;

  $("#heroStars").outerHTML = stars(5);
  $("#sumStars").outerHTML = stars(5);

  /* Marquee */
  const items = [
    ["truck", `Spedizione gratuita sopra ${money(S.freeShippingThreshold)}`],
    ["return", `Reso gratuito ${S.returnDays} giorni`],
    ["shield", `Garanzia ${S.warrantyYears} anni`],
    ["flame", "Caldo in 60 secondi"],
    ["lock", "Pagamenti sicuri"],
    ["gift", "Confezione regalo inclusa"],
  ];
  const row = items.map(([i, t]) => `<span class="marquee-item">${icon(i)} ${t}</span>`).join("");
  $("#marquee").innerHTML = row + row;

  /* Griglia prodotti */
  $("#productGrid").innerHTML = P.map((p, i) => T.productCard(p, i)).join("");

  /* Rituale */
  const ritual = [
    { time: "07:00", id: "tepore-mat", title: "Il primo passo è caldo", text: "Accendi Tepore Mat mentre ti svegli: in un minuto le piastrelle gelide diventano un ricordo." },
    { time: "07:15", id: "tepore-slippers", title: "Piedi al calduccio", text: "Infili le Tepore Slippers e scegli il livello. Calde fino a sera, anche in smart working." },
    { time: "09:00", id: "tepore-cup", title: "Il caffè resta caldo", text: "Appoggi la tazza su Tepore Cup e lei fa il resto. Ultimo sorso caldo come il primo." },
  ];
  $("#ritualGrid").innerHTML = ritual.map((r, i) => {
    const p = byId(r.id);
    return `<div class="ritual-step reveal reveal-d${i + 1}">
      <div class="ritual-time">${r.time}</div>
      <h3>${r.title}</h3><p>${r.text}</p>
      <div class="ritual-img"><img src="${p.image}" alt="${p.name}" class="${fitClass(p)}" loading="lazy"></div>
      <a href="${productUrl(p)}" class="link-arrow">Scopri ${p.name} ${icon("arrow")}</a>
    </div>`;
  }).join("");

  /* Termostato interattivo */
  const range = $("#tempRange");
  const labels = [[40, "Tiepido e rilassante"], [48, "Calore avvolgente"], [57, "Caldo intenso"], [66, "Bollente, come piace a te"]];
  const updateThermo = () => {
    const v = Number(range.value);
    $("#tempVal").textContent = v;
    $("#tempLabel").textContent = labels.find(([max]) => v < max)[1];
    $("#dial").style.setProperty("--t", (v - 35) / 30);
    $("#thermoMatch").innerHTML = P.map((p) => {
      const ok = v >= p.tempRange[0] && v <= p.tempRange[1];
      return `<li class="${ok ? "on" : ""}"><img src="${p.image}" alt="" class="${fitClass(p)}">
        <div><b>${p.name}</b><small>${p.tempRange[0]}–${p.tempRange[1]} °C</small></div>
        ${ok ? `<a class="tag" href="${productUrl(p)}">✓ Perfetto</a>` : ""}</li>`;
    }).join("");
  };
  range.addEventListener("input", updateThermo);
  updateThermo();

  /* Bundle */
  const bItems = B.items.map(byId);
  const full = bItems.reduce((a, p) => a + p.price, 0);
  $("#bundleList").innerHTML = bItems.map((p) => `<li><span>${p.name} — ${p.subtitle}</span><span>${money(p.price)}</span></li>`).join("");
  $("#bundlePrice").textContent = money(B.price);
  $("#bundleCompare").textContent = money(full);
  $("#bundleSave").textContent = `Risparmi ${money(full - B.price)}`;
  $("#bundlePct").textContent = `-${T.pct(B.price, full)}%`;
  const slippers = byId("tepore-slippers");
  let bundleSize = null;
  $("#bundleSizes").innerHTML = slippers.variants.map((v) => `<button class="variant" data-size="${v.id}">${v.label}</button>`).join("");
  $("#bundleSizes").addEventListener("click", (e) => {
    const b = e.target.closest("[data-size]");
    if (!b) return;
    bundleSize = b.dataset.size;
    $("#bundleSizes").querySelectorAll(".variant").forEach((x) => x.classList.toggle("active", x === b));
  });
  $("#bundleAdd").addEventListener("click", () => {
    if (!bundleSize) {
      $("#bundleSizes").animate([{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }], { duration: 350 });
      $("#bundleAdd").textContent = "Scegli prima la taglia ↑";
      setTimeout(() => ($("#bundleAdd").textContent = "Aggiungi il kit al carrello"), 1800);
      return;
    }
    const v = slippers.variants.find((x) => x.id === bundleSize);
    T.addToCart(B.id, `Taglia ${v.label}`, 1);
  });

  /* Benefici */
  const benefits = [
    ["shield", "Sicurezza certificata", "Marcatura CE, protezione da surriscaldamento e spegnimento automatico su tutti i prodotti."],
    ["bolt", "Consumi minimi", "Meno di 2 centesimi l'ora: il comfort costa meno di un caffè al mese."],
    ["support", "Assistenza in italiano", "Un team vero che risponde entro 24 ore, via email e chat."],
    ["return", `Reso ${S.returnDays} giorni`, "Non ti convince? Lo rimandi indietro e ti rimborsiamo."],
  ];
  $("#benefits").innerHTML = benefits.map(([i, t, d], k) => `<div class="benefit reveal reveal-d${k % 3 + 1}"><div class="benefit-icon">${icon(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join("");

  /* Confronto */
  const rows = [
    ["Spegnimento automatico di sicurezza", 1, 0],
    ["Temperatura regolabile con display", 1, 0],
    ["Materiali morbidi e lavabili", 1, 1],
    ["Assistenza in italiano entro 24h", 1, 0],
    [`Reso gratuito ${S.returnDays} giorni`, 1, 0],
    [`Garanzia ${S.warrantyYears} anni`, 1, 0],
    ["Tracking della spedizione", 1, 1],
  ];
  const mark = (ok) => ok ? `<span class="yes">${icon("check")}</span>` : `<span class="no">${icon("x")}</span>`;
  $("#compareBody").innerHTML = rows.map(([l, a, b]) => `<tr><td>${l}</td><td class="us">${mark(a)}</td><td>${mark(b)}</td></tr>`).join("");

  /* Recensioni */
  $("#reviewsGrid").innerHTML = window.REVIEWS.map(T.reviewCard).join("");
  $("#sampleNote").hidden = !S.reviewsAreSamples;

  /* FAQ */
  $("#faqList").innerHTML = window.FAQS.map((f, i) => T.faqItem(f, i === 0)).join("");

  /* Garanzie */
  const trust = [
    ["truck", "Spedizione tracciata", S.shippingDays],
    ["return", "Reso gratuito", `${S.returnDays} giorni dalla consegna`],
    ["shield", `Garanzia ${S.warrantyYears} anni`, "Sostituzione rapida"],
    ["lock", "Pagamento sicuro", "SSL · PayPal · Klarna"],
  ];
  $("#trustStrip").innerHTML = trust.map(([i, t, d]) => `<div class="trust-item">${icon(i)}<div><b>${t}</b><small>${d}</small></div></div>`).join("");

  /* Newsletter */
  $("#nlForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Collega qui il tuo servizio email (Klaviyo, Mailchimp, Brevo...)
    $("#newsletter").classList.add("done");
  });
});
