/* TEPORE — checkout (dimostrativo)
   Per incassare davvero collega qui un provider di pagamento:
   Stripe Checkout, PayPal, oppure usa il checkout di Shopify/WooCommerce.
   Questo file non raccoglie MAI dati di carta: si limita a validare l'indirizzo
   e a simulare la conferma d'ordine. */
document.addEventListener("tepore:ready", () => {
  const T = window.Tepore;
  const { $, $$, t, money, icon, Cart } = T;
  const S = window.STORE;
  let method = "standard";
  let done = false;

  $("#coLogo").insertAdjacentHTML("afterbegin", T.LOGO);
  $("#coLang").outerHTML = T.langSwitcher();

  /* Paesi di spedizione, con il nome nella lingua attiva */
  const regionName = (() => {
    try { const dn = new Intl.DisplayNames([T.LOCALE], { type: "region" }); return (c) => dn.of(c); }
    catch (e) { return (c) => c; }
  })();
  const homeCountry = { it: "IT", en: "IE", de: "DE", fr: "FR", es: "ES" }[T.LANG] || "IT";
  $("#country").innerHTML = S.shipCountries
    .map((c) => ({ c, name: regionName(c) }))
    .sort((a, b) => a.name.localeCompare(b.name, T.LOCALE))
    .map(({ c, name }) => `<option value="${c}" ${c === homeCountry ? "selected" : ""}>${name}</option>`).join("");
  // In Italia provincia obbligatoria e CAP a 5 cifre
  const syncCountry = () => {
    const it = $("#country").value === "IT";
    $("#prov").required = it;
    if (it) $("#zip").setAttribute("pattern", "\\d{5}"); else $("#zip").removeAttribute("pattern");
  };
  $("#country").addEventListener("change", syncCountry);
  syncCountry();

  function renderShip(tot) {
    $("#shipOptions").innerHTML = `
      <label class="pay-opt"><input type="radio" name="ship" value="standard" ${method === "standard" ? "checked" : ""}>
        <span><b>${t("co.standard")}</b><br><small style="color:var(--muted)">${T.DEF.days}</small></span>
        <span style="margin-left:auto;font-weight:700">${tot.shipping ? money(tot.shipping) : t("cart.free")}</span></label>
      <label class="pay-opt"><input type="radio" name="ship" value="express" ${method === "express" ? "checked" : ""}>
        <span><b>${t("co.expressShip")}</b><br><small style="color:var(--muted)">${t("co.expressDays")}</small></span>
        <span style="margin-left:auto;font-weight:700">${money(S.expressCost)}</span></label>`;
  }

  function render() {
    if (done) return; // a ordine confermato il riepilogo resta com'era
    const tot = Cart.totals();
    if (!tot.lines.length) {
      $(".co-main > div").innerHTML = `<div class="co-done show"><h2>${t("co.emptyTitle")}</h2><p>${t("co.emptyText")}</p><a href="index.html#prodotti" class="btn btn-primary">${t("co.goProducts")}</a></div>`;
    }
    const ship = method === "express" ? S.expressCost : tot.shipping;
    const total = tot.total - tot.shipping + ship;
    $("#coLines").innerHTML = tot.lines.map((l) => `
      <div class="co-line"><div class="thumb"><img src="${l.image}" alt="" class="${l.fit}"><span class="q">${l.qty}</span></div>
      <div><b>${l.name}</b><small>${l.variantLabel}${l.off ? ` · ${T.off(l.off)}` : ""}</small></div><b>${money(l.total)}</b></div>`).join("");
    $("#coSums").innerHTML = `
      <div class="sum-row"><span>${t("cart.subtotal")}</span><span>${money(tot.subtotal)}</span></div>
      ${tot.discount ? `<div class="sum-row"><span>${t("cart.discount", { code: Cart.code })}</span><span class="disc">−${money(tot.discount)}</span></div>` : ""}
      <div class="sum-row"><span>${t("cart.shipping")}</span><span>${ship ? money(ship) : t("cart.free")}</span></div>
      <div class="sum-row total"><span>${t("cart.total")} <small style="font-weight:400;color:var(--muted);font-size:13px">${t("co.vatIncl")}</small></span><span>${money(total)}</span></div>
      ${tot.saved > 0 ? `<div style="color:var(--green);font-weight:600;font-size:14px">${icon("tag")} ${t("co.saving", { amount: money(tot.saved) })}</div>` : ""}`;
    $("#coCodeMsg").innerHTML = tot.codePct ? `<span class="ok">${t("cart.codeOk", { code: Cart.code, pct: tot.codePct })}</span>` : "";
    $("#mTotal").textContent = money(total);
    if ($("#payBtn")) $("#payBtn").innerHTML = `${icon("lock")} ${t("co.submit", { amount: money(total) })}`;
    if ($("#shipOptions")) renderShip(tot);
  }

  const assureIcons = ["return", "shield", "support"];
  $("#coAssure").innerHTML = t("co.assure").map((txt, i) => `<div>${icon(assureIcons[i])} ${txt}</div>`).join("");

  document.addEventListener("cart:change", render);
  document.addEventListener("change", (e) => { if (e.target.name === "ship") { method = e.target.value; render(); } });

  $("#coCode").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim().toUpperCase();
    if (S.discountCodes[code]) { Cart.code = code; Cart.save(); e.target.reset(); }
    else $("#coCodeMsg").innerHTML = `<span class="err">${t("cart.codeErr")}</span>`;
  });

  $$("[data-express]").forEach((b) => b.addEventListener("click", () => {
    // Qui va il pulsante reale del provider (Stripe Payment Request / PayPal Smart Buttons)
    $("#expressMsg").hidden = false;
  }));

  $("#coForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    let firstBad = null;
    $$(".field", form).forEach((f) => {
      const inp = f.querySelector("input");
      if (!inp) return;
      const bad = !inp.checkValidity();
      f.classList.toggle("invalid", bad);
      if (bad && !firstBad) firstBad = inp;
    });
    if (!$("#terms").checked) { $("#terms").closest(".check").style.color = "#c0392b"; firstBad = firstBad || $("#terms"); }
    if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ behavior: "smooth", block: "center" }); return; }

    // DEMO: qui creeresti la sessione di pagamento (es. Stripe Checkout) e faresti il redirect.
    const order = "#TP" + Date.now().toString().slice(-6);
    $("#doneTitle").textContent = t("co.thanks", { name: form.fname.value.trim() });
    $("#doneText").innerHTML = t("co.thanksText", { order });
    form.style.display = "none";
    $("#coDone").classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
    done = true;
    $("#coCode").hidden = true;
    Cart.clear();
  });

  $$(".field input").forEach((i) => i.addEventListener("input", () => i.closest(".field").classList.remove("invalid")));
  if (matchMedia("(max-width: 900px)").matches) $("#summaryDetails").open = false;
  render();
});
