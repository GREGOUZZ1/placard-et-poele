"use strict";

// Les poids sont exprimés en grammes pour deux portions. Le libellé peut préciser l’état de l’aliment.
const BASE_SERVINGS = 2;
const recipes = [
  {
    id: "poulet-citron", title: "Poulet citronné, riz et courgettes", minutes: 30,
    photo: "poulet-citron", description: "Du poulet doré, des courgettes fondantes et un filet de citron sur du riz.",
    items: [["poulet", 260], ["riz", 140, "Riz cru"], ["courgette", 240], ["citron", 30, "Jus de citron"], ["huile", 16]],
    steps: [
      "Fais cuire le riz dans l’eau selon le paquet. Coupe la courgette en rondelles et le poulet en lanières.",
      "Chauffe la moitié de l’huile dans une poêle. Fais dorer les courgettes 6 à 8 minutes, en les retournant à mi-cuisson, puis réserve-les.",
      "Ajoute le reste d’huile et saisis le poulet jusqu’à ce qu’il atteigne 74 °C à cœur. Hors du feu, verse le jus de citron et sers avec le riz et les courgettes.",
    ],
  },
  {
    id: "pois-chiches-tomate", title: "Poêlée de pois chiches aux tomates", minutes: 20, vegetarian: true,
    photo: "pois-chiches-tomate", description: "Des pois chiches dorés, des tomates juteuses et une poignée d’épinards.",
    items: [["poisChiches", 340, "Pois chiches cuits, égouttés"], ["tomates", 220], ["epinards", 100], ["ail", 8], ["huile", 16]],
    steps: [
      "Rince et égoutte les pois chiches. Coupe les tomates en morceaux et hache l’ail.",
      "Fais chauffer l’huile et dore les pois chiches 5 minutes. Ajoute l’ail puis les tomates et laisse cuire 7 à 8 minutes à feu moyen.",
      "Incorpore les épinards et remue 1 à 2 minutes, jusqu’à ce qu’ils soient tendres. Sers chaud.",
    ],
  },
  {
    id: "pates-tomates", title: "Pâtes aux tomates rôties", minutes: 25,
    photo: "pates-tomates", description: "Les tomates rôties et le parmesan font toute la sauce.",
    items: [["pates", 170, "Pâtes sèches"], ["tomates", 300], ["parmesan", 35], ["ail", 6], ["huile", 16]],
    steps: [
      "Préchauffe le four à 220 °C. Coupe les tomates, mélange-les avec l’ail haché et l’huile, puis fais-les rôtir 15 à 18 minutes.",
      "Fais cuire les pâtes selon le paquet. Garde une petite louche d’eau de cuisson avant de les égoutter.",
      "Mélange les pâtes aux tomates avec un peu d’eau de cuisson. Râpe le parmesan par-dessus et sers aussitôt.",
    ],
  },
  {
    id: "omelette-feta", title: "Omelette aux épinards et à la feta", minutes: 15,
    photo: "omelette-feta", description: "Une omelette moelleuse et une garniture d’épinards à la feta.",
    items: [["oeufs", 200, "Œufs, sans coquille", 50], ["epinards", 120], ["feta", 65], ["huile", 12]],
    steps: [
      "Bats les œufs dans un bol et émiette la feta.",
      "Fais tomber les épinards 2 minutes dans la moitié de l’huile. Verse le reste d’huile et ajoute les œufs battus.",
      "Laisse cuire à feu doux jusqu’à ce que les œufs soient pris. Répartis la feta sur une moitié et replie l’omelette.",
    ],
  },
  {
    id: "salade-thon", title: "Salade de thon et pois chiches", minutes: 15,
    photo: "salade-thon", description: "Une salade croquante au thon, aux légumes frais et au citron.",
    items: [["thon", 140, "Thon au naturel, égoutté"], ["poisChiches", 230, "Pois chiches cuits, égouttés"], ["tomates", 160], ["concombre", 150], ["oignon", 40], ["citron", 24, "Jus de citron"], ["huile", 16]],
    steps: [
      "Rince et égoutte les pois chiches. Égoutte le thon et émiette-le à la fourchette.",
      "Coupe le concombre et les tomates en dés, puis émince finement l’oignon.",
      "Mélange le jus de citron et l’huile dans un saladier. Ajoute le thon, les pois chiches et les légumes, puis remue délicatement.",
    ],
  },
  {
    id: "veloute-carottes", title: "Velouté de carottes et lentilles", minutes: 35, vegetarian: true,
    photo: "veloute-carottes", description: "Un velouté doux, avec du yaourt nature pour la touche fraîche.",
    items: [["carotte", 360], ["lentilles", 240, "Lentilles vertes cuites, égouttées"], ["oignon", 90], ["yaourt", 80], ["huile", 12]],
    steps: [
      "Coupe les carottes en rondelles et émince l’oignon. Fais revenir le tout 5 minutes dans l’huile.",
      "Couvre les carottes d’eau et laisse mijoter jusqu’à ce qu’elles soient tendres, environ 20 minutes. Ajoute les lentilles déjà cuites pendant les 3 dernières minutes.",
      "Mixe en ajoutant progressivement l’eau de cuisson jusqu’à la texture souhaitée. Répartis le yaourt sur les bols au moment de servir.",
    ],
  },
  {
    id: "poelee-pommes-de-terre", title: "Poêlée de pommes de terre et œufs", minutes: 35, vegetarian: true,
    photo: "poelee-pommes-de-terre", description: "Des pommes de terre bien dorées, un poivron fondant et des œufs à la poêle.",
    items: [["pommesDeTerre", 430, "Pommes de terre épluchées"], ["oeufs", 150, "Œufs, sans coquille", 50], ["poivron", 140], ["oignon", 90], ["huile", 20]],
    steps: [
      "Coupe les pommes de terre en dés et précuis-les 8 minutes dans l’eau bouillante. Égoutte-les soigneusement.",
      "Chauffe l’huile dans une poêle large. Dore les pommes de terre, le poivron en dés et l’oignon émincé, en remuant de temps en temps.",
      "Creuse un puits par œuf, casse-les dedans et couvre à feu doux. Poursuis jusqu’à ce que les blancs et les jaunes soient pris.",
    ],
  },
  {
    id: "tartines-avocat", title: "Tartines d’avocat et œufs", minutes: 15, vegetarian: true,
    photo: "tartines-avocat", description: "De l’avocat citronné, des tomates et un œuf sur du pain grillé.",
    items: [["pain", 120], ["avocat", 150, "Avocat, chair"], ["oeufs", 100, "Œufs, sans coquille", 50], ["tomates", 120], ["citron", 16, "Jus de citron"], ["huile", 8]],
    steps: [
      "Fais griller le pain. Écrase la chair de l’avocat avec le jus de citron et coupe les tomates en petits morceaux.",
      "Fais cuire les œufs dans une poêle avec l’huile jusqu’à ce que les blancs et les jaunes soient pris.",
      "Tartine le pain d’avocat, ajoute les tomates et dépose les œufs par-dessus.",
    ],
  },
  {
    id: "riz-saute", title: "Riz sauté aux légumes et aux œufs", minutes: 25, vegetarian: true,
    photo: "riz-saute", description: "Une poêlée rapide avec des petits pois, des carottes et de la sauce soja.",
    items: [["riz", 140, "Riz cru"], ["oeufs", 100, "Œufs, sans coquille", 50], ["carotte", 120], ["petitsPois", 100, "Petits pois cuits, égouttés"], ["sauceSoja", 20], ["huile", 16]],
    steps: [
      "Fais cuire le riz selon le paquet. Égoutte-le bien et étale-le sur une grande assiette le temps de préparer la garniture.",
      "Coupe les carottes en petits dés. Fais-les revenir dans la moitié de l’huile 5 minutes, puis ajoute les petits pois. Repousse les légumes sur un côté de la poêle.",
      "Verse les œufs battus dans l’autre moitié de la poêle et brouille-les jusqu’à ce qu’ils soient pris. Ajoute le riz, le reste de l’huile et la sauce soja, puis fais sauter 2 minutes.",
    ],
  },
  {
    id: "pates-champignons", title: "Pâtes crémeuses aux champignons", minutes: 25, vegetarian: true,
    photo: "pates-champignons", description: "Des champignons dorés à l’ail dans une sauce à la crème.",
    items: [["pates", 165, "Pâtes sèches"], ["champignons", 300], ["creme", 95, "Crème fraîche (30 % MG)"], ["ail", 8], ["beurre", 12]],
    steps: [
      "Fais cuire les pâtes selon le paquet. Nettoie et émince les champignons, puis hache l’ail.",
      "Fais dorer les champignons dans le beurre à feu moyen-vif. Ajoute l’ail en fin de cuisson et baisse le feu.",
      "Incorpore la crème et les pâtes égouttées. Ajoute un peu d’eau de cuisson si nécessaire et mélange à feu doux.",
    ],
  },
  {
    id: "riz-haricots-rouges", title: "Riz aux haricots rouges", minutes: 30, vegetarian: true,
    photo: "riz-haricots-rouges", description: "Du riz et des haricots rouges mijotés avec des tomates et de l’oignon.",
    items: [["riz", 130, "Riz cru"], ["haricots", 300, "Haricots rouges cuits, égouttés"], ["tomates", 280], ["oignon", 85], ["huile", 16]],
    steps: [
      "Fais cuire le riz selon le paquet. Rince et égoutte les haricots rouges déjà cuits.",
      "Fais fondre l’oignon émincé dans l’huile, puis ajoute les tomates coupées. Laisse compoter une dizaine de minutes.",
      "Ajoute les haricots avec un peu d’eau si la sauce épaissit trop. Laisse mijoter 5 minutes et sers avec le riz.",
    ],
  },
  {
    id: "pancakes-banane", title: "Pancakes à la banane et à l’avoine", minutes: 20, vegetarian: true,
    photo: "pancakes-banane", description: "Des petits pancakes moelleux pour utiliser une banane bien mûre.",
    items: [["banane", 150, "Banane, chair"], ["avoine", 100], ["oeufs", 100, "Œufs, sans coquille", 50], ["lait", 90, "Lait demi-écrémé"], ["huile", 8]],
    steps: [
      "Écrase la banane. Mixe-la avec les flocons d’avoine, les œufs et le lait. Laisse reposer la pâte 3 minutes.",
      "Chauffe une poêle et huile-la légèrement. Verse des petits tas de pâte et cuis à feu moyen jusqu’à ce que les bords soient pris.",
      "Retourne les pancakes et cuis l’autre face jusqu’à ce que le centre soit pris. Répète avec le reste de la pâte.",
    ],
  },
  {
    id: "omelette-champignons", title: "Omelette aux champignons", minutes: 15, vegetarian: true,
    photo: "omelette-champignons",
    items: [["oeufs", 200, "Œufs, sans coquille", 50], ["champignons", 220], ["beurre", 12], ["ail", 5]],
    steps: [
      "Émince les champignons et fais-les dorer dans le beurre. Ajoute l’ail haché en fin de cuisson.",
      "Verse les œufs battus et cuis à feu doux jusqu’à ce qu’ils soient pris.",
    ],
  },
  {
    id: "oeufs-tomates", title: "Œufs mijotés aux tomates", minutes: 25, vegetarian: true,
    photo: "oeufs-tomates",
    items: [["oeufs", 200, "Œufs, sans coquille", 50], ["tomates", 450], ["oignon", 80], ["ail", 5], ["huile", 14]],
    steps: [
      "Fais revenir l’oignon et l’ail dans l’huile. Ajoute les tomates en dés et laisse réduire 12 minutes.",
      "Creuse un puits par œuf, casse-les dedans et couvre jusqu’à ce que les blancs et les jaunes soient pris.",
    ],
  },
  {
    id: "tortilla", title: "Tortilla aux pommes de terre", minutes: 35, vegetarian: true,
    photo: "tortilla",
    items: [["oeufs", 250, "Œufs, sans coquille", 50], ["pommesDeTerre", 400, "Pommes de terre épluchées"], ["oignon", 85], ["huile", 24]],
    steps: [
      "Coupe finement les pommes de terre et l’oignon. Fais-les cuire à couvert dans l’huile en remuant jusqu’à ce qu’ils soient tendres.",
      "Mélange aux œufs battus, remets dans la poêle et cuis à feu doux. Retourne à l’aide d’une assiette et cuis l’autre face jusqu’à ce que le centre soit pris.",
    ],
  },
  {
    id: "oeufs-cocotte", title: "Œufs cocotte aux épinards", minutes: 25, vegetarian: true,
    photo: "oeufs-cocotte",
    items: [["oeufs", 200, "Œufs, sans coquille", 50], ["epinards", 160], ["creme", 80, "Crème fraîche (30 % MG)"], ["beurre", 8]],
    steps: [
      "Fais tomber les épinards à la poêle et répartis-les dans deux ramequins beurrés avec la crème.",
      "Casse les œufs sur les épinards. Place les ramequins au bain-marie au four à 180 °C jusqu’à ce que les œufs soient pris.",
    ],
  },
  {
    id: "pates-thon", title: "Pâtes au thon et aux tomates", minutes: 25,
    photo: "pates-thon",
    items: [["pates", 170, "Pâtes sèches"], ["thon", 145, "Thon au naturel, égoutté"], ["tomates", 330], ["ail", 6], ["huile", 14]],
    steps: [
      "Cuis les pâtes selon le paquet et garde un peu d’eau de cuisson.",
      "Fais revenir l’ail et les tomates dans l’huile 10 minutes. Ajoute le thon égoutté, les pâtes et un filet d’eau de cuisson.",
    ],
  },
  {
    id: "pates-courgettes", title: "Pâtes crémeuses aux courgettes", minutes: 25, vegetarian: true,
    photo: "pates-courgettes",
    items: [["pates", 170, "Pâtes sèches"], ["courgette", 330], ["creme", 80, "Crème fraîche (30 % MG)"], ["ail", 6], ["huile", 12]],
    steps: [
      "Fais cuire les pâtes et réserve un peu de leur eau.",
      "Dore les courgettes en demi-rondelles dans l’huile. Ajoute l’ail, la crème et les pâtes. Lie avec un peu d’eau de cuisson.",
    ],
  },
  {
    id: "pates-epinards", title: "Pâtes aux épinards et à la feta", minutes: 20,
    photo: "pates-epinards",
    items: [["pates", 160, "Pâtes sèches"], ["epinards", 200], ["feta", 85], ["huile", 12], ["ail", 5]],
    steps: [
      "Fais cuire les pâtes en gardant une louche d’eau de cuisson.",
      "Fais tomber les épinards avec l’ail et l’huile. Ajoute les pâtes, la feta émiettée et assez d’eau de cuisson pour les enrober.",
    ],
  },
  {
    id: "poulet-creme", title: "Poulet crémeux aux champignons", minutes: 25,
    photo: "poulet-creme",
    items: [["poulet", 300], ["champignons", 270], ["creme", 100, "Crème fraîche (30 % MG)"], ["oignon", 70], ["huile", 14]],
    steps: [
      "Dore l’oignon et les champignons émincés dans la moitié de l’huile, puis réserve.",
      "Dans la même poêle, saisis le poulet émincé dans le reste d’huile. Remets les légumes, ajoute la crème et poursuis jusqu’à 74 °C à cœur pour le poulet.",
    ],
  },
  {
    id: "poulet-poivron", title: "Poulet sauté aux poivrons et au soja", minutes: 25,
    photo: "poulet-poivron",
    items: [["poulet", 300], ["poivron", 220], ["oignon", 90], ["sauceSoja", 25], ["huile", 15]],
    steps: [
      "Émince l’oignon et le poivron et fais-les sauter dans la moitié de l’huile.",
      "Ajoute le poulet en lanières et le reste d’huile. Verse la sauce soja en fin de cuisson et vérifie que le poulet atteint 74 °C à cœur.",
    ],
  },
  {
    id: "poulet-pommes", title: "Poulet et pommes de terre au four", minutes: 45,
    photo: "poulet-pommes",
    items: [["poulet", 300], ["pommesDeTerre", 500, "Pommes de terre épluchées"], ["citron", 25, "Jus de citron"], ["huile", 20], ["ail", 8]],
    steps: [
      "Enrobe les dés de pommes de terre d’une partie de l’huile et enfourne à 210 °C pour 20 minutes.",
      "Ajoute le poulet badigeonné du reste d’huile, d’ail haché et de jus de citron. Poursuis jusqu’à ce que le poulet atteigne 74 °C à cœur et que les pommes de terre soient tendres.",
    ],
  },
  {
    id: "poulet-carottes", title: "Poulet aux carottes et au yaourt citronné", minutes: 30,
    photo: "poulet-carottes",
    items: [["poulet", 280], ["carotte", 320], ["yaourt", 120], ["citron", 25, "Jus de citron"], ["huile", 14]],
    steps: [
      "Coupe les carottes en fins bâtonnets et fais-les dorer dans la moitié de l’huile.",
      "Saisis le poulet émincé dans le reste d’huile jusqu’à 74 °C à cœur. Sers avec les carottes et le yaourt mélangé au jus de citron.",
    ],
  },
  {
    id: "riz-thon", title: "Salade de riz au thon et concombre", minutes: 25,
    photo: "riz-thon",
    items: [["riz", 130, "Riz cru"], ["thon", 150, "Thon au naturel, égoutté"], ["concombre", 220], ["tomates", 170], ["citron", 25, "Jus de citron"], ["huile", 15]],
    steps: [
      "Fais cuire le riz. Égoutte-le et passe-le sous l’eau froide, puis égoutte-le de nouveau.",
      "Ajoute le thon égoutté et les légumes en dés. Assaisonne avec le citron et l’huile, puis sers aussitôt.",
    ],
  },
  {
    id: "riz-champignons", title: "Riz crémeux aux champignons", minutes: 30, vegetarian: true,
    photo: "riz-champignons",
    items: [["riz", 150, "Riz cru"], ["champignons", 290], ["oignon", 80], ["creme", 80, "Crème fraîche (30 % MG)"], ["beurre", 12]],
    steps: [
      "Cuis le riz selon le paquet. Fais dorer les champignons et l’oignon émincés dans le beurre.",
      "Ajoute le riz égoutté et la crème aux champignons. Mélange à feu doux deux minutes et sers chaud.",
    ],
  },
  {
    id: "riz-pois-chiches", title: "Riz aux pois chiches et aux épinards", minutes: 25, vegetarian: true,
    photo: "riz-pois-chiches",
    items: [["riz", 135, "Riz cru"], ["poisChiches", 240, "Pois chiches cuits, égouttés"], ["epinards", 160], ["ail", 6], ["huile", 14], ["citron", 25, "Jus de citron"]],
    steps: [
      "Cuis le riz selon le paquet. Rince et égoutte les pois chiches cuits.",
      "Fais revenir les pois chiches et l’ail dans l’huile, puis ajoute les épinards. Mélange au riz et termine avec le citron.",
    ],
  },
  {
    id: "salade-lentilles", title: "Salade de lentilles, carottes et œufs", minutes: 25, vegetarian: true,
    photo: "salade-lentilles",
    items: [["lentilles", 280, "Lentilles vertes cuites, égouttées"], ["carotte", 160], ["oeufs", 100, "Œufs, sans coquille", 50], ["citron", 25, "Jus de citron"], ["huile", 15]],
    steps: [
      "Cuis les œufs 10 minutes dans l’eau bouillante. Refroidis-les, écale-les et coupe-les en quartiers.",
      "Mélange les lentilles cuites et égouttées avec les carottes râpées, le jus de citron et l’huile. Dispose les œufs dessus.",
    ],
  },
  {
    id: "salade-concombre", title: "Salade de concombre au yaourt", minutes: 10, vegetarian: true,
    photo: "salade-concombre",
    items: [["concombre", 380], ["yaourt", 150], ["citron", 20, "Jus de citron"], ["ail", 4]],
    steps: [
      "Coupe le concombre en fines demi-rondelles.",
      "Mélange le yaourt avec le citron et l’ail râpé. Enrobe le concombre de cette sauce et sers frais.",
    ],
  },
  {
    id: "salade-haricots", title: "Salade de haricots rouges et avocat", minutes: 15, vegetarian: true,
    photo: "salade-haricots",
    items: [["haricots", 260, "Haricots rouges cuits, égouttés"], ["avocat", 130, "Avocat, chair"], ["tomates", 200], ["oignon", 40], ["citron", 30, "Jus de citron"], ["huile", 12]],
    steps: [
      "Rince et égoutte les haricots rouges cuits. Coupe les tomates et l’avocat en dés.",
      "Émince l’oignon. Mélange le tout avec le jus de citron et l’huile, puis sers.",
    ],
  },
  {
    id: "salade-pois-chiches", title: "Salade de pois chiches et concombre", minutes: 15, vegetarian: true,
    photo: "salade-pois-chiches",
    items: [["poisChiches", 300, "Pois chiches cuits, égouttés"], ["concombre", 180], ["tomates", 220], ["citron", 25, "Jus de citron"], ["huile", 16]],
    steps: [
      "Rince et égoutte les pois chiches cuits. Coupe le concombre et les tomates en dés.",
      "Mélange le tout avec le citron et l’huile. Laisse reposer quelques minutes avant de servir.",
    ],
  },
  {
    id: "houmous", title: "Tartinade de pois chiches au citron", minutes: 10, vegetarian: true,
    photo: "houmous",
    items: [["poisChiches", 300, "Pois chiches cuits, égouttés"], ["citron", 30, "Jus de citron"], ["ail", 5], ["huile", 20]],
    steps: [
      "Rince et égoutte les pois chiches cuits, puis mixe-les avec le jus de citron, l’ail et l’huile.",
      "Ajoute un peu d’eau froide à la cuillère en mixant jusqu’à obtenir une texture tartinable.",
    ],
  },
  {
    id: "soupe-courgettes", title: "Soupe de courgettes et pommes de terre", minutes: 30, vegetarian: true,
    photo: "soupe-courgettes",
    items: [["courgette", 450], ["pommesDeTerre", 230, "Pommes de terre épluchées"], ["oignon", 80], ["huile", 13]],
    steps: [
      "Émince l’oignon et fais-le revenir dans l’huile. Ajoute les courgettes et les pommes de terre en dés.",
      "Couvre juste d’eau et laisse mijoter jusqu’à ce que les légumes soient tendres. Mixe en ajustant la quantité d’eau.",
    ],
  },
  {
    id: "soupe-petits-pois", title: "Velouté de petits pois et de yaourt", minutes: 20, vegetarian: true,
    photo: "soupe-petits-pois",
    items: [["petitsPois", 350, "Petits pois cuits, égouttés"], ["pommesDeTerre", 180, "Pommes de terre épluchées"], ["oignon", 70], ["yaourt", 80], ["huile", 10]],
    steps: [
      "Fais revenir l’oignon émincé dans l’huile. Ajoute les pommes de terre en petits dés et couvre d’eau.",
      "Quand les pommes de terre sont tendres, ajoute les petits pois cuits et égouttés. Chauffe quelques minutes, mixe et sers avec le yaourt.",
    ],
  },
  {
    id: "gratin-pommes", title: "Gratin de pommes de terre à la crème", minutes: 55, vegetarian: true,
    photo: "gratin-pommes",
    items: [["pommesDeTerre", 560, "Pommes de terre épluchées"], ["creme", 160, "Crème fraîche (30 % MG)"], ["lait", 140, "Lait demi-écrémé"], ["ail", 6], ["beurre", 10]],
    steps: [
      "Frotte un plat avec l’ail et beurre-le. Coupe les pommes de terre en tranches fines et dispose-les dans le plat.",
      "Verse le lait mélangé à la crème. Enfourne à 180 °C jusqu’à ce que le dessus soit doré et qu’un couteau traverse les pommes de terre sans résistance.",
    ],
  },
  {
    id: "gratin-courgettes", title: "Gratin de courgettes au parmesan", minutes: 40,
    photo: "gratin-courgettes",
    items: [["courgette", 480], ["creme", 100, "Crème fraîche (30 % MG)"], ["oeufs", 100, "Œufs, sans coquille", 50], ["parmesan", 45], ["huile", 12]],
    steps: [
      "Dore les rondelles de courgette dans l’huile pour évaporer une partie de leur eau.",
      "Place-les dans un plat, verse les œufs battus avec la crème et ajoute le parmesan. Enfourne à 190 °C jusqu’à ce que le gratin soit pris et doré.",
    ],
  },
  {
    id: "pommes-thon", title: "Pommes de terre garnies au thon", minutes: 45,
    photo: "pommes-thon",
    items: [["pommesDeTerre", 500, "Pommes de terre épluchées"], ["thon", 150, "Thon au naturel, égoutté"], ["yaourt", 110], ["citron", 24, "Jus de citron"]],
    steps: [
      "Coupe les pommes de terre en deux et cuis-les à 210 °C jusqu’à ce qu’elles soient tendres.",
      "Égoutte le thon et mélange-le avec le yaourt et le jus de citron. Incise la chair des pommes de terre et répartis la garniture dessus.",
    ],
  },
  {
    id: "tartines-champignons", title: "Tartines aux champignons crémeux", minutes: 20, vegetarian: true,
    photo: "tartines-champignons",
    items: [["pain", 140], ["champignons", 280], ["creme", 70, "Crème fraîche (30 % MG)"], ["ail", 5], ["beurre", 12]],
    steps: [
      "Fais griller le pain. Émince les champignons et dore-les dans le beurre à feu vif.",
      "Ajoute l’ail puis la crème et laisse épaissir à feu doux. Répartis sur les tartines.",
    ],
  },
  {
    id: "tartines-thon", title: "Tartines de thon au yaourt citronné", minutes: 10,
    photo: "tartines-thon",
    items: [["pain", 140], ["thon", 140, "Thon au naturel, égoutté"], ["yaourt", 90], ["citron", 20, "Jus de citron"], ["concombre", 120]],
    steps: [
      "Égoutte le thon et écrase-le avec le yaourt et le jus de citron.",
      "Fais griller le pain, répartis la préparation et ajoute de fines rondelles de concombre.",
    ],
  },
  {
    id: "porridge", title: "Porridge à la banane", minutes: 12, vegetarian: true,
    photo: "porridge",
    items: [["avoine", 100], ["lait", 330, "Lait demi-écrémé"], ["banane", 160, "Banane, chair"]],
    steps: [
      "Chauffe les flocons d’avoine et le lait à feu doux en remuant jusqu’à ce que le mélange épaississe.",
      "Écrase la moitié de la banane dans le porridge et sers avec le reste en rondelles.",
    ],
  },
  {
    id: "pain-perdu", title: "Pain perdu à la banane", minutes: 15, vegetarian: true,
    photo: "pain-perdu",
    items: [["pain", 140], ["oeufs", 100, "Œufs, sans coquille", 50], ["lait", 150, "Lait demi-écrémé"], ["banane", 150, "Banane, chair"], ["beurre", 14]],
    steps: [
      "Bats les œufs avec le lait et trempe les tranches de pain des deux côtés.",
      "Dore-les dans le beurre à feu moyen jusqu’à ce que le mélange soit pris à cœur. Sers avec la banane en rondelles.",
    ],
  },
];

function calculateNutrition(recipe, servings = 1) {
  const totals = [0, 0, 0, 0];
  for (const [id, grams] of recipe.items) {
    const weight = grams * servings / (100 * BASE_SERVINGS);
    ingredients[id].nutrition.forEach((amount, index) => { totals[index] += amount * weight; });
  }
  return totals;
}

function matchRecipe(recipe, available) {
  const missing = recipe.items.filter(([id]) => !available.has(id));
  const found = recipe.items.length - missing.length;
  return { recipe, missing, found, score: found / recipe.items.length };
}
