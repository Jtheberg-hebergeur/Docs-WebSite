# Guide de Contribution à Jtheberg Documentation

Merci de votre intérêt pour contribuer à la documentation Jtheberg ! 🎉

## 📋 Table des matières

- [Code de Conduite](#-code-de-conduite)
- [Comment puis-je contribuer ?](#-comment-puis-je-contribuer)
- [Processus de développement](#-processus-de-développement)
- [Standards de contribution](#-standards-de-contribution)
- [Structure du projet](#-structure-du-projet)
- [Conventions de commit](#-conventions-de-commit)
- [Processus de Pull Request](#-processus-de-pull-request)

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de respecter notre [Code de Conduite](CODE_OF_CONDUCT.md). Nous nous engageons à fournir un environnement accueillant et inclusif pour tous.

## 🤔 Comment puis-je contribuer ?

### Signaler un bug

Si vous trouvez un bug dans la documentation :

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/Jtheberg-hebergeur/Docs-WebSite/issues)
2. Si ce n'est pas le cas, créez une nouvelle issue avec :
   - Une description claire du problème
   - Les étapes pour reproduire
   - Le comportement attendu vs le comportement actuel
   - Des captures d'écran si applicable

### Proposer une amélioration

1. Ouvrez une issue pour discuter de votre proposition
2. Attendez le retour de l'équipe
3. Si approuvé, suivez le processus de Pull Request

### Améliorer la documentation

- Corriger des erreurs de frappe ou de grammaire
- Clarifier des instructions confuses
- Ajouter des exemples ou des captures d'écran
- Traduire du contenu
- Ajouter de nouvelles sections

### Ajouter du contenu

- Créer de nouvelles pages de documentation
- Ajouter des guides d'installation
- Documenter de nouvelles fonctionnalités

## 🚀 Processus de développement

### 1. Prérequis

- [Node.js](https://nodejs.org/) version 20 ou supérieure
- [Git](https://git-scm.com/)
- Un compte GitHub
- Un éditeur de texte (VS Code recommandé)

### 2. Configuration initiale

1. **Forkez le dépôt**
   - Cliquez sur le bouton "Fork" en haut à droite de la page GitHub

2. **Clonez votre fork**
   ```bash
   git clone https://github.com/VOTRE-USERNAME/Docs-WebSite.git
   cd Docs-WebSite
   ```

3. **Ajoutez le dépôt original comme remote**
   ```bash
   git remote add upstream https://github.com/Jtheberg-hebergeur/Docs-WebSite.git
   ```

4. **Installez les dépendances**
   ```bash
   npm install
   ```
   
   Ou sur Windows avec PowerShell :
   ```powershell
   .\install.ps1
   ```

### 3. Créer une branche

Toujours créer une nouvelle branche pour vos modifications :

```bash
git checkout -b feature/nom-de-votre-fonctionnalite
```

Conventions de nommage des branches :
- `feature/` - Nouvelles fonctionnalités
- `fix/` - Corrections de bugs
- `docs/` - Améliorations de documentation
- `refactor/` - Refactorisation de code

### 4. Développement local

Lancez le serveur de développement :

```bash
npm start
```

Ou sur Windows :
```powershell
.\dev.ps1
```

Le site sera accessible sur `http://localhost:3000`

### 5. Ajouter des métadonnées d'auteur

Lorsque vous créez ou modifiez une page, ajoutez vos métadonnées d'auteur dans le frontmatter :

```markdown
---
sidebar_position: 1
author: VotreNom
author_title: Votre Titre/Rôle
author_url: https://github.com/votre-username
author_image_url: https://github.com/votre-username.png
---

# Titre de la page

Contenu...
```

### 6. Vérifier vos modifications

Avant de soumettre une PR :

```bash
# Vérifier que le build fonctionne
npm run build

# Vérifier le linting (si configuré)
npm run lint
```

## 📝 Standards de contribution

### Format Markdown

- Utilisez des titres hiérarchiques (H1, H2, H3)
- Ajoutez des blocs de code avec la syntaxe appropriée
- Utilisez des listes pour améliorer la lisibilité
- Ajoutez des emojis de manière appropriée (pas trop)

### Structure des pages

Chaque page devrait avoir :

1. Un titre clair (H1)
2. Une introduction brève
3. Des sections organisées avec des sous-titres
4. Des exemples de code si applicable
5. Des avertissements ou notes importantes si nécessaire

### Exemple de page

```markdown
---
sidebar_position: 1
author: VotreNom
author_title: Contributeur
author_url: https://github.com/votre-username
author_image_url: https://github.com/votre-username.png
---

# Titre de la page

Introduction brève de ce que cette page explique.

## Section 1

Contenu de la section...

## Section 2

Contenu de la section...

:::warning Attention

Note importante pour l'utilisateur.

:::
```

## 📋 Conventions de commit

Utilisez des messages de commit clairs et descriptifs :

```
type: description courte

Description plus détaillée si nécessaire
```

Types de commit :
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation uniquement
- `style:` - Formatage, point-virgule manquant, etc.
- `refactor:` - Refactorisation de code
- `test:` - Ajout de tests
- `chore:` - Maintenance

Exemples :
```
docs: ajouter guide d'installation Pterodactyl
fix: corriger erreur dans la commande Docker
feat: ajouter support pour Podman
```

## 🔄 Processus de Pull Request

### 1. Préparer votre PR

- Assurez-vous que votre branche est à jour avec `main`
- Vérifiez que tous les tests passent
- Assurez-vous que le build fonctionne

### 2. Créer la Pull Request

1. Poussez votre branche vers votre fork :
   ```bash
   git push origin feature/nom-de-votre-fonctionnalite
   ```

2. Sur GitHub, cliquez sur "New Pull Request"
3. Remplissez le template de PR :
   - Description claire de ce que fait votre PR
   - Référence aux issues liées (si applicable)
   - Captures d'écran si changement visuel

### 3. Révision

- Les mainteneurs examineront votre PR
- Des modifications peuvent être demandées
- Répondez aux commentaires et faites les modifications nécessaires

### 4. Merge

Une fois approuvée, votre PR sera mergée ! 🎉

## 📁 Structure du projet

```
Docs-WebSite/
├── docs/                    # Documentation Markdown
│   ├── docker/             # Documentation Docker
│   ├── nextcloud/          # Documentation Nextcloud
│   ├── pterodactyl/        # Documentation Pterodactyl
│   └── ...
├── src/                     # Code source React
│   ├── components/         # Composants React
│   ├── pages/              # Pages personnalisées
│   └── theme/              # Thème Docusaurus
├── static/                  # Fichiers statiques
├── docusaurus.config.js     # Configuration Docusaurus
└── sidebars.js             # Configuration de la sidebar
```

## 🐛 Signaler un problème

Si vous trouvez un bug :

1. Vérifiez les [Issues existantes](https://github.com/Jtheberg-hebergeur/Docs-WebSite/issues)
2. Créez une nouvelle issue avec :
   - Titre descriptif
   - Description détaillée
   - Étapes pour reproduire
   - Comportement attendu vs actuel

## 💡 Proposer une fonctionnalité

1. Ouvrez une issue avec le label "enhancement"
2. Décrivez la fonctionnalité proposée
3. Expliquez pourquoi elle serait utile
4. Attendez la discussion avec l'équipe

## 📚 Ressources

- [Documentation Docusaurus](https://docusaurus.io/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## 🙋 Besoin d'aide ?

- 📧 Email : support@jtheberg.cloud
- 💬 Discord : Rejoignez notre communauté
- 🐛 Issues : [GitHub Issues](https://github.com/Jtheberg-hebergeur/Docs-WebSite/issues)

## 📝 Licence

En contribuant, vous acceptez que vos contributions soient sous la [licence Jtheberg Community](LICENSE).

---

**Merci de contribuer à Jtheberg Documentation !** 🎉
