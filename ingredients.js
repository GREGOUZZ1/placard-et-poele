"use strict";

// ANSES, table Ciqual 2020, Licence Ouverte Etalab 2.0.
// Extrait de https://proteines.info/donnees/ : énergie, protéines, glucides et lipides pour 100 g.
// Les quantités correspondent à l’aliment dans l’état indiqué dans le libellé de la recette.
const ingredients = {
  poulet: { name: "Filet de poulet", aliases: ["poulet", "blanc de poulet", "filets de poulet", "escalope de poulet"], nutrition: [110, 23.4, 0, 1.5] },
  oeufs: { name: "Œufs", aliases: ["œuf", "oeuf", "oeufs"], nutrition: [140, 12.7, 0.27, 9.83] },
  courgette: { name: "Courgette", aliases: ["courgettes", "zucchini"], nutrition: [17, 1.2, 1.8, 0.26] },
  tomates: { name: "Tomates", aliases: ["tomate", "tomate cerise", "tomates cerises", "tomates cerise", "tomate fraîche", "tomates fraîches"], nutrition: [19, 0.9, 2.49, 0.26] },
  epinards: { name: "Épinards", aliases: ["épinard", "pousses d’épinards", "jeunes pousses d’épinards", "épinards frais"], nutrition: [18, 2.1, 0.85, 0.4] },
  feta: { name: "Feta", aliases: ["féta"], nutrition: [285, 15.1, 0.65, 24.3] },
  parmesan: { name: "Parmesan", aliases: ["parmesan râpé", "parmigiano"], nutrition: [406, 31.1, 0, 31] },
  ail: { name: "Ail", aliases: ["gousse d’ail", "gousses d’ail"], nutrition: [111, 5.3, 18.6, 0.5] },
  citron: { name: "Citron", aliases: ["citrons", "citron jaune", "jus de citron"], nutrition: [28, 0.5, 1.56, 0.5] },
  concombre: { name: "Concombre", aliases: ["concombres"], nutrition: [16, 0.6, 2.54, 0.11] },
  oignon: { name: "Oignon", aliases: ["oignons", "oignon jaune", "oignons jaunes", "oignon rouge", "oignons rouges"], nutrition: [38, 1.2, 6.39, 0.5] },
  carotte: { name: "Carottes", aliases: ["carotte"], nutrition: [40, 0.6, 7.59, 0.5] },
  yaourt: { name: "Yaourt nature", aliases: ["yaourt", "yogourt", "yaourts", "yogourt nature", "yaourts nature"], nutrition: [46, 4, 2.65, 1.5] },
  pommesDeTerre: { name: "Pommes de terre", aliases: ["pomme de terre", "patate", "patates", "pdt"], nutrition: [81, 2.2, 16.2, 0.18] },
  poivron: { name: "Poivron", aliases: ["poivrons", "poivron vert", "poivron rouge", "poivron jaune"], nutrition: [26, 0.8, 3.43, 0.5] },
  avocat: { name: "Avocat", aliases: ["avocats"], nutrition: [205, 1.6, 0.83, 20.6] },
  champignons: { name: "Champignons de Paris", aliases: ["champignon", "champignons", "champignon de paris"], nutrition: [28, 2.6, 3.15, 0.36] },
  creme: { name: "Crème fraîche", aliases: ["crème", "creme fraiche", "crème liquide", "crème épaisse"], nutrition: [304, 3, 2.8, 30.7] },
  banane: { name: "Banane", aliases: ["bananes"], nutrition: [91, 1.1, 19.7, 0.5] },
  lait: { name: "Lait", aliases: ["lait demi-écrémé", "lait uht"], nutrition: [47, 3.4, 4.83, 1.55] },
  riz: { name: "Riz", aliases: ["riz blanc", "riz basmati", "riz long", "riz sec", "riz cru"], nutrition: [352, 7, 78, 0.91] },
  pates: { name: "Pâtes", aliases: ["pâte", "pâtes sèches", "spaghetti", "spaghettis", "penne", "pennes", "fusilli", "tagliatelles", "macaronis", "coquillettes"], nutrition: [336, 11.5, 65.8, 1.79] },
  poisChiches: { name: "Pois chiches", aliases: ["pois chiche", "pois chiches cuits", "pois chiches en conserve", "pois chiches en boîte"], nutrition: [147, 8.3, 17.7, 3] },
  huile: { name: "Huile d’olive", aliases: ["huile", "huile végétale", "huile neutre", "huile de tournesol", "huile de colza", "huile olive"], nutrition: [900, 0.2, 0, 99.9] },
  thon: { name: "Thon en boîte", aliases: ["thon", "thon au naturel", "thon en conserve", "boîte de thon"], nutrition: [111, 26.8, 0, 0.4] },
  lentilles: { name: "Lentilles vertes", aliases: ["lentille", "lentilles", "lentilles cuites", "lentilles vertes cuites", "lentilles en conserve"], nutrition: [127, 10.1, 16.2, 0.58] },
  pain: { name: "Pain complet", aliases: ["pain", "pain de mie", "baguette", "pain intégral", "tranches de pain"], nutrition: [244, 8.4, 44.3, 1.8] },
  petitsPois: { name: "Petits pois", aliases: ["petit pois", "petits pois en boîte", "petits pois surgelés"], nutrition: [82, 5.1, 10.7, 0.8] },
  sauceSoja: { name: "Sauce soja", aliases: ["sauce de soja", "soja liquide"], nutrition: [46, 7.1, 3.64, 0.1] },
  haricots: { name: "Haricots rouges", aliases: ["haricot rouge", "haricots rouges cuits", "haricots rouges en conserve", "haricots rouges en boîte"], nutrition: [116, 9.6, 12.3, 0.6] },
  avoine: { name: "Flocons d’avoine", aliases: ["avoine", "flocon d’avoine", "flocons avoine"], nutrition: [367, 13.3, 57.9, 6.51] },
  beurre: { name: "Beurre", aliases: ["beurre doux", "beurre salé", "beurre demi-sel"], nutrition: [753, 0.7, 0.9, 82.9] },
};

function normalizeIngredient(value) {
  return value.toLowerCase().normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const ingredientAliases = new Map();
for (const [id, { name, aliases }] of Object.entries(ingredients)) {
  for (const value of [name, ...aliases]) ingredientAliases.set(normalizeIngredient(value), id);
}
