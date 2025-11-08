# 📚 Jtheberg Documentation - Projet Communautaire

[![License: Jtheberg Community](https://img.shields.io/badge/License-Jtheberg_Community-yellow.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/Jtheberg-hebergeur/Docs-WebSite)](https://github.com/Jtheberg-hebergeur/Docs-WebSite/graphs/contributors)
[![Website](https://img.shields.io/badge/Website-jtheberg.cloud-blue)](https://jtheberg.cloud)

Documentation complète et ressources officielles de **Jtheberg.cloud** - Un projet open source communautaire 🌍

**Maintenu par la communauté Jtheberg** 👥

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Démarrage rapide](#-démarrage-rapide)
- [Contribuer](#-comment-contribuer)
- [Code de conduite](#-code-de-conduite)
- [Sécurité](#-sécurité)
- [Licence](#-licence)
- [Support](#-support)

## 🎯 À propos

Ce projet contient la documentation complète pour l'installation, la configuration et l'utilisation de divers services hébergés par Jtheberg.cloud. La documentation couvre :

- 🦖 **Pterodactyl Panel** - Gestionnaire de serveurs de jeux moderne
- 🦅 **Wings** - Daemon pour Pterodactyl
- 🎨 **Blueprint** - Extensions pour Pterodactyl
- 🐳 **Docker** - Conteneurisation d'applications
- 🔷 **Podman** - Alternative à Docker
- 🔧 **Plesk** - Panel de gestion d'hébergement web
- ☁️ **Nextcloud** - Solution de stockage cloud privé

## ✨ Fonctionnalités

- 📖 Documentation complète et à jour
- 🌍 Interface multilingue (Français)
- 👥 Système de contributeurs
- 🎨 Interface moderne et responsive
- 🔍 Recherche intégrée
- 📱 Compatible mobile
- 🚀 Déploiement facile avec Docker

---

## 🚀 Démarrage Rapide

### 1️⃣ Installer les dépendances (première fois)

```powershell
.\install.ps1
```

### 2️⃣ Lancer le serveur de développement

```powershell
.\dev.ps1
```

**Le serveur démarre en 20-30 secondes** (webpack compile tous les fichiers)
- ✅ Ouvre automatiquement le navigateur
- ✅ Hot reload activé - Modifications instantanées
- ✅ Logs en temps réel colorés
- ✅ Appuyez sur une touche pour arrêter
- ✅ Nettoie tout automatiquement

---
---

## 🐳 Build Docker (Production)

### 1. Construire l'image Docker

```powershell
.\build.ps1
```

Ou manuellement :
```powershell
docker build -t jtheberg-docs:latest .
```

### 2. Lancer le conteneur

```powershell
.\run.ps1
```

Ou manuellement :
```powershell
docker run -d --name jtheberg-docs -p 80:80 -v "${PWD}/docs:/docs" jtheberg-docs:latest
```

### 3. Accéder à la documentation

Ouvrez votre navigateur sur : **http://localhost**

## 📝 Modifier la documentation

### Structure des fichiers

```
.
├── docs/           # 📄 Fichiers de documentation (Markdown)
├── blog/           # 📝 Articles de blog (Markdown)
├── static/         # 🖼️ Images et fichiers statiques
├── src/            # ⚛️ Pages React personnalisées
└── Dockerfile      # 🐳 Configuration Docker
```

### Ajouter une nouvelle page de documentation

1. Créez un fichier `.md` dans `docs/`
2. Ajoutez le front matter :

```markdown
---
sidebar_position: 1
title: Ma page
---

# Ma page

Contenu...
```

3. Relancez le conteneur :

```powershell
docker stop jtheberg-docs
.\run.ps1
```

### Ajouter un article de blog

1. Créez un fichier dans `blog/` avec le format : `YYYY-MM-DD-titre.md`
2. Ajoutez le front matter :

```markdown
---
slug: mon-article
title: Mon article
authors: [admin]
tags: [tag1, tag2]
---

Contenu...
```

## 🔧 Commandes utiles

### Arrêter le conteneur
```powershell
docker stop jtheberg-docs
```

### Redémarrer le conteneur
```powershell
docker restart jtheberg-docs
```

### Voir les logs
```powershell
docker logs jtheberg-docs
```

### Supprimer le conteneur
```powershell
docker stop jtheberg-docs
docker rm jtheberg-docs
```

### Reconstruire l'image
```powershell
docker build -t jtheberg-docs:latest . --no-cache
```

## 🎨 Personnalisation

### Modifier les couleurs
Éditez `src/css/custom.css`

### Modifier la configuration
Éditez `docusaurus.config.js`

### Modifier la sidebar
Éditez `sidebars.js`

## 📦 Volumes montés

Les dossiers suivants sont montés en volumes pour permettre les modifications à chaud :
- `docs/` → Documentation
- `blog/` → Articles de blog

**Note :** Après modification, relancez le conteneur pour rebuilder la documentation.

## 🤝 Comment contribuer

Nous accueillons toutes les contributions ! Que vous souhaitiez corriger une faute de frappe, ajouter une nouvelle section ou améliorer la documentation existante, votre aide est la bienvenue.

Consultez notre [Guide de Contribution](CONTRIBUTING.md) pour plus de détails.

### Types de contributions

- ✏️ Corriger des erreurs ou améliorer la clarté
- ➕ Ajouter de nouvelles sections de documentation
- 🌐 Améliorer les traductions
- 🐛 Signaler des bugs
- 💡 Proposer de nouvelles fonctionnalités

## 📜 Code de conduite

Ce projet adhère à un [Code de Conduite](CODE_OF_CONDUCT.md). En participant, vous êtes tenu de maintenir ce code.

## 🔒 Sécurité

Si vous découvrez une vulnérabilité de sécurité, veuillez consulter notre [Politique de Sécurité](SECURITY.md) pour savoir comment la signaler.

## 📄 Licence

Ce projet est sous licence [Jtheberg Community License](LICENSE).

## 💬 Support

- 📧 **Email** : support@jtheberg.cloud
- 🌐 **Site web** : [jtheberg.cloud](https://jtheberg.cloud)
- 💬 **Discord** : Rejoignez notre communauté
- 🐛 **Issues** : [GitHub Issues](https://github.com/Jtheberg-hebergeur/Docs-WebSite/issues)

## 🙏 Remerciements

Merci à tous les [contributeurs](https://github.com/Jtheberg-hebergeur/Docs-WebSite/graphs/contributors) qui rendent ce projet possible !

---

**Fait avec ❤️ par la communauté Jtheberg**
