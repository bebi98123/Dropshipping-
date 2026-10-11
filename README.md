# Tepore — negozio online di prodotti riscaldati

Sito e-commerce statico (HTML + CSS + JavaScript, nessuna dipendenza) per tre prodotti:

| Prodotto | Nome nel sito | Prezzo |
|---|---|---|
| Tappetino bagno riscaldato | **Tepore Mat** | 44,90 € ~~69,90 €~~ |
| Pantofole riscaldate USB | **Tepore Slippers** | 39,90 € ~~59,90 €~~ |
| Scaldatazza smart auto-sensing | **Tepore Cup** | 29,90 € ~~44,90 €~~ |
| Kit con tutti e tre | **Kit Inverno** | 89,90 € ~~114,70 €~~ |

## Avvio in locale

```bash
python3 -m http.server 8000
# apri http://localhost:8000
```

Si pubblica così com'è su Netlify, Vercel, GitHub Pages o Cloudflare Pages: basta trascinare la cartella.

## Struttura

```
index.html        Home: hero, prodotti, rituale, termostato interattivo, kit, confronto, recensioni, FAQ, newsletter
product.html      Pagina prodotto (?p=tappetino-bagno-riscaldato | pantofole-riscaldate | scaldatazza-smart)
checkout.html     Checkout (dimostrativo, vedi sotto)
info.html         Spedizioni, resi, garanzia, termini, privacy, contatti
assets/js/data.js ← QUI prezzi, giorni di spedizione, codici sconto, data fine promo, lingue attive
assets/js/i18n/   ← QUI tutti i TESTI: it.js, en.js, de.js, fr.js, es.js (stessa struttura)
assets/js/app.js  Motore di traduzione, header/footer, carrello (localStorage), drawer, animazioni
assets/css/style.css  Design system (colori e font in :root)
assets/img/       Foto prodotto (ripulite dagli overlay TikTok)
```

## Lingue

Il sito è in **italiano, inglese, tedesco, francese e spagnolo**. Il mappamondo accanto al carrello apre il
selettore; la scelta resta salvata nel browser. Alla prima visita il sito usa la lingua del dispositivo
(se disponibile), altrimenti l'italiano.

- Prezzi, date e percentuali seguono le convenzioni di ogni paese (44,90 € · €44.90 · 10 % · lun 12 ott).
- Nomi dei paesi al checkout tradotti automaticamente dal browser.
- Germania: pulsante d'ordine "Zahlungspflichtig bestellen", come richiesto dalla legge tedesca.
- Francese: spazi fini prima di `: ; ! ?` inseriti in automatico.
- Per cambiare un testo modifica la stessa voce in tutti i file di `assets/js/i18n/`.
  Le parole tra graffe (`{free}`, `{returnDays}`…) si riempiono da sole con i valori di `data.js`.
- Per togliere una lingua, rimuovila da `STORE.languages` in `data.js`.

## Funzioni di vendita incluse

- Barra annunci a rotazione con **countdown** alla fine della promo (`STORE.promoEnds`, si nasconde da solo a promo finita)
- **Carrello laterale** con barra "spedizione gratuita", upsell e codici sconto (`TEPORE10`, `BENVENUTO`)
- **Sconti quantità** 1/2/3 pezzi (-10% / -15%), applicati coerentemente anche nel carrello
- **Kit** con selezione taglia e sconto, badge, prezzi barrati e risparmio in euro
- Pagina prodotto con galleria (zoom + swipe), varianti, data di consegna stimata, **barra "aggiungi al carrello" fissa** durante lo scroll
- **Prezzo più basso degli ultimi 30 giorni** accanto agli sconti (obbligatorio in UE con la Direttiva Omnibus)
- Recensioni, FAQ, tabella di confronto, garanzie, newsletter con codice -10%
- Responsive (testato a 390 px e 1440 px), `prefers-reduced-motion` rispettato

## Cosa abbiamo imparato da stopDropshipping

[stopDropshipping](https://github.com/ronanren/stopDropshipping) smaschera i negozi dropshipping in due mosse:
legge `/products/<prodotto>.json` dei negozi Shopify e cerca la foto del prodotto su AliExpress (Aliseeks)
per mostrare al cliente il prezzo originale. Quindi un negozio che regge il confronto deve:

1. **Avere un marchio vero**, non il nome generico del fornitore → brand *Tepore*, nomi prodotto propri.
2. **Prezzi onesti**: ricarico ragionevole, non 10× il prezzo AliExpress. Il valore aggiunto sta in garanzia, reso, assistenza in italiano e kit.
3. **Tempi di spedizione realistici** e dichiarati (`shippingDaysMin` / `shippingDaysMax`).
4. **Foto proprie** appena possibile: le foto del fornitore si trovano con una ricerca per immagine.
5. **Trasparenza**: termini, resi, P.IVA e contatti ben visibili.

## Checklist prima di andare online ⚠️

- [ ] **Pagamenti**: il checkout è una demo e non incassa. Collega Stripe Checkout / PayPal (punti marcati in `assets/js/checkout.js`) oppure importa i prodotti in Shopify/WooCommerce.
- [ ] **Recensioni**: quelle in `data.js` sono di esempio. Sostituiscile con recensioni reali e verificate (Judge.me, Trustpilot…) e metti `reviewsAreSamples: false`. Pubblicare recensioni false è vietato (D.Lgs. 26/2023). Lo stesso vale per i numeri "4,8/5" e "4.500+ clienti" in `index.html`.
- [ ] **Specifiche tecniche** (temperature, autonomia, dimensioni, certificazioni CE): verificale sulla scheda del fornitore.
- [ ] **Prezzi barrati**: il prezzo barrato (`compareAt`) è indicato come *prezzo consigliato* e accanto c'è il prezzo più basso degli ultimi 30 giorni (`lowest30`). Usa un prezzo consigliato reale (quello del produttore o di listino) e tieni `lowest30` aggiornato.
- [ ] **Dati aziendali** in `info.html#termini` (ragione sociale, P.IVA, REA) e testi legali rivisti da un professionista.
- [ ] Newsletter e modulo contatti: collega Klaviyo/Brevo e Formspree/Netlify Forms (punti marcati nel codice).
- [ ] Email `ciao@tepore.it` e dominio reali.
- [ ] **Spedizioni UE**: i testi dicono che spedite in Italia e in tutta l'UE con gli stessi tempi e costi. Verifica con il tuo fornitore/corriere e correggi `data.js` e i file lingua se serve.
- [ ] Assistenza clienti: se vendi all'estero, preparati a rispondere anche in inglese (o nelle lingue attive).
