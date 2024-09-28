---

# Olympic Games App

Cette application Angular permet d'afficher des données sur les Jeux Olympiques à travers divers graphiques et visualisations. Elle inclut des graphiques en ligne, des graphiques en secteurs et des résumés d'informations concernant les pays participants.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)
- [Composants](#composants)
- [Services](#services)
- [Modèles de Données](#modèles-de-données)
- [Routes](#routes)

## Fonctionnalités

- **Page d'accueil** : Vue d'ensemble des Jeux Olympiques avec un graphique en secteurs représentant les participations par pays.
- **Page de détails** : Affichage des détails d'un pays sélectionné, incluant un graphique en ligne montrant les performances du pays au fil des années.
- **Notifications** : Affichage de notifications pour informer les utilisateurs des changements ou des actions effectuées.
- **Navigation** : Possibilité de naviguer entre les différentes pages pour explorer les données.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/AntunesD/OlympicGameApp_Developpez-le-front-end-en-utilisant-Angular.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd OlympicGamesApp
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Lancez l'application :
   ```bash
   ng serve
   ```
5. Ouvrez le navigateur à l'adresse [http://localhost:4200](http://localhost:4200).

## Utilisation

1. **Page d'accueil** : Consultez le graphique en secteurs montrant la participation des différents pays aux Jeux Olympiques. Cliquez sur un pays pour voir les détails.
2. **Page de détails** : Visualisez les données spécifiques d'un pays avec un graphique en ligne montrant les performances au fil du temps.
3. **Notifications** : Les notifications s'affichent pour informer des mises à jour ou des erreurs dans l'application.

## Structure du Projet

- **component/** : Contient les composants de l'application.
- **core/** : Contient les services et les modèles de données.
- **pages/** : Contient les pages principales de l'application.
- **app-routing.module.ts** : Configuration des routes de l'application.
- **app.component.ts** : Composant racine de l'application.

## Composants

### `line-chart.component`

- **Description** : Affiche un graphique en ligne basé sur les données d'un pays.
- **Entrée** : `chartData` - Données du graphique.
- **Méthodes** :
  - `ngOnInit()` : Initialise la taille du graphique en s'abonnant aux changements.
  - `ngOnDestroy()` : Désabonne l'écouteur de changements pour éviter les fuites de mémoire.

### `notification.component`

- **Description** : Affiche les notifications.
- **Méthodes** :
  - `ngOnInit()` : S'abonne aux messages de notifications.
  - `removeMessage(index: number)` : Supprime une notification.
  - `ngOnDestroy()` : Se désabonne des notifications.

### `pie-chart.component`

- **Description** : Affiche un graphique en secteurs.
- **Entrée** : `chartData` - Données du graphique.
- **Méthodes** :
  - `ngOnInit()` : Initialise la taille du graphique en s'abonnant aux changements.
  - `onSectionClick(event: PieChartEvent)` : Gère les clics sur les sections du graphique.
  - `ngOnDestroy()` : Se désabonne des notifications.

### `summary-card.component`

- **Description** : Affiche un résumé d'information.
- **Entrées** :
  - `title` - Titre de la carte.
  - `content` - Contenu de la carte (nombre ou autre).

### `details.component`

- **Description** : Affiche les détails d'un pays sélectionné, incluant un graphique en ligne de ses performances.
- **Méthodes** :
  - `ngOnInit()` : Charge les données du pays sélectionné.
  - `updateChartData()` : Met à jour les données du graphique.
  - `ngOnDestroy()` : Se désabonne des flux de données.

### `home.component`

- **Description** : Page d'accueil affichant un graphique en secteurs et des statistiques générales.
- **Méthodes** :
  - `ngOnInit()` : Charge les données des Jeux Olympiques.
  - `loadOlympicsData()` : Prépare les données pour le graphique en secteurs.
  - `ngOnDestroy()` : Se désabonne des flux de données.

## Services

- **`OlympicService`** : Service pour récupérer les données des Jeux Olympiques.
- **`ChartDataService`** : Service pour transformer les données des Jeux Olympiques en données graphiques.
- **`NotificationService`** : Service pour gérer les messages de notification.
- **`ResizeChartService`** : Service pour gérer la redimension des graphiques.

## Modèles de Données

- **`LineChartData`** : Interface pour les données des graphiques en ligne.
- **`PieChartData`** : Interface pour les données des graphiques en secteurs.
- **`CountryData`** : Interface pour les données des pays participants.
- **`Participation`** : Interface pour les participations d'un pays aux Jeux Olympiques.

## Routes

- **`/`** : Page d'accueil avec le graphique en secteurs.
- **`/détails/:id`** : Page de détails d'un pays spécifique.
- **`/**` (wildcard) : Page de non-trouvée.

---