---
sidebar_position: 5
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Installation

Maintenant que tous les fichiers ont été téléchargés, nous devons configurer certains aspects essentiels du panneau.

:::info Configuration de la base de données

Vous aurez besoin d'une configuration de base de données et d'un utilisateur avec les autorisations correctes créées pour cette base de données auparavant continuer plus loin. Voir ci-dessous pour créer rapidement un utilisateur et une base de données pour votre panneau Ptérodactyle. Pour trouver des informations plus détaillées s'il vous plaît, jetez un oeil à Configuration de MySQL

```bash
# Si vous utilisez MariaDB (v11.0.0+) (Il s'agit de la valeur par défaut lorsque vous installez Pterodactyl en suivant la documentation.)
mariadb -u root -p

# Si vous utilisez MySQL
mysql -u root -p
```

```sql
# N'oubliez pas de remplacer « yourPassword » ci-dessous par un mot de passe unique.
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY 'yourPassword';
CREATE DATABASE panel;
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;
exit
```

:::

Nous allons d’abord copier notre fichier de paramètres d’environnement par défaut, installer les dépendances principales, puis générer un nouvelle clé de cryptage d'application.

```bash
cp .env.example .env
COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader

# N'exécutez la commande ci-dessous que si vous installez ce panneau pour la
# première fois et que vous ne disposez d'aucune donnée Pterodactyl Panel dans la base de données.
php artisan key:generate --force
```

:::danger DANGER

Sauvegardez votre clé de cryptage (`APP_KEY` dans le `.env` déposer). Il est utilisé comme clé de cryptage pour toutes les données qui doivent être stockées en toute sécurité (par exemple Clés API). Stockez-le dans un endroit sûr, pas seulement sur votre serveur. Si vous le perdez, toutes les données cryptées sont irrécupérables, même avec des sauvegardes de bases de données.

Pour attraper votre `APP_KEY`, ouvrez un terminal et exécutez ce qui suit dans le répertoire de votre panneau :

```bash
grep APP_KEY /var/www/pterodactyl/.env
```

Vous devriez voir quelque chose comme :

```bash
APP_KEY=base64:YOUR_LONG_RANDOM_STRING
```

Copiez toute cette ligne et enregistrez-la dans un endroit sécurisé :

* Un gestionnaire de mots de passe
* Un fichier crypté sur votre machine locale
* Une clé USB sécurisée
* Un coffre-fort cloud de confiance

Ne le gardez pas uniquement sur le serveur. Si vous perdez cette clé, vos données cryptées sont définitivement irrécupérables.

:::

