---
title: Docker Compose
sidebar_position: 2
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Docker Compose
# 🔨 Docker Compose

Cette page contient des instructions sur la façon d'installer Docker Compose. 🐳

Docker Compose est un outil qui vous permet de définir et gérer des applications multi-conteneurs. C'est essentiel pour orchestrer plusieurs services Docker ensemble !

## 📥 Installation

### Étape 1 : Télécharger Docker Compose

Pour télécharger et installer Docker Compose de manière autonome, exécutez :

```bash
curl -SL https://github.com/docker/compose/releases/download/v2.39.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
```

### Étape 2 : Permissions d'exécution

Appliquez les permissions d'exécution au binaire autonome dans le chemin cible pour l'installation.

```bash
chmod +x /usr/local/bin/docker-compose
```

### Étape 3 : Test de l'installation

Tester et exécuter des commandes Docker Compose à l'aide de `docker-compose`.

:::tip Pourboire

Si la commande `docker-compose` échoue après l'installation, vérifiez votre chemin. Vous pouvez également créer un lien symbolique vers `/usr/bin` ou n'importe quel autre répertoire de votre chemin. Par exemple :

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

:::

### Étape 4 : Vérification finale ✅

Vérifiez que Docker Compose est correctement installé :

```bash
docker-compose version
```

Vous devriez voir la version de Docker Compose s'afficher. 🎉

## 🚀 Prochaines étapes

Maintenant que Docker Compose est installé, vous pouvez :

- 📝 **Créer votre premier docker-compose.yml** - Définissez vos services
- 🏃 **Lancer vos conteneurs** - `docker-compose up -d`
- 📊 **Gérer vos services** - `docker-compose ps`, `docker-compose logs`
- 🛑 **Arrêter vos services** - `docker-compose down`

## 💡 Exemple rapide

Voici un exemple simple de fichier `docker-compose.yml` :

```yaml
version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: example
```

Lancez-le avec : `docker-compose up -d` 🚀
