---
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# netic-api - Package NPM

Package officiel NPM pour interagir avec l'API Netic dans vos projets JavaScript et TypeScript.

## Installation

```bash
# npm
npm install netic-api

# yarn
yarn add netic-api

# pnpm
pnpm add netic-api
```

## Configuration requise

- Node.js 14.0 ou supérieur
- Une clé API Netic valide

## Démarrage rapide

### Importation

```javascript
// CommonJS
const { NeticAPI } = require('netic-api');

// ES Modules
import { NeticAPI } from 'netic-api';
```

### Initialisation

```javascript
const api = new NeticAPI({
  apiKey: 'votre_clé_api_ici'
});
```

### Exemple simple

```javascript
async function main() {
  try {
    const response = await api.chat('Bonjour, comment ça marche ?');
    console.log('Réponse:', response.response);
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

main();
```

## API Documentation

### Constructeur

```javascript
const api = new NeticAPI(options);
```

#### Options

| Option | Type | Requis | Défaut | Description |
|--------|------|---------|--------|-------------|
| `apiKey` | string | ✅ | - | Votre clé API Netic |
| `timeout` | number | ❌ | `30000` | Timeout en millisecondes |
| `retries` | number | ❌ | `3` | Nombre de tentatives en cas d'erreur |
| `retryDelay` | number | ❌ | `1000` | Délai entre les tentatives (ms) |

### Méthodes

#### chat(message, options)

Envoie un message texte à l'IA.

```javascript
const response = await api.chat('Votre message ici', {
  model: 'netic-v1',        // Optionnel
  temperature: 0.7,         // Optionnel (0-1)
  maxTokens: 1000          // Optionnel
});
```

**Paramètres :**
- `message` (string) : Le message à envoyer
- `options` (object, optionnel) : Options supplémentaires

**Retour :**
```javascript
{
  response: string,           // Réponse de l'IA
  timestamp: number,          // Timestamp Unix
  requestId: string,          // ID unique de la requête
  model: string,             // Modèle utilisé
  tokensUsed: {
    input: number,
    output: number,
    total: number
  }
}
```

#### transcribe(audioFile, options)

Transcrit un fichier audio en texte.

```javascript
const response = await api.transcribe(audioFile, {
  language: 'fr-FR',        // Optionnel
  includeTimestamps: true   // Optionnel
});
```

**Paramètres :**
- `audioFile` (File|Buffer) : Fichier audio à transcrire
- `options` (object, optionnel) : Options de transcription

**Formats supportés :**
- WebM (.webm)
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- M4A (.m4a)
- FLAC (.flac)

**Retour :**
```javascript
{
  transcription: string,
  timestamp: number,
  requestId: string,
  audioInfo: {
    duration: number,
    format: string,
    sampleRate: number,
    channels: number,
    fileSize: number
  },
  confidence: number,
  language: string,
  words?: Array<{
    word: string,
    start: number,
    end: number,
    confidence: number
  }>
}
```

#### chatWithAudio(audioFile, options)

Envoie un message audio et reçoit une réponse textuelle.

```javascript
const response = await api.chatWithAudio(audioFile, {
  model: 'netic-v1',
  temperature: 0.7
});
```

**Retour :**
```javascript
{
  response: string,
  transcription: string,
  timestamp: number,
  requestId: string,
  audioInfo: {
    duration: number,
    format: string,
    confidence: number
  },
  tokensUsed: {
    input: number,
    output: number,
    total: number
  }
}
```

## Exemples pratiques

### Chat avec historique

```javascript
const { NeticAPI } = require('netic-api');

class ChatWithHistory {
  constructor(apiKey) {
    this.api = new NeticAPI({ apiKey });
    this.history = [];
  }

  async sendMessage(message) {
    // Construire le contexte avec l'historique
    const context = this.buildContext(message);
    
    try {
      const response = await this.api.chat(context);
      
      // Ajouter à l'historique
      this.history.push({
        user: message,
        assistant: response.response,
        timestamp: new Date().toISOString()
      });
      
      return response;
    } catch (error) {
      console.error('Erreur:', error.message);
      throw error;
    }
  }

  buildContext(newMessage) {
    if (this.history.length === 0) return newMessage;
    
    const recentHistory = this.history.slice(-5);
    const context = recentHistory
      .map(item => `Utilisateur: ${item.user}\nAssistant: ${item.assistant}`)
      .join('\n\n');
    
    return `${context}\n\nUtilisateur: ${newMessage}`;
  }
}

// Utilisation
const chat = new ChatWithHistory('votre_clé_api');

async function conversation() {
  await chat.sendMessage('Bonjour, je m\'appelle Jean');
  const response = await chat.sendMessage('Quel est mon nom ?');
  console.log(response.response); // Devrait se souvenir du nom
}
```

### Transcription audio depuis un fichier

```javascript
const fs = require('fs');
const { NeticAPI } = require('netic-api');

async function transcribeAudioFile(filePath) {
  const api = new NeticAPI({ apiKey: 'votre_clé_api' });
  
  try {
    // Lire le fichier
    const audioBuffer = fs.readFileSync(filePath);
    
    // Créer un objet File-like
    const audioFile = new Blob([audioBuffer], { 
      type: 'audio/webm' 
    });
    
    const response = await api.transcribe(audioFile, {
      includeTimestamps: true
    });
    
    console.log('Transcription:', response.transcription);
    console.log('Confiance:', response.confidence);
    console.log('Durée:', response.audioInfo.duration);
    
    // Afficher les mots avec timestamps
    if (response.words) {
      response.words.forEach(word => {
        console.log(`${word.start.toFixed(2)}s - ${word.end.toFixed(2)}s: ${word.word}`);
      });
    }
    
  } catch (error) {
    console.error('Erreur de transcription:', error.message);
  }
}

transcribeAudioFile('./message.webm');
```

### Interface web avec Express

```javascript
const express = require('express');
const multer = require('multer');
const { NeticAPI } = require('netic-api');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const api = new NeticAPI({ 
  apiKey: process.env.NETIC_API_KEY 
});

app.use(express.json());

// Route pour le chat texte
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message requis' });
    }
    
    const response = await api.chat(message);
    res.json(response);
    
  } catch (error) {
    console.error('Erreur chat:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
});

// Route pour la transcription audio
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Fichier audio requis' });
    }
    
    const audioFile = new Blob([req.file.buffer], {
      type: req.file.mimetype
    });
    
    const response = await api.transcribe(audioFile);
    res.json(response);
    
  } catch (error) {
    console.error('Erreur transcription:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
```

### Support TypeScript

```typescript
import { NeticAPI, NeticResponse, TranscriptionResponse } from 'netic-api';

interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

class TypedNeticService {
  private api: NeticAPI;

  constructor(apiKey: string) {
    this.api = new NeticAPI({ apiKey });
  }

  async chat(message: string, options?: ChatOptions): Promise<NeticResponse> {
    return await this.api.chat(message, options);
  }

  async transcribe(audioFile: File): Promise<TranscriptionResponse> {
    return await this.api.transcribe(audioFile);
  }

  async chatWithAudio(audioFile: File): Promise<NeticResponse & { transcription: string }> {
    return await this.api.chatWithAudio(audioFile);
  }
}

// Utilisation
const service = new TypedNeticService('votre_clé_api');

async function typedExample() {
  const response: NeticResponse = await service.chat('Bonjour');
  console.log('Réponse:', response.response);
  console.log('Tokens:', response.tokensUsed.total);
}
```

## Gestion des erreurs

### Types d'erreurs

```javascript
try {
  await api.chat('Test');
} catch (error) {
  if (error instanceof NeticAPIError) {
    switch (error.code) {
      case 'INVALID_API_KEY':
        console.error('Clé API invalide');
        break;
      case 'QUOTA_EXCEEDED':
        console.error('Quota dépassé');
        break;
      case 'RATE_LIMITED':
        console.error('Trop de requêtes');
        break;
      default:
        console.error('Erreur API:', error.message);
    }
  } else {
    console.error('Erreur réseau:', error.message);
  }
}
```

### Retry automatique

```javascript
const api = new NeticAPI({
  apiKey: 'votre_clé_api',
  retries: 5,           // 5 tentatives maximum
  retryDelay: 2000,     // 2 secondes entre les tentatives
  retryCondition: (error) => {
    // Retry seulement pour les erreurs de serveur
    return error.code >= 500 || error.code === 'RATE_LIMITED';
  }
});
```

## Configuration avancée

### Timeout personnalisé

```javascript
const api = new NeticAPI({
  apiKey: 'votre_clé_api',
  timeout: 60000  // 60 secondes au lieu de 30
});
```

### Headers personnalisés

```javascript
const api = new NeticAPI({
  apiKey: 'votre_clé_api',
  headers: {
    'User-Agent': 'MonApp/1.0',
    'X-Custom-Header': 'valeur'
  }
});
```

### Intercepteurs

```javascript
// Intercepteur de requête
api.interceptors.request.use((config) => {
  console.log('Envoi de la requête:', config.url);
  return config;
});

// Intercepteur de réponse
api.interceptors.response.use((response) => {
  console.log('Réponse reçue:', response.status);
  return response;
});
```

## Tests

### Test unitaire avec Jest

```javascript
const { NeticAPI } = require('netic-api');

describe('NeticAPI', () => {
  let api;
  
  beforeEach(() => {
    api = new NeticAPI({ apiKey: 'test-key' });
  });

  test('envoie un message de chat', async () => {
    const mockResponse = {
      response: 'Bonjour!',
      timestamp: Date.now(),
      requestId: 'test-123',
      model: 'netic-v1',
      tokensUsed: { input: 5, output: 2, total: 7 }
    };

    // Mock de la requête
    jest.spyOn(api, 'chat').mockResolvedValue(mockResponse);

    const result = await api.chat('Bonjour');
    
    expect(result.response).toBe('Bonjour!');
    expect(result.tokensUsed.total).toBe(7);
  });
});
```

## Bonnes pratiques

### Variables d'environnement

```bash
# .env
NETIC_API_KEY=votre_clé_api_ici
NETIC_BASE_URL=https://netic.jtheberg.cloud/api/v1
```

```javascript
require('dotenv').config();

const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY,
  baseURL: process.env.NETIC_BASE_URL
});
```

### Logging

```javascript
const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY,
  logger: {
    info: (message) => console.log(`[INFO] ${message}`),
    warn: (message) => console.warn(`[WARN] ${message}`),
    error: (message) => console.error(`[ERROR] ${message}`)
  }
});
```

### Cache des réponses

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

const cachedChat = async (message) => {
  const cacheKey = `chat:${message}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const response = await api.chat(message);
  cache.set(cacheKey, response);
  return response;
};
```

## Déploiement

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["node", "server.js"]
```

### Vercel

```javascript
// api/chat.js
import { NeticAPI } from 'netic-api';

const api = new NeticAPI({ 
  apiKey: process.env.NETIC_API_KEY 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const response = await api.chat(message);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## Support

- **Documentation** : [docs.netic.jtheberg.cloud](https://docs.netic.jtheberg.cloud)
- **Issues** : [GitHub Issues](https://github.com/Jtheberg-hebergeur/NeticAPI/issues)
- **Support** : support@jtheberg.cloud

## License

**Jtheberg Community License**

Copyright (c) 2025 Jtheberg Community

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

2. You may not use this Software for any commercial purposes or in any commercial products without prior written authorization from Jtheberg. To obtain authorization, please contact: contact@jtheberg.cloud

3. You may host and modify this Software for the sole purpose of contributing to the Jtheberg project through GitHub pull requests.

4. Any derivative works must be clearly marked as such and must carry prominent notices stating that you modified it.

5. You may not remove or alter the original copyright notice.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For commercial use inquiries, please contact: contact@jtheberg.cloud
