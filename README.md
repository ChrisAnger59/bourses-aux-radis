# 🫜 Bourse aux radis

Mini-jeu de bourse pour animer les pauses d'un stream Twitch, joué directement depuis le chat.

Pendant que la streameuse fait une pause, le jeu s'affiche à l'écran du stream. Les viewers achètent et revendent des radis dont le cours varie en permanence, en tapant des commandes dans le chat. Le but : finir la partie avec le plus de clochettes possible… sans oublier de tout revendre avant la fin, car **les radis non vendus pourrissent** !

Le principe s'inspire du marché aux navets d'Animal Crossing. Le jeu n'utilise aucun visuel ni élément graphique de Nintendo.

---

## Sommaire

- [Comment jouer](#comment-jouer)
- [Installation](#installation)
- [Utilisation dans OBS](#utilisation-dans-obs)
- [Paramètres de l'adresse](#paramètres-de-ladresse)
- [Mode développement](#mode-développement)
- [Tests](#tests)
- [Architecture](#architecture)
- [Limites connues](#limites-connues)
- [Pistes pour la suite](#pistes-pour-la-suite)

---

## Comment jouer

### Les commandes du chat

| Commande | Effet |
|---|---|
| `!achat 10` | Achète 10 radis au cours actuel |
| `!achat tout` | Dépense toutes ses clochettes en radis |
| `!vente 10` | Vend 10 radis au cours actuel |
| `!vente tout` | Vend tous ses radis |

Les majuscules et les espaces en trop sont ignorés : `!ACHAT   10` fonctionne aussi. Les commandes invalides (quantité négative, décimale, trop grande, mot inconnu…) sont simplement ignorées, sans message d'erreur.

### Les règles

- **Inscription automatique** : chaque viewer reçoit **1 000 🔔** dès sa première commande. Aucun compte à créer.
- **Le cours** démarre à 100 🔔 et change toutes les 20 secondes. Il suit des tendances (hausse, baisse ou stable) qui durent quelques variations, et reste toujours entre 10 et 600 🔔.
- **Les événements** : une ou deux fois par partie en moyenne, un événement aléatoire secoue brutalement le marché (« Les radis sont à la mode ! », « Un rat dans l'entrepôt ! »…).
- **La fin de partie** : quand le minuteur arrive à zéro, tous les radis non vendus pourrissent et ne valent plus rien.
- **Le gagnant** est le joueur qui possède le plus de clochettes à la fin.

### Ce qui s'affiche à l'écran

- le cours actuel et le temps restant ;
- le bandeau d'événement, quand un événement survient ;
- la liste de tous les joueurs, triée par clochettes, avec leurs radis ;
- le fil d'activité, avec les dernières actions ;
- à la fin : le gagnant, le podium et le nombre de participants.

---

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) 22 ou plus récent
- npm (installé avec Node.js)

### Lancer le projet

```bash
npm install
npm run dev
```

Le jeu est alors accessible à l'adresse affichée dans le terminal, en général `http://localhost:5173`.

### Version de production

```bash
npm run build
```

Les fichiers à héberger sont générés dans le dossier `dist/`.

---

## Utilisation dans OBS

1. Lancer le jeu (`npm run dev`, ou la version hébergée).
2. Dans OBS, ajouter une source **« Navigateur »**.
3. Dans le champ URL, indiquer l'adresse du jeu avec le nom de la chaîne :
   ```
   http://localhost:5173/?channel=nomdelachaine
   ```
4. Régler la largeur et la hauteur de la source selon la scène (par exemple 1920 × 1080).
5. Afficher la scène pendant la pause : la partie démarre au chargement de la page.

> ⚠️ Décocher l'option **« Actualiser le navigateur quand la scène devient active »** si une partie doit se poursuivre quand on change de scène : un rechargement de la page relance une nouvelle partie et efface la précédente.

Le jeu se connecte au chat en **lecture seule et de façon anonyme** : il n'a besoin d'aucun compte, d'aucun mot de passe ni d'aucune clé d'API. Il ne peut pas écrire dans le chat, c'est pourquoi toutes les informations destinées aux joueurs passent par l'écran.

---

## Paramètres de l'adresse

Le jeu se configure entièrement par l'adresse de la page, sans interface d'administration.

| Paramètre | Rôle | Valeurs | Par défaut |
|---|---|---|---|
| `channel` | Chaîne Twitch dont le chat est écouté | nom de la chaîne | aucune (pas de connexion au chat) |
| `duree` | Durée de la partie, en minutes | entier de 1 à 20 | 5 |
| `dev` | Affiche les outils de développement | `1` | désactivé |

Une valeur invalide (`?duree=abc`, `?duree=50`…) est ignorée, et la valeur par défaut est utilisée.

Exemples :

```
http://localhost:5173/?channel=nomdelachaine
http://localhost:5173/?channel=nomdelachaine&duree=8
http://localhost:5173/?duree=1&dev=1
```

---

## Mode développement

Avec `?dev=1` dans l'adresse, la page affiche sous le jeu :

- un bouton **Tick**, pour faire varier le cours sans attendre ;
- un bouton **Fin de partie**, pour terminer la partie immédiatement ;
- un **panneau de dev** qui injecte de fausses trames Twitch (achats, ventes, pseudos spéciaux, messages `/me`, commandes piégées…). Elles passent exactement par le même chemin que les vrais messages du chat ;
- l'**état complet** du jeu, en JSON.

Le jeu peut ainsi être développé et testé entièrement **sans stream et sans viewers**.

Un script permet aussi d'observer le vrai chat d'une chaîne dans le terminal, à travers le parseur du projet :

```bash
node src/dev/tryChat.js nomdelachaine
```

---

## Tests

Toute la logique du jeu (analyse des messages, commandes, marché, achats, ventes, fin de partie) est écrite en JavaScript pur, sans React, et testée avec Node, sans aucune dépendance.

Lancer tous les tests :

```bash
node src/dev/runAllTests.js
```

Chaque test affiche ✅ ou ❌ ; en cas d'échec, la valeur attendue et la valeur obtenue sont affichées. Les fichiers de test se trouvent à côté du fichier qu'ils testent (`buy.js` → `buy.test.js`).

---

## Architecture

### Le chemin d'un message

```
Viewer tape "!achat 10" dans le chat
        │
        ▼
twitch/connectChat     WebSocket anonyme vers le chat Twitch
        │  trame IRC brute
        ▼
twitch/parseFrame      découpe, tags, filtrage, nettoyage des /me
        │  { userId, displayName, text }
        ▼
game/parseCommand      validation de la commande
        │  { type: 'buy', quantity: 10 }
        ▼
bridge/frameToActions  transformation en action pour le jeu
        │
        ▼
game/gameReducer       (état actuel, action) → nouvel état
        │
        ▼
components/            affichage
```

Le panneau de dev injecte ses fausses trames au même point d'entrée (`handleFrame` dans `App.jsx`) que le vrai chat : le jeu ne sait jamais d'où vient un message.

### Les dossiers

```
src/
├── twitch/       Lecture du chat : connexion et analyse du protocole IRC.
│                 Ne connaît rien du jeu.
├── game/         Toute la logique du jeu : commandes, marché, joueurs, reducer.
│                 Ne connaît rien de Twitch. JavaScript pur, entièrement testé.
├── bridge/       Le pont entre twitch/ et game/.
├── components/   Composants React d'affichage. Aucune règle du jeu.
├── dev/          Outils de développement : fixtures, panneau, tests.
└── App.jsx       Assemblage : état, minuteurs, connexion au chat, affichage.
```

### Les principes

- **Un reducer pur** : `gameReducer` reçoit l'état et une action (`command`, `tick`, `second`, `end`) et renvoie un nouvel état, sans jamais modifier l'ancien.
- **Le hasard injecté** : le reducer n'appelle jamais `Math.random()`. Les nombres aléatoires sont fournis dans l'action `tick`, créée par `createTickAction`. Le reducer reste ainsi entièrement testable.
- **Toute donnée extérieure est validée** : messages du chat comme paramètres de l'adresse.
- **On stocke les données brutes, on calcule l'affichage** : le classement, le temps formaté ou l'ordre du fil sont calculés au moment de l'affichage, jamais stockés.

---

## Limites connues

- **Aucune sauvegarde** : recharger la page relance une nouvelle partie.
- **Latence du stream** : les viewers voient l'écran avec quelques secondes de retard, et une commande peut donc être exécutée juste après un changement de cours.
- **Un compte par joueur** : rien n'empêche un viewer de jouer avec plusieurs comptes Twitch. Sans enjeu réel, ce n'est pas un problème.

---

## Pistes pour la suite

- Synonymes `!acheter` et `!vendre`
- Courbe du cours en SVG et indicateur de variation (▲ +12)
- Médailles sur le podium
- Sauvegarde des scores et classement entre les parties, via la future plateforme communautaire (API Symfony)
- Événements proposés par la communauté
- Visuels réalisés par la communauté