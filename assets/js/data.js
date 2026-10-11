/* ==========================================================================
   TEPORE — catalogo e configurazione negozio
   Qui: prezzi, soglie, immagini, varianti e codici sconto.
   I TESTI (in tutte le lingue) sono in assets/js/i18n/<lingua>.js
   ========================================================================== */

window.STORE = {
  name: "Tepore",
  currency: "EUR",
  freeShippingThreshold: 49,
  shippingCost: 4.9,
  expressCost: 6.9,
  shippingDaysMin: 5,
  shippingDaysMax: 8,
  returnDays: 30,
  warrantyYears: 2,
  email: "ciao@tepore.it",
  // Lingue disponibili nel selettore (la prima è quella di riserva)
  languages: ["it", "en", "de", "fr", "es"],
  // Paesi di spedizione proposti al checkout (codici ISO)
  shipCountries: ["IT", "AT", "BE", "DE", "ES", "FR", "IE", "LU", "NL", "PT", "SM", "VA"],
  // Fine della promo mostrata nella barra annunci (countdown).
  // Se la data è passata, il countdown si nasconde da solo.
  promoEnds: "2026-11-30T23:59:59+01:00",
  // Codici sconto validi nel carrello (percentuale).
  // I codici di benvenuto sono uno per lingua (vedi newsletter.code nei file lingua).
  discountCodes: { TEPORE10: 10, BENVENUTO: 10, WELCOME: 10, WILLKOMMEN: 10, BIENVENUE: 10, BIENVENIDO: 10 },
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
    image: "assets/img/mat.jpg",
    imageFit: "cover",
    price: 44.9,
    compareAt: 69.9,
    lowest30: 44.9, // Direttiva Omnibus: prezzo più basso degli ultimi 30 giorni
    rating: 4.8,
    reviewsCount: 1284,
    tempRange: [35, 45],
    icons: ["flame", "dial", "shield", "drop"],
    variants: [{ id: "grigio", swatch: "#8b847c" }],
  },
  {
    id: "tepore-slippers",
    slug: "pantofole-riscaldate",
    name: "Tepore Slippers",
    image: "assets/img/slippers.jpg",
    imageFit: "contain",
    price: 39.9,
    compareAt: 59.9,
    lowest30: 39.9,
    rating: 4.9,
    reviewsCount: 2316,
    tempRange: [40, 50],
    icons: ["battery", "dial", "feather", "grip"],
    variants: [
      { id: "s", label: "36–37" },
      { id: "m", label: "38–39" },
      { id: "l", label: "40–41" },
      { id: "xl", label: "42–43" },
      { id: "xxl", label: "44–46" },
    ],
  },
  {
    id: "tepore-cup",
    slug: "scaldatazza-smart",
    name: "Tepore Cup",
    image: "assets/img/mug-warmer.jpg",
    imageFit: "contain",
    price: 29.9,
    compareAt: 44.9,
    lowest30: 29.9,
    rating: 4.7,
    reviewsCount: 978,
    tempRange: [45, 65],
    icons: ["sensor", "dial", "ring", "shield"],
    variants: [{ id: "nero", swatch: "#1d1b1a" }],
  },
];

window.BUNDLE = {
  id: "kit-inverno",
  items: ["tepore-mat", "tepore-slippers", "tepore-cup"],
  price: 89.9,
  image: "assets/img/mat.jpg",
};

// Recensioni: i testi sono nei file lingua (reviews.r1, r2, ...)
window.REVIEWS = [
  { id: "r1", name: "Giulia R.", product: "tepore-slippers", rating: 5 },
  { id: "r2", name: "Marco T.", product: "tepore-mat", rating: 5 },
  { id: "r3", name: "Francesca L.", product: "tepore-cup", rating: 5 },
  { id: "r4", name: "Andrea P.", product: "tepore-slippers", rating: 4 },
  { id: "r5", name: "Sara M.", product: "tepore-mat", rating: 5 },
  { id: "r6", name: "Luca B.", product: "tepore-cup", rating: 5 },
];
