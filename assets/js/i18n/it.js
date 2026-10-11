/* TEPORE — testi in italiano (lingua di riferimento)
   Le parole tra graffe {così} vengono sostituite automaticamente
   con i valori del negozio (prezzi, giorni, email...). */
(window.I18N = window.I18N || {}).it = {
  name: "Italiano",
  locale: "it-IT",

  ui: {
    meta: {
      homeTitle: "Tepore — Il calore che ti segue, stanza dopo stanza",
      homeDesc: "Tappetino bagno riscaldato, pantofole riscaldate USB e scaldatazza smart. Spedizione gratuita sopra {free}, reso {returnDays} giorni, garanzia {warrantyYears} anni.",
      productTitle: "{name} — {subtitle} | Tepore",
      checkoutTitle: "Checkout | Tepore",
      infoTitle: "Assistenza, spedizioni e resi | Tepore",
      infoDesc: "Spedizioni, resi, garanzia, termini di vendita, privacy e contatti di Tepore.",
    },
    a11y: {
      openCart: "Apri il carrello", closeCart: "Chiudi il carrello", openMenu: "Apri il menu", closeMenu: "Chiudi il menu",
      language: "Lingua", mainNav: "Navigazione principale", breadcrumb: "Percorso", payments: "Metodi di pagamento",
      decrease: "Diminuisci", increase: "Aumenta", image: "Immagine {n}", temperature: "Temperatura", rating: "{r} su 5",
      discountCode: "Codice sconto", email: "Email",
    },
    nav: { products: "Prodotti", kit: "Kit Inverno", reviews: "Recensioni", faq: "FAQ", contact: "Contatti", support: "Assistenza" },
    ship: { days: "{min}–{max} giorni lavorativi" },
    time: { d: "g" },
    announce: {
      free: "<strong>Spedizione gratuita</strong> sopra {free}",
      returns: "<strong>{returnDays} giorni</strong> per il reso, senza domande",
      code: "Codice <strong>TEPORE10</strong>: −10% sul primo ordine",
      countdown: "Saldi d'autunno: finiscono tra",
    },
    menuFoot: "{email} · Spedizione in {days}",
    footer: {
      about: "Piccoli oggetti che scaldano le giornate fredde. Selezionati, testati e spediti con cura in Italia e in Europa.",
      shop: "Shop", help: "Assistenza", legal: "Legale",
      shipping: "Spedizioni", returns: "Resi e rimborsi", faq: "Domande frequenti", contact: "Contatti",
      terms: "Termini di vendita", privacy: "Privacy e cookie", warranty: "Garanzia",
      rights: "© {year} Tepore · Tutti i diritti riservati",
    },
    cart: {
      title: "Il tuo carrello",
      left: "Ti mancano <b>{amount}</b> per la <b>spedizione gratuita</b>",
      unlocked: "🎉 Hai sbloccato la <b>spedizione gratuita</b>!",
      threshold: "Spedizione gratuita sopra <b>{free}</b>",
      qtyDiscount: "Sconto quantità −{off}%",
      remove: "Rimuovi",
      empty: "Il carrello è vuoto.<br>Qualcosa di caldo ti aspetta.",
      browse: "Scopri i prodotti",
      upsell: "Completa il tuo rituale",
      add: "Aggiungi",
      apply: "Applica",
      codeOk: "Codice {code} applicato: −{pct}%",
      codeErr: "Codice non valido",
      subtotal: "Subtotale", discount: "Sconto ({code})", shipping: "Spedizione", free: "Gratuita", total: "Totale",
      checkout: "Vai al checkout",
      note: "Pagamento sicuro · Risparmi {amount}",
      added: "aggiunto al carrello",
      bundleSize: "Taglia {size}",
    },
    card: { reviews: "{n} recensioni", save: "Risparmi {amount}", cta: "Acquista ora", quick: "Aggiunta rapida" },
    review: { sample: "Recensione di esempio", verified: "Acquisto verificato", sampleNote: "Recensioni dimostrative: collega il tuo servizio di recensioni verificate per mostrare quelle reali." },
    tiers: {
      t1: { label: "1 pezzo", note: "Prezzo pieno" },
      t2: { label: "2 pezzi", note: "Uno per te, uno da regalare", tag: "Il più scelto" },
      t3: { label: "3 pezzi", note: "Per tutta la famiglia", tag: "Miglior prezzo" },
    },

    hero: {
      pill: "Nuovo",
      eyebrow: "La collezione inverno è arrivata",
      title: 'Il <span class="grad-text">calore</span> che ti segue, stanza dopo stanza.',
      lead: "Tappetino riscaldato, pantofole ricaricabili e scaldatazza smart: tre piccoli lussi contro pavimenti gelidi, piedi freddi e caffè tiepido.",
      cta: "Scopri la collezione",
      cta2: "Kit completo −{kitPct}%",
      proof: "<strong>4,8/5</strong> · oltre <strong>4.500</strong> clienti al calduccio",
      chip: "sotto i piedi",
      fc1: "fino a 6 h di calore",
      fc2: "caffè caldo, sempre",
    },
    marquee: ["Spedizione gratuita sopra {free}", "Reso gratuito {returnDays} giorni", "Garanzia {warrantyYears} anni", "Caldo in 60 secondi", "Pagamenti sicuri", "Confezione regalo inclusa"],
    products: {
      eyebrow: "I più amati",
      title: 'Tre gesti caldi, <span class="grad-text">ogni giorno</span>.',
      lead: "Pochi prodotti, scelti con cura e testati uno per uno, per i momenti più freddi della giornata.",
    },
    ritual: {
      eyebrow: "Il rituale Tepore",
      title: 'Una mattina d\'inverno, <span class="grad-text">senza brividi</span>.',
      lead: "Dal primo passo fuori dal letto all'ultima email della giornata.",
      steps: [
        { title: "Il primo passo è caldo", text: "Accendi Tepore Mat appena sveglio: in un minuto le piastrelle gelide sono solo un ricordo." },
        { title: "Piedi al calduccio", text: "Infili le Tepore Slippers e scegli il livello. Calde fino a sera, anche in smart working." },
        { title: "Il caffè resta caldo", text: "Appoggi la tazza su Tepore Cup e lei fa il resto. L'ultimo sorso è caldo come il primo." },
      ],
      link: "Scopri {name}",
    },
    thermo: {
      eyebrow: "Trova il tuo tepore",
      title: "Che temperatura ti fa stare bene?",
      lead: "Ogni prodotto Tepore ha più livelli di calore. Sposta il cursore e scopri quale fa per te.",
      min: "35 °C · tiepido", max: "65 °C · bollente",
      levels: ["Tiepido e rilassante", "Calore avvolgente", "Caldo intenso", "Bollente, come piace a te"],
      match: "✓ Perfetto",
    },
    bundle: {
      eyebrow: "Offerta kit",
      stamp: "sul kit",
      lead: "Tutto il calore Tepore in un'unica confezione. Risparmi {kitSave} ed è già pronto da regalare (anche a te).",
      size: "Taglia pantofole",
      add: "Aggiungi il kit al carrello",
      pickSize: "Scegli prima la taglia ↑",
      note: "Spedizione gratuita · Reso {returnDays} giorni · Confezione regalo inclusa",
    },
    benefits: {
      eyebrow: "Perché Tepore",
      title: 'Comfort serio, <span class="grad-text">zero pensieri</span>.',
      items: [
        { title: "Sicurezza certificata", text: "Marcatura CE, protezione da surriscaldamento e spegnimento automatico su tutti i prodotti." },
        { title: "Consumi minimi", text: "Meno di 2 centesimi l'ora: stare al caldo costa meno di un caffè al mese." },
        { title: "Assistenza rapida", text: "Un team vero che risponde entro 24 ore, via email." },
        { title: "Reso {returnDays} giorni", text: "Non ti convince? Lo rimandi indietro e ti rimborsiamo." },
      ],
    },
    compare: {
      eyebrow: "Il confronto",
      title: 'Tepore contro il solito <span class="grad-text">“economico”</span>',
      lead: "Non tutti i prodotti riscaldati sono uguali. Ecco cosa fa la differenza.",
      us: "Tepore", them: "Altri",
      rows: ["Spegnimento automatico di sicurezza", "Temperatura regolabile con display", "Materiali morbidi e lavabili", "Assistenza rapida entro 24 h", "Reso gratuito {returnDays} giorni", "Garanzia {warrantyYears} anni", "Spedizione tracciata"],
    },
    reviews: {
      eyebrow: "Recensioni",
      title: 'Migliaia di piedi <span class="grad-text">finalmente caldi</span>.',
      avg: "4,8",
      sum: "su oltre 4.500 recensioni",
    },
    stats: { customers: "clienti soddisfatti", rating: "valutazione media", returns: "per il reso gratuito", heat: "per sentire il calore", daysSuffix: " gg" },
    faq: {
      eyebrow: "Domande frequenti",
      title: "Tutto quello che vuoi sapere.",
      lead: 'Non trovi la risposta? Scrivici a <a href="mailto:{email}" class="text-link">{email}</a>: rispondiamo entro 24 ore.',
    },
    trust: [
      { title: "Spedizione tracciata", text: "{days}" },
      { title: "Reso gratuito", text: "{returnDays} giorni dalla consegna" },
      { title: "Garanzia {warrantyYears} anni", text: "Sostituzione rapida" },
      { title: "Pagamento sicuro", text: "SSL · PayPal · Klarna" },
    ],
    newsletter: {
      title: "−10% sul tuo primo ordine.",
      lead: "Entra nel Club Tepore: −10% subito, offerte riservate e consigli per l'inverno. Niente spam.",
      placeholder: "La tua email",
      cta: "Iscrivimi",
      legal: 'Iscrivendoti accetti la nostra <a href="info.html#privacy" class="text-link">privacy policy</a>. Puoi cancellarti quando vuoi.',
      code: "BENVENUTO",
      ok: "Benvenuto nel Club! Il tuo codice: <code>{code}</code>. Inseriscilo nel carrello.",
    },

    pdp: {
      home: "Home", products: "Prodotti",
      vat: "IVA inclusa",
      lowest: "Prezzo più basso degli ultimi 30 giorni: {amount}",
      select: "Seleziona",
      offer: "Scegli la tua offerta",
      stock: "Disponibile · ordina oggi, spediamo <b>{date}</b>",
      add: "Aggiungi al carrello · {amount}",
      addShort: "Aggiungi al carrello",
      buyNow: "Acquista ora",
      today: "Oggi", ordered: "Ordinato", shipped: "Spedito", delivered: "Consegnato",
      dFree: "<b>Spedizione gratuita</b> sopra {free}, tracciata fino a casa tua",
      dReturn: "<b>Reso entro {returnDays} giorni</b>: se non ti piace, ti rimborsiamo",
      dWarranty: "<b>Garanzia {warrantyYears} anni</b> e assistenza entro 24 ore",
      accDesc: "Descrizione", accSpecs: "Specifiche tecniche", accBox: "Contenuto della confezione", accShip: "Spedizione e resi",
      accShipText: 'Spediamo in {days} con corriere tracciato. Spedizione {shipCost}, gratuita sopra {free}. Hai {returnDays} giorni per restituire il prodotto. <a href="info.html#resi" class="text-link">Leggi la policy completa</a>.',
      inBox: "Nella confezione",
      hlEyebrow: "Perché lo amerai",
      hlTitle: 'Pensato per <span class="grad-text">scaldarti meglio</span>.',
      storyEyebrow: "La storia",
      want: "Lo voglio",
      seeKit: "Vedi il kit −{kitPct}%",
      revTitle: 'Chi l\'ha provato <span class="grad-text">non torna indietro</span>.',
      crossEyebrow: "Completa il rituale",
      crossTitle: "Potrebbe piacerti anche",
      faqEyebrow: "FAQ",
      faqTitle: "Domande frequenti",
      faqLead: 'Hai altri dubbi? Scrivici: <a href="mailto:{email}" class="text-link">{email}</a>',
    },

    co: {
      secure: "Checkout sicuro",
      steps: '<a href="index.html">Carrello</a> › <b>Informazioni</b> › Spedizione › Pagamento',
      express: "Pagamento rapido",
      expressMsg: "Il pagamento rapido si attiva dopo aver collegato Apple Pay, PayPal o Google Pay. Per ora completa l'ordine con il modulo qui sotto.",
      or: "oppure continua qui sotto",
      contact: "Contatto", email: "Email", news: "Inviami offerte esclusive e novità via email",
      delivery: "Consegna", country: "Paese", fname: "Nome", lname: "Cognome",
      address: "Indirizzo e numero civico", address2: "Scala, interno, citofono (facoltativo)",
      zip: "CAP", city: "Città", prov: "Provincia (es. MI)", phone: "Telefono (per il corriere)",
      method: "Metodo di spedizione", standard: "Standard tracciata", expressShip: "Express", expressDays: "2–3 giorni lavorativi",
      payment: "Pagamento", payNote: "Tutte le transazioni sono sicure e crittografate.",
      card: "Carta di credito o debito", paypal: "PayPal", klarna: "Paga in 3 rate senza interessi",
      redirect: "Dopo la conferma verrai indirizzato alla pagina di pagamento sicura del provider scelto.",
      terms: 'Ho letto e accetto i <a href="info.html#termini" class="text-link">Termini di vendita</a> e l\'<a href="info.html#privacy" class="text-link">Informativa privacy</a>',
      submit: "Completa l'ordine · {amount}",
      binding: "Ordine con obbligo di pagamento",
      summary: "Riepilogo ordine",
      vatIncl: "IVA inclusa",
      saving: "Stai risparmiando {amount}",
      assure: ["Reso gratuito entro {returnDays} giorni", "Garanzia {warrantyYears} anni su tutti i prodotti", "Assistenza: {email}"],
      emptyTitle: "Il carrello è vuoto",
      emptyText: "Aggiungi qualcosa di caldo prima di procedere.",
      goProducts: "Vai ai prodotti",
      thanks: "Grazie, {name}!",
      thanksText: "Il tuo ordine <b>{order}</b> è confermato. Ti abbiamo inviato un'email con tutti i dettagli e, appena il pacco parte, riceverai il link di tracciamento.",
      back: "Torna al negozio",
    },

    info: {
      eyebrow: "Assistenza",
      title: 'Siamo qui per <span class="grad-text">aiutarti</span>.',
      lead: "Spedizioni, resi, garanzia e tutto ciò che serve per acquistare tranquillo.",
      tabs: { shipping: "Spedizioni", returns: "Resi", warranty: "Garanzia", terms: "Termini", privacy: "Privacy", contact: "Contatti" },
      shipping: `<h2>Spedizioni</h2>
        <p>Spediamo in Italia e in tutti i paesi dell'Unione Europea con corriere espresso tracciato.</p>
        <ul>
          <li><b>Standard:</b> {days}, {shipCost} — <b>gratuita sopra {free}</b>.</li>
          <li><b>Express:</b> 2–3 giorni lavorativi, {expressCost}.</li>
          <li>Prepariamo ogni ordine entro 1 giorno lavorativo. Appena il pacco parte, ricevi via email il link per seguirlo.</li>
        </ul>
        <h3>Il pacco è in ritardo?</h3>
        <p>Scrivici con il numero d'ordine: verifichiamo con il corriere e ti aggiorniamo entro 24 ore.</p>`,
      returns: `<h2>Resi e rimborsi</h2>
        <p>Hai <b>{returnDays} giorni</b> dalla consegna per restituire un prodotto, anche solo perché hai cambiato idea. È più del minimo di 14 giorni previsto dal Codice del Consumo.</p>
        <ul>
          <li>Scrivi a <a href="mailto:{email}" class="text-link">{email}</a> indicando numero d'ordine e prodotto.</li>
          <li>Ti inviamo le istruzioni e l'etichetta per la spedizione di reso.</li>
          <li>Il prodotto deve essere integro e completo di accessori.</li>
          <li>Ti rimborsiamo sullo stesso metodo di pagamento entro 14 giorni dalla ricezione del reso.</li>
        </ul>`,
      warranty: `<h2>Garanzia</h2>
        <p>Tutti i prodotti godono della garanzia legale di conformità di {warrantyYears} anni (artt. 128 e ss. del Codice del Consumo). Se un prodotto presenta un difetto, lo ripariamo o lo sostituiamo senza costi.</p>
        <h3>Uso sicuro dei prodotti riscaldati</h3>
        <ul>
          <li>Non coprire il tappetino con altri tappeti o asciugamani mentre è acceso.</li>
          <li>Togli le batterie delle pantofole prima del lavaggio e ricaricale solo con il cavo in dotazione.</li>
          <li>Usa lo scaldatazza solo con tazze in ceramica o vetro a fondo piatto.</li>
          <li>Non lasciare i dispositivi accesi in uso a bambini piccoli senza supervisione.</li>
        </ul>`,
      terms: `<h2>Termini di vendita</h2>
        <p>Il venditore è <b>[Ragione sociale]</b>, con sede in <b>[Indirizzo]</b>, P.IVA <b>[00000000000]</b>, REA <b>[XX-000000]</b>.</p>
        <p>I prezzi sono in euro e comprensivi di IVA. Il contratto si conclude quando ricevi l'email di conferma dell'ordine. Puoi recedere entro 14 giorni dalla consegna ai sensi degli artt. 52 e ss. del Codice del Consumo. Per le controversie puoi rivolgerti anche alla piattaforma ODR dell'Unione Europea.</p>
        <p class="muted-small">Testo di esempio: fai verificare i termini definitivi da un professionista prima di andare online.</p>`,
      privacy: `<h2>Privacy e cookie</h2>
        <p>Trattiamo i tuoi dati (nome, indirizzo, email, telefono) solo per evadere l'ordine, gestire l'assistenza e, se lo hai scelto, inviarti la newsletter. Base giuridica: esecuzione del contratto e consenso (Reg. UE 2016/679).</p>
        <p>I dati di pagamento sono gestiti direttamente dai provider (Stripe, PayPal, Klarna) e non vengono mai salvati sui nostri server. Per accesso, rettifica o cancellazione scrivi a <a href="mailto:{email}" class="text-link">{email}</a>.</p>
        <p>Questo sito usa solo lo spazio di archiviazione del browser per ricordare il carrello e la lingua scelta.</p>`,
      contactTitle: "Contatti",
      contactLead: "Rispondiamo dal lunedì al venerdì, 9:00–18:00, entro 24 ore.",
      emailCard: "Email",
      timeCard: "Tempi di risposta",
      timeText: "Entro 24 ore lavorative",
      formName: "Nome", formEmail: "Email", formOrder: "Numero d'ordine (facoltativo)",
      formMsg: "Come possiamo aiutarti?", formSend: "Invia messaggio",
      formOk: "Messaggio inviato! Ti rispondiamo entro 24 ore.",
    },
  },

  products: {
    "tepore-mat": {
      subtitle: "Tappetino bagno riscaldato con display",
      short: "Pavimento gelido? Mai più. Microfibra morbidissima e calore regolabile sotto i piedi.",
      storyTitle: "Il momento più freddo della giornata, trasformato.",
      badge: "Più venduto",
      variantLabel: "Colore",
      chooseCta: "Scegli il colore",
      variants: { grigio: "Grigio Pietra" },
      highlights: [
        { title: "Caldo in 60 secondi", text: "Resistenza in fibra di carbonio distribuita su tutta la superficie." },
        { title: "3 livelli 35–45 °C", text: "Display touch per scegliere la temperatura perfetta." },
        { title: "Spegnimento automatico", text: "Timer di sicurezza e protezione da surriscaldamento." },
        { title: "Fondo antiscivolo", text: "Base in gomma TPR: resta ferma anche sulle piastrelle bagnate." },
      ],
      description: "Il momento più freddo della giornata è quando appoggi i piedi sulle piastrelle del bagno. Tepore Mat lo trasforma in un piccolo lusso: una superficie in microfibra a pelo lungo, sagomata a U per avvolgere la base del WC, che si scalda in un minuto e mantiene la temperatura scelta dal display.",
      specs: [
        ["Dimensioni", "50 × 60 cm, sagoma a U"],
        ["Temperatura", "35 / 40 / 45 °C"],
        ["Materiale", "Microfibra ultra-soft, base TPR antiscivolo"],
        ["Alimentazione", "220–240 V, cavo da 1,8 m"],
        ["Sicurezza", "Timer 2 h, protezione da surriscaldamento"],
        ["Manutenzione", "Panno umido, asciugatura all'aria"],
      ],
      inBox: ["Tappetino riscaldato", "Alimentatore", "Guida rapida multilingue"],
    },
    "tepore-slippers": {
      subtitle: "Pantofole riscaldate ricaricabili USB",
      short: "Pile sherpa, suola antiscivolo e fino a 6 ore di calore. Per chi ha sempre i piedi freddi.",
      storyTitle: "Calde davvero, non solo morbide.",
      badge: "Virale su TikTok",
      variantLabel: "Taglia",
      chooseCta: "Scegli la taglia",
      variants: {},
      highlights: [
        { title: "Fino a 6 ore", text: "Batterie ricaricabili via USB-C, rimovibili per il lavaggio." },
        { title: "Display 40–50 °C", text: "Pulsante laterale con tre livelli e temperatura sempre visibile." },
        { title: "Pile sherpa", text: "Interno morbidissimo che avvolge tallone e caviglia." },
        { title: "Suola antiscivolo", text: "Gomma morbida e silenziosa, perfetta su parquet e scale." },
      ],
      description: "Le pantofole che hai sempre voluto, ma calde davvero. Il riscaldamento integrato avvolge dita e pianta del piede, mentre l'interno in pile sherpa trattiene il calore anche a dispositivo spento. Ideali per lo smart working, le serate sul divano e per chi ha sempre i piedi gelati.",
      specs: [
        ["Taglie", "Dalla 36 alla 46 (5 misure)"],
        ["Temperatura", "40 / 45 / 50 °C"],
        ["Autonomia", "2,5 h (alto) – 6 h (basso)"],
        ["Ricarica", "USB-C, circa 3 h"],
        ["Materiali", "Feltro esterno, pile sherpa, suola in gomma"],
        ["Lavaggio", "A mano, dopo aver tolto le batterie"],
      ],
      inBox: ["1 paio di pantofole", "2 batterie ricaricabili", "Cavo USB-C doppio", "Guida rapida multilingue"],
    },
    "tepore-cup": {
      subtitle: "Scaldatazza smart con sensore automatico",
      short: "Appoggi la tazza e si accende. La sollevi e si spegne. Il caffè resta caldo fino all'ultimo sorso.",
      storyTitle: "L'ultimo sorso, caldo come il primo.",
      badge: "Idea regalo",
      variantLabel: "Finitura",
      chooseCta: "Scegli la finitura",
      variants: { nero: "Nero opaco" },
      highlights: [
        { title: "Sensore di gravità", text: "Si accende quando appoggi la tazza, si spegne quando la sollevi." },
        { title: "3 temperature", text: "45, 55 o 65 °C: dal tè delicato al caffè bollente." },
        { title: "Anello LED ambrato", text: "Una luce calda ti dice a colpo d'occhio che sta scaldando." },
        { title: "Spegnimento dopo 4 ore", text: "Si spegne da solo anche se dimentichi la tazza sopra." },
      ],
      description: "Quante volte hai ritrovato il caffè freddo sulla scrivania? Tepore Cup mantiene le bevande alla temperatura che preferisci per tutto il tempo che vuoi. Il sensore di gravità lo rende completamente automatico: niente pulsanti da ricordare, niente sprechi.",
      specs: [
        ["Piastra", "10 cm di diametro, per tazze a fondo piatto"],
        ["Temperatura", "45 / 55 / 65 °C"],
        ["Potenza", "20 W"],
        ["Sicurezza", "Sensore di gravità, spegnimento dopo 4 h"],
        ["Superficie", "Vetro temperato, resistente agli schizzi"],
        ["Alimentazione", "Adattatore 220–240 V incluso"],
      ],
      inBox: ["Base scaldante", "Alimentatore", "Guida rapida multilingue"],
    },
  },

  bundle: { name: "Kit Inverno Tepore", subtitle: "Mat + Slippers + Cup" },

  reviews: {
    r1: { city: "Torino", title: "Finalmente piedi caldi!", text: "Lavoro da casa e avevo sempre i piedi congelati. Le uso tutto il giorno al livello medio e la batteria arriva a sera. Morbidissime." },
    r2: { city: "Bologna", title: "Il bagno al mattino è un'altra cosa", text: "Lo accendo appena sveglio e dopo un minuto è già caldo. Sembra una sciocchezza, ma ha cambiato le mie mattine d'inverno." },
    r3: { city: "Milano", title: "Il caffè non si fredda più", text: "Lo tengo sulla scrivania: il sensore funziona benissimo, appoggio la tazza e parte. Anche l'anello luminoso è bello da vedere." },
    r4: { city: "Roma", title: "Ottimo regalo", text: "Le ho prese per mia madre, che soffre il freddo. Taglia giusta seguendo la guida. Tolgo una stella solo perché avrei voluto più colori." },
    r5: { city: "Napoli", title: "Morbido e caldo", text: "Pensavo fosse rigido, invece è morbidissimo e non scivola sulle piastrelle. Lo consiglio a chiunque abbia un bagno freddo." },
    r6: { city: "Verona", title: "Perfetto per lo smart working", text: "Tè caldo per tutta la mattina. L'ho preso anche come regalo per un collega ed è piaciuto tantissimo." },
  },

  faqs: [
    { q: "Quanto tempo impiega la spedizione?", a: "Spediamo in Italia e in tutta l'Unione Europea in {days} con corriere tracciato. Ricevi il numero di tracking via email appena il pacco parte. La spedizione è gratuita sopra {free}." },
    { q: "Posso restituire un prodotto?", a: "Sì. Hai {returnDays} giorni dalla consegna per cambiare idea: scrivici e ti mandiamo le istruzioni per il reso. Il rimborso arriva sullo stesso metodo di pagamento entro 14 giorni dalla ricezione del reso." },
    { q: "I prodotti sono sicuri?", a: "Tutti i prodotti Tepore hanno marcatura CE, protezione da surriscaldamento e spegnimento automatico. Tappetino e scaldatazza funzionano a bassa potenza, le pantofole a batteria e a bassa tensione." },
    { q: "Come scelgo la taglia delle pantofole?", a: "Scegli la tua taglia abituale. Se sei a metà tra due misure (per esempio 39,5), prendi quella più grande: l'interno in pile è molto avvolgente." },
    { q: "Quanto consumano?", a: "Pochissimo. Lo scaldatazza assorbe 20 W, il tappetino circa 50 W: un'ora di utilizzo costa meno di 2 centesimi di elettricità." },
    { q: "C'è una garanzia?", a: "Sì, {warrantyYears} anni di garanzia legale su tutti i prodotti. Se qualcosa non funziona, lo sostituiamo." },
    { q: "Quali metodi di pagamento accettate?", a: "Carte di credito e di debito (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay e pagamento in 3 rate senza interessi con Klarna." },
  ],
};
