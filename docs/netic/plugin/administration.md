---
sidebar_position: 4
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# 4. Guide d'Administration

Guide complet pour administrer et gérer NeticAI sur votre serveur Minecraft.

## 🔐 Permissions requises

Pour administrer NeticAI, vous avez besoin des permissions suivantes :

| Permission | Description | Défaut |
|------------|-------------|--------|
| `netic.admin` | Accès à toutes les commandes admin | `op` |
| `netic.bypass.ratelimit` | Ignore les limites de rate | `op` |
| `netic.bypass.cooldown` | Ignore le cooldown | `op` |
| `netic.use` | Utiliser l'IA dans le chat | `true` |
| `netic.api.use` | Utilisation API par plugins | `true` |

### Accorder les permissions

#### Avec LuckPerms
```bash
# Donner les permissions admin
/lp user <joueur> permission set netic.admin true
/lp user <joueur> permission set netic.bypass.ratelimit true
/lp user <joueur> permission set netic.bypass.cooldown true

# Pour un groupe
/lp group admin permission set netic.admin true
```

#### Avec PermissionsEx
```bash
/pex user <joueur> add netic.admin
/pex user <joueur> add netic.bypass.ratelimit
/pex user <joueur> add netic.bypass.cooldown
```

## 📋 Commandes d'administration

### Commandes principales

| Commande | Description | Alias |
|----------|-------------|-------|
| `/netic status` | Affiche le statut du plugin | `/neticai status`, `/ia status` |
| `/netic stats` | Statistiques détaillées | `/neticai stats` |
| `/netic reload` | Recharge la configuration | `/neticai reload` |
| `/netic reset` | Réinitialise l'historique | `/neticai reset` |
| `/netic setname <nom>` | Change le nom de l'IA | `/neticai setname` |
| `/netic update` | Vérifier les mises à jour | `/neticai update` |

### Commandes de cache

| Commande | Description |
|----------|-------------|
| `/netic cache clear` | Vide le cache |
| `/netic cache stats` | Statistiques du cache |

### Commandes de rate limiting

| Commande | Description |
|----------|-------------|
| `/netic clearcooldown` | Reset tous les cooldowns et rate limits |

## 📊 Monitoring et Statistiques

### `/netic status`
Affiche l'état général du plugin :

```
[NeticAI Status]
✅ Plugin: Activé (v1.0-c1-beta)
✅ API Netic: Connectée
✅ Base de données: SQLite (netic_history.db)
✅ Cache: Activé (1000/1000 entrées)
✅ Rate Limiting: Actif
📊 Requêtes totales: 1,247
⏡ Uptime: 2h 34m
```

### `/netic stats`
Statistiques détaillées d'utilisation :

```
[NeticAI Statistiques]
📈 Utilisation globale:
  • Requêtes totales: 1,247
  • Réussies: 1,198 (96.1%)
  • Erreurs: 49 (3.9%)
  • Cache hits: 823 (65.9%)

⏡ Performance:
  • Latence moyenne: 145ms
  • Latence cache: <1ms
  • Requêtes/minute: 8.3

👥 Joueurs actifs (24h):
  • Uniques: 47
  • Moyenne/joueur: 26.5 requêtes
  • Top utilisateur: Player123 (142 requêtes)

🗄️ Base de données:
  • Messages sauvegardés: 1,247
  • Taille DB: 2.4 MB
  • Connexions actives: 3/10
```

### `/netic cache stats`
Informations sur le cache :

```
[NeticAI Cache Stats]
📊 Cache: Activé
• Taille actuelle: 823/1000 entrées
• Hit rate: 65.9%
• TTL moyen: 18.5 minutes
• Mémoire utilisée: 12.4 MB
• Dernier nettoyage: Il y a 2h 15m
```

## 🔧 Gestion de la configuration

### Recharger la configuration
```bash
/netic reload
```

Après modification de `config.yml`, cette commande recharge :
- ✅ Clé API
- ✅ Paramètres de l'IA
- ✅ Limites de rate
- ✅ Configuration du cache
- ✅ Paramètres BDD

### Changer le nom de l'IA
```bash
/netic setname "Assistant"
```
Le nom sera utilisé dans toutes les réponses de l'IA.

## 🔄 Gestion des mises à jour

### Vérification manuelle
```bash
/netic update
```

Affiche :
- Version actuelle installée
- Dernière version disponible
- Lien de téléchargement
- Notes de version

### Mise à jour automatique
Le plugin vérifie automatiquement les mises à jour :
- Au démarrage du serveur
- Toutes les 24 heures
- Notifie les admins avec la permission `netic.admin`

## 🗄️ Gestion de la base de données

### Réinitialiser l'historique
```bash
/netic reset
```
⚠️ **Attention :** Cette action supprime tout l'historique de conversation !

### Migration SQLite → MariaDB

1. **Backup actuel :**
   ```bash
   cp plugins/NeticAI/netic_history.db ./netic_backup.db
   ```

2. **Configurer MariaDB dans config.yml :**
   ```yaml
   database:
     type: "mariadb"
     mariadb:
       host: "localhost"
       port: 3306
       database: "netic"
       username: "netic_user"
       password: "mot_de_passe"
   ```

3. **Redémarrer le serveur**

## 🛡️ Gestion des Rate Limits

### Réinitialiser les cooldowns
```
/netic clearcooldown
```

Utile quand un joueur est bloqué accidentellement.

### Ajuster les limites dynamiquement

Pour modifier les limites sans redémarrer :

1. **Éditez config.yml :**
   ```yaml
   rate-limit:
     player:
       requests-per-minute: 20  # Augmenté de 10 à 20
     global:
       requests-per-minute: 100 # Augmenté de 50 à 100
   ```

2. **Rechargez :**
   ```bash
   /netic reload
   ```

## 🔍 Dépannage avancé

### Vérifier la connexion API
```bash
/netic status
```
Regardez la ligne "API Netic" :
- ✅ Connectée : Tout fonctionne
- ❌ Erreur : Vérifiez votre clé API

### Tester l'IA
```bash
# En tant que joueur
!ia Test de connexion
```

### Logs utiles
Surveillez ces messages dans les logs :

```
[NeticAI] Plugin activé avec succès
[NeticAI] Connexion à l'API Netic établie
[NeticAI] Base de données initialisée
[NeticAI] Cache initialisé (1000 entrées)
[NeticAI] Rate limiting activé
```

Messages d'erreur :
```
[NeticAI] Erreur : Clé API invalide
[NeticAI] Erreur : Connexion BDD échouée
[NeticAI] Attention : Rate limit atteint
```

## 📈 Optimisation des performances

### Pour petits serveurs (< 50 joueurs)
```yaml
rate-limit:
  player:
    requests-per-minute: 15
  global:
    requests-per-minute: 100

cache:
  max-size: 500
```

### Pour gros serveurs (> 200 joueurs)
```yaml
rate-limit:
  player:
    requests-per-minute: 8
  global:
    requests-per-minute: 500

cache:
  max-size: 5000

database:
  type: "mariadb"
  mariadb:
    pool-size: 20
```

## 🚨 Bonnes pratiques d'administration

### ✅ À faire régulièrement
- Vérifier `/netic status` quotidiennement
- Surveiller les statistiques avec `/netic stats`
- Nettoyer le cache si nécessaire
- Mettre à jour le plugin régulièrement

### ✅ Sauvegardes
- Backup régulier de `netic_history.db`
- Sauvegarder `config.yml` avant modifications
- Documenter vos changements de configuration

### ✅ Surveillance
- Surveiller l'utilisation par joueur
- Vérifier les erreurs dans les logs
- Ajuster les rate limits selon l'activité

---

**Administration terminée ! 🎉 Votre serveur NeticAI est maintenant optimisé et bien géré.**
