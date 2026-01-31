---
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Dépannage NeticAI

Guide complet pour résoudre les problèmes courants avec NeticAI.

## 🚨 Problèmes critiques

### L'IA ne répond pas du tout

#### Symptômes
- Les joueurs envoient `!ia message` mais aucune réponse
- Aucune erreur dans les logs
- Commandes admin fonctionnent

#### Causes possibles
1. **Clé API invalide**
2. **Problème de connexion internet**
3. **API Netic indisponible**
4. **Configuration incorrecte**

#### Solutions

**1. Vérifier la clé API**
```bash
/netic status
```
Si vous voyez "❌ Erreur : Clé API invalide" :
- Vérifiez votre clé sur [netic.jtheberg.cloud](https://netic.jtheberg.cloud)
- Éditez `plugins/NeticAI/config.yml`
- Assurez-vous qu'il n'y a pas d'espaces ou de caractères spéciaux

**2. Tester la connexion**
```bash
ping netic.jtheberg.cloud
```
Si la connexion échoue :
- Vérifiez votre connexion internet
- Vérifiez votre firewall
- Contactez votre hébergeur si nécessaire

**3. Vérifier les logs**
Cherchez ces messages dans `logs/latest.log` :
```
[NeticAI] Erreur : Impossible de se connecter à l'API
[NeticAI] Erreur : Timeout de connexion
[NeticAI] Erreur : Réponse invalide du serveur
```

## ⏰ Problèmes de Rate Limiting

### Symptômes
- Messages "Veuillez attendre avant d'envoyer un autre message"
- Joueurs bloqués même après avoir attendu
- Rate limit atteint rapidement

#### Solutions

**1. Ajuster les limites**
Dans `config.yml` :
```yaml
rate-limit:
  player:
    requests-per-minute: 20  # Augmentez si nécessaire
  global:
    requests-per-minute: 100 # Augmentez si nécessaire
```

**2. Réinitialiser les cooldowns**
```bash
/netic clearcooldown
```

**3. Donner les permissions de bypass**
```bash
/lp user <joueur> permission set netic.bypass.ratelimit true
/lp user <joueur> permission set netic.bypass.cooldown true
```

## 💾 Problèmes de Base de Données

### SQLite

#### Symptômes
- Erreur "Base de données inaccessible"
- Historique non sauvegardé
- Messages d'erreur de fichier

#### Solutions

**1. Vérifier les permissions**
```bash
ls -la plugins/NeticAI/
```
Assurez-vous que le dossier a les permissions d'écriture :
```bash
chmod 755 plugins/NeticAI/
chmod 644 plugins/NeticAI/netic_history.db
```

**2. Recréer la base de données**
```bash
# Backup actuel
cp plugins/NeticAI/netic_history.db ./backup.db

# Supprimer et recréer
rm plugins/NeticAI/netic_history.db
/netic reload
```

### MariaDB

#### Symptômes
- Erreur de connexion MariaDB
- Messages "Authentication failed"
- Timeout de connexion

#### Solutions

**1. Vérifier la configuration**
Dans `config.yml` :
```yaml
database:
  type: "mariadb"
  mariadb:
    host: "localhost"
    port: 3306
    database: "netic"
    username: "netic_user"
    password: "mot_de_passe_correct"
```

**2. Tester la connexion manuelle**
```bash
mysql -h localhost -u netic_user -p netic
```

**3. Vérifier que la base existe**
```sql
CREATE DATABASE IF NOT EXISTS netic;
GRANT ALL PRIVILEGES ON netic.* TO 'netic_user'@'localhost';
FLUSH PRIVILEGES;
```

## 🗄️ Problèmes de Cache

### Symptômes
- Performances dégradées
- Messages "Cache error"
- Mémoire utilisée excessivement

#### Solutions

**1. Vider le cache**
```bash
/netic cache clear
```

**2. Vérifier les statistiques du cache**
```bash
/netic cache stats
```

**3. Ajuster la configuration du cache**
Dans `config.yml` :
```yaml
cache:
  enabled: true
  ttl-minutes: 30
  max-size: 1000  # Réduisez si problèmes de mémoire
```

## 🔌 Problèmes d'API (Développeurs)

### Symptômes
- `NullPointerException` lors de l'obtention de l'API
- Erreurs "NeticAI not available"
- Plugins dépendants qui ne se lancent pas

#### Solutions

**1. Vérifier l'ordre de chargement**
Dans `plugin.yml` :
```yaml
depend: [NeticAI]  # Assurez-vous que c'est bien là
```

**2. Attendre que NeticAI soit prêt**
```java
@Override
public void onEnable() {
    // Attendre que NeticAI soit complètement chargé
    Bukkit.getScheduler().runTaskLater(this, () -> {
        NeticAPI api = Bukkit.getServicesManager()
            .getRegistration(NeticAPI.class)
            .getProvider();
            
        if (api != null) {
            getLogger().info("NeticAI API prête !");
            // Votre code ici
        } else {
            getLogger().warning("NeticAI API non disponible");
        }
    }, 20L * 5); // Attendre 5 secondes
}
```

## 🎵 Problèmes Audio

### Symptômes
- Erreurs de transcription audio
- Fichiers audio non reconnus
- Messages "Format non supporté"

#### Solutions

**1. Vérifier les formats supportés**
Formats valides : WebM, MP3, WAV, OGG, M4A, FLAC
Taille maximale : 25MB

**2. Valider le fichier audio**
```java
AudioUtils.ValidationResult result = AudioUtils.validateAudioFile(audioFile);
if (!result.isValid()) {
    System.out.println("Erreur: " + result.getMessage());
}
```

**3. Vérifier l'espace disque**
```bash
df -h plugins/NeticAI/audio/
```

**4. Nettoyer les anciens fichiers**
Les fichiers de plus de 7 jours sont supprimés automatiquement.

## 🔄 Problèmes de Mise à Jour

### Symptômes
- Échec du téléchargement de la mise à jour
- Erreur "Version check failed"
- Notification de mise à jour incorrecte

#### Solutions

**1. Vérification manuelle**
```bash
/netic update
```

**2. Téléchargement manuel**
1. Allez sur [GitHub Releases](https://github.com/Jtheberg-hebergeur/Netic-PaperMC-Plugin/releases)
2. Téléchargez la dernière version
3. Remplacez l'ancien fichier JAR
4. Redémarrez le serveur

**3. Désactiver les notifications**
Si vous ne voulez plus voir les notifications :
```bash
/lp user <joueur> permission set netic.admin false
```

## 📊 Problèmes de Performance

### Symptômes
- Lag du serveur lors de l'utilisation de l'IA
- Haute utilisation CPU/RAM
- Temps de réponse lents

#### Solutions

**1. Optimiser le cache**
```yaml
cache:
  enabled: true
  max-size: 2000  # Augmentez pour plus de cache
  ttl-minutes: 60  # Augmentez pour garder plus longtemps
```

**2. Ajuster les rate limits**
```yaml
rate-limit:
  player:
    requests-per-minute: 5   # Réduisez la charge
  global:
    requests-per-minute: 50  # Réduisez la charge
```

**3. Utiliser MariaDB pour gros serveurs**
```yaml
database:
  type: "mariadb"
  mariadb:
    pool-size: 20
```

**4. Monitor les performances**
```bash
/netic stats
```
Surveillez :
- Latence moyenne
- Taux de cache hits
- Requêtes par minute

## 🔍 Diagnostic Complet

### Script de diagnostic

Créez un script `diagnostic.sh` :
```bash
#!/bin/bash

echo "=== Diagnostic NeticAI ==="

echo "1. Version du plugin :"
ls -la plugins/NeticAI-*.jar

echo "2. Version Java :"
java -version

echo "3. Version Paper :"
grep version version.txt

echo "4. Configuration API :"
grep -A 2 "api:" plugins/NeticAI/config.yml

echo "5. Test de connexion :"
ping -c 3 netic.jtheberg.cloud

echo "6. Permissions du dossier :"
ls -la plugins/NeticAI/

echo "7. Base de données :"
ls -la plugins/NeticAI/*.db

echo "8. Mémoire disponible :"
free -h

echo "9. Espace disque :"
df -h

echo "=== Fin diagnostic ==="
```

### Logs à collecter

En cas de problème, collectez ces fichiers :
1. `logs/latest.log`
2. `plugins/NeticAI/config.yml`
3. `plugins/NeticAI/netic_history.db`
4. Résultat du script de diagnostic

## 📞 Support et Aide

### Quand contacter le support

Contactez le support si :
- Vous avez suivi tous les guides sans succès
- Vous voyez des erreurs non documentées
- Vous avez besoin d'aide pour une configuration avancée

### Informations à fournir

Quand vous contactez le support, fournissez :
- Version de NeticAI
- Version de Paper/Java
- Messages d'erreur complets
- Votre configuration (sans la clé API)
- Résultat du diagnostic

### Liens utiles

- 🐛 **Signaler un bug** : [GitHub Issues](https://github.com/Jtheberg-hebergeur/Netic-PaperMC-Plugin/issues)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/Jtheberg-hebergeur/Netic-PaperMC-Plugin/discussions)
- 📧 **Email** : contact@jtheberg.cloud
- 🌐 **Site web** : netic.jtheberg.cloud

---

**Problème résolu ! 🎉 Votre NeticAI fonctionne maintenant correctement.**
