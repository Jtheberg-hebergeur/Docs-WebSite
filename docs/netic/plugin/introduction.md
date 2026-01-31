---
sidebar_position: 1
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# 1. Introduction 

**Plugin Minecraft Paper | License Jtheberg Community**

NeticAI est un plugin Minecraft qui intègre l'intelligence artificielle Netic directement dans votre serveur Paper. Vos joueurs peuvent discuter avec une IA capable de comprendre le contexte du jeu, donner des conseils, expliquer des mécaniques ou simplement converser naturellement.

## ✨ Fonctionnalités principales

### 💬 Chat IA Intelligent
- Discussion naturelle avec l'IA via un simple trigger (`!ia`)
- Historique contextuel de 20 messages
- Réponses adaptées au contexte Minecraft
- Conversation partagée entre tous les joueurs

### 🔌 API Publique
- Interface pour que d'autres plugins utilisent l'IA
- Méthodes asynchrones avec CompletableFuture
- Statistiques d'utilisation intégrées
- Documentation complète fournie

### 🛡️ Rate Limiting Avancé
- Limite par joueur : 10 requêtes/min (configurable)
- Limite globale : 50 requêtes/min pour tout le serveur
- Protection anti-spam robuste
- Bypass pour admins avec permission

### 💾 Cache Intelligent
- 60-80% des requêtes servies depuis le cache
- Réponses instantanées (< 1ms)
- Économie d'appels API
- TTL et taille configurables

### 🔄 Auto-Update
- Vérification automatique au démarrage
- Notification aux admins à la connexion
- Commande manuelle `/netic update`
- Lien cliquable vers GitHub Releases

### 💽 Base de Données Flexible
- **SQLite** : Simple, aucune configuration
- **MariaDB** : Performant pour gros serveurs
- Pool de connexions optimisé (HikariCP)
- Historique persistant

### 🎵 Support Audio (v1.0-c1-beta)
- Transcription audio : Convertit les fichiers audio en texte
- Chat vocal : Envoie un fichier audio et reçoit une réponse IA
- Formats supportés : WebM, MP3, WAV, OGG, M4A, FLAC
- Taille maximale : 25MB par fichier

## 📊 Performances

Benchmarks (Paper 1.21.1, 50 joueurs) :

| Métrique | Valeur |
|----------|--------|
| Latence avec cache | < 1ms ⚡ |
| Latence sans cache | 100-300ms |
| Hit rate cache | 60-80% |
| Appels API économisés | 60-80% 💰 |
| Spam bloqué | 95% 🛡️ |
| Mémoire | ~30 MB |
| Startup | ~60ms |

## 🏗️ Architecture Technique

### Optimisations
- ✅ Cache haute performance (Caffeine)
- ✅ Pool de connexions BDD (HikariCP)
- ✅ Toutes les requêtes asynchrones
- ✅ Rate limiting efficace
- ✅ Gestion mémoire optimisée

### Sécurité
- Rate limiting unifié texte/audio
- Validation des formats (whitelist)
- Limite de taille (25MB max)
- Nettoyage automatique des anciens fichiers

## 🌟 Compatibilité

- **Serveur** : Paper 1.21+ (ou Paper 1.21.1+)
- **Java** : Java 21
- **License** : Jtheberg Community License
- **Rétro-compatibilité** : 100% compatible avec les plugins existants

---

**Développé avec ❤️ par Jtheberg et Kiz, S**

Si vous aimez NeticAI, n'hésitez pas à ⭐ le projet sur GitHub !
