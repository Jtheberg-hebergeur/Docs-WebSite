---
sidebar_position: 3
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Guide d'Installation

Ce guide se concentre sur une installation manuelle sur Debian 12 ou Ubuntu 22.04 avec Apache, PHP, et MariaDB. Adaptez selon votre environnement.

## Préparation de l'Environnement

*   **Mise à Jour du Système** :

    ```bash
    sudo apt update && sudo apt upgrade -y
    ```
*   **Définir le Fuseau Horaire** (exemple pour Europe/Paris) :

    ```bash
    sudo timedatectl set-timezone Europe/Paris
    timedatectl status
    ```
*   **Ajouter Dépôt PHP (pour PHP 8.3 sur Debian)** :

    ```bash
    sudo apt install -y lsb-release apt-transport-https ca-certificates
    sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
    echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
    sudo apt update -y
    ```

    (Pour Ubuntu : sudo add-apt-repository -y ppa:ondrej/php && sudo apt update -y)
*   **Installation des Paquets Nécessaires** :

    ```bash
    sudo apt install -y apache2 mariadb-server php8.3 php8.3-mysql php8.3-curl php8.3-gd php8.3-mbstring php8.3-xml php8.3-zip php8.3-intl php8.3-apcu redis-server php8.3-redis php8.3-ldap smbclient php8.3-bcmath php8.3-gmp wget unzip
    ```

## Configuration de la Base de Données

*   **Sécuriser MariaDB** :

    ```bash
    sudo mysql_secure_installation
    ```
*   **Créer la Base et l'Utilisateur** : Connectez-vous à MariaDB :

    ```bash
    sudo mysql -u root -p
    ```

    Exécutez :

    ```sql
    CREATE DATABASE nextclouddb;
    CREATE USER 'nextclouduser'@'localhost' IDENTIFIED BY 'votre_mot_de_passe_ fort';
    GRANT ALL PRIVILEGES ON nextclouddb.* TO 'nextclouduser'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```

## Téléchargement et Extraction de Nextcloud

*   Téléchargez la dernière version :

    ```bash
    cd /var/www/html
    wget https://download.nextcloud.com/server/releases/latest.zip
    unzip latest.zip
    mv nextcloud /var/www/nextcloud  # Ou directement extraire dans /var/www/
    ```
*   **Permissions** :

    ```bash
    sudo chown -R www-data:www-data /var/www/nextcloud
    sudo chmod -R 755 /var/www/nextcloud
    ```

## Configuration d'Apache

*   Créer le Fichier de Configuration :

    ```bash
    sudo nano /etc/apache2/sites-available/nextcloud.conf
    ```

    Contenu exemple :

    ```
    <VirtualHost *:80>
        ServerName votre-domaine.com
        DocumentRoot /var/www/nextcloud

        <Directory /var/www/nextcloud/>
            Options +FollowSymLinks
            AllowOverride All
            Require all granted
            <IfModule mod_dav.c>
                Dav off
            </IfModule>
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/nextcloud_error.log
        CustomLog ${APACHE_LOG_DIR}/nextcloud_access.log combined
    </VirtualHost>
    ```
*   Activer et Redémarrer :

    ```bash
    sudo a2ensite nextcloud.conf
    sudo a2enmod rewrite headers env dir mime ssl
    sudo systemctl restart apache2
    ```

## Finalisation via Navigateur

* Accédez à http://votre-ip/nextcloud ou http://votre-domaine.com.
* Créez un compte admin, saisissez les infos de la base de données, et installez.
* Installez des apps recommandées comme Nextcloud Office pour l'édition collaborative.

## Configuration Avancée

*   **HTTPS** : Utilisez Let's Encrypt pour SSL.

    ```bash
    sudo apt install certbot python3-certbot-apache
    sudo certbot --apache
    ```
* **Connexion LDAP** : Activez l'app "LDAP user and group backend" dans Nextcloud et configurez les paramètres serveur LDAP.
* **Redis pour Cache** : Éditez config.php pour ajouter la configuration Redis.
*   **Mise à Jour** : Utilisez l'interface web ou commande OCC :

    ```bash
    sudo -u www-data php /var/www/nextcloud/occ upgrade
    ```

### Exemples d'Utilisation

* **Synchronisation Fichiers** : Installez le client desktop Nextcloud sur Windows/Mac/Linux pour sync auto.
* **Collaboration** : Créez un dossier partagé, invitez des utilisateurs, éditez des docs en temps réel avec Nextcloud Office.
* **IA** : Activez l'Assistant IA pour générer des images ou résumer des contenus.
* **Intégration Mobile** : Utilisez l'app Android/iOS pour accéder aux fichiers en déplacement.
