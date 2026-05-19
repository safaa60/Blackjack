Blackjack React 

Projet réalisé en React avec Vite.
Le jeu reprend les règles classiques du Blackjack avec un système de cartes, un croupier automatique et une interface style casino.

Technologies utilisées
React
Vite
JavaScript
CSS
Fonctionnalités
   Distribution de cartes aléatoires
   Calcul automatique des scores
   Gestion des As (1 ou 11)
    Bouton Hit
    Bouton Stand
    Détection Bust (> 21)
    Détection Blackjack naturel
    Carte cachée du croupier
    Résultat de la partie :

Victoire
Défaite
Égalité
Blackjack

Interface style casino Blackjack

Règles du jeu :

Le joueur et le croupier reçoivent 2 cartes.
Une carte du croupier reste cachée.
Le joueur peut :
Hit → tirer une carte
Stand → arrêter son tour
Le croupier tire automatiquement tant que son score est inférieur à 17.
Si un joueur dépasse 21 → Bust.
Blackjack = 21 avec seulement 2 cartes.


Structure du projet :

src/
├── components/
│   ├── Card.jsx
│   ├── Hand.jsx
│   ├── GameControls.jsx
│   └── ResultBanner.jsx
│
├── utils/
│   └── deck.js
│
├── App.jsx
├── App.css
└── main.jsx



Installation:
npm install


Lancer le projet :
npm run dev

Auteur :
Projet réalisé par Safaa Zemmar