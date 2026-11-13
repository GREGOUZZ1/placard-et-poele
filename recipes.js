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
