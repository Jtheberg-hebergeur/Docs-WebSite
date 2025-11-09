---
sidebar_position: 3
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Dépendances

* PHP `8.2` ou `8.3` (recommandé) avec les extensions suivantes : `cli`, `openssl`, `gd`, `mysql`, `PDO`, `mbstring`, `tokenizer`, `bcmath`, `xml` ou `dom`, `curl`, `zip`, et `fpm` si vous envisagez d'utiliser NGINX.
* MySQL `5.7.22` et supérieur (MySQL `8` recommandé) **ou** MariaDB `10.2` et plus haut.
* Redis (`redis-server`)
* Un serveur Web (Apache, NGINX, Caddy, etc.)
* `curl`
* `tar`
* `unzip`
* `git`
* `composer`v2

### Example d'installation de dépendance.

Les commandes ci-dessous sont simplement un exemple de la façon dont vous pourriez installer ces dépendances. Veuillez consulter votre gestionnaire de packages du système d'exploitation pour déterminer les packages corrects à installer.

```bash
apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg

LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php

curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

apt update

apt -y install php8.3 php8.3-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip git redis-server

# Installation de Composer
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```
