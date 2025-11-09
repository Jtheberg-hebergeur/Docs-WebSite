---
sidebar_position: 6
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Configuration de l'environnement

L'environnement principal de Pterodactyl est facilement configuré à l'aide de quelques commandes CLI différentes intégrées à l'application. Cette étape couvrira la configuration d'éléments tels que les sessions, la mise en cache, les informations d'identification de la base de données et l'envoi d'e-mails.

```bash
php artisan p:environment:setup
php artisan p:environment:database

# To use PHP's internal mail sending (not recommended), select "mail". To use a
# custom SMTP server, select "smtp".
php artisan p:environment:mail
```

## Configuration de la base de données

Nous devons maintenant configurer toutes les données de base du panneau dans la base de données que vous avez créée précédemment. **La commande ci-dessous peut prendre un certain temps à fonctionner en fonction de votre machine. S'il vous plaît** _**NE LE FAITES PAS**_ **quittez le processus jusqu'à ce qu'il soit terminé !** Ceci la commande configurera les tables de la base de données, puis ajoutera tous les nids et œufs qui alimentent Pterodactyl.

```bash
php artisan migrate --seed --force
```

## Ajouter le premier utilisateur

Vous devrez ensuite créer un utilisateur administratif afin de pouvoir vous connecter au panneau. Pour ce faire, exécutez la commande ci-dessous. À ce stade, les mots de passe **doit** répondre aux exigences suivantes : 8 caractères, cas mixte, au moins un chiffre.

```bash
php artisan p:user:make
```

## Définir les autorisations

La dernière étape du processus d'installation consiste à définir les autorisations correctes sur les fichiers Panel afin que le serveur Web puisse utilisez-les correctement.

#### Si vous utilisez NGINX, Apache ou Caddy (pas sur RHEL / Rocky Linux / AlmaLinux)

```bash
chown -R www-data:www-data /var/www/pterodactyl/*
```

#### Si vous utilisez NGINX sur RHEL / Rocky Linux / AlmaLinux

```bash
chown -R nginx:nginx /var/www/pterodactyl/*
```

#### Si vous utilisez Apache sur RHEL / Rocky Linux / AlmaLinux

```bash
chown -R apache:apache /var/www/pterodactyl/*
```

## Configuration de Crontab

La première chose que nous devons faire est de créer un nouveau cronjob qui s'exécute chaque minute pour traiter des tâches spécifiques aux ptérodactyles, telles que comme nettoyage de session et envoi de tâches planifiées aux démons. Vous voudrez ouvrir votre crontab en utilisant `sudo crontab -e` et collez ensuite la ligne ci-dessous.

```sh
* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1
```

## Créer un travailleur de file d'attente

Ensuite, vous devez créer un nouveau travailleur systemd pour que notre processus de file d'attente continue de s'exécuter en arrière-plan. Cette file d'attente est responsable pour envoyer des e-mails et gérer de nombreuses autres tâches en arrière-plan pour Pterodactyl.

Il faut éxécuté cette commande dans votre terminal

```bash
sudo tee /etc/systemd/system/pteroq.service > /dev/null << 'EOF'
# Pterodactyl Queue Worker File
# ----------------------------------

[Unit]
Description=Pterodactyl Queue Worker
After=redis-server.service

[Service]
# On some systems the user and group might be different.
# Some systems use `apache` or `nginx` as the user and group.
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF
```

:::info Redis sur RHEL / Rocky Linux / AlmaLinux

Si vous utilisez RHEL, Rocky Linux ou AlmaLinux, vous devrez remplacer `redis-server.service` avec `redis.service` au `After=` ligne afin de garantir `redis` commence avant le travailleur de file d'attente.

:::

:::tip CONSEIL

Si vous n'utilisez pas `redis` pour tout, vous devez supprimer le `After=` ligne, sinon vous rencontrerez des erreurs lorsque le service démarre.

:::

Si vous utilisez Redis pour votre système, vous devez vous assurer qu'il démarrera au démarrage. Vous pouvez le faire en exécutant la commande suivante :

```bash
sudo systemctl enable --now redis-server
```

Enfin, activez le service et configurez-le pour qu'il démarre au démarrage de la machine.

```bash
sudo systemctl enable --now pteroq.service
```
