# 📚 Jtheberg - Projet Communautaire

Documentation et ressources officielles de Jtheberg.cloud - Un projet open source communautaire 🌍

[![License: Jtheberg Community](https://img.shields.io/badge/License-Jtheberg_Community-yellow.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/Jtheberg-Cloud/documentation)](https://github.com/Jtheberg-Cloud/documentation/graphs/contributors)
[![CI/CD](https://github.com/Jtheberg-Cloud/documentation/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Jtheberg-Cloud/documentation/actions/workflows/ci-cd.yml)

**Maintenu par la communauté Jtheberg** 👥

## 📋 Table des matières
- [Contribuer](#-comment-contribuer)
- [Licence](#-licence)
- [Contributeurs](#-contributeurs)
- [Développement](#-développement-local)

---

## 🚀 Démarrage Rapide

### 1️⃣ Installer les dépendances (première fois)

```powershell
.\install.ps1
```

### 2️⃣ Lancer le serveur de développement

```powershell
.\test.ps1
```

**Le serveur démarre en 20-30 secondes** (webpack compile tous les fichiers)
- ✅ Ouvre automatiquement le navigateur
- ✅ Hot reload activé - Modifications instantanées
- ✅ Logs en temps réel colorés
- ✅ Appuyez sur une touche pour arrêter
- ✅ Nettoie tout automatiquement

---

## 🎨 Nouvelles Fonctionnalités

### ✅ Thème Sombre Corrigé
- Texte de la sidebar maintenant visible en mode sombre
- Meilleur contraste pour tous les éléments

### ✅ Logo Jtheberg
- Logo officiel de Jtheberg.cloud intégré
- Visible dans la navbar

### ✅ Traductions Anglaises
- Toutes les catégories traduites en anglais
- Support complet FR/EN

### ✅ Pas de Date de Mise à Jour
- Pages plus propres
- Pas de "Dernière mise à jour" en bas des pages

---

## 🏭 Test PRODUCTION

**Pour tester la version finale avant Docker :**

```powershell
.\test-prod.ps1
```

- 🔨 Compile la documentation
- 🌐 Lance un serveur de production
- 🧪 Testez comme en production
- 🧹 Nettoie tout à la fin

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
docker run -d --name jtheberg-docs -p 80:80 -v "${PWD}/docs:/docs" -v "${PWD}/blog:/blog" jtheberg-docs:latest
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

## 🌐 Déploiement en production

L'image contient déjà la documentation buildée. Pour déployer :

```powershell
# Build
docker build -t jtheberg-docs:latest .

# Run en production
docker run -d --name jtheberg-docs -p 80:80 jtheberg-docs:latest
```

Pour un déploiement sans volumes (documentation figée dans l'image) :
```powershell
docker run -d --name jtheberg-docs -p 80:80 jtheberg-docs:latest
```

## 📖 Documentation Docusaurus

Pour plus d'informations sur Docusaurus : https://docusaurus.io
