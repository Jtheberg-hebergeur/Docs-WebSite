---
sidebar_position: 2
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# 2. Installation de Netic

Suivez ce guide pour installer et configurer NeticAI sur votre serveur Minecraft Paper.

## 📋 Prérequis

Avant d'installer Netic, assurez-vous d'avoir :

- **Serveur Paper 1.21+** (ou Paper 1.21.1+)
- **Java 21** installé sur votre système
- **Clé API Netic** (gratuite)

## 📦 Étapes d'installation

### 1. Télécharger le plugin

1. Rendez-vous sur [GitHub Releases](https://github.com/Jtheberg-hebergeur/Netic-PaperMC-Plugin/releases)
2. Téléchargez la dernière version : `NeticAI-1.0-c1-beta.jar`

### 2. Installer le plugin

1. Placez `NeticAI-*.jar` dans votre dossier `plugins/`
2. Démarrez votre serveur pour générer la configuration par défaut
3. Arrêtez le serveur après la première génération

### 3. Obtenir votre clé API

1. Visitez [netic.jtheberg.cloud](https://netic.jtheberg.cloud)
2. Créez un compte ou connectez-vous
3. Générez votre clé API gratuite
4. Copiez votre clé API

### 4. Configurer la clé API

1. Ouvrez le fichier `plugins/NeticAI/config.yml`
2. Remplacez la clé API par la vôtre :

```yaml
api:
  key: "VOTRE_CLE_API_ICI"
```

### 5. Finaliser l'installation

1. Redémarrez votre serveur
2. OU utilisez la commande `/netic reload` si le serveur est déjà démarré
3. Testez l'installation en envoyant : `!ia Bonjour`

## ✅ Vérification de l'installation

### Commandes de test

```bash
# Vérifier le statut du plugin
/netic status

# Voir les statistiques
/netic stats

# Tester l'IA
!ia Comment faire une pioche en diamant ?
```

### Messages de confirmation

Si l'installation est réussie, vous devriez voir dans les logs :

```
[NeticAI] Plugin activé avec succès
[NeticAI] Connexion à l'API Netic établie
[NeticAI] Clé API valide
[NeticAI] Base de données initialisée
```

## 🔧 Configuration minimale

Pour une installation rapide, voici la configuration minimale requise dans `config.yml` :

```yaml
api:
  key: "VOTRE_CLE_API_ICI"

ia:
  name: "NETIC"
  trigger: "!ia"

database:
  type: "sqlite"
```

## 🚀 Démarrage rapide

Après l'installation :

1. **Joueurs** : Utilisent `!ia` pour parler à l'IA
2. **Admins** : Utilisent `/netic` pour gérer le plugin
3. **Développeurs** : Peuvent utiliser l'API publique

## 📝 Notes importantes

- Tous les joueurs partagent la même conversation
- L'historique est sauvegardé en mémoire et dans la base de données
- Le plugin fonctionne sur Paper 1.21.x

## 🆘 Problèmes courants

### Plugin ne se lance pas
- Vérifiez que vous utilisez Paper (pas Spigot ou CraftBukkit)
- Vérifiez votre version Java (Java 21 requis)
- Consultez les logs pour les erreurs spécifiques

### Clé API invalide
- Vérifiez que la clé est correctement copiée sans espaces
- Assurez-vous que la clé n'est pas expirée
- Testez votre connexion internet

### Base de données erreur
- Vérifiez les permissions du dossier `plugins/NeticAI/`
- Pour MariaDB, vérifiez les credentials de connexion

---

**Installation terminée ! 🎉 Votre serveur est maintenant prêt avec Netic !**
