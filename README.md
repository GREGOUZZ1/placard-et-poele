# Placard & Poêle

Une application en français qui classe des recettes selon ce qu’il y a dans le frigo et le placard. Elle montre les ingrédients à prévoir, les étapes de préparation et les calories, protéines, glucides et lipides par portion ou pour la recette entière. Les ingrédients et les favoris sont enregistrés dans le navigateur.

## Lancer le site

Ouvrir `index.html` dans un navigateur récent ou servir le dossier avec `python3 -m http.server 8000`. Le site fonctionne avec HTML, CSS et JavaScript, sans installation ni clé d’API.

## Publier sur GitHub Pages

Mettre le contenu de ce dossier à la racine de la branche `main` d’un dépôt GitHub. Dans **Settings → Pages**, choisir **Deploy from a branch**, puis **main** et **/ (root)**. GitHub indique l’adresse du site après le déploiement. [Documentation GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Données et calcul

- `ingredients.js` contient les aliments de référence, leurs alias et leurs teneurs pour 100 g dans l’état indiqué. Les valeurs proviennent de la table Ciqual 2020 de l’Anses, sous licence ouverte Etalab 2.0, d’après la mise en forme de protéines.info. [Ciqual 2020](https://www.data.gouv.fr/datasets/table-de-composition-nutritionnelle-des-aliments-ciqual-2020) · [Données et méthode de protéines.info](https://proteines.info/donnees/)
- `recipes.js` indique les poids pour deux portions. Le calcul multiplie les teneurs pour 100 g par le poids de chaque ingrédient, additionne les résultats, puis les rapporte au nombre de portions choisi. L’énergie est arrondie à la kilocalorie et les macros au dixième de gramme à l’affichage.
- La correspondance se fait par nom d’ingrédient. Les quantités et les étapes figurent sur chaque fiche. Les valeurs nutritionnelles sont des estimations qui varient avec les produits et la préparation.
- Les visuels sont des illustrations générées pour le site. Le repère de cuisson du poulet provient de Santé Canada. [Conseils sur la salubrité de la volaille](https://www.canada.ca/fr/sante-canada/services/salubrite-viandes-volailles-poissons-et-fruits-mer/conseils-salubrite-volaille.html)
