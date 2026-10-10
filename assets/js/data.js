/* ==========================================================================
   TEPORE — catalogo e configurazione negozio
   Tutti i prezzi, testi promo, recensioni e soglie si modificano da qui.
   ========================================================================== */

window.STORE = {
  name: "Tepore",
  tagline: "Il calore che ti segue, stanza dopo stanza.",
  currency: "EUR",
  freeShippingThreshold: 49,
  shippingCost: 4.9,
  shippingDays: "5–8 giorni lavorativi",
  returnDays: 30,
  warrantyYears: 2,
  email: "ciao@tepore.it",
  // Fine della promo mostrata nella barra annunci (countdown).
  // Se la data è passata, il countdown si nasconde da solo.
  promoEnds: "2026-11-30T23:59:59+01:00",
  promoLabel: "Saldi d'autunno",
  // Codici sconto validi nel carrello (percentuale)
  discountCodes: { TEPORE10: 10, BENVENUTO: 10 },
  // true = le recensioni sono di esempio: mostra una nota discreta.
  // Mettilo a false SOLO quando colleghi recensioni reali e verificate
  // (Judge.me, Trustpilot, ecc.). Le recensioni false sono vietate (D.Lgs. 26/2023).
  reviewsAreSamples: true,
};

window.PRODUCTS = [
  {
    id: "tepore-mat",
    slug: "tappetino-bagno-riscaldato",
    name: "Tepore Mat",
    subtitle: "Tappetino bagno riscaldato con display",
    short: "Pavimento gelido? Mai più. Morbidezza in microfibra e calore regolabile sotto i piedi.",
    image: "assets/img/mat.jpg",
    imageFit: "cover",
    price: 44.9,
    compareAt: 69.9,
    lowest30: 44.9, // Direttiva Omnibus: prezzo più basso degli ultimi 30 giorni
    rating: 4.8,
    reviewsCount: 1284,
    badge: "Più venduto",
    stock: 23,
    accent: "#ff8a3d",
    tempRange: [35, 45],
    variantLabel: "Colore",
    variants: [
      { id: "grigio", label: "Grigio Pietra", swatch: "#8b847c" },
    ],
    highlights: [
      { icon: "flame", title: "Caldo in 60 secondi", text: "Resistenza in fibra di carbonio distribuita su tutta la superficie." },
      { icon: "dial", title: "3 livelli 35–45 °C", text: "Display touch per scegliere la temperatura perfetta." },
      { icon: "shield", title: "Spegnimento automatico", text: "Timer di sicurezza e protezione da surriscaldamento." },
      { icon: "drop", title: "Fondo antiscivolo", text: "Base in gomma TPR: resta ferma anche su piastrelle bagnate." },
    ],
    description:
      "Il momento più freddo della giornata è quando appoggi i piedi sulle piastrelle del bagno. Tepore Mat lo trasforma in un piccolo lusso: una superficie in microfibra a pelo lungo, sagomata a U per avvolgere la base del WC, che si scalda in un minuto e mantiene la temperatura che scegli dal display.",
    specs: [
      ["Dimensioni", "50 × 60 cm, sagoma a U"],
      ["Temperatura", "35 / 40 / 45 °C"],
      ["Materiale", "Microfibra ultra-soft, base TPR antiscivolo"],
      ["Alimentazione", "220–240 V, cavo 1,8 m"],
      ["Sicurezza", "Timer 2 h, protezione surriscaldamento"],
      ["Manutenzione", "Pulizia a panno umido, asciugatura all'aria"],
    ],
    inBox: ["Tappetino riscaldato", "Alimentatore", "Guida rapida in italiano"],
  },
  {
    id: "tepore-slippers",
    slug: "pantofole-riscaldate",
    name: "Tepore Slippers",
    subtitle: "Pantofole riscaldate ricaricabili USB",
    short: "Pile sherpa, suola antiscivolo e calore fino a 6 ore. Per i piedi sempre freddi.",
    image: "assets/img/slippers.jpg",
    imageFit: "contain",
    price: 39.9,
    compareAt: 59.9,
    lowest30: 39.9,
    rating: 4.9,
    reviewsCount: 2316,
    badge: "Virale su TikTok",
    stock: 41,
    accent: "#ff6a2b",
    tempRange: [40, 50],
    variantLabel: "Taglia",
    variants: [
      { id: "s", label: "36–37" },
      { id: "m", label: "38–39" },
      { id: "l", label: "40–41" },
      { id: "xl", label: "42–43" },
      { id: "xxl", label: "44–46" },
    ],
    highlights: [
      { icon: "battery", title: "Fino a 6 ore", text: "Batteria ricaricabile via USB-C, rimovibile per il lavaggio." },
      { icon: "dial", title: "Display 40–50 °C", text: "Pulsante sul lato: tre livelli con display di temperatura." },
      { icon: "feather", title: "Pile sherpa", text: "Interno in pile morbidissimo che avvolge tallone e caviglia." },
      { icon: "grip", title: "Suola antiscivolo", text: "Gomma morbida e silenziosa, perfetta su parquet e scale." },
    ],
    description:
      "Le pantofole che volevi da sempre, ma calde davvero. Il riscaldamento integrato avvolge dita e pianta del piede, mentre l'interno in pile sherpa trattiene il calore anche a dispositivo spento. Ideali per chi lavora da casa, per le serate sul divano e per chi ha sempre i piedi gelati.",
    specs: [
      ["Taglie", "36 → 46 (5 misure)"],
      ["Temperatura", "40 / 45 / 50 °C"],
      ["Autonomia", "2,5 h (alto) — 6 h (basso)"],
      ["Ricarica", "USB-C, circa 3 h"],
      ["Materiali", "Feltro esterno, pile sherpa, suola in gomma"],
      ["Lavaggio", "A mano, dopo aver rimosso le batterie"],
    ],
    inBox: ["1 paio di pantofole", "2 batterie ricaricabili", "Cavo USB-C doppio", "Guida rapida"],
  },
  {
    id: "tepore-cup",
    slug: "scaldatazza-smart",
    name: "Tepore Cup",
    subtitle: "Scaldatazza smart con sensore automatico",
    short: "Appoggi la tazza, si accende. La sollevi, si spegne. Il caffè resta caldo fino all'ultimo sorso.",
    image: "assets/img/mug-warmer.jpg",
    imageFit: "contain",
    price: 29.9,
    compareAt: 44.9,
    lowest30: 29.9,
    rating: 4.7,
    reviewsCount: 978,
    badge: "Idea regalo",
    stock: 57,
    accent: "#ffa04d",
    tempRange: [45, 65],
    variantLabel: "Finitura",
    variants: [
      { id: "nero", label: "Nero Opaco", swatch: "#1d1b1a" },
    ],
    highlights: [
      { icon: "sensor", title: "Sensore di gravità", text: "Si accende appoggiando la tazza, si spegne sollevandola." },
      { icon: "dial", title: "3 temperature", text: "45, 55 o 65 °C: dal tè delicato al caffè bollente." },
      { icon: "ring", title: "Anello LED ambrato", text: "Luce calda che ti dice a colpo d'occhio che sta scaldando." },
      { icon: "shield", title: "Auto-off 4 ore", text: "Si spegne da solo anche se dimentichi la tazza sopra." },
    ],
    description:
      "Quante volte hai ritrovato il caffè freddo sulla scrivania? Tepore Cup mantiene bevande calde alla temperatura che preferisci per tutto il tempo che vuoi. Il sensore di gravità lo rende completamente automatico: niente pulsanti da ricordare, niente sprechi.",
    specs: [
      ["Diametro piastra", "10 cm, per tazze a fondo piatto"],
      ["Temperatura", "45 / 55 / 65 °C"],
      ["Potenza", "20 W"],
      ["Sicurezza", "Sensore di gravità, spegnimento dopo 4 h"],
      ["Superficie", "Vetro temprato, impermeabile agli schizzi"],
      ["Alimentazione", "Adattatore 220–240 V incluso"],
    ],
    inBox: ["Base scaldante", "Alimentatore", "Guida rapida"],
  },
];

window.BUNDLE = {
  id: "kit-inverno",
  name: "Kit Inverno Tepore",
  subtitle: "Mat + Slippers + Cup",
  items: ["tepore-mat", "tepore-slippers", "tepore-cup"],
  price: 89.9,
  image: "assets/img/mat.jpg",
};

window.REVIEWS = [
  { name: "Giulia R.", city: "Torino", product: "tepore-slippers", rating: 5, title: "Finalmente piedi caldi!", text: "Lavoro da casa e avevo sempre i piedi congelati. Le uso tutto il giorno al livello medio e la batteria arriva a sera. Morbidissime." },
  { name: "Marco T.", city: "Bologna", product: "tepore-mat", rating: 5, title: "Il bagno al mattino è un'altra cosa", text: "Lo accendo appena sveglio e dopo un minuto è già caldo. Sembra una sciocchezza ma ha cambiato le mie mattine d'inverno." },
  { name: "Francesca L.", city: "Milano", product: "tepore-cup", rating: 5, title: "Il caffè non si fredda più", text: "Lo tengo sulla scrivania: il sensore funziona benissimo, appoggio la tazza e parte. L'anello luminoso è anche bello da vedere." },
  { name: "Andrea P.", city: "Roma", product: "tepore-slippers", rating: 4, title: "Ottimo regalo", text: "Prese per mia madre che soffre il freddo. Taglia giusta seguendo la guida. Una stella in meno solo perché avrei voluto più colori." },
  { name: "Sara M.", city: "Napoli", product: "tepore-mat", rating: 5, title: "Morbido e caldo", text: "Pensavo fosse rigido invece è morbidissimo. Non scivola sulle piastrelle. Lo consiglio a chiunque abbia un bagno freddo." },
  { name: "Luca B.", city: "Verona", product: "tepore-cup", rating: 5, title: "Perfetto per lo smart working", text: "Tè caldo per tutta la mattina. Preso anche come regalo per un collega, è piaciuto tantissimo." },
];

window.FAQS = [
  { q: "Quanto tempo impiega la spedizione?", a: "Spediamo in tutta Italia in 5–8 giorni lavorativi con corriere tracciato. Riceverai il numero di tracking via email appena il pacco parte. La spedizione è gratuita sopra i 49 €." },
  { q: "Posso restituire un prodotto?", a: "Sì. Hai 30 giorni dalla consegna per cambiare idea: scrivici e ti inviamo le istruzioni per il reso. Il rimborso avviene sullo stesso metodo di pagamento entro 14 giorni dalla ricezione del reso." },
  { q: "I prodotti sono sicuri?", a: "Tutti i prodotti Tepore hanno marcatura CE, protezione da surriscaldamento e spegnimento automatico. Il tappetino e lo scaldatazza funzionano a bassa potenza, le pantofole a batteria a bassa tensione." },
  { q: "Come scelgo la taglia delle pantofole?", a: "Scegli la tua taglia abituale. Se sei a metà tra due misure (es. 39,5) prendi quella più grande: l'interno in pile è molto avvolgente." },
  { q: "Quanto consumano?", a: "Pochissimo. Lo scaldatazza assorbe 20 W, il tappetino circa 50 W: un'ora di utilizzo costa meno di 2 centesimi di elettricità." },
  { q: "C'è una garanzia?", a: "Sì, 2 anni di garanzia legale su tutti i prodotti. Se qualcosa non funziona, lo sostituiamo." },
  { q: "Quali metodi di pagamento accettate?", a: "Carte di credito e debito (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay e pagamento in 3 rate senza interessi con Klarna." },
];
