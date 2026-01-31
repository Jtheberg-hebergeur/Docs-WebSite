---
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Installation du Package NPM

Guide complet d'installation et de configuration du package `netic-api` pour vos projets JavaScript et TypeScript.

## Prérequis

- **Node.js** 14.0 ou supérieur
- **npm** 6.0 ou supérieur (ou yarn/pnpm)
- **Clé API Netic** valide

## Installation

### npm

```bash
# Installation standard
npm install netic-api

# Installation avec version spécifique
npm install netic-api@1.0.0

# Installation globale (pour CLI)
npm install -g netic-api
```

### yarn

```bash
# Installation
yarn add netic-api

# Installation avec version spécifique
yarn add netic-api@1.0.0

# Installation globale
yarn global add netic-api
```

### pnpm

```bash
# Installation
pnpm add netic-api

# Installation avec version spécifique
pnpm add netic-api@1.0.0

# Installation globale
pnpm add -g netic-api
```

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine de votre projet :

```bash
# .env
NETIC_API_KEY=votre_clé_api_ici
NETIC_BASE_URL=https://netic.jtheberg.cloud/api/v1
NETIC_TIMEOUT=30000
```

### package.json

Ajoutez les scripts nécessaires dans votre `package.json` :

```json
{
  "name": "mon-projet-netic",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "netic-api": "^1.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

## Configuration par type de projet

### Projet Node.js (CommonJS)

```javascript
// index.js
require('dotenv').config();
const { NeticAPI } = require('netic-api');

const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY,
  baseURL: process.env.NETIC_BASE_URL,
  timeout: parseInt(process.env.NETIC_TIMEOUT) || 30000
});

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

### Projet ES Modules

```javascript
// index.mjs
import dotenv from 'dotenv';
dotenv.config();

import { NeticAPI } from 'netic-api';

const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY,
  baseURL: process.env.NETIC_BASE_URL,
  timeout: parseInt(process.env.NETIC_TIMEOUT) || 30000
});

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

### Projet TypeScript

```typescript
// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import { NeticAPI, NeticResponse } from 'netic-api';

const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY!,
  baseURL: process.env.NETIC_BASE_URL,
  timeout: parseInt(process.env.NETIC_TIMEOUT!) || 30000
});

async function main(): Promise<void> {
  try {
    const response: NeticResponse = await api.chat('Bonjour, comment ça marche ?');
    console.log('Réponse:', response.response);
    console.log('Tokens utilisés:', response.tokensUsed.total);
  } catch (error) {
    console.error('Erreur:', error);
  }
}

main();
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Frameworks JavaScript

### React

```bash
# Installation
npm install netic-api

# Configuration
```

```typescript
// src/services/neticService.ts
import { NeticAPI } from 'netic-api';

class NeticService {
  private api: NeticAPI;

  constructor() {
    this.api = new NeticAPI({
      apiKey: process.env.REACT_APP_NETIC_API_KEY!,
      baseURL: process.env.REACT_APP_NETIC_BASE_URL
    });
  }

  async chat(message: string) {
    return await this.api.chat(message);
  }

  async transcribe(audioFile: File) {
    return await this.api.transcribe(audioFile);
  }
}

export const neticService = new NeticService();
```

```typescript
// src/components/ChatComponent.tsx
import React, { useState } from 'react';
import { neticService } from '../services/neticService';

interface Message {
  user: string;
  assistant: string;
  timestamp: Date;
}

export const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      const response = await neticService.chat(input);
      
      setMessages(prev => [...prev, {
        user: input,
        assistant: response.response,
        timestamp: new Date()
      }]);
      
      setInput('');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="user">{msg.user}</div>
            <div className="assistant">{msg.assistant}</div>
          </div>
        ))}
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Tapez votre message..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
};
```

### Vue.js

```javascript
// src/services/netic.js
import { NeticAPI } from 'netic-api';

class NeticService {
  constructor() {
    this.api = new NeticAPI({
      apiKey: import.meta.env.VITE_NETIC_API_KEY,
      baseURL: import.meta.env.VITE_NETIC_BASE_URL
    });
  }

  async chat(message) {
    return await this.api.chat(message);
  }
}

export const neticService = new NeticService();
```

```vue
<!-- src/components/ChatComponent.vue -->
<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <div class="user">{{ msg.user }}</div>
        <div class="assistant">{{ msg.assistant }}</div>
      </div>
    </div>
    
    <div class="input-area">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="Tapez votre message..."
        :disabled="loading"
      />
      <button @click="sendMessage" :disabled="loading">
        {{ loading ? 'Envoi...' : 'Envoyer' }}
      </button>
    </div>
  </div>
</template>

<script>
import { neticService } from '../services/netic';

export default {
  name: 'ChatComponent',
  data() {
    return {
      messages: [],
      input: '',
      loading: false
    };
  },
  methods: {
    async sendMessage() {
      if (!this.input.trim() || this.loading) return;

      this.loading = true;
      try {
        const response = await neticService.chat(this.input);
        
        this.messages.push({
          user: this.input,
          assistant: response.response,
          timestamp: new Date()
        });
        
        this.input = '';
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

### Next.js

```typescript
// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NeticAPI } from 'netic-api';

const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY!
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message requis' });
    }

    const response = await api.chat(message);
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: error.message 
    });
  }
}
```

```typescript
// pages/index.tsx
import { useState } from 'react';

interface Message {
  user: string;
  assistant: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        user: input,
        assistant: data.response,
        timestamp: new Date()
      }]);
      
      setInput('');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Chat Netic</h1>
      
      <div className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <div className="user">Vous: {msg.user}</div>
              <div className="assistant">Netic: {msg.assistant}</div>
            </div>
          ))}
        </div>
        
        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Tapez votre message..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Dépannage

### Erreurs courantes

#### Module not found
```bash
Error: Cannot find module 'netic-api'
```

**Solution :**
```bash
# Réinstaller le package
npm install netic-api

# Vérifier node_modules
ls node_modules/netic-api

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

#### Clé API invalide
```bash
Error: Invalid API key
```

**Solution :**
1. Vérifiez votre clé API dans le dashboard
2. Assurez-vous que la clé est correctement configurée dans `.env`
3. Redémarrez votre application après avoir modifié `.env`

#### Timeout
```bash
Error: Request timeout
```

**Solution :**
```javascript
const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY,
  timeout: 60000  // Augmenter à 60 secondes
});
```

### Vérification de l'installation

```bash
# Vérifier la version installée
npm list netic-api

# Vérifier que le package est accessible
node -e "console.log(require('netic-api'))"

# Tester avec TypeScript
npx tsc --noEmit
```

### Debug

```javascript
// Activer le mode debug
const api = new NeticAPI({
  apiKey: process.env.NETIC_API_KEY,
  debug: true  // Active les logs détaillés
});

// Ou utiliser la variable d'environnement
process.env.NETIC_DEBUG = true;
```

## Mise à jour

### Vérifier les mises à jour

```bash
# Vérifier les versions disponibles
npm view netic-api versions

# Vérifier la dernière version
npm view netic-api version

# Vérifier si une mise à jour est disponible
npm outdated netic-api
```

### Mettre à jour

```bash
# Mettre à jour vers la dernière version
npm update netic-api

# Mettre à jour vers une version spécifique
npm install netic-api@1.1.0

# Mettre à jour toutes les dépendances
npm update
```

### Migration entre versions

Consultez le [CHANGELOG](./changelog.md) pour les instructions de migration entre les versions.

## Support

- **Documentation** : [docs.netic.jtheberg.cloud](https://docs.netic.jtheberg.cloud)
- **Issues** : [GitHub Issues](https://github.com/Jtheberg-hebergeur/NeticAPI/issues)
- **NPM** : [npmjs.com/package/netic-api](https://www.npmjs.com/package/netic-api)
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
