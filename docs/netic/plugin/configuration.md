---
sidebar_position: 3
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# 3. Configuration de Netic

Guide complet de configuration du plugin NeticAI pour personnaliser son comportement selon vos besoins.

## 📁 Emplacement du fichier

Le fichier de configuration se trouve dans : `plugins/NeticAI/config.yml`

## ⚙️ Configuration minimale

Pour une installation rapide, voici la configuration minimale requise :

```yaml
api:
  key: "VOTRE_CLE_API_ICI"

ia:
  name: "NETIC"
  trigger: "!ia"
```

## 🔧 Configuration complète

### API Netic

```yaml
api:
  # Clé API obligatoire (obtenez-la sur netic.jtheberg.cloud)
  key: "VOTRE_CLE_API_ICI"
  
  # Active l'API publique pour les autres plugins
  public-enabled: true
```

### Configuration de l'IA

```yaml
ia:
  # Nom de l'IA qui apparaîtra dans les réponses
  name: "NETIC"
  
  # Trigger pour parler à l'IA dans le chat
  trigger: "!ia"
  
  # Cooldown de base entre les messages (en secondes)
  cooldown-seconds: 3
  
  # Nombre maximum de messages dans l'historique
  max-history: 20
```

### Rate Limiting (Anti-spam)

```yaml
rate-limit:
  # Limites par joueur
  player:
    requests-per-minute: 10
    
  # Limites globales pour tout le serveur
  global:
    requests-per-minute: 50
```

### Cache Intelligent

```yaml
cache:
  # Active le cache pour améliorer les performances
  enabled: true
  
  # Durée de vie des entrées en cache (minutes)
  ttl-minutes: 30
  
  # Taille maximale du cache (nombre d'entrées)
  max-size: 1000
```

### Base de Données

#### SQLite (recommandé pour débuter)

```yaml
database:
  type: "sqlite"
  sqlite:
    file: "netic_history.db"
```

**Avantages :**
- ✅ Aucune configuration requise
- ✅ Fichier local simple
- ✅ Parfait pour petits/moyens serveurs

#### MariaDB (recommandé pour gros serveurs)

```yaml
database:
  type: "mariadb"
  mariadb:
    host: "localhost"
    port: 3306
    database: "netic"
    username: "netic_user"
    password: "mot_de_passe"
    
# Options avancées MariaDB
    pool-size: 10
    connection-timeout: 30000
    max-lifetime: 1800000
```

**Avantages :**
- ✅ Meilleure performance pour gros serveurs
- ✅ Serveur dédié possible
- ✅ Scalabilité supérieure

### Support Audio (v1.0-c1-beta)

```yaml
audio:
  # Active le support audio (transcription, chat vocal)
  enabled: true
  
  # Formats supportés (whitelist)
  supported-formats:
    - "webm"
    - "mp3"
    - "wav"
    - "ogg"
    - "m4a"
    - "flac"
  
  # Taille maximale des fichiers (en MB)
  max-file-size: 25
  
  # Dossier de stockage des fichiers audio
  storage-folder: "audio"
  
  # Nettoyage automatique des anciens fichiers (jours)
  cleanup-days: 7
```

### Système de mise à jour

```yaml
update:
  # Vérifie les mises à jour au démarrage
  check-on-startup: true
  
  # Notifie les admins à la connexion
  notify-admins: true
  
  # Intervalle de vérification (heures)
  check-interval: 24
```

## 📊 Tableau des paramètres

| Paramètre | Description | Défaut | Requis |
|-----------|-------------|--------|--------|
| `api.key` | Clé API Netic | - | ✅ |
| `api.public-enabled` | Active l'API publique | `true` | ❌ |
| `ia.name` | Nom de l'IA | `"NETIC"` | ❌ |
| `ia.trigger` | Trigger pour parler | `"!ia"` | ❌ |
| `ia.cooldown-seconds` | Cooldown basique | `3` | ❌ |
| `rate-limit.player.requests-per-minute` | Limite par joueur | `10` | ❌ |
| `rate-limit.global.requests-per-minute` | Limite globale | `50` | ❌ |
| `cache.enabled` | Active le cache | `true` | ❌ |
| `cache.ttl-minutes` | Durée de vie du cache | `30` | ❌ |
| `database.type` | Type de BDD | `"sqlite"` | ❌ |
| `history.max-messages` | Taille historique | `20` | ❌ |

## 🔍 Recommandations de configuration

### Pour petits serveurs (< 50 joueurs)

```yaml
rate-limit:
  player:
    requests-per-minute: 15
  global:
    requests-per-minute: 100

cache:
  max-size: 500

database:
  type: "sqlite"
```

### Pour serveurs moyens (50-200 joueurs)

```yaml
rate-limit:
  player:
    requests-per-minute: 10
  global:
    requests-per-minute: 200

cache:
  max-size: 2000

database:
  type: "sqlite"
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

## 🔄 Rechargement de la configuration

Après avoir modifié `config.yml` :

### Méthode 1 : Commande en jeu
```bash
/netic reload
```

### Méthode 2 : Redémarrage
```bash
# Arrêtez le serveur
# Redémarrez le serveur
```

## ✅ Validation de la configuration

Utilisez cette commande pour vérifier votre configuration :

```bash
/netic status
```

Elle affichera :
- ✅ Configuration valide
- ✅ Connexion API établie
- ✅ Base de données connectée
- ✅ Cache opérationnel

## ⚠️ Erreurs courantes

### Clé API invalide
```
[NeticAI] Erreur : Clé API invalide
```
**Solution :** Vérifiez votre clé sur netic.jtheberg.cloud

### Base de données inaccessible
```
[NeticAI] Erreur : Connexion BDD échouée
```
**Solution :** Vérifiez les credentials et permissions

### Rate limiting trop restrictif
**Solution :** Ajustez les valeurs dans `rate-limit:`

---

**Configuration terminée ! 🎉 Votre NeticAI est maintenant personnalisé selon vos besoins.**
