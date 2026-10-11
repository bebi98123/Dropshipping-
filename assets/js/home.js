/* TEPORE — home page */
document.addEventListener("tepore:ready", () => {
  const T = window.Tepore;
  const { $, t, money, icon, stars, byId, productUrl, fitClass } = T;
  const P = window.PRODUCTS;
  const B = window.BUNDLE;
  const S = window.STORE;

  $("#heroStars").outerHTML = stars(5);
  $("#sumStars").outerHTML = stars(5);

  /* Marquee */
  const marqueeIcons = ["truck", "return", "shield", "flame", "lock", "gift"];
  const row = t("marquee").map((txt, i) => `<span class="marquee-item">${icon(marqueeIcons[i])} ${txt}</span>`).join("");
  $("#marquee").innerHTML = row + row;

  /* Griglia prodotti */
  $("#productGrid").innerHTML = P.map((p, i) => T.productCard(p, i)).join("");

  /* Rituale */
  const ritual = [
    { time: "07:00", id: "tepore-mat" },
    { time: "07:15", id: "tepore-slippers" },
    { time: "09:00", id: "tepore-cup" },
  ];
  const steps = t("ritual.steps");
  $("#ritualGrid").innerHTML = ritual.map((r, i) => {
    const p = byId(r.id);
    return `<div class="ritual-step reveal reveal-d${i + 1}">
      <div class="ritual-time">${r.time}</div>
      <h3>${steps[i].title}</h3><p>${steps[i].text}</p>
      <div class="ritual-img"><img src="${p.image}" alt="${p.name}" class="${fitClass(p)}" loading="lazy"></div>
      <a href="${productUrl(p)}" class="link-arrow">${t("ritual.link", { name: p.name })} ${icon("arrow")}</a>
    </div>`;
  }).join("");

  /* Termostato interattivo */
  const range = $("#tempRange");
  const levels = t("thermo.levels");
  const limits = [40, 48, 57, 66];
  const updateThermo = () => {
    const v = Number(range.value);
    $("#tempVal").textContent = v;
    $("#tempLabel").textContent = levels[limits.findIndex((max) => v < max)];
    $("#dial").style.setProperty("--t", (v - 35) / 30);
    $("#thermoMatch").innerHTML = P.map((p) => {
      const ok = v >= p.tempRange[0] && v <= p.tempRange[1];
      return `<li class="${ok ? "on" : ""}"><img src="${p.image}" alt="" class="${fitClass(p)}">
        <div><b>${p.name}</b><small>${p.tempRange[0]}–${p.tempRange[1]} °C</small></div>
        ${ok ? `<a class="tag" href="${productUrl(p)}">${t("thermo.match")}</a>` : ""}</li>`;
    }).join("");
  };
  range.addEventListener("input", updateThermo);
  updateThermo();

  /* Bundle */
  const bItems = B.items.map(byId);
  const full = bItems.reduce((a, p) => a + p.price, 0);
  $("#bundleName").textContent = B.name;
  $("#bundleList").innerHTML = bItems.map((p) => `<li><span>${p.name} — ${p.subtitle}</span><span>${money(p.price)}</span></li>`).join("");
  $("#bundlePrice").textContent = money(B.price);
  $("#bundleCompare").textContent = money(full);
  $("#bundleSave").textContent = t("card.save", { amount: money(full - B.price) });
  $("#bundlePct").textContent = T.off(T.DEF.kitPct);
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
      $("#bundleAdd").textContent = t("bundle.pickSize");
      setTimeout(() => ($("#bundleAdd").textContent = t("bundle.add")), 1800);
      return;
    }
    T.addToCart(B.id, bundleSize, 1);
  });

  /* Benefici */
  const benefitIcons = ["shield", "bolt", "support", "return"];
  $("#benefits").innerHTML = t("benefits.items").map((b, k) =>
    `<div class="benefit reveal reveal-d${k % 3 + 1}"><div class="benefit-icon">${icon(benefitIcons[k])}</div><h3>${b.title}</h3><p>${b.text}</p></div>`).join("");

  /* Confronto: [Tepore, altri] */
  const marks = [[1, 0], [1, 0], [1, 1], [1, 0], [1, 0], [1, 0], [1, 1]];
  const mark = (ok) => ok ? `<span class="yes">${icon("check")}</span>` : `<span class="no">${icon("x")}</span>`;
  $("#compareBody").innerHTML = t("compare.rows").map((label, i) => `<tr><td>${label}</td><td class="us">${mark(marks[i][0])}</td><td>${mark(marks[i][1])}</td></tr>`).join("");

  /* Recensioni */
  $("#reviewsGrid").innerHTML = window.REVIEWS.map(T.reviewCard).join("");
  $("#sampleNote").hidden = !S.reviewsAreSamples;

  /* FAQ */
  $("#faqList").innerHTML = window.FAQS.map((f, i) => T.faqItem(f, i === 0)).join("");

  /* Garanzie */
  const trustIcons = ["truck", "return", "shield", "lock"];
  $("#trustStrip").innerHTML = t("trust").map((x, i) => `<div class="trust-item">${icon(trustIcons[i])}<div><b>${x.title}</b><small>${x.text}</small></div></div>`).join("");

  /* Newsletter */
  $("#nlOk").innerHTML = t("newsletter.ok", { code: t("newsletter.code") });
  $("#nlForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Collega qui il tuo servizio email (Klaviyo, Mailchimp, Brevo...)
    $("#newsletter").classList.add("done");
  });
});
