# Projet UniverSiT'esEtudiant

# INTRODUCTION
\
Notre projet sera de créer une plateforme de revente en ligne de produits ayant appartenu à des étudiants.
\
\
La revente en ligne peut parfois posé des problèmes notamment au niveau de la fiabilité des produits et de la confiance que l'on peut accorder à certains vendeurs. 
\
\
Pour améliorer cette situation, nous avons voulu concevoir ce site qui sera uniquement orienté autour du monde étudiant, ce qui peut donner un peu plus de conviction à l'achat de produit d'ocassion venant de personnes de la même génération que nous.



# INSTALLATION ET UTILISATION DES FICHIERS

## Installation de Git et récupération des fichiers

Vérifiez tout d'abord que vous avez installé [Git](https://git-scm.com/) pour la récupération des fichiers.

Nous allons maintenant cloner le projet dans le répertoire de votre choix. Pour cela, cliquez sur votre répertoire et faites clique-droit `Git Bash Here`.

Une fois Git Bash ouvert, nous allons cloner le répertoire en ligne où se trouve le projet. Cliquez sur le bouton `Clone or Download` et copiez l'adresse HTTPS du [répertoire](https://git.esiee.fr/duongh/fullstack_data.git).
Une fois copié, retournez dans Git Bash et tapez la commande `git clone` (adresse du répertoire) et cela vous donnera un accès de téléchargement au répertoire.
Finalement, tapez la commande `git pull` et vous aurez à votre disposition tous les fichiers du projet. 

## Comprendre les fichiers
\
Voici l'inventaire des fichiers présents dans notre projet :
- le dossier [`app`](https://git.esiee.fr/duongh/fullstack_data/-/tree/master/app) qui contiendra toutes les informations des chemins de notre site, et qui fera la liaison avec notre base de données PostgresSQL.
- le dossier [`my-app`](https://git.esiee.fr/duongh/fullstack_data/-/tree/master/my-app) qui sera la partie visuelle de notre site, contenant toutes nos templates JS.
- le fichier [`requirement.txt`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/requirements.txt) contenant tous les packages nécessaires au bon fonctionnement de notre application.
- le fichier [`.gitignore`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/.gitignore) qui va nous aider à ignorer les fichiers non modifié, comme par exemple les extensions JavaScripts utiles pour les modules qu'on ne va pas modifier, ainsi que les caches Python. 
- le fichier [`Dockerfile`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/Dockerfile) contenant l'extension `FastAPI` que nous allons utiliser, et les commandes pour compiler les `requirements` pour nos modules Python. 
- le fichier [`docker-compose.yml`](https://git.esiee.fr/duongh/fullstack_data/-/blob/master/docker-compose.yml) qui va lister toutes les `images Docker` que nous allons utiliser pour la partie `Backend` pour notre site.

# USER'S GUIDE 

## Installation des packages nécessaires
\
Vérifiez tout d'abord si vous disposez de la bonne version de [`Python`](https://www.python.org/downloads/). Pour cela:
- ouvrir l'invite de commandes de Windows (Windows+R, puis tapez cmd)
- dans l'invite de commandes tapez `python --version`
- vérifiez si la version est à jour, de préférence la version `3.9.7`

L'installation des modules `node.js` est également nécessaires. Pour vérifier cela:
- allez dans le terminal du dossier du projet
- tapez la commande `npm`
- si rien ne se passe ou que la commande n'est pas reconnu, télécharger nodeJS via le lien suivant [`ici`](https://nodejs.org/en/download/) 

Une autre application que vous devez également avoir est [`Docker`](https://www.docker.com/get-started), permettant de vous fournir la même version que nous avons développés et la sureté du bon fonctionnement. Assurez également d'avoir installé [`WSL 2`](https://docs.microsoft.com/fr-fr/windows/wsl/install) permettant une couche de compatibilité entre les éxecutables Linux et le système Windows.

Certains packages seront également nécessaires à installer pour la bonne utilisation du dash si cela n'est pas déjà fait :
- ouvrir l'invite de commandes et se rendre dans le dossier du projet
- Tapez la commande `docker compose build` pour installer les packages nécessaires et construire les images nécessaires pour notre plateforme.
- Tapez la commande `docker compose up -d`, cette commande va permettre de démarrer notre image api en front et db en back, nécessaires à la plateforme.
- Une fois la commande tapée, démarrer le fichier principal en tapant les commandes suivantes:
    - `npm install` qui va installer tous les modules js nécessaires à l'initialisation des pages,
    - `npm start` qui va initialiser l'addresse locale de la plateforme. 


## Fonctionnement de l'application Web


Séance 28/10 : add link to routers from postgre (ex: create links)