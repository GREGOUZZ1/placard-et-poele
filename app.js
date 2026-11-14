"use strict";

const STORAGE_KEY = "placard-et-poele.v1";
const PAGE_SIZE = 6;
const places = ["frigo", "placard"];
const recipeById = new Map(recipes.map(recipe => [recipe.id, recipe]));
const number = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
const byId = id => document.getElementById(id);
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const storageButtons = [...document.querySelectorAll("[data-storage]")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];

const quickAdds = {
  frigo: ["oeufs", "tomates", "poulet", "courgette", "epinards", "carotte"],
  placard: ["riz", "pates", "poisChiches", "huile", "thon", "lentilles"],
};
const example = {
  frigo: ["oeufs", "tomates", "epinards", "citron", "courgette", "poulet", "ail", "feta"],
  placard: ["riz", "poisChiches", "huile"],
};

const state = {
  ...loadSaved(),
  storage: "frigo",
  filter: "all",
  favoritesOnly: false,
  view: "",
  searched: false,
  visible: PAGE_SIZE,
  currentRecipe: null,
  servings: BASE_SERVINGS,
  nutritionMode: "portion",
};

function loadSaved() {
  const empty = { pantry: { frigo: new Map(), placard: new Map() }, favorites: new Set() };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return empty;
    for (const place of places) {
      const entries = saved.pantry?.[place];
      if (!Array.isArray(entries)) continue;
      for (const label of entries) {
        if (typeof label !== "string") continue;
        const item = parseIngredient(label);
        if (item) empty.pantry[place].set(...item);
      }
    }
    if (Array.isArray(saved.favorites)) {
      empty.favorites = new Set(saved.favorites.filter(id => recipeById.has(id)));
    }
  } catch {
    // Un navigateur sans stockage local peut utiliser le site pendant la session.
  }
  return empty;
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      pantry: Object.fromEntries(places.map(place => [place, [...state.pantry[place].values()]])),
      favorites: [...state.favorites],
    }));
  } catch {
    // L’état en mémoire reste disponible si le stockage local est bloqué.
  }
}

function parseIngredient(raw) {
  const label = raw.trim().replace(/\s+/g, " ").slice(0, 75);
  const normalized = normalizeIngredient(label);
  const candidate = normalized
    .replace(/^\d+(?: \d+)?\s*(?:(?:kg|g|gr|ml|cl|l)\b\s*)?(?:(?:de|d)\s+)?/, "")
    .replace(/^(?:des|du|de la|un|une)\s+/, "");
  if (!candidate) return null;
  const id = ingredientAliases.get(normalized) ?? ingredientAliases.get(candidate);
  return id ? [id, ingredients[id].name] : [`libre:${normalized}`, label];
}

function availableIngredients() {
  return new Set([...state.pantry.frigo.keys(), ...state.pantry.placard.keys()]);
}

function pantrySize() {
  return state.pantry.frigo.size + state.pantry.placard.size;
}

function message(text) {
  const element = byId("ingredient-message");
  element.hidden = !text;
  element.textContent = text;
}

function renderPantry() {
  const current = state.pantry[state.storage];
  const total = pantrySize();
  byId("pantry-summary").textContent = total ? `${total} ingrédient${total > 1 ? "s" : ""} dans ton stock` : "Ton frigo et ton placard";
  for (const button of storageButtons) {
    const place = button.dataset.storage;
    const count = state.pantry[place].size;
    button.setAttribute("aria-pressed", place === state.storage);
    button.lastElementChild.textContent = count;
    button.lastElementChild.hidden = count === 0;
  }

  const list = document.createElement("ul");
  list.className = "inventory-list";
  list.setAttribute("aria-label", state.storage === "frigo" ? "Ingrédients dans le frigo" : "Ingrédients dans le placard");
  for (const [key, label] of current) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inventory-chip";
    button.setAttribute("aria-label", `Retirer ${label}`);
    button.append(document.createTextNode(label));
    button.insertAdjacentHTML("beforeend", icon("close"));
    button.addEventListener("click", () => {
      current.delete(key);
      updatePantry();
      byId("ingredient-input").focus({ preventScroll: true });
      message(`${label} retiré du stock.`);
    });
    item.append(button);
    list.append(item);
  }
  byId("inventory").replaceChildren(...(current.size ? [list] : []));

  const suggestions = quickAdds[state.storage].filter(id => !current.has(id));
  byId("suggestions").hidden = suggestions.length === 0;
  byId("ingredient-suggestions").innerHTML = suggestions.map(id => (
    `<button class="suggestion-chip" type="button" data-ingredient="${id}">${icon("plus")}${ingredients[id].name}</button>`
  )).join("");
  byId("clear-pantry").hidden = total === 0;
}

function updatePantry() {
  state.visible = PAGE_SIZE;
  save();
  renderPantry();
  renderRecipes();
  if (state.currentRecipe) renderDialogValues();
}

function recipeImage(recipe, extraClass = "") {
  const loading = extraClass ? "eager" : "lazy";
  const content = recipe.photo ? `<img src="assets/${recipe.photo}.webp" alt="" width="752" height="496" loading="${loading}" decoding="async">` : icon("pan");
  return `<div class="recipe-image ${extraClass}" aria-hidden="true">${content}</div>`;
}

function recipeMeta(recipe) {
  const diet = recipe.vegetarian ? `<span class="diet">${icon("leaf")} Végétarien</span>` : "";
  return `<div class="recipe-meta"><span>${icon("clock")} ${recipe.minutes} min</span>${diet}</div>`;
}

function macroList(values, id = "") {
  const labels = ["Énergie", "Protéines", "Glucides", "Lipides"];
  const rows = values.map((value, index) => {
    const amount = index === 0 ? Math.round(value) : value;
    return `<div${index === 0 ? ' class="energy"' : ""}><dt>${labels[index]}</dt><dd>${number.format(amount)} <small>${index === 0 ? "kcal" : "g"}</small></dd></div>`;
  });
  return `<dl class="card-macros"${id ? ` id="${id}"` : ' aria-label="Valeurs estimées par portion"'}>${rows.join("")}</dl>`;
}

function favoriteButton(recipe, dialog = false) {
  const active = state.favorites.has(recipe.id);
  return `<button type="button" class="icon-button ${dialog ? "dialog-favorite" : "card-favorite"}" data-favorite="${recipe.id}" aria-label="${active ? "Retirer des favoris" : "Ajouter aux favoris"} · ${recipe.title}" aria-pressed="${active}">${icon("heart")}</button>`;
}

function recipeCard({ recipe, missing }, hasPantry) {
  let status = "";
  if (hasPantry) {
    const count = missing.length;
    status = count
      ? `<span class="match">${state.view === "ingredients" ? `À prévoir : ${missing.map(([id]) => ingredients[id].name).join(", ")}` : `${count} ingrédient${count > 1 ? "s" : ""} à prévoir`}</span>`
      : `<span class="match match-ready">${icon("check")} Tout est là</span>`;
  }
  return `<article class="recipe-card">
    ${recipeImage(recipe)}${favoriteButton(recipe)}
    <div class="recipe-body">
      ${recipeMeta(recipe)}
      <h3><button class="recipe-title-button" type="button" data-open="${recipe.id}">${recipe.title}</button></h3>
      ${status}${macroList(calculateNutrition(recipe))}
    </div>
  </article>`;
}

function matchingRecipes(available) {
  const matches = recipes.map(recipe => matchRecipe(recipe, available));
  const searching = state.view === "ingredients" && !state.favoritesOnly;
  const ranked = matches.filter(({ recipe, missing, found }) => {
    if (state.favoritesOnly && !state.favorites.has(recipe.id)) return false;
    if (searching && !found) return false;
    if (!searching && !state.favoritesOnly && Boolean(recipe.dessert) !== (state.view === "desserts")) return false;
    if (state.filter === "ready") return missing.length === 0;
    if (state.filter === "quick") return recipe.minutes <= 25;
    if (state.filter === "vegetarian") return recipe.vegetarian;
    return true;
  }).sort((a, b) => b.score - a.score || b.found - a.found);
  if (state.favoritesOnly) return ranked;
  const candidates = searching && ranked.some(({ missing }) => missing.length === 0)
    ? ranked.filter(({ missing }) => missing.length === 0)
    : ranked;
  const seen = new Set();
  return candidates.filter(({ recipe }) => {
    const key = recipe.group ?? recipe.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function emptyResults(hasPantry) {
  let title = "Aucune recette pour ce filtre";
  let detail = "Essaie un autre filtre ou affiche toutes les recettes.";
  let button = '<button class="button button-outline" type="button" data-reset-filter>Voir toutes les recettes</button>';
  if (state.view === "ingredients" && !state.favoritesOnly) {
    title = hasPantry ? "Aucune recette avec ces ingrédients" : "Ton stock est vide";
    detail = "Ajoute d’autres ingrédients pour élargir ta recherche.";
    button = '<button class="button button-outline" type="button" data-focus-ingredient>Ajouter des ingrédients</button>';
  } else if (state.favoritesOnly && !state.favorites.size) {
    title = "Tes favoris sont encore vides";
    detail = "Clique sur le cœur d’une recette pour la retrouver ici.";
    button = '<button class="button button-outline" type="button" data-show-all>Parcourir les recettes</button>';
  } else if (state.filter === "ready") {
    title = hasPantry ? "Il manque encore quelques ingrédients" : "Ton stock est vide";
    detail = hasPantry
      ? "Affiche toutes les recettes pour voir les idées les plus proches de ton stock."
      : "Ajoute ce que tu as dans ton frigo ou ton placard pour trouver des recettes à cuisiner.";
    if (!hasPantry) button = '<button class="button button-outline" type="button" data-focus-ingredient>Ajouter des ingrédients</button>';
  }
  return `<div class="empty-state"><span class="section-icon">${icon(state.favoritesOnly ? "heart" : "book")}</span><h3>${title}</h3><p>${detail}</p>${button}</div>`;
}

function renderRecipes() {
  const available = availableIngredients();
  const hasPantry = available.size > 0;
  const searching = state.view === "ingredients" && !state.favoritesOnly;
  const matches = matchingRecipes(available);
  const displayed = matches.slice(0, state.visible);
  const count = matches.length;
  const favoritesCount = state.favorites.size;

  byId("favorites-toggle").setAttribute("aria-pressed", state.favoritesOnly);
  byId("favorites-count").hidden = favoritesCount === 0;
  byId("favorites-count").textContent = favoritesCount;
  byId("recettes").hidden = searching && !state.searched;
  byId("catalog-categories").hidden = searching || state.favoritesOnly;
  byId("filters").hidden = searching;
  byId("recipes-title").textContent = state.favoritesOnly ? "Mes favoris"
    : searching ? "Tes résultats" : state.view === "desserts" ? "Pâtisserie & desserts" : "À table !";
  for (const button of document.querySelectorAll("[data-category]")) {
    button.setAttribute("aria-pressed", !state.favoritesOnly && (button.dataset.category === "dessert") === (state.view === "desserts"));
  }
  byId("recipes-description").textContent = searching && count
    ? matches[0].missing.length ? "Voici les recettes les plus proches, avec les ingrédients à prévoir." : "Tu as tous les ingrédients. Vérifie les quantités avant de commencer."
    : searching ? "" : hasPantry
    ? "Les recettes les plus proches de ton stock s’affichent en premier."
    : "Des idées simples, avec les valeurs nutritionnelles par portion.";
  for (const button of filterButtons) button.setAttribute("aria-pressed", button.dataset.filter === state.filter);
  byId("results-count").textContent = `${count} recette${count > 1 ? "s" : ""}`;
  byId("recipe-grid").innerHTML = count ? displayed.map(match => recipeCard(match, hasPantry)).join("") : emptyResults(hasPantry);
  byId("show-more").hidden = displayed.length >= count;
}

function showRecipes(favoritesOnly) {
  state.favoritesOnly = favoritesOnly;
  state.filter = "all";
  state.visible = PAGE_SIZE;
  renderRecipes();
}

function toggleFavorite(id, fromDialog) {
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  save();
  renderRecipes();
  if (fromDialog) {
    const button = byId("dialog-content").querySelector("[data-favorite]");
    button.outerHTML = favoriteButton(recipeById.get(id), true);
    byId("dialog-content").querySelector("[data-favorite]").focus({ preventScroll: true });
  } else {
    const next = byId("recipe-grid").querySelector(`[data-favorite="${id}"]`) ?? byId("favorites-toggle");
    next.focus({ preventScroll: true });
  }
}

function focusIngredient() {
  if (location.hash !== "#ingredients") location.hash = "ingredients";
  setView("ingredients");
  byId("ingredients").scrollIntoView({ block: "start" });
  byId("ingredient-input").focus({ preventScroll: true });
}

function openRecipe(id) {
  const recipe = recipeById.get(id);
  state.currentRecipe = recipe;
  state.servings = recipe.servings ?? BASE_SERVINGS;
  state.nutritionMode = "portion";
  byId("dialog-content").innerHTML = `${recipeImage(recipe, "dialog-image")}
    <div class="dialog-inner">
      <div class="dialog-heading"><h2 id="dialog-title">${recipe.title}</h2>${favoriteButton(recipe, true)}</div>
      ${recipe.description ? `<p class="dialog-description">${recipe.description}</p>` : ""}
      ${recipeMeta(recipe)}
      <div class="servings-row">
        <strong id="servings-label">Nombre de portions</strong>
        <div class="stepper" role="group" aria-labelledby="servings-label">
          <button class="icon-button" id="less-servings" type="button" data-servings="-1" aria-label="Retirer une portion">${icon("minus")}</button>
          <output id="serving-count" aria-live="polite"></output>
          <button class="icon-button" id="more-servings" type="button" data-servings="1" aria-label="Ajouter une portion">${icon("plus")}</button>
        </div>
      </div>
      <section class="nutrition-panel" aria-labelledby="nutrition-title">
        <div class="nutrition-heading">
          <h3 id="nutrition-title">Valeurs nutritionnelles</h3>
          <div class="nutrition-switch" role="group" aria-label="Base du calcul">
            <button type="button" data-nutrition="portion" aria-pressed="true">Par portion</button>
            <button type="button" data-nutrition="total" aria-pressed="false">Recette entière</button>
          </div>
        </div>
        <div id="dialog-macros" aria-live="polite" aria-atomic="true"></div>
        <p class="nutrition-source">Estimations à partir des quantités indiquées. Les valeurs varient selon les produits et la préparation.</p>
      </section>
      <div class="dialog-columns">
        <section aria-labelledby="dialog-ingredients-title">
          <h3 id="dialog-ingredients-title">Ingrédients</h3>
          <ul class="dialog-ingredients" id="dialog-ingredients"></ul>
          <p class="ingredient-note" id="dialog-ingredient-note"></p>
        </section>
        <section aria-labelledby="recipe-steps-title">
          <h3 id="recipe-steps-title">Préparation</h3>
          <ol class="recipe-steps">${recipe.steps.map(step => `<li>${step}</li>`).join("")}</ol>
        </section>
      </div>
    </div>`;
  renderDialogValues();
  byId("recipe-dialog").showModal();
  byId("recipe-dialog").scrollTop = 0;
}

function renderDialogValues() {
  const { currentRecipe: recipe, servings, nutritionMode } = state;
  const available = availableIngredients();
  byId("serving-count").value = servings;
  byId("less-servings").disabled = servings <= 1;
  byId("more-servings").disabled = servings >= 24;
  const isTotal = nutritionMode === "total";
  for (const button of byId("dialog-content").querySelectorAll("[data-nutrition]")) {
    button.setAttribute("aria-pressed", button.dataset.nutrition === nutritionMode);
  }
  byId("dialog-macros").innerHTML = macroList(calculateNutrition(recipe, isTotal ? servings : 1), "recipe-nutrition");
  byId("recipe-nutrition").setAttribute("aria-label", isTotal ? `Pour ${servings} portion${servings > 1 ? "s" : ""}` : "Par portion");

  byId("dialog-ingredients").innerHTML = recipe.items.map(([id, grams, label, gramsPerUnit]) => {
    const weight = grams * servings / (recipe.servings ?? BASE_SERVINGS);
    const count = gramsPerUnit ? weight / gramsPerUnit : 0;
    const units = count ? ` <small>(≈ ${number.format(count)} ${count <= 1 ? "œuf" : "œufs"})</small>` : "";
    const hasIngredient = available.has(id);
    const status = hasIngredient ? `${icon("check")}<span class="sr-only">Disponible.</span>` : '<span class="ingredient-dot" aria-hidden="true"></span><span class="sr-only">À prévoir.</span>';
    return `<li${available.size && !hasIngredient ? ' class="missing"' : ""}>${available.size ? status : ""}<span><strong>${number.format(weight)} g</strong> ${label ?? ingredients[id].name}${units}</span></li>`;
  }).join("");
  byId("dialog-ingredient-note").textContent = available.size
    ? "La coche indique les ingrédients dans ton stock. Vérifie les quantités."
    : "Quantités pour la recette entière, selon le nombre de portions choisi.";
}

byId("ingredient-form").addEventListener("submit", event => {
  event.preventDefault();
  const field = byId("ingredient-input");
  const entries = field.value.split(/[,;\n]+/).map(parseIngredient).filter(Boolean);
  const searching = event.submitter === byId("search-recipes");
  if (!entries.length && (!searching || !pantrySize())) {
    message("Saisis au moins un ingrédient.");
    field.focus();
    return;
  }
  const current = state.pantry[state.storage];
  const previousCount = current.size;
  let unknown = 0;
  for (const [key, label] of entries) {
    if (key.startsWith("libre:") && !current.has(key)) unknown++;
    current.set(key, label);
  }
  const added = current.size - previousCount;
  updatePantry();
  field.value = "";
  if (searching) {
    state.searched = true;
    message(unknown ? `${unknown} ingrédient${unknown > 1 ? "s hors catalogue" : " hors catalogue"}.` : "");
    showRecipes(false);
    byId("recipes-title").focus({ preventScroll: true });
    byId("recettes").scrollIntoView({ block: "start" });
    return;
  }
  field.focus();
  if (!added) message("Ces ingrédients sont déjà dans cette liste.");
  else if (unknown) message(`${added} ajouté${added > 1 ? "s" : ""}, dont ${unknown} hors catalogue.`);
  else message(`${added} ingrédient${added > 1 ? "s ajoutés" : " ajouté"}.`);
});

for (const button of storageButtons) button.addEventListener("click", () => {
  if (state.storage === button.dataset.storage) return;
  if (byId("ingredient-input").value.trim()) byId("ingredient-form").requestSubmit();
  state.storage = button.dataset.storage;
  message("");
  renderPantry();
});

byId("ingredient-suggestions").addEventListener("click", event => {
  const button = event.target.closest("[data-ingredient]");
  if (!button) return;
  const id = button.dataset.ingredient;
  state.pantry[state.storage].set(id, ingredients[id].name);
  updatePantry();
  byId("ingredient-input").focus({ preventScroll: true });
  message(`${ingredients[id].name} dans ton stock.`);
});

byId("load-example").addEventListener("click", () => {
  for (const place of places) {
    for (const id of example[place]) state.pantry[place].set(id, ingredients[id].name);
  }
  state.favoritesOnly = false;
  state.filter = "all";
  updatePantry();
  message("Les ingrédients de l’exemple sont dans ton stock.");
});

byId("clear-pantry").addEventListener("click", () => {
  for (const place of places) state.pantry[place].clear();
  state.filter = "all";
  updatePantry();
  byId("ingredient-input").focus({ preventScroll: true });
  message("Ton stock a été vidé.");
});

for (const button of filterButtons) button.addEventListener("click", () => {
  state.filter = button.dataset.filter;
  state.visible = PAGE_SIZE;
  renderRecipes();
});

byId("hero-add").addEventListener("click", event => {
  event.preventDefault();
  focusIngredient();
});
function setView(view) {
  if (state.view === view && !state.favoritesOnly) return;
  if (state.view !== view) state.searched = false;
  state.view = view;
  byId("ingredients").hidden = view !== "ingredients";
  byId("cuisine").classList.toggle("search-workspace", view === "ingredients");
  for (const link of document.querySelectorAll(".header-nav a")) {
    const active = link.hash === `#${view === "accueil" ? "recettes" : view}`;
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  showRecipes(false);
}

function syncView() {
  const view = location.hash.slice(1);
  setView(view || "accueil");
  if (view === "desserts" || view === "recettes") byId("recettes").scrollIntoView({ block: "start" });
  if (view === "ingredients") byId("ingredients").scrollIntoView({ block: "start" });
}

window.addEventListener("hashchange", syncView);
for (const link of document.querySelectorAll(".header-nav a")) {
  link.addEventListener("click", () => {
    if (location.hash === link.hash) syncView();
  });
}
for (const button of document.querySelectorAll("[data-category]")) {
  button.addEventListener("click", () => {
    location.hash = button.dataset.category === "dessert" ? "desserts" : "recettes";
  });
}
syncView();
byId("favorites-toggle").addEventListener("click", () => {
  showRecipes(!state.favoritesOnly);
  byId("recettes").scrollIntoView({ block: "start" });
});

byId("more-recipes").addEventListener("click", () => {
  const start = state.visible;
  state.visible += PAGE_SIZE;
  renderRecipes();
  byId("recipe-grid").querySelectorAll("[data-open]")[start]?.focus();
});

byId("recipe-grid").addEventListener("click", event => {
  const favorite = event.target.closest("[data-favorite]");
  const open = event.target.closest("[data-open]");
  if (favorite) toggleFavorite(favorite.dataset.favorite, false);
  else if (open) openRecipe(open.dataset.open);
  else if (event.target.closest("[data-show-all]")) {
    showRecipes(false);
    location.hash = "recettes";
    setView("recettes");
    byId("filters").querySelector('[data-filter="all"]').focus();
  } else if (event.target.closest("[data-reset-filter]")) {
    state.filter = "all";
    renderRecipes();
    byId("filters").querySelector('[data-filter="all"]').focus();
  } else if (event.target.closest("[data-focus-ingredient]")) focusIngredient();
});

byId("close-dialog").addEventListener("click", () => byId("recipe-dialog").close());
byId("recipe-dialog").addEventListener("click", event => {
  if (event.target === byId("recipe-dialog")) byId("recipe-dialog").close();
});
byId("recipe-dialog").addEventListener("close", () => {
  const button = byId("recipe-grid").querySelector(`[data-open="${state.currentRecipe.id}"]`) ?? byId("favorites-toggle");
  state.currentRecipe = null;
  button.focus({ preventScroll: true });
});
byId("dialog-content").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  const { servings, nutrition, favorite } = button.dataset;
  if (servings) {
    state.servings = Math.max(1, Math.min(24, state.servings + Number(servings)));
    renderDialogValues();
    if (button.disabled) byId(Number(servings) < 0 ? "more-servings" : "less-servings").focus({ preventScroll: true });
  } else if (nutrition) {
    state.nutritionMode = nutrition;
    renderDialogValues();
  } else if (favorite) toggleFavorite(favorite, true);
});

window.addEventListener("storage", event => {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  Object.assign(state, loadSaved());
  renderPantry();
  renderRecipes();
  if (state.currentRecipe) {
    byId("dialog-content").querySelector("[data-favorite]").outerHTML = favoriteButton(state.currentRecipe, true);
    renderDialogValues();
  }
});

renderPantry();
renderRecipes();
