---
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# API Netic

Documentation complète de l'API Netic pour intégrer l'intelligence artificielle dans vos applications.

## Vue d'ensemble

L'API Netic est une plateforme d'intelligence artificielle qui permet :
- **Chat conversationnel** : Discutez avec une IA avancée
- **Transcription audio** : Convertissez l'audio en texte
- **Chat vocal** : Envoyez des messages audio et recevez des réponses textuelles

### Base URL

```
https://netic.jtheberg.cloud/api/v1
```

### Caractéristiques principales

- ✅ **Authentification par clé API**
- ✅ **Support multi-langages** (Français, Anglais, etc.)
- ✅ **Formats audio multiples** (webm, mp3, wav, ogg)
- ✅ **Limites de quota configurables**
- ✅ **Dashboard utilisateur et administrateur**
- ✅ **Logs détaillés et monitoring**

## Authentification

Toutes les requêtes doivent inclure une clé API valide dans l'en-tête `Authorization` :

```http
Authorization: Bearer votre_clé_api_ici
```

### Obtenir une clé API

1. Créez un compte sur [netic.jtheberg.cloud](https://netic.jtheberg.cloud)
2. Accédez à votre dashboard API
3. Générez ou demandez une clé API
4. Attendez l'approbation de l'administrateur

## Endpoints

### 1. Chat Texte

Traite les messages texte et retourne une réponse intelligente.

**Endpoint** : `POST /api/v1/chat` 

**Headers** :
```http
Authorization: Bearer votre_clé_api
Content-Type: application/json
```

**Body** :
```json
{
  "message": "Bonjour, comment puis-je vous aider aujourd'hui ?"
}
```

**Réponse réussie** (200) :
```json
{
  "response": "Bonjour ! Je suis là pour vous aider. Je peux répondre à vos questions, vous assister dans diverses tâches ou simplement discuter avec vous. Comment puis-je vous être utile ?",
  "timestamp": 1640995200,
  "request_id": "req_123456789"
}
```

### 2. Transcription Audio

Convertit les fichiers audio en texte avec une grande précision.

**Endpoint** : `POST /api/v1/transcribe` 

**Headers** :
```http
Authorization: Bearer votre_clé_api
Content-Type: multipart/form-data
```

**Body** (FormData) :
- `audio`: Fichier audio (max 25MB)

**Formats supportés** :
- WebM (.webm)
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)

**Réponse réussie** (200) :
```json
{
  "transcription": "Bonjour, j'aimerais savoir comment fonctionne cette API.",
  "timestamp": 1640995200,
  "duration": 3.5,
  "confidence": 0.98
}
```

### 3. Chat Vocal

Envoie un message audio et recevez une réponse textuelle.

**Endpoint** : `POST /api/v1/chat` 

**Headers** :
```http
Authorization: Bearer votre_clé_api
Content-Type: multipart/form-data
```

**Body** (FormData) :
- `audio`: Fichier audio (max 25MB)

**Réponse réussie** (200) :
```json
{
  "response": "J'ai bien compris votre message audio. Pour répondre à votre question, je vous propose de...",
  "transcription": "Comment puis-je intégrer cette API dans mon application ?",
  "timestamp": 1640995200,
  "request_id": "req_123456789"
}
```

## Exemples par langage

### JavaScript / TypeScript

#### Installation
```bash
npm install axios
# ou
yarn add axios
```

#### Chat Texte
```javascript
import axios from 'axios';

const apiKey = 'votre_clé_api_ici';

// Configuration du client
const api = axios.create({
  baseURL: 'https://netic.jtheberg.cloud/api/v1',
  headers: {
    'Authorization': `Bearer ${apiKey}` 
  }
});

// Chat texte
async function chatWithAI(message) {
  try {
    const response = await api.post('/chat', {
      message: message
    });
    
    console.log('Réponse IA:', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error('Erreur:', error.response?.data || error.message);
    throw error;
  }
}

// Utilisation
chatWithAI('Quelles sont les fonctionnalités de cette API ?')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

#### Transcription Audio
```javascript
async function transcribeAudio(audioFile) {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    const response = await api.post('/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Transcription:', response.data.transcription);
    return response.data.transcription;
  } catch (error) {
    console.error('Erreur de transcription:', error.response?.data || error.message);
    throw error;
  }
}

// Utilisation avec un fichier input
document.getElementById('audioInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const transcription = await transcribeAudio(file);
      console.log('Texte transcrit:', transcription);
    } catch (error) {
      console.error('Échec de la transcription:', error);
    }
  }
});
```

#### Chat Vocal Complet
```javascript
class NeticAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://netic.jtheberg.cloud/api/v1';
  }

  async chat(message, audioFile = null) {
    try {
      let response;
      
      if (audioFile) {
        // Chat vocal
        const formData = new FormData();
        formData.append('audio', audioFile);
        
        response = await fetch(`${this.baseURL}/chat`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}` 
          },
          body: formData
        });
      } else {
        // Chat texte
        response = await fetch(`${this.baseURL}/chat`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur chat:', error);
      throw error;
    }
  }

  async transcribe(audioFile) {
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    const response = await fetch(`${this.baseURL}/transcribe`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}` 
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

// Utilisation
const ai = new NeticAI('votre_clé_api_ici');

// Chat texte
ai.chat('Bonjour, comment ça marche ?')
  .then(data => console.log(data.response))
  .catch(error => console.error(error));

// Transcription
const audioFile = document.getElementById('audioInput').files[0];
if (audioFile) {
  ai.transcribe(audioFile)
    .then(data => console.log(data.transcription))
    .catch(error => console.error(error));
}
```

### Python

#### Installation
```bash
pip install requests
```

#### Exemple complet
```python
import requests
import json
from pathlib import Path

class NeticAI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://netic.jtheberg.cloud/api/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}"
        }
    
    def chat(self, message):
        """Envoie un message texte et reçoit une réponse"""
        try:
            response = requests.post(
                f"{self.base_url}/chat",
                headers={**self.headers, "Content-Type": "application/json"},
                json={"message": message}
            )
            
            if response.status_code == 200:
                data = response.json()
                return data["response"]
            else:
                raise Exception(f"Erreur {response.status_code}: {response.text}")
                
        except Exception as e:
            print(f"Erreur lors du chat: {e}")
            raise
    
    def transcribe(self, audio_file_path):
        """Transcrit un fichier audio en texte"""
        try:
            with open(audio_file_path, 'rb') as audio_file:
                files = {'audio': audio_file}
                response = requests.post(
                    f"{self.base_url}/transcribe",
                    headers=self.headers,
                    files=files
                )
            
            if response.status_code == 200:
                data = response.json()
                return data["transcription"]
            else:
                raise Exception(f"Erreur {response.status_code}: {response.text}")
                
        except Exception as e:
            print(f"Erreur lors de la transcription: {e}")
            raise
    
    def chat_with_audio(self, audio_file_path):
        """Envoie un message audio et reçoit une réponse texte"""
        try:
            with open(audio_file_path, 'rb') as audio_file:
                files = {'audio': audio_file}
                response = requests.post(
                    f"{self.base_url}/chat",
                    headers=self.headers,
                    files=files
                )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "response": data["response"],
                    "transcription": data.get("transcription", "")
                }
            else:
                raise Exception(f"Erreur {response.status_code}: {response.text}")
                
        except Exception as e:
            print(f"Erreur lors du chat vocal: {e}")
            raise

# Utilisation
if __name__ == "__main__":
    api_key = "votre_clé_api_ici"
    ai = NeticAI(api_key)
    
    # Chat texte
    try:
        response = ai.chat("Explique-moi l'intelligence artificielle")
        print(f"Réponse: {response}")
    except Exception as e:
        print(f"Erreur: {e}")
    
    # Transcription audio
    try:
        transcription = ai.transcribe("message_audio.webm")
        print(f"Transcription: {transcription}")
    except Exception as e:
        print(f"Erreur: {e}")
    
    # Chat vocal
    try:
        result = ai.chat_with_audio("question_audio.webm")
        print(f"Transcription: {result['transcription']}")
        print(f"Réponse: {result['response']}")
    except Exception as e:
        print(f"Erreur: {e}")
```

### PHP

#### Installation
```bash
composer require guzzlehttp/guzzle
```

#### Exemple complet
```php
<?php
require 'vendor/autoload.php';
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class NeticAI {
    private $client;
    private $apiKey;
    
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
        $this->client = new Client([
            'base_uri' => 'https://netic.jtheberg.cloud/api/v1/',
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey
            ]
        ]);
    }
    
    public function chat($message) {
        try {
            $response = $this->client->post('chat', [
                'json' => ['message' => $message]
            ]);
            
            $data = json_decode($response->getBody(), true);
            return $data['response'];
            
        } catch (RequestException $e) {
            throw new Exception("Erreur chat: " . $e->getMessage());
        }
    }
    
    public function transcribe($audioFilePath) {
        try {
            $response = $this->client->post('transcribe', [
                'multipart' => [
                    [
                        'name' => 'audio',
                        'contents' => fopen($audioFilePath, 'r')
                    ]
                ]
            ]);
            
            $data = json_decode($response->getBody(), true);
            return $data['transcription'];
            
        } catch (RequestException $e) {
            throw new Exception("Erreur transcription: " . $e->getMessage());
        }
    }
    
    public function chatWithAudio($audioFilePath) {
        try {
            $response = $this->client->post('chat', [
                'multipart' => [
                    [
                        'name' => 'audio',
                        'contents' => fopen($audioFilePath, 'r')
                    ]
                ]
            ]);
            
            $data = json_decode($response->getBody(), true);
            return [
                'response' => $data['response'],
                'transcription' => $data['transcription'] ?? ''
            ];
            
        } catch (RequestException $e) {
            throw new Exception("Erreur chat vocal: " . $e->getMessage());
        }
    }
}

// Utilisation
try {
    $ai = new NeticAI('votre_clé_api_ici');
    
    // Chat texte
    $response = $ai->chat("Bonjour, comment ça marche ?");
    echo "Réponse: " . $response . "\n";
    
    // Transcription
    $transcription = $ai->transcribe('/chemin/vers/audio.webm');
    echo "Transcription: " . $transcription . "\n";
    
} catch (Exception $e) {
    echo "Erreur: " . $e->getMessage() . "\n";
}
?>
```

### Java

#### Dépendances Maven
```xml
<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>4.10.0</version>
</dependency>
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.9.0</version>
</dependency>
```

#### Exemple complet
```java
import okhttp3.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.File;
import java.io.IOException;

public class NeticAI {
    private final OkHttpClient client;
    private final String apiKey;
    private final String baseUrl;
    private final Gson gson;
    
    public NeticAI(String apiKey) {
        this.client = new OkHttpClient();
        this.apiKey = apiKey;
        this.baseUrl = "https://netic.jtheberg.cloud/api/v1";
        this.gson = new Gson();
    }
    
    public String chat(String message) throws IOException {
        JsonObject payload = new JsonObject();
        payload.addProperty("message", message);
        
        RequestBody body = RequestBody.create(
            payload.toString(),
            MediaType.get("application/json; charset=utf-8")
        );
        
        Request request = new Request.Builder()
            .url(baseUrl + "/chat")
            .addHeader("Authorization", "Bearer " + apiKey)
            .post(body)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur: " + response.code() + " " + response.body().string());
            }
            
            JsonObject responseData = gson.fromJson(response.body().string(), JsonObject.class);
            return responseData.get("response").getAsString();
        }
    }
    
    public String transcribe(File audioFile) throws IOException {
        RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("audio", audioFile.getName(),
                RequestBody.create(audioFile, MediaType.parse("audio/webm")))
            .build();
        
        Request request = new Request.Builder()
            .url(baseUrl + "/transcribe")
            .addHeader("Authorization", "Bearer " + apiKey)
            .post(requestBody)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur: " + response.code() + " " + response.body().string());
            }
            
            JsonObject responseData = gson.fromJson(response.body().string(), JsonObject.class);
            return responseData.get("transcription").getAsString();
        }
    }
    
    public static void main(String[] args) {
        try {
            NeticAI ai = new NeticAI("votre_clé_api_ici");
            
            // Chat texte
            String response = ai.chat("Explique-moi l'API Netic");
            System.out.println("Réponse: " + response);
            
            // Transcription
            File audioFile = new File("message.webm");
            if (audioFile.exists()) {
                String transcription = ai.transcribe(audioFile);
                System.out.println("Transcription: " + transcription);
            }
            
        } catch (IOException e) {
            System.err.println("Erreur: " + e.getMessage());
        }
    }
}
```

### cURL

#### Chat Texte
```bash
curl -X POST https://netic.jtheberg.cloud/api/v1/chat \
  -H "Authorization: Bearer votre_clé_api_ici" \
  -H "Content-Type: application/json" \
  -d '{"message": "Bonjour, comment ça marche ?"}'
```

#### Transcription Audio
```bash
curl -X POST https://netic.jtheberg.cloud/api/v1/transcribe \
  -H "Authorization: Bearer votre_clé_api_ici" \
  -F "audio=@message_audio.webm"
```

#### Chat Vocal
```bash
curl -X POST https://netic.jtheberg.cloud/api/v1/chat \
  -H "Authorization: Bearer votre_clé_api_ici" \
  -F "audio=@question_audio.webm"
```

## Gestion des erreurs

### Codes d'erreur

| Code | Type | Description | Solution |
|------|------|-------------|----------|
| 200 | Succès | Requête traitée avec succès | - |
| 400 | Bad Request | Requête invalide | Vérifiez le format des données |
| 401 | Unauthorized | Clé API manquante ou invalide | Vérifiez votre clé API |
| 403 | Forbidden | Clé API non approuvée | Contactez l'administrateur |
| 429 | Too Many Requests | Quota dépassé | Attendez le reset du quota |
| 500 | Server Error | Erreur serveur interne | Réessayez plus tard |

### Exemples de gestion d'erreurs

#### JavaScript
```javascript
try {
  const response = await api.post('/chat', { message: "Bonjour" });
  console.log(response.data.response);
} catch (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.error("Clé API invalide");
        break;
      case 403:
        console.error("Clé API non approuvée");
        break;
      case 429:
        console.error("Quota dépassé");
        break;
      default:
        console.error("Erreur:", error.response.data.error);
    }
  } else {
    console.error("Erreur réseau:", error.message);
  }
}
```

#### Python
```python
try:
    response = ai.chat("Bonjour")
    print(response)
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 401:
        print("Clé API invalide")
    elif e.response.status_code == 403:
        print("Clé API non approuvée")
    elif e.response.status_code == 429:
        print("Quota dépassé")
    else:
        print(f"Erreur HTTP: {e}")
except Exception as e:
    print(f"Erreur: {e}")
```

## Dashboard

### Dashboard Utilisateur
**URL** : `https://netic.jtheberg.cloud/api-dashboard` 

Fonctionnalités :
- 📊 **Vue d'ensemble** : Statistiques d'utilisation
- 🔑 **Gestion des clés** : Afficher et régénérer votre clé API
- 📈 **Graphiques** : Utilisation sur 30 jours
- 🎵 **Accès audio** : Demander l'accès aux fonctionnalités audio
- 📋 **Historique** : Voir les 50 dernières requêtes

### Dashboard Admin
**URL** : `https://netic.jtheberg.cloud/admin` 

Fonctionnalités :
- 👥 **Gestion des utilisateurs** : Créer, modifier, supprimer des comptes
- 🔐 **Approbation des clés** : Valider les demandes de clés API
- 🎤 **Demandes audio** : Approuver/rejeter l'accès audio
- 📊 **Statistiques globales** : Vue d'ensemble de la plateforme
- 🔍 **Logs détaillés** : Monitoring des requêtes API

## Limites et quotas

### Limites par défaut
- **Requêtes texte** : 1000 par mois
- **Requêtes audio** : 500 par mois (nécessite l'activation)
- **Taille des fichiers** : 25MB maximum
- **Durée audio** : 5 minutes maximum

### Quotas personnalisés
Les quotas peuvent être ajustés par l'administrateur selon les besoins :
- Comptes **Premium** : Quotas illimités
- Comptes **Entreprise** : Limites personnalisées
- Comptes **Développeur** : Quotas adaptés

### Monitoring
- **Reset mensuel** : Les quotas sont réinitialisés le 1er de chaque mois
- **Notifications** : Alertes à 80% et 100% du quota
- **Historique** : Conservation des logs sur 90 jours

## Support

### Obtenir de l'aide

1. **Documentation** : Consultez cette documentation complète
2. **Dashboard** : Vérifiez vos logs et quota d'utilisation
3. **Contact** : Contactez l'administrateur système
4. **Community** : Rejoignez notre communauté de développeurs

### Bonnes pratiques

- 🔒 **Sécurité** : Ne partagez jamais votre clé API
- 📝 **Logging** : Implémentez des logs pour le debugging
- ⚡ **Performance** : Utilisez le caching pour les réponses fréquentes
- 🔄 **Retry** : Implémentez une logique de retry pour les erreurs temporaires
- 📊 **Monitoring** : Surveillez votre quota d'utilisation

### Exemple de configuration production

```javascript
// Configuration recommandée pour la production
const config = {
  apiKey: process.env.NETIC_API_KEY,
  baseURL: 'https://netic.jtheberg.cloud/api/v1',
  timeout: 30000, // 30 secondes
  retryAttempts: 3,
  retryDelay: 1000, // 1 seconde
};

// Implémentation avec retry
async function chatWithRetry(message, attempts = 0) {
  try {
    return await chat(message);
  } catch (error) {
    if (attempts < config.retryAttempts && 
        (error.response?.status >= 500 || error.code === 'ECONNRESET')) {
      await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      return chatWithRetry(message, attempts + 1);
    }
    throw error;
  }
}
```

---

**Dernière mise à jour** : 4 janvier 2026  
**Version** : 1.0.0  
**Contact** : support@jtheberg.cloud

Pour plus d'informations, visitez [netic.jtheberg.cloud](https://netic.jtheberg.cloud)
