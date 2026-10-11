/* TEPORE — Français
   Les espaces fines avant : ; ! ? » sont ajoutées automatiquement. */
(window.I18N = window.I18N || {}).fr = {
  name: "Français",
  locale: "fr-FR",

  ui: {
    meta: {
      homeTitle: "Tepore — La chaleur qui vous suit, de pièce en pièce",
      homeDesc: "Tapis de bain chauffant, chaussons chauffants rechargeables USB et chauffe-tasse intelligent. Livraison offerte dès {free}, retours sous {returnDays} jours, garantie {warrantyYears} ans.",
      productTitle: "{name} — {subtitle} | Tepore",
      checkoutTitle: "Paiement | Tepore",
      infoTitle: "Aide, livraison et retours | Tepore",
      infoDesc: "Livraison, retours, garantie, conditions générales de vente, confidentialité et contact de Tepore.",
    },
    a11y: {
      openCart: "Ouvrir le panier", closeCart: "Fermer le panier", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu",
      language: "Langue", mainNav: "Navigation principale", breadcrumb: "Fil d'Ariane", payments: "Moyens de paiement",
      decrease: "Diminuer", increase: "Augmenter", image: "Image {n}", temperature: "Température", rating: "{r} sur 5",
      discountCode: "Code promo", email: "E-mail",
    },
    nav: { products: "Produits", kit: "Coffret Hiver", reviews: "Avis", faq: "FAQ", contact: "Contact", support: "Aide" },
    ship: { days: "{min} à {max} jours ouvrés" },
    time: { d: "j" },
    announce: {
      free: "<strong>Livraison offerte</strong> dès {free} d'achat",
      returns: "<strong>{returnDays} jours</strong> pour changer d'avis, sans justification",
      code: "Code <strong>TEPORE10</strong> : −10 % sur votre première commande",
      countdown: "Les soldes d'automne se terminent dans",
    },
    menuFoot: "{email} · Livraison en {days}",
    footer: {
      about: "De petits objets qui réchauffent les journées froides. Sélectionnés, testés et expédiés avec soin en Italie et dans toute l'Europe.",
      shop: "Boutique", help: "Aide", legal: "Mentions légales",
      shipping: "Livraison", returns: "Retours et remboursements", faq: "Questions fréquentes", contact: "Contact",
      terms: "Conditions générales de vente", privacy: "Confidentialité et cookies", warranty: "Garantie",
      rights: "© {year} Tepore · Tous droits réservés",
    },
    cart: {
      title: "Votre panier",
      left: "Plus que <b>{amount}</b> pour profiter de la <b>livraison offerte</b>",
      unlocked: "🎉 La <b>livraison est offerte</b> !",
      threshold: "Livraison offerte dès <b>{free}</b>",
      qtyDiscount: "Remise quantité −{off} %",
      remove: "Retirer",
      empty: "Votre panier est vide.<br>Quelque chose de chaud vous attend.",
      browse: "Découvrir les produits",
      upsell: "Complétez votre rituel",
      add: "Ajouter",
      apply: "Appliquer",
      codeOk: "Code {code} appliqué : −{pct} %",
      codeErr: "Ce code n'est pas valide",
      subtotal: "Sous-total", discount: "Remise ({code})", shipping: "Livraison", free: "Offerte", total: "Total",
      checkout: "Passer au paiement",
      note: "Paiement sécurisé · Vous économisez {amount}",
      added: "a été ajouté au panier",
      bundleSize: "Pointure {size}",
    },
    card: { reviews: "{n} avis", save: "Économisez {amount}", cta: "Acheter", quick: "Ajout rapide" },
    review: { sample: "Avis d'exemple", verified: "Achat vérifié", sampleNote: "Avis de démonstration : connectez votre service d'avis vérifiés pour afficher les vrais avis." },
    tiers: {
      t1: { label: "1 article", note: "Prix normal" },
      t2: { label: "2 articles", note: "Un pour vous, un à offrir", tag: "Le plus choisi" },
      t3: { label: "3 articles", note: "Pour toute la famille", tag: "Meilleur prix" },
    },

    hero: {
      pill: "Nouveau",
      eyebrow: "La collection hiver est arrivée",
      title: 'La <span class="grad-text">chaleur</span> qui vous suit, de pièce en pièce.',
      lead: "Un tapis de bain chauffant, des chaussons rechargeables et un chauffe-tasse intelligent : trois petits luxes contre le carrelage glacé, les pieds froids et le café tiède.",
      cta: "Découvrir la collection",
      cta2: "Coffret complet −{kitPct} %",
      proof: "<strong>4,8/5</strong> · plus de <strong>4 500</strong> clients bien au chaud",
      chip: "sous vos pieds",
      fc1: "jusqu'à 6 h de chaleur",
      fc2: "un café toujours chaud",
    },
    marquee: ["Livraison offerte dès {free}", "Retours gratuits sous {returnDays} jours", "Garantie {warrantyYears} ans", "Chaud en 60 secondes", "Paiement sécurisé", "Emballage cadeau inclus"],
    products: {
      eyebrow: "Les préférés",
      title: 'Trois gestes chaleureux, <span class="grad-text">chaque jour</span>.',
      lead: "Peu de produits, choisis avec soin et testés un par un, pour les moments les plus froids de la journée.",
    },
    ritual: {
      eyebrow: "Le rituel Tepore",
      title: 'Un matin d\'hiver <span class="grad-text">sans frissons</span>.',
      lead: "Du premier pas hors du lit au dernier e-mail de la journée.",
      steps: [
        { title: "Un premier pas tout en douceur", text: "Allumez Tepore Mat dès le réveil : en une minute, le carrelage glacé n'est plus qu'un souvenir." },
        { title: "Les pieds bien au chaud", text: "Enfilez les Tepore Slippers et choisissez votre niveau. Chaudes jusqu'au soir, même en télétravail." },
        { title: "Un café qui reste chaud", text: "Posez votre tasse sur Tepore Cup, il s'occupe du reste. La dernière gorgée est aussi chaude que la première." },
      ],
      link: "Découvrir {name}",
    },
    thermo: {
      eyebrow: "Trouvez votre chaleur",
      title: "Quelle température vous fait du bien ?",
      lead: "Chaque produit Tepore propose plusieurs niveaux de chaleur. Déplacez le curseur pour trouver celui qui vous convient.",
      min: "35 °C · douce", max: "65 °C · brûlante",
      levels: ["Douce et apaisante", "Chaleur enveloppante", "Chaleur intense", "Brûlante, comme vous l'aimez"],
      match: "✓ Idéal",
    },
    bundle: {
      eyebrow: "Offre coffret",
      stamp: "sur le coffret",
      lead: "Toute la chaleur Tepore dans une seule boîte. Vous économisez {kitSave}, et c'est prêt à offrir (même à vous-même).",
      size: "Pointure des chaussons",
      add: "Ajouter le coffret au panier",
      pickSize: "Choisissez d'abord une pointure ↑",
      note: "Livraison offerte · Retours sous {returnDays} jours · Emballage cadeau inclus",
    },
    benefits: {
      eyebrow: "Pourquoi Tepore",
      title: 'Un vrai confort, <span class="grad-text">zéro souci</span>.',
      items: [
        { title: "Sécurité certifiée", text: "Marquage CE, protection contre la surchauffe et arrêt automatique sur tous les produits." },
        { title: "Consommation minime", text: "Moins de 2 centimes de l'heure : rester au chaud coûte moins qu'un café par mois." },
        { title: "Service client réactif", text: "Une vraie équipe qui vous répond par e-mail sous 24 heures." },
        { title: "Retours sous {returnDays} jours", text: "Pas convaincu ? Renvoyez-le, nous vous remboursons." },
      ],
    },
    compare: {
      eyebrow: "Le comparatif",
      title: 'Tepore face au <span class="grad-text">« premier prix »</span>',
      lead: "Tous les produits chauffants ne se valent pas. Voici ce qui fait la différence.",
      us: "Tepore", them: "Autres",
      rows: ["Arrêt automatique de sécurité", "Température réglable avec écran", "Matières douces et lavables", "Service client sous 24 h", "Retours gratuits sous {returnDays} jours", "Garantie {warrantyYears} ans", "Livraison avec suivi"],
    },
    reviews: {
      eyebrow: "Avis clients",
      title: 'Des milliers de pieds <span class="grad-text">enfin au chaud</span>.',
      avg: "4,8",
      sum: "sur plus de 4 500 avis",
    },
    stats: { customers: "clients satisfaits", rating: "note moyenne", returns: "pour un retour gratuit", heat: "pour sentir la chaleur", daysSuffix: " j" },
    faq: {
      eyebrow: "Questions fréquentes",
      title: "Tout ce que vous voulez savoir.",
      lead: 'Vous ne trouvez pas la réponse ? Écrivez-nous à <a href="mailto:{email}" class="text-link">{email}</a>, nous répondons sous 24 heures.',
    },
    trust: [
      { title: "Livraison suivie", text: "{days}" },
      { title: "Retours gratuits", text: "{returnDays} jours après la livraison" },
      { title: "Garantie {warrantyYears} ans", text: "Remplacement rapide" },
      { title: "Paiement sécurisé", text: "SSL · PayPal · Klarna" },
    ],
    newsletter: {
      title: "−10 % sur votre première commande.",
      lead: "Rejoignez le Club Tepore : −10 % tout de suite, des offres réservées et des conseils pour l'hiver. Zéro spam.",
      placeholder: "Votre e-mail",
      cta: "Je m'inscris",
      legal: 'En vous inscrivant, vous acceptez notre <a href="info.html#privacy" class="text-link">politique de confidentialité</a>. Désinscription possible à tout moment.',
      code: "BIENVENUE",
      ok: "Bienvenue au Club ! Votre code : <code>{code}</code>. Saisissez-le dans votre panier.",
    },

    pdp: {
      home: "Accueil", products: "Produits",
      vat: "TVA incluse",
      lowest: "Prix le plus bas des 30 derniers jours : {amount}",
      select: "Choisir",
      offer: "Choisissez votre offre",
      stock: "En stock · commandez aujourd'hui, expédition le <b>{date}</b>",
      add: "Ajouter au panier · {amount}",
      addShort: "Ajouter au panier",
      buyNow: "Acheter maintenant",
      today: "Aujourd'hui", ordered: "Commandé", shipped: "Expédié", delivered: "Livré",
      dFree: "<b>Livraison offerte</b> dès {free}, suivie jusqu'à votre porte",
      dReturn: "<b>Retours sous {returnDays} jours</b> : s'il ne vous plaît pas, nous vous remboursons",
      dWarranty: "<b>Garantie {warrantyYears} ans</b> et réponse sous 24 heures",
      accDesc: "Description", accSpecs: "Caractéristiques techniques", accBox: "Contenu du colis", accShip: "Livraison et retours",
      accShipText: 'Nous expédions en {days} par transporteur avec suivi. La livraison coûte {shipCost} et est offerte dès {free}. Vous disposez de {returnDays} jours pour retourner le produit. <a href="info.html#resi" class="text-link">Lire la politique complète</a>.',
      inBox: "Dans la boîte",
      hlEyebrow: "Pourquoi vous allez l'adorer",
      hlTitle: 'Conçu pour <span class="grad-text">mieux vous réchauffer</span>.',
      storyEyebrow: "L'histoire",
      want: "Je le veux",
      seeKit: "Voir le coffret −{kitPct} %",
      revTitle: 'L\'essayer, <span class="grad-text">c\'est l\'adopter</span>.',
      crossEyebrow: "Complétez le rituel",
      crossTitle: "Vous aimerez aussi",
      faqEyebrow: "FAQ",
      faqTitle: "Questions fréquentes",
      faqLead: 'D\'autres questions ? Écrivez-nous : <a href="mailto:{email}" class="text-link">{email}</a>',
    },

    co: {
      secure: "Paiement sécurisé",
      steps: '<a href="index.html">Panier</a> › <b>Informations</b> › Livraison › Paiement',
      express: "Paiement express",
      expressMsg: "Le paiement express sera disponible une fois Apple Pay, PayPal ou Google Pay connecté. En attendant, finalisez votre commande avec le formulaire ci-dessous.",
      or: "ou continuez ci-dessous",
      contact: "Contact", email: "E-mail", news: "Recevoir par e-mail des offres exclusives et des nouveautés",
      delivery: "Livraison", country: "Pays", fname: "Prénom", lname: "Nom",
      address: "Adresse (numéro et rue)", address2: "Bâtiment, étage, digicode (facultatif)",
      zip: "Code postal", city: "Ville", prov: "Région / province", phone: "Téléphone (pour le livreur)",
      method: "Mode de livraison", standard: "Standard avec suivi", expressShip: "Express", expressDays: "2 à 3 jours ouvrés",
      payment: "Paiement", payNote: "Toutes les transactions sont sécurisées et chiffrées.",
      card: "Carte de crédit ou de débit", paypal: "PayPal", klarna: "Payer en 3 fois sans frais",
      redirect: "Après confirmation, vous serez redirigé vers la page de paiement sécurisée du prestataire choisi.",
      terms: 'J\'ai lu et j\'accepte les <a href="info.html#termini" class="text-link">Conditions générales de vente</a> et la <a href="info.html#privacy" class="text-link">Politique de confidentialité</a>',
      submit: "Commander et payer · {amount}",
      binding: "Commande avec obligation de paiement.",
      summary: "Récapitulatif de commande",
      vatIncl: "TVA incluse",
      saving: "Vous économisez {amount}",
      assure: ["Retours gratuits sous {returnDays} jours", "Garantie {warrantyYears} ans sur tous les produits", "Service client : {email}"],
      emptyTitle: "Votre panier est vide",
      emptyText: "Ajoutez quelque chose de chaud avant de continuer.",
      goProducts: "Voir les produits",
      thanks: "Merci, {name} !",
      thanksText: "Votre commande <b>{order}</b> est confirmée. Nous vous avons envoyé un e-mail avec tous les détails, et vous recevrez le lien de suivi dès l'expédition de votre colis.",
      back: "Retour à la boutique",
    },

    info: {
      eyebrow: "Aide",
      title: 'Nous sommes là pour <span class="grad-text">vous aider</span>.',
      lead: "Livraison, retours, garantie : tout ce qu'il faut pour acheter en toute sérénité.",
      tabs: { shipping: "Livraison", returns: "Retours", warranty: "Garantie", terms: "CGV", privacy: "Confidentialité", contact: "Contact" },
      shipping: `<h2>Livraison</h2>
        <p>Nous livrons en Italie et dans tous les pays de l'Union européenne par transporteur express avec suivi.</p>
        <ul>
          <li><b>Standard :</b> {days}, {shipCost} — <b>offerte dès {free}</b>.</li>
          <li><b>Express :</b> 2 à 3 jours ouvrés, {expressCost}.</li>
          <li>Nous préparons chaque commande sous 1 jour ouvré. Dès l'expédition, vous recevez le lien de suivi par e-mail.</li>
        </ul>
        <h3>Votre colis est en retard ?</h3>
        <p>Envoyez-nous votre numéro de commande : nous vérifions auprès du transporteur et revenons vers vous sous 24 heures.</p>`,
      returns: `<h2>Retours et remboursements</h2>
        <p>Vous disposez de <b>{returnDays} jours</b> après la livraison pour retourner un produit, même si vous avez simplement changé d'avis. C'est plus que les 14 jours minimum prévus par le droit européen.</p>
        <ul>
          <li>Écrivez à <a href="mailto:{email}" class="text-link">{email}</a> en indiquant votre numéro de commande et le produit.</li>
          <li>Nous vous envoyons les instructions et une étiquette de retour.</li>
          <li>Le produit doit être intact et complet avec ses accessoires.</li>
          <li>Nous vous remboursons sur le moyen de paiement d'origine sous 14 jours après réception du retour.</li>
        </ul>`,
      warranty: `<h2>Garantie</h2>
        <p>Tous nos produits bénéficient de la garantie légale de conformité de {warrantyYears} ans prévue par le droit européen de la consommation. Si un produit présente un défaut, nous le réparons ou le remplaçons gratuitement.</p>
        <h3>Utiliser les produits chauffants en toute sécurité</h3>
        <ul>
          <li>Ne couvrez pas le tapis avec d'autres tapis ou des serviettes lorsqu'il est allumé.</li>
          <li>Retirez les batteries des chaussons avant le lavage et rechargez-les uniquement avec le câble fourni.</li>
          <li>Utilisez le chauffe-tasse uniquement avec des tasses en céramique ou en verre à fond plat.</li>
          <li>Ne laissez pas d'appareils allumés sans surveillance à la portée de jeunes enfants.</li>
        </ul>`,
      terms: `<h2>Conditions générales de vente</h2>
        <p>Le vendeur est <b>[Raison sociale]</b>, dont le siège est situé <b>[Adresse]</b>, n° de TVA <b>[IT00000000000]</b>.</p>
        <p>Les prix sont indiqués en euros, TVA incluse. Le contrat est conclu à la réception de l'e-mail de confirmation de commande. Vous pouvez vous rétracter dans un délai de 14 jours après la livraison, conformément à la directive 2011/83/UE. En cas de litige, vous pouvez également recourir à la plateforme européenne de règlement en ligne des litiges (RLL).</p>
        <p class="muted-small">Texte d'exemple : faites vérifier vos conditions définitives par un professionnel avant la mise en ligne.</p>`,
      privacy: `<h2>Confidentialité et cookies</h2>
        <p>Nous traitons vos données (nom, adresse, e-mail, téléphone) uniquement pour traiter votre commande, vous assister et, si vous l'avez choisi, vous envoyer notre newsletter. Base légale : exécution du contrat et consentement (règlement (UE) 2016/679, RGPD).</p>
        <p>Les données de paiement sont traitées directement par les prestataires (Stripe, PayPal, Klarna) et ne sont jamais enregistrées sur nos serveurs. Pour accéder à vos données, les rectifier ou les supprimer, écrivez à <a href="mailto:{email}" class="text-link">{email}</a>.</p>
        <p>Ce site utilise uniquement le stockage local de votre navigateur pour mémoriser votre panier et la langue choisie.</p>`,
      contactTitle: "Contact",
      contactLead: "Nous sommes disponibles du lundi au vendredi, de 9 h à 18 h (heure de Paris), et répondons sous 24 heures.",
      emailCard: "E-mail",
      timeCard: "Délai de réponse",
      timeText: "Sous 24 heures ouvrées",
      formName: "Nom", formEmail: "E-mail", formOrder: "Numéro de commande (facultatif)",
      formMsg: "Comment pouvons-nous vous aider ?", formSend: "Envoyer le message",
      formOk: "Message envoyé ! Nous vous répondons sous 24 heures.",
    },
  },

  products: {
    "tepore-mat": {
      subtitle: "Tapis de bain chauffant avec écran",
      short: "Le carrelage glacé ? C'est fini. Une microfibre ultra-douce et une chaleur réglable sous vos pieds.",
      storyTitle: "Le moment le plus froid de la journée, réinventé.",
      badge: "Meilleure vente",
      variantLabel: "Couleur",
      chooseCta: "Choisir la couleur",
      variants: { grigio: "Gris pierre" },
      highlights: [
        { title: "Chaud en 60 secondes", text: "Résistance en fibre de carbone répartie sur toute la surface." },
        { title: "3 niveaux, 35–45 °C", text: "Écran tactile pour régler la température idéale." },
        { title: "Arrêt automatique", text: "Minuterie de sécurité et protection contre la surchauffe." },
        { title: "Dessous antidérapant", text: "Base en caoutchouc TPR qui ne bouge pas, même sur un carrelage mouillé." },
      ],
      description: "Le moment le plus froid de la journée, c'est quand vos pieds nus touchent le carrelage de la salle de bain. Tepore Mat en fait un petit luxe : une surface en microfibre à poils longs, en forme de U pour épouser le pied des toilettes, qui chauffe en une minute et maintient la température choisie sur l'écran.",
      specs: [
        ["Dimensions", "50 × 60 cm, forme en U"],
        ["Température", "35 / 40 / 45 °C"],
        ["Matière", "Microfibre ultra-douce, base TPR antidérapante"],
        ["Alimentation", "220–240 V, câble de 1,8 m"],
        ["Sécurité", "Minuterie 2 h, protection contre la surchauffe"],
        ["Entretien", "Chiffon humide, séchage à l'air libre"],
      ],
      inBox: ["Tapis chauffant", "Adaptateur secteur", "Guide de démarrage multilingue"],
    },
    "tepore-slippers": {
      subtitle: "Chaussons chauffants rechargeables USB",
      short: "Polaire sherpa, semelle antidérapante et jusqu'à 6 heures de chaleur. Pour ceux qui ont toujours froid aux pieds.",
      storyTitle: "Vraiment chauds, pas seulement doux.",
      badge: "Viral sur TikTok",
      variantLabel: "Pointure (EU)",
      chooseCta: "Choisir la pointure",
      variants: {},
      highlights: [
        { title: "Jusqu'à 6 heures", text: "Batteries rechargeables en USB-C, amovibles pour le lavage." },
        { title: "Écran 40–50 °C", text: "Bouton latéral à trois niveaux, température toujours visible." },
        { title: "Polaire sherpa", text: "Une doublure ultra-douce qui enveloppe le talon et la cheville." },
        { title: "Semelle antidérapante", text: "Caoutchouc souple et silencieux, parfait sur parquet et dans les escaliers." },
      ],
      description: "Les chaussons dont vous avez toujours rêvé, mais vraiment chauds. Le chauffage intégré enveloppe les orteils et la plante du pied, tandis que la doublure en polaire sherpa garde la chaleur même éteints. Parfaits pour le télétravail, les soirées sur le canapé et tous ceux qui ont les pieds gelés.",
      specs: [
        ["Pointures", "Du 36 au 46 (5 tailles)"],
        ["Température", "40 / 45 / 50 °C"],
        ["Autonomie", "2 h 30 (fort) à 6 h (doux)"],
        ["Recharge", "USB-C, environ 3 h"],
        ["Matières", "Feutrine extérieure, polaire sherpa, semelle en caoutchouc"],
        ["Lavage", "À la main, après avoir retiré les batteries"],
      ],
      inBox: ["1 paire de chaussons", "2 batteries rechargeables", "Câble USB-C double", "Guide de démarrage multilingue"],
    },
    "tepore-cup": {
      subtitle: "Chauffe-tasse intelligent à détection automatique",
      short: "Posez votre tasse, il s'allume. Soulevez-la, il s'éteint. Votre café reste chaud jusqu'à la dernière gorgée.",
      storyTitle: "La dernière gorgée, aussi chaude que la première.",
      badge: "Idée cadeau",
      variantLabel: "Finition",
      chooseCta: "Choisir la finition",
      variants: { nero: "Noir mat" },
      highlights: [
        { title: "Capteur de poids", text: "S'allume quand vous posez la tasse, s'éteint quand vous la soulevez." },
        { title: "3 températures", text: "45, 55 ou 65 °C : du thé délicat au café brûlant." },
        { title: "Anneau LED ambré", text: "Une lueur chaude indique d'un coup d'œil qu'il chauffe." },
        { title: "Arrêt après 4 heures", text: "Il s'éteint tout seul, même si vous oubliez la tasse dessus." },
      ],
      description: "Combien de fois avez-vous retrouvé votre café froid sur le bureau ? Tepore Cup garde vos boissons à la température de votre choix aussi longtemps que vous le souhaitez. Grâce au capteur de poids, tout est automatique : aucun bouton à retenir, aucun gaspillage.",
      specs: [
        ["Plaque", "10 cm de diamètre, pour tasses à fond plat"],
        ["Température", "45 / 55 / 65 °C"],
        ["Puissance", "20 W"],
        ["Sécurité", "Capteur de poids, arrêt après 4 h"],
        ["Surface", "Verre trempé, résistant aux éclaboussures"],
        ["Alimentation", "Adaptateur 220–240 V inclus"],
      ],
      inBox: ["Socle chauffant", "Adaptateur secteur", "Guide de démarrage multilingue"],
    },
  },

  bundle: { name: "Coffret Hiver Tepore", subtitle: "Mat + Slippers + Cup" },

  reviews: {
    r1: { city: "Turin", title: "Enfin les pieds au chaud !", text: "Je travaille de chez moi et j'avais toujours les pieds gelés. Je les porte toute la journée au niveau moyen et la batterie tient jusqu'au soir. Ultra-doux." },
    r2: { city: "Bologne", title: "La salle de bain le matin, c'est autre chose", text: "Je l'allume dès le réveil et une minute plus tard il est déjà chaud. Ça paraît anodin, mais ça a changé mes matins d'hiver." },
    r3: { city: "Milan", title: "Mon café ne refroidit plus", text: "Il est sur mon bureau : le capteur fonctionne parfaitement, je pose la tasse et il démarre. L'anneau lumineux est joli en plus." },
    r4: { city: "Rome", title: "Super cadeau", text: "Achetés pour ma mère, qui est très frileuse. La pointure correspond bien au guide. Une étoile en moins seulement parce que j'aimerais plus de couleurs." },
    r5: { city: "Naples", title: "Doux et chaud", text: "Je le pensais rigide, mais il est très doux et ne glisse pas sur le carrelage. Je le recommande à tous ceux qui ont une salle de bain froide." },
    r6: { city: "Vérone", title: "Parfait en télétravail", text: "Du thé chaud toute la matinée. J'en ai aussi offert un à un collègue, il a adoré." },
  },

  faqs: [
    { q: "Quel est le délai de livraison ?", a: "Nous livrons en Italie et dans toute l'Union européenne en {days} par transporteur avec suivi. Vous recevez le numéro de suivi par e-mail dès l'expédition. La livraison est offerte dès {free}." },
    { q: "Puis-je retourner un produit ?", a: "Oui. Vous disposez de {returnDays} jours après la livraison pour changer d'avis : écrivez-nous et nous vous envoyons les instructions de retour. Le remboursement est effectué sur le moyen de paiement d'origine sous 14 jours après réception du retour." },
    { q: "Les produits sont-ils sûrs ?", a: "Tous les produits Tepore sont marqués CE, protégés contre la surchauffe et équipés d'un arrêt automatique. Le tapis et le chauffe-tasse fonctionnent à faible puissance, les chaussons sur batterie basse tension." },
    { q: "Comment choisir la pointure des chaussons ?", a: "Prenez votre pointure habituelle. Si vous êtes entre deux tailles (par exemple 39,5), choisissez la plus grande : la doublure en polaire est très enveloppante." },
    { q: "Combien consomment-ils ?", a: "Très peu. Le chauffe-tasse consomme 20 W et le tapis environ 50 W : une heure d'utilisation coûte moins de 2 centimes d'électricité." },
    { q: "Y a-t-il une garantie ?", a: "Oui, une garantie légale de {warrantyYears} ans sur tous les produits. Si quelque chose ne fonctionne pas, nous le remplaçons." },
    { q: "Quels moyens de paiement acceptez-vous ?", a: "Cartes de crédit et de débit (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay et paiement en 3 fois sans frais avec Klarna." },
  ],
};
