# Projet UniverSiT'esEtudiant
![](/my-app/src/Universitetudiant.png "Universitesetudiant")

## Introduction

Notre projet sera de créer une plateforme de revente en ligne de produits ayant appartenu à des étudiants.

La revente en ligne peut parfois poser des problèmes notamment au niveau de la fiabilité des produits et de la confiance que l'on peut accorder à certains vendeurs. 

Pour améliorer cette situation, nous avons voulu concevoir ce site qui sera uniquement orienté autour du monde étudiant, ce qui peut donner un peu plus de conviction à l'achat de produits d'ocassion venant de personnes de la même génération que nous.

Notre projet d'application web est constitué d'une base de données PostgreSQL, d'une API FastAPI, et d'un front en ReactJS.



## Installation de Git et récupération des fichiers

Vérifiez tout d'abord que vous avez installé [Git](https://git-scm.com/) pour la récupération des fichiers.

Nous allons maintenant cloner le projet dans le répertoire de votre choix. Pour cela, cliquez sur votre répertoire et faites clique-droit `Git Bash Here`.

Une fois Git Bash ouvert, nous allons cloner le répertoire en ligne où se trouve le projet. Cliquez sur le bouton `Clone or Download` et copiez l'adresse HTTPS du [répertoire](https://git.esiee.fr/duongh/fullstack_data.git).
Une fois copié, retournez dans Git Bash et tapez la commande `git clone` (adresse du répertoire) et cela vous donnera un accès de téléchargement au répertoire.
Finalement, tapez la commande `git pull` et vous aurez à votre disposition tous les fichiers du projet. 

## Comprendre les fichiers
\
Voici l'inventaire des fichiers présents dans notre projet :
- le dossier [`app`](https://git.esiee.fr/duongh/fullstack_data/-/tree/master/app) qui contiendra toutes les informations des chemins de notre site, et qui fera la liaison avec notre base de données PostgresSQL (partie back-end).
- le dossier [`my-app`](https://git.esiee.fr/duongh/fullstack_data/-/tree/master/my-app) qui sera la partie visuelle de notre site, contenant touts nos templates JS (partie front-end).
- le fichier [`requirement.txt`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/requirements.txt) contenant tous les packages nécessaires au bon fonctionnement de notre application.
- le fichier [`.gitignore`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/.gitignore) qui va nous aider à ignorer des fichiers lors des opérations git, comme par exemple les extensions JavaScripts utiles pour les modules qu'on ne va pas modifier, ainsi que les caches Python. 
- le fichier [`Dockerfile`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/Dockerfile) contenant l'extension `FastAPI` que nous allons utiliser, et les commandes pour compiler les `requirements` pour nos modules Python. 
- le fichier [`docker-compose.yml`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/docker-compose.yml) qui va lister toutes les `images Docker` que nous allons utiliser pour notre site.

## Installation des packages nécessaires
\
Une application que vous devez avoir est [`Docker`](https://www.docker.com/get-started), permettant de construire sur votre ordinateur les mêmes images sur lesquelles nous avons développé, et la sureté d'un bon fonctionnement. Assurez également d'avoir installé [`WSL 2`](https://docs.microsoft.com/fr-fr/windows/wsl/install) permettant une couche de compatibilité entre les éxecutables Linux et le système Windows.

Certains packages seront également nécessaires à installer pour la bonne utilisation du dash si cela n'est pas déjà fait :
- ouvrir l'invite de commandes et se rendre dans le dossier du projet
- Tapez la commande `docker compose build` pour installer les packages nécessaires et construire les images nécessaires pour notre plateforme.
- Tapez la commande `docker compose up`. Cette commande va permettre de démarrer nos images front, api et db, nécessaires à la plateforme.


## Structure de l'architecture
\
Après avoir énuméré les étapes et fichiers nécessaires à l'initialisation de notre plateforme, voyons maintenant la structure de notre dossier projet:
- Dockerfile
- docker-compose.yml
- requirements.txt
- my-app/
  + public/
  + src/
    * Templates JS
  + nodes-modules
  + package-lock.json
  + package.json
- app/
  + cruds.py
  + database.py
  + main.py
  + models.py
  + schemas.py

Nous avons divisé l'architecture de notre application back sous la forme de plusieurs fichiers qui vont chacun avoir leur role pour l'initialisation des données dans nos pages JavaScripts. Il y'aura notamment:
- `cruds` qui contient les fonctions extrayants les informations de la base de données
- `database` qui génère notre base de données
- `models` qui crée les tables de notre base
- `schemas` qui crée des schémas en parallèle à nos tables pour l'utilisation dans nos pages et cruds
- `main` qui va aller chercher les fonctions de `cruds` et va alimenter les routes pour nos pages JavaScript 

## First Step : Création de la base de données

Pour notre base de données, nous sommes repartis sur la première version de notre image PostgreSQL : nous avons utilisé un `engine` basé sur la librairie SQLAlchemy pour créer une session locale de notre base de données. 

Nous allons ensuite remplir la base de données en créant plusieurs tables dans le fichier `models.py`. 
Pour chacune de ces tables, nous avons un ID, qui est une chaîne de caractères sous le format uuid4 et qui constitue la clé primaire. Nous utilisons ces IDs pour identifier chacun de nos éléments et pour créer les relations entre nos tables.
Voici la liste de nos tables :
- `User` qui contient les informations de nos utilisateurs, tels que username et password pour la connexion, nom prénom e-mail et adresse. Comme chaque utilisateur est censé être un étudiant, on lui attribue une ForeignKey avec la table `School`.
- `School` qui contient les informations des écoles.
- `Post` qui contient les informations des annonces de vente. Cette table est relié à un `User` qui est le vendeur, et à une `Category`.
- `Category` qui liste l'ensemble des rubriques des produits.
- `Comment` qui contient les informations sur les commentaires, tels que le contenu et la note. Un commentaire est lié à un vendeur et à un acheteur, nous avons alors deux ForeignKey vers `User`.
- `Order` qui contient les informations sur nos commandes. Une commande est liée à un acheteur et un vendeur (deux `User`) et à un `Post`. La table `Order` possède une colonne `stage` qui indique l'étape dans le processus de vente. À l'étape 1, l'acheteur a effectué sa commande. À l'étape 2, le vendeur valide qu'il a envoyé le produit. À l'étape 3, l'acheteur indique qu'il a bien reçu le produit. Et à l'étape 4, l'acheteur a écrit un commentaire.

## Second Step : Définition des valeurs des liens de pages

Notre fichier `main.py`, qui contient notre API FastAPI, va utiliser les tables et schémas, et notre base de données, créés précédemment. L'API peut être consultée indépendemment du front, en allant sur http://localhost:5000/docs.

Tout d'abord, au lancement de notre application, nous ajoutons des entrées initiales à nos tables. Cela nous permet d'avoir certaines données pour tester nos différentes fonctionnalités.

Ensuite, nous associons des méthodes GET, POST ou PUT de notre application à des fonctions dans le fichier `cruds.py`. Cela va nous permettre d'ajouter des entrées dans les tables de notre database, ou d'en ajouter ou d'en modifier.

Pour gérer la connexion des utilisateurs, nous avons créé une fonction de login, qui après vérification du nom d'utilisateur de du mot de passe, retourne un token. Pour pouvoir tester les fonctions nécessitant une connexion, il faut cliquer sur le bouton Authorize sur la page docs, et entrer un nom d'utilisateur et un mot de passe existants dans la base de données (par exemple, 'duongh' et 'duongh', ou 'tac' et 'tralo').

Nous avons pensé au problème de garder en mémoire les images de chaque annonce, pour rendre les annonces plus visibles. Nous avons donc encodé les images en message string `base64`, puis nous les avons stockées dans notre base de données. Nous les avons ensuite décodé pour les avoir continuellement sur les annonces. 

Pour créer une commande, il faut être connecté et choisir un produit en récupérant son ID. Le vendeur uniquement peut passer à l'étape suivante de la commande en validant qu'il a envoyé le produit. Ensuite, l'acheteur uniquement peut passer aux étapes suivantes, en indiquant qu'il a reçu, puis en indiquant qu'il a commenté.

## Third Step : Application des fonctions sur les pages webs

Le front-end de l'application a été réalisé en Javascript avec l'aide du framework React, et le style a été fait en CSS sans l'aide de framework. 

### Navigation, Fonctionnalités accesibles :

Parmis les fonctionnalités disponibles sur le site, vous aurez accès :

- À la consultation génerale des annonces postées sur le site
- Aux informations d'un produit, en cliquant sur son image
- Aux informations d'un utilisateur, en cliquant sur le bouton "Voir le profil" de la page produit
- À la page pour déposer une annonce
- À la page pour se connecter
- À la page pour voir votre profil
- Dans la barre principale située en haut de l'ecran, vous pourrez revenir à l'écran principal en cliquant sur le logo, consulter la page pour déposer une annonce, vous connecter, voir votre profil ou trier les annonces en fonction de leur catégorie.



## Problème Rencontré

Nous n'avons pas pu finir et obtenir tous les résultats attendus dans l'élaboration de notre site. \
\
Pour le développement front-end, nous avons rencontrés des problèmes de temps. Nous avons sur-estimé la charge d'apprentissage nécessaire pour apprendre le framework React, javascript, HTML et css.
Néanmoins, tous les élements techniques que nous voulions réaliser sont présents dans le back-end (disponible à la consultation et aux tests à l'adresse `http://localhost/5000/docs`)

Nous avons beaucoup de mal notamment à faire le lien entre les informations en back-end et les déployer sur notre front-end. 

Voilà les fonctionnalités que nous aurions voulu corriger: 
- Il est impossible de se connecter à votre compte, ou de créer votre propre compte
- Il est impossible de créer une annonce, ou d'effectuer de la maintenance sur vos annonces (supprimer, modérer les commentaires)
- Il est impossible de mettre un commentaire à un utilisateur
- Il est impossible d'ajouter des élements à votre panier
- Les images ne chargent pas sur les annonces


En encodant les images pour en faire une situation réelle, nous n'avons pas réussi à retranscrire les images directement sur nos pages webs. On a à la place décoder l'intégralité de nos pages inclus dans les informations initiales et envoyés toutes les images dans différents dossiers, que nous avons ensuite copié dans un autre dossier accessible par les pages du front. \
Le problème étant que nous n'arrivions pas à écrire les images directement dans un dossier du front, nous ne pouvons pas retranscrire les informations de manière imagées de chaque annonce qui seront crées par la suite.

De plus, pour rester dans la mise en situation, la déconnexion sur notre site n'as pas été simple, notamment pour récupérer le jeton de connexion de l'utilisateur actuel et le supprimer partiellement. Nous avions simplement essayé de redirigé vers la page d'accueil, en ne gardant rien en mémoire. 

Un axe d'amélioration aurait été également de trier les informations sur d'autre critères, comme par exemple par école, ou encore en fonction de la zone géographique. 
