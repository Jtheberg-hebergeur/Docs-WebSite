---
sidebar_position: 1
title: Documentation API
description: Guide complet pour utiliser l'API Netic (v1 et v2).
---

# Documentation API Netic

Bienvenue dans la documentation de l'API Netic. Cette API vous permet d'interagir avec nos modèles d'IA pour le chat, l'analyse d'images et la transcription vocale.

## Authentification

Toutes les requêtes nécessitent une clé API valide. Vous devez l'inclure dans l'en-tête `Authorization` de chaque requête.

```bash
Authorization: Bearer VOTRE_CLE_API
```

---

## API v1 (Standard)

L'API v1 est conçue pour être simple et directe, idéale pour des intégrations rapides.

### Base URL
`https://api.neticai.fr/v1`

### 1. Chat Textuel (`POST /chat`)

Envoyez un message texte à l'IA et recevez une réponse.

**Paramètres :**
- `message` (requis) : Le texte de votre message.
- `history` (optionnel) : L'historique de la conversation pour le contexte.

**Exemple Curl :**

```bash
curl -X POST https://api.neticai.fr/v1/chat \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Bonjour, qui es-tu ?",
    "history": []
  }'
```

**Réponse :**
```json
{
  "response": "Bonjour ! Je suis Netic, votre assistant IA...",
  "usage": { "quota_used": 1, "quota_limit": 1000 },
  "user": "NomUtilisateur"
}
```

### 2. Analyse d'Image (`POST /image`)

Envoyez une image pour qu'elle soit analysée par l'IA.

**Paramètres :**
- `image` (requis) : Le fichier image (JPG, PNG, WEBP). Max 5MB.
- `prompt` (optionnel) : Une instruction spécifique pour l'analyse (ex: "Décris cette image").

**Exemple Curl :**

```bash
curl -X POST https://api.neticai.fr/v1/image \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -F "image=@/chemin/vers/votre/image.jpg" \
  -F "prompt=Que vois-tu sur cette image ?"
```

**Réponse :**
```json
{
  "imageUrl": "/uploads/images/...",
  "analysis": "Cette image montre un paysage de montagne...",
  "usage": { ... }
}
```

### 3. Audio & Voix (`POST /voice`)

Envoyez un fichier audio pour obtenir une transcription et une réponse de l'IA.

**Paramètres :**
- `audio` (requis) : Le fichier audio. Max 25MB.
- `history` (optionnel) : Historique de conversation (format JSON stringifié).

**Exemple Curl :**

```bash
curl -X POST https://api.neticai.fr/v1/voice \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -F "audio=@/chemin/vers/votre/audio.mp3"
```

---

## API v2 (Compatible OpenAI)

L'API v2 suit le format standard d'OpenAI, ce qui la rend compatible avec la plupart des bibliothèques et outils existants (comme LangChain, AutoGen, etc.).

### Base URL
`https://api.neticai.fr/v2`

### 1. Chat Completions (`POST /chat/completions`)

Endpoint standard pour les complétions de chat.

**Paramètres principaux :**
- `model` : Le modèle à utiliser (ex: "neticV1").
- `messages` : Liste des messages `{ role, content }`.
- `stream` : `true` pour recevoir la réponse en streaming.

**Exemple Curl :**

```bash
curl -X POST https://api.neticai.fr/v2/chat/completions \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "neticV1",
    "messages": [
      {"role": "system", "content": "Tu es un assistant utile."},
      {"role": "user", "content": "Raconte-moi une blague."}
    ],
    "stream": false
  }'
```

**Réponse (format OpenAI) :**
```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "neticV1",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Pourquoi les plongeurs plongent-ils toujours en arrière ? ..."
    },
    "finish_reason": "stop"
  }],
  "usage": { ... }
}
```

### 2. Lister les Modèles (`GET /models`)

Récupère la liste des modèles disponibles.

**Exemple Curl :**

```bash
curl https://api.neticai.fr/v2/models
```

---

## Gestion des Erreurs

Si une requête échoue, l'API renverra un code d'erreur HTTP et un JSON expliquant le problème.

- **401 Unauthorized** : Clé API manquante ou invalide.
- **403 Forbidden** : Clé API valide mais droits insuffisants (ex: quota dépassé, audio non activé).
- **429 Too Many Requests** : Quota dépassé ou rate limit atteint.
- **400 Bad Request** : Paramètres manquants ou invalides (ex: fichier trop lourd).
- **500 Internal Server Error** : Erreur côté serveur.

**Exemple d'erreur :**
```json
{
  "error": "Quota dépassé",
  "quota_used": 1000,
  "quota_limit": 1000
}
```
