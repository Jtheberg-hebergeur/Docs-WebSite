---
sidebar_position: 8
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Mise a jour de Wings

## Télécharger le fichier binaire mis à jour

Tout d'abord, téléchargez le binaire mis à jour de wings dans `/usr/local/bin`. Vous devrez arrêter Wings brièvement. _Vos serveurs en cours d'exécution **ne seront pas** affectés._

```bash
systemctl stop wings && curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")" && chmod u+x /usr/local/bin/wings
```

### Redémarrer le processus

Enfin, redémarrez le processus wings. Vos serveurs en cours d'exécution ne seront pas affectés et toutes les connexions ouvertes à l'instance se reconnecteront automatiquement.

```bash
systemctl restart wings
```
