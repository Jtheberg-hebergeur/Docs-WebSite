---
sidebar_position: 3
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Dépendances

* curl

```bash
apt install curl -y
```

* Docker

Pour une installation rapide de Docker CE, vous pouvez exécuter la commande ci-dessous :

```bash
curl -sSL https://get.docker.com/ | CHANNEL=stable bash
sudo systemctl enable --now docker
```

Si vous préférez effectuer une installation manuelle, veuillez consulter la documentation officielle de Docker pour savoir comment installer Docker CE sur votre serveur.

:::warning Vérifiez votre noyau

Veuillez noter que certains hébergeurs installent un noyau modifié qui ne prend pas en charge des fonctionnalités importantes de Docker. Vérifiez votre noyau en exécutant `uname -r`. Si votre noyau se termine par `-xxxx-grs-ipv6-64` ou `-xxxx-mod-std-ipv6-64`, il est probable que vous utilisiez un noyau non pris en charge. Consultez notre guide des modifications du noyau pour plus de détails.

:::
