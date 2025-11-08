---
sidebar_position: 4
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Télécharger des fichiers

La première étape de ce processus consiste à créer le dossier dans lequel le panneau vivra, puis à nous y déplacer dossier nouvellement créé. Vous trouverez ci-dessous un exemple de la manière d’effectuer cette opération.

```bash
mkdir -p /var/www/pterodactyl
cd /var/www/pterodactyl
```

Une fois que vous avez créé un nouveau répertoire pour le Panel et que vous y êtes entré, vous devrez télécharger les fichiers du Panel. Ceci est aussi simple que d'utiliser `curl` pour télécharger notre contenu préemballé. Une fois téléchargé, vous devrez décompresser l'archive et puis définissez les autorisations correctes sur le `storage/` et `bootstrap/cache/` répertoires. Ces répertoires nous permet de stocker des fichiers ainsi que de garder un cache rapide disponible pour réduire les temps de chargement.

```bash
curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
tar -xzvf panel.tar.gz
chmod -R 755 storage/* bootstrap/cache/
```
