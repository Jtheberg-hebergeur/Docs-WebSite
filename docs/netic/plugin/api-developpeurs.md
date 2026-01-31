---
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# API Publique pour Développeurs

Documentation complète de l'API NeticAI pour intégrer l'intelligence artificielle dans vos propres plugins Minecraft.

## 🔌 Configuration de la dépendance

### 1. Ajouter NeticAI comme dépendance

Dans votre `plugin.yml` :

```yaml
name: "MonPlugin"
version: "1.0.0"
main: "com.example.monplugin.Main"
depend: [NeticAI]
```

### 2. Ajouter la dépendance Maven

```xml
<repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
</repository>

<dependency>
    <groupId>com.github.Jtheberg-hebergeur</groupId>
    <artifactId>Netic-PaperMC-Plugin</artifactId>
    <version>1.0-c1-beta</version>
    <scope>provided</scope>
</dependency>
```

### 3. Importer les classes nécessaires

```java
import cloud.jtheberg.netic.api.NeticAPI;
import cloud.jtheberg.netic.api.AudioChatResponse;
import org.bukkit.entity.Player;
import java.io.File;
import java.util.concurrent.CompletableFuture;
```

## 🚀 Obtention de l'API

### Méthode 1 : Services Manager (recommandé)

```java
public class MonPlugin extends JavaPlugin {
    
    private NeticAPI neticAPI;
    
    @Override
    public void onEnable() {
        // Obtenir l'API via le Services Manager
        neticAPI = Bukkit.getServicesManager()
            .getRegistration(NeticAPI.class)
            .getProvider();
            
        if (neticAPI == null) {
            getLogger().warning("NeticAI n'est pas disponible !");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }
        
        getLogger().info("NeticAI API connectée avec succès !");
    }
}
```

### Méthode 2 : Instance directe

```java
// Alternative directe
NeticAPI neticAPI = NeticPlugin.getInstance().getNeticAPI();
```

## 💬 API Texte

### Envoi de message simple

```java
// Message simple sans contexte joueur
neticAPI.sendMessage("Comment faire une ferme automatique?")
    .thenAccept(response -> {
        Bukkit.getLogger().info("Réponse Netic: " + response);
        // Faire quelque chose avec la réponse
    })
    .exceptionally(error -> {
        getLogger().severe("Erreur: " + error.getMessage());
        return null;
    });
```

### Envoi avec contexte joueur

```java
public void envoyerMessageIA(Player player, String message) {
    neticAPI.sendMessage(player, message)
        .thenAccept(response -> {
            // Envoyer la réponse au joueur
            player.sendMessage("§6[NETIC] §f" + response);
        })
        .exceptionally(error -> {
            player.sendMessage("§cErreur: " + error.getMessage());
            return null;
        });
}
```

### Vérification du rate limit

```java
public boolean peutEnvoyerMessage(Player player) {
    if (neticAPI.canSendMessage(player)) {
        return true;
    } else {
        player.sendMessage("§cVeuillez attendre avant d'envoyer un autre message.");
        return false;
    }
}
```

## 🎵 API Audio (v1.0-c1-beta)

### Transcription audio simple

```java
public void transcrireAudio(Player player, File audioFile) {
    neticAPI.transcribeAudio(audioFile)
        .thenAccept(transcription -> {
            player.sendMessage("§6[Transcription] §f" + transcription);
        })
        .exceptionally(error -> {
            player.sendMessage("§cErreur de transcription: " + error.getMessage());
            return null;
        });
}
```

### Chat vocal complet

```java
public void chatVocal(Player player, File audioFile) {
    neticAPI.chatWithAudio(audioFile)
        .thenAccept(response -> {
            // Afficher la transcription
            player.sendMessage("§6[Vous avez dit] §f" + response.getTranscription());
            
            // Afficher la réponse de l'IA
            player.sendMessage("§6[NETIC] §f" + response.getResponse());
        })
        .exceptionally(error -> {
            player.sendMessage("§cErreur audio: " + error.getMessage());
            return null;
        });
}
```

### Utilisation avec callbacks

```java
public void transcrireAvecCallbacks(Player player, File audioFile) {
    neticAPI.transcribeAudio(audioFile, 
        // Callback succès
        transcription -> {
            Bukkit.getScheduler().runTask(this, () -> {
                player.sendMessage("§6[Transcription] §f" + transcription);
            });
        },
        // Callback erreur
        error -> {
            Bukkit.getScheduler().runTask(this, () -> {
                player.sendMessage("§cErreur: " + error.getMessage());
            });
        }
    );
}
```

## 📊 Statistiques et Monitoring

### Obtenir les statistiques

```java
public void afficherStats(Player player) {
    NeticAPI.ApiStats stats = neticAPI.getStats();
    
    player.sendMessage("§6=== Statistiques NeticAI ===");
    player.sendMessage("§fRequêtes totales: §a" + stats.getTotalRequests());
    player.sendMessage("§fTaux de succès: §a" + String.format("%.1f%%", stats.getSuccessRate() * 100));
    player.sendMessage("§fRequêtes en cache: §a" + stats.getCacheHits());
    player.sendMessage("§fLatence moyenne: §a" + stats.getAverageLatency() + "ms");
}
```

### Monitoring en temps réel

```java
public class StatsTask extends BukkitRunnable {
    private final NeticAPI neticAPI;
    
    public StatsTask(NeticAPI neticAPI) {
        this.neticAPI = neticAPI;
    }
    
    @Override
    public void run() {
        NeticAPI.ApiStats stats = neticAPI.getStats();
        
        // Logger les stats toutes les 5 minutes
        getLogger().info("NeticAI Stats - Total: " + stats.getTotalRequests() + 
                       ", Success: " + String.format("%.1f%%", stats.getSuccessRate() * 100));
    }
}

// Démarrer la tâche
new StatsTask(neticAPI).runTaskTimerAsynchronously(this, 20L * 60 * 5, 20L * 60 * 5);
```

## 🛠️ Utilitaires Audio

### Validation de fichier audio

```java
import cloud.jtheberg.netic.utils.AudioUtils;

public boolean validerFichierAudio(Player player, File audioFile) {
    AudioUtils.ValidationResult result = AudioUtils.validateAudioFile(audioFile);
    
    if (!result.isValid()) {
        player.sendMessage("§cFichier audio invalide: " + result.getMessage());
        return false;
    }
    
    return true;
}
```

### Sauvegarde de fichier audio

```java
public void sauvegarderAudio(Player player, File sourceFile) {
    try {
        File savedFile = AudioUtils.saveAudioFile(player, sourceFile);
        player.sendMessage("§aFichier audio sauvegardé: " + savedFile.getName());
        
        // Utiliser le fichier sauvegardé pour l'API
        neticAPI.transcribeAudio(savedFile)
            .thenAccept(transcription -> {
                player.sendMessage("§6[Transcription] §f" + transcription);
            });
            
    } catch (IOException e) {
        player.sendMessage("§cErreur de sauvegarde: " + e.getMessage());
    }
}
```

## 🎨 Exemples d'intégration

### Plugin d'assistance joueur

```java
public class AssistancePlugin extends JavaPlugin {
    
    private NeticAPI neticAPI;
    
    @Override
    public void onEnable() {
        neticAPI = Bukkit.getServicesManager()
            .getRegistration(NeticAPI.class)
            .getProvider();
            
        // Commande d'assistance
        getCommand("aide").setExecutor((sender, command, label, args) -> {
            if (!(sender instanceof Player)) return true;
            
            Player player = (Player) sender;
            if (args.length == 0) {
                player.sendMessage("§cUsage: /aide <question>");
                return true;
            }
            
            String question = String.join(" ", args);
            
            player.sendMessage("§6[Assistant] §fRecherche de réponse...");
            
            neticAPI.sendMessage(player, question)
                .thenAccept(response -> {
                    player.sendMessage("§6[Assistant] §f" + response);
                })
                .exceptionally(error -> {
                    player.sendMessage("§cErreur: " + error.getMessage());
                    return null;
                });
            
            return true;
        });
    }
}
```

### Plugin de transcription vocale

```java
public class VocalPlugin extends JavaPlugin {
    
    private NeticAPI neticAPI;
    
    @Override
    public void onEnable() {
        neticAPI = Bukkit.getServicesManager()
            .getRegistration(NeticAPI.class)
            .getProvider();
            
        // Commande pour transcrire un fichier audio
        getCommand("transcrire").setExecutor((sender, command, label, args) -> {
            if (!(sender instanceof Player)) return true;
            
            Player player = (Player) sender;
            if (args.length != 1) {
                player.sendMessage("§cUsage: /transcrire <fichier_audio>");
                return true;
            }
            
            File audioFile = new File(getDataFolder(), "audio/" + args[0]);
            
            if (!audioFile.exists()) {
                player.sendMessage("§cFichier introuvable: " + args[0]);
                return true;
            }
            
            // Valider le fichier
            if (!AudioUtils.validateAudioFile(audioFile).isValid()) {
                player.sendMessage("§cFormat audio non supporté");
                return true;
            }
            
            player.sendMessage("§6Transcription en cours...");
            
            neticAPI.transcribeAudio(audioFile)
                .thenAccept(transcription -> {
                    player.sendMessage("§aTranscription: §f" + transcription);
                })
                .exceptionally(error -> {
                    player.sendMessage("§cErreur: " + error.getMessage());
                    return null;
                });
            
            return true;
        });
    }
}
```

## ⚡ Bonnes pratiques

### ✅ Gestion asynchrone

Toutes les méthodes de l'API retournent des `CompletableFuture`. Utilisez-les correctement :

```java
// ✅ Bon : Asynchrone
neticAPI.sendMessage(player, message)
    .thenAccept(response -> {
        // Traiter la réponse
    });

// ❌ Mauvais : Bloquant
String response = neticAPI.sendMessage(player, message).get(); // Évitez !
```

### ✅ Gestion des erreurs

```java
neticAPI.sendMessage(player, message)
    .thenAccept(response -> {
        // Succès
    })
    .exceptionally(error -> {
        getLogger().warning("Erreur NeticAI: " + error.getMessage());
        return null;
    });
```

### ✅ Vérification de disponibilité

```java
public void onEnable() {
    if (Bukkit.getPluginManager().getPlugin("NeticAI") == null) {
        getLogger().severe("NeticAI est requis !");
        getServer().getPluginManager().disablePlugin(this);
        return;
    }
    
    // Attendre que NeticAI soit prêt
    Bukkit.getScheduler().runTaskLater(this, () -> {
        neticAPI = Bukkit.getServicesManager()
            .getRegistration(NeticAPI.class)
            .getProvider();
            
        if (neticAPI != null) {
            getLogger().info("NeticAI API prête !");
        }
    }, 20L);
}
```

### ✅ Rate limiting

Vérifiez toujours si un joueur peut envoyer un message :

```java
if (neticAPI.canSendMessage(player)) {
    neticAPI.sendMessage(player, message)
        .thenAccept(response -> {
            // Traiter la réponse
        });
} else {
    player.sendMessage("§cVeuillez attendre avant d'envoyer un autre message.");
}
```

## 🔧 Débogage

### Logging des requêtes

```java
public void debugRequete(Player player, String message) {
    getLogger().info("Requête NeticAI - Joueur: " + player.getName() + 
                    ", Message: " + message);
                    
    neticAPI.sendMessage(player, message)
        .thenAccept(response -> {
            getLogger().info("Réponse NeticAI: " + response);
        })
        .exceptionally(error -> {
            getLogger().severe("Erreur NeticAI: " + error.getMessage());
            return null;
        });
}
```

### Test de connexion

```java
public boolean testerConnexion() {
    try {
        String test = neticAPI.sendMessage("Test de connexion")
            .get(10, TimeUnit.SECONDS);
        return test != null && !test.isEmpty();
    } catch (Exception e) {
        getLogger().severe("Échec du test de connexion: " + e.getMessage());
        return false;
    }
}
```

---

**API NeticAI prête à l'intégration ! 🚀 Créez des plugins incroyables avec l'intelligence artificielle.**
