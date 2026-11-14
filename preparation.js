"use strict";

const detailedSteps = {
  "poulet-citron": [
    "Rince le riz, puis cuis-le selon les indications du paquet. Pendant ce temps, taille la courgette en rondelles d’environ 5 mm et coupe le poulet en lanières de taille similaire.",
    "Chauffe la moitié de l’huile dans une grande poêle à feu moyen-vif. Étale les rondelles sans les superposer. Fais-les dorer 6 à 8 minutes en les retournant à mi-cuisson, puis réserve-les sur une assiette.",
    "Verse le reste d’huile dans la même poêle et saisis le poulet en une seule couche. Retourne les lanières pour les dorer des deux côtés et vérifie qu’elles atteignent 74 °C à cœur. Coupe le feu, verse le jus de citron et sers sur le riz avec les courgettes."
  ],
  "pois-chiches-tomate": [
    "Rince les pois chiches dans une passoire, égoutte-les et sèche-les avec un torchon propre. Coupe les tomates en dés d’environ 2 cm et hache l’ail.",
    "Chauffe l’huile dans une grande poêle à feu moyen-vif. Fais dorer les pois chiches 5 minutes, en secouant la poêle de temps en temps.",
    "Baisse à feu moyen. Remue brièvement l’ail dans la poêle, puis ajoute les tomates. Laisse cuire 7 à 8 minutes à découvert, jusqu’à ce que le jus épaississe légèrement.",
    "Ajoute les épinards en deux fois et remue 1 à 2 minutes, jusqu’à ce que les feuilles soient tendres."
  ],
  "pates-tomates": [
    "Préchauffe le four à 220 °C. Coupe les tomates en quartiers et étale-les sur une plaque à rebords. Mélange-les avec l’ail haché et l’huile.",
    "Enfourne à mi-hauteur et fais rôtir 15 à 18 minutes, jusqu’à ce que les tomates s’affaissent et rendent du jus.",
    "Cuis les pâtes selon le paquet. Avant de les égoutter, réserve une petite louche d’eau de cuisson.",
    "Écrase légèrement les tomates à la fourchette, puis mélange leur jus et les pâtes. Ajoute l’eau réservée une cuillerée à la fois pour lier la sauce et termine avec le parmesan râpé."
  ],
  "omelette-feta": [
    "Fouette les œufs à la fourchette jusqu’à ce que blancs et jaunes soient bien mélangés. Émiette la feta et sèche les épinards après les avoir rincés.",
    "Chauffe la moitié de l’huile dans une poêle antiadhésive à feu moyen. Fais tomber les épinards 2 minutes en remuant. S’il reste de l’eau dans la poêle, laisse-la s’évaporer.",
    "Baisse le feu, ajoute le reste d’huile et verse les œufs. Ramène les bords vers le centre avec une spatule et incline la poêle pour répartir les œufs encore liquides. Quand l’omelette est prise, ajoute la feta sur une moitié et replie-la."
  ],
  "dessert-brownie": [
    "Préchauffe le four à 175 °C et chemise un moule carré de 20 cm de papier cuisson.",
    "Fais fondre le chocolat et le beurre ensemble au bain-marie, puis laisse tiédir. Fouette brièvement les œufs et le sucre. Ajoute le chocolat fondu, puis incorpore la farine juste assez pour faire disparaître les traces blanches.",
    "Étale la pâte dans le moule et enfourne à mi-hauteur pour 18 à 22 min. Au premier contrôle, les bords doivent être pris et une lame piquée au centre doit ressortir avec quelques miettes humides.",
    "Laisse refroidir dans le moule avant de soulever le brownie avec le papier et de le découper."
  ],
  "dessert-cookies": [
    "Préchauffe le four à 175 °C et couvre une plaque de papier cuisson. Mélange le beurre mou avec le sucre à la spatule, puis incorpore l’œuf.",
    "Ajoute la farine et la levure, mélange juste assez pour former une pâte et incorpore le chocolat haché. Divise en huit boules et espace-les d’au moins 4 cm sur la plaque.",
    "Enfourne à mi-hauteur pour 10 à 13 min. Sors la plaque quand les bords sont légèrement dorés, alors que le milieu est encore souple.",
    "Laisse les cookies s’affermir sur la plaque quelques minutes avant de les déplacer sur une grille."
  ],
  "dessert-crepes": [
    "Fouette les œufs avec la farine et le sucre. Ajoute le lait petit à petit en fouettant, puis incorpore 25 g de beurre fondu. Laisse reposer 20 min.",
    "Chauffe une poêle antiadhésive à feu moyen et passe un peu du beurre restant dessus. Verse une petite louche de pâte en inclinant aussitôt la poêle pour couvrir le fond d’une couche fine.",
    "Cuis environ 1 min sur la première face, jusqu’à ce que les bords se décollent. Retourne la crêpe avec une spatule et fais dorer la seconde face brièvement. Renouvelle avec le reste de pâte."
  ],
  "dessert-madeleines": [
    "Fouette les œufs et le sucre, puis ajoute le citron selon les quantités indiquées. Incorpore la farine et la levure, puis le beurre fondu tiédi. Couvre et réfrigère la pâte une heure.",
    "Préchauffe le four à 210 °C. Remplis les empreintes aux trois quarts avec la pâte froide et enfourne à mi-hauteur pour 4 min à 210 °C.",
    "Baisse le four à 175 °C sans ouvrir la porte et poursuis 5 à 7 min, jusqu’à ce que les bords soient dorés. Attends quelques minutes avant de démouler."
  ],
  "poivron-farci-petitsPois": [
    "Égoutte les petits pois déjà cuits.",
    "Fais cuire le riz selon le paquet. Coupe les poivrons en deux et retire les graines.",
    "Mélange le riz, les tomates en dés, la garniture et l’huile. Remplis les demi-poivrons et pose-les dans un plat, côté coupé vers le haut. Enfourne à mi-hauteur dans le four préchauffé à 190 °C. Vérifie à partir de 20 min : la pointe d’un couteau doit entrer facilement dans la chair du poivron."
  ],
  "poivron-farci-poisChiches": [
    "Rince et égoutte les pois chiches cuits.",
    "Fais cuire le riz selon le paquet. Coupe les poivrons en deux et retire les graines.",
    "Mélange le riz, les tomates en dés, la garniture et l’huile. Remplis les demi-poivrons et pose-les dans un plat, côté coupé vers le haut. Enfourne à mi-hauteur dans le four préchauffé à 190 °C. Vérifie à partir de 20 min : la pointe d’un couteau doit entrer facilement dans la chair du poivron."
  ],
  "poivron-farci-lentilles": [
    "Rince et égoutte les lentilles cuites.",
    "Fais cuire le riz selon le paquet. Coupe les poivrons en deux et retire les graines.",
    "Mélange le riz, les tomates en dés, la garniture et l’huile. Remplis les demi-poivrons et pose-les dans un plat, côté coupé vers le haut. Enfourne à mi-hauteur dans le four préchauffé à 190 °C. Vérifie à partir de 20 min : la pointe d’un couteau doit entrer facilement dans la chair du poivron."
  ],
  "poivron-farci-haricots": [
    "Rince et égoutte les haricots rouges cuits.",
    "Fais cuire le riz selon le paquet. Coupe les poivrons en deux et retire les graines.",
    "Mélange le riz, les tomates en dés, la garniture et l’huile. Remplis les demi-poivrons et pose-les dans un plat, côté coupé vers le haut. Enfourne à mi-hauteur dans le four préchauffé à 190 °C. Vérifie à partir de 20 min : la pointe d’un couteau doit entrer facilement dans la chair du poivron."
  ],
  "poivron-farci-feta": [
    "Émiette la feta.",
    "Fais cuire le riz selon le paquet. Coupe les poivrons en deux et retire les graines.",
    "Mélange le riz, les tomates en dés, la garniture et l’huile. Remplis les demi-poivrons et pose-les dans un plat, côté coupé vers le haut. Enfourne à mi-hauteur dans le four préchauffé à 190 °C. Vérifie à partir de 20 min : la pointe d’un couteau doit entrer facilement dans la chair du poivron."
  ]
};
