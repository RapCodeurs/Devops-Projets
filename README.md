# MERN Task List App (Dockerized)

Ce projet est une application de gestion de tâches (Todo List) développée avec un frontend **React (Create React App)** et un backend **Node.js (Express)**. L'ensemble de l'application a été conteneurisé avec **Docker** pour simplifier son déploiement et son exécution.

## Architecture Docker

L'application est découpée en deux services distincts grâce à une architecture multi-conteneurs :

*   **`/backend`** : Contient le serveur Express (API) qui écoute sur le port `5000`. Son `Dockerfile` est basé sur une image légère `node:20-alpine`.
*   **`/frontend`** : Contient l'application React. Son `Dockerfile` compile le code de production et utilise l'utilitaire `serve` pour distribuer les fichiers statiques sur le port `5173`.
*   **`docker-compose.yml`** (à la racine) : Orchestre et interconnecte le frontend et le backend en gérant les variables d'environnement, les ports réseau et l'ordre de démarrage.

## Lancement Rapide

Assurez-vous d'avoir [Docker](https://docker.com) et Docker Compose installés sur votre machine.

1. **Cloner le projet** et placez-vous à la racine.
2. **Démarrer l'application** avec une seule commande :
   ```bash
   docker compose up --build -d
   ```

L'application est maintenant accessible aux adresses suivantes :
*   **Frontend (Interface Web)** : [http://localhost:5173](http://localhost:5173)
*   **Backend (API Rest)** : [http://localhost:5000/todos](http://localhost:5000/todos)

## Arrêter l'application

Pour stopper les conteneurs en arrière-plan sans supprimer vos données, exécutez :
```bash
docker compose down
```
