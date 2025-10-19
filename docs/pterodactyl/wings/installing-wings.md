---
sidebar_position: 4
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Installing Wings

La première étape pour installer Wings consiste à s'assurer que la structure de répertoires requise est bien configurée. Pour ce faire, exécutez les commandes ci-dessous, qui créeront le répertoire de base et téléchargeront l'exécutable Wings.

```bash
sudo mkdir -p /etc/pterodactyl
curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
sudo chmod u+x /usr/local/bin/wings
```

