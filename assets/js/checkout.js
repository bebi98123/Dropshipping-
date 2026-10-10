/* TEPORE — checkout (dimostrativo)
   Per incassare davvero collega qui un provider di pagamento:
   Stripe Checkout, PayPal, oppure usa il checkout di Shopify/WooCommerce.
   Questo file non raccoglie MAI dati di carta: si limita a validare l'indirizzo
   e a simulare la conferma d'ordine. */
document.addEventListener("tepore:ready", () => {
  const T = window.Tepore;
  const { $, $$, money, icon, Cart } = T;
  const S = window.STORE;
  const EXPRESS = { price: 6.9, days: "2–3 giorni lavorativi" };
  let method = "standard";
  let done = false;

  $("#coLogo").insertAdjacentHTML("afterbegin", T.LOGO);

  function renderShip(t) {
    $("#shipOptions").innerHTML = `
      <label class="pay-opt"><input type="radio" name="ship" value="standard" ${method === "standard" ? "checked" : ""}>
        <span><b>Standard tracciata</b><br><small style="color:var(--muted)">${S.shippingDays}</small></span>
        <span style="margin-left:auto;font-weight:700">${t.shipping ? money(t.shipping) : "Gratuita"}</span></label>
      <label class="pay-opt"><input type="radio" name="ship" value="express" ${method === "express" ? "checked" : ""}>
        <span><b>Express</b><br><small style="color:var(--muted)">${EXPRESS.days}</small></span>
        <span style="margin-left:auto;font-weight:700">${money(EXPRESS.price)}</span></label>`;
  }

  function render() {
    if (done) return; // a ordine confermato il riepilogo resta com'era
    const t = Cart.totals();
    if (!t.lines.length && !$("#coDone").classList.contains("show")) {
      $(".co-main > div").innerHTML = `<div class="co-done show"><h2>Il carrello è vuoto</h2><p>Aggiungi qualcosa di caldo prima di procedere.</p><a href="index.html#prodotti" class="btn btn-primary">Vai ai prodotti</a></div>`;
    }
    const ship = method === "express" ? EXPRESS.price : t.shipping;
    const total = t.total - t.shipping + ship;
    $("#coLines").innerHTML = t.lines.map((l) => `
      <div class="co-line"><div class="thumb"><img src="${l.image}" alt="" class="${l.fit}"><span class="q">${l.qty}</span></div>
      <div><b>${l.name}</b><small>${l.variantLabel}${l.off ? ` · -${l.off}%` : ""}</small></div><b>${money(l.total)}</b></div>`).join("");
    $("#coSums").innerHTML = `
      <div class="sum-row"><span>Subtotale</span><span>${money(t.subtotal)}</span></div>
      ${t.discount ? `<div class="sum-row"><span>Sconto (${Cart.code})</span><span class="disc">−${money(t.discount)}</span></div>` : ""}
      <div class="sum-row"><span>Spedizione</span><span>${ship ? money(ship) : "Gratuita"}</span></div>
      <div class="sum-row total"><span>Totale <small style="font-weight:400;color:var(--muted);font-size:13px">IVA inclusa</small></span><span>${money(total)}</span></div>
      ${t.saved > 0 ? `<div style="color:var(--green);font-weight:600;font-size:14px">${icon("tag")} Stai risparmiando ${money(t.saved)}</div>` : ""}`;
    $("#coCodeMsg").innerHTML = t.codePct ? `<span class="ok">Codice ${Cart.code} applicato: -${t.codePct}%</span>` : "";
    $("#mTotal").textContent = money(total);
    if ($("#payBtn")) $("#payBtn").innerHTML = `${icon("lock")} Completa l'ordine · ${money(total)}`;
    if ($("#shipOptions")) renderShip(t);
  }

  $("#coAssure").innerHTML = [
    ["return", `Reso gratuito entro ${S.returnDays} giorni`],
    ["shield", `Garanzia ${S.warrantyYears} anni su tutti i prodotti`],
    ["support", `Assistenza in italiano: ${S.email}`],
  ].map(([i, t]) => `<div>${icon(i)} ${t}</div>`).join("");

  document.addEventListener("cart:change", render);
  document.addEventListener("change", (e) => { if (e.target.name === "ship") { method = e.target.value; render(); } });

  $("#coCode").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim().toUpperCase();
    if (S.discountCodes[code]) { Cart.code = code; Cart.save(); e.target.reset(); }
    else $("#coCodeMsg").innerHTML = `<span class="err">Codice non valido</span>`;
  });

  $$("[data-express]").forEach((b) => b.addEventListener("click", () => {
    // Qui va il pulsante reale del provider (Stripe Payment Request / PayPal Smart Buttons)
    alert("Collega il provider di pagamento per attivare il pagamento rapido.");
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
    $("#doneName").textContent = form.fname.value.trim();
    $("#orderNo").textContent = "#TP" + Date.now().toString().slice(-6);
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
