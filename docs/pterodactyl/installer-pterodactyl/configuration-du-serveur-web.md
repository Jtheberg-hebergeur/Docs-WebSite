---
sidebar_position: 7
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Configuration du serveur Web

<details>

<summary>Nginx avec SSL</summary>

Tout d’abord, supprimez la configuration NGINX par défaut.

```bash
rm /etc/nginx/sites-enabled/default
```

Maintenant, vous devez coller le contenu du fichier ci-dessous, en remplaçant `<domain>` avec votre nom de domaine utilisé dans un fichier appelé `pterodactyl.conf` et placez le fichier dans `/etc/nginx/sites-available/`, ou — si sur RHEL, Rocky Linux ou AlmaLinux, `/etc/nginx/conf.d/`.

```nginx
server {
    # Replace the example <domain> with your domain name or IP address
    listen 80;
    server_name <domain>;
    return 301 https://$server_name$request_uri;
}

server {
    # Replace the example <domain> with your domain name or IP address
    listen 443 ssl http2;
    server_name <domain>;

    root /var/www/pterodactyl/public;
    index index.php;

    access_log /var/log/nginx/pterodactyl.app-access.log;
    error_log  /var/log/nginx/pterodactyl.app-error.log error;

    # allow larger file uploads and longer script runtimes
    client_max_body_size 100m;
    client_body_timeout 120s;

    sendfile off;

    # SSL Configuration - Replace the example <domain> with your domain
    ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
    ssl_prefer_server_ciphers on;

    # See https://hstspreload.org/ before uncommenting the line below.
    # add_header Strict-Transport-Security "max-age=15768000; preload;";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header Content-Security-Policy "frame-ancestors 'self'";
    add_header X-Frame-Options DENY;
    add_header Referrer-Policy same-origin;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param PHP_VALUE "upload_max_filesize = 100M \n post_max_size=100M";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTP_PROXY "";
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
        include /etc/nginx/fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

### Activation de la configuration

La dernière étape consiste à activer votre configuration NGINX et à la redémarrer.

```bash
# vous n'avez pas besoin de créer un lien symbolique vers ce Vofichier si vous utilisez RHEL, Rocky Linux ou AlmaLinux.
sudo ln -s /etc/nginx/sites-available/pterodactyl.conf /etc/nginx/sites-enabled/pterodactyl.conf

# Vous devez redémarrer nginx quel que soit le système d'exploitation.
sudo systemctl restart nginx
```

</details>

<details>

<summary>Nginx sans SSL</summary>

Tout d’abord, supprimez la configuration NGINX par défaut.

```bash
rm /etc/nginx/sites-enabled/default
```

Maintenant, vous devez coller le contenu du fichier ci-dessous, en remplaçant `<domain>` avec votre nom de domaine utilisé dans un fichier appelé `pterodactyl.conf` et placez le fichier dans `/etc/nginx/sites-available/`, ou — si sur RHEL, Rocky Linux ou AlmaLinux, `/etc/nginx/conf.d/`.

```nginx
server {
    # Replace the example <domain> with your domain name or IP address
    listen 80;
    server_name <domain>;

    root /var/www/pterodactyl/public;
    index index.html index.htm index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/pterodactyl.app-error.log error;

    # allow larger file uploads and longer script runtimes
    client_max_body_size 100m;
    client_body_timeout 120s;

    sendfile off;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param PHP_VALUE "upload_max_filesize = 100M \n post_max_size=100M";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTP_PROXY "";
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

### Activation de la configuration

La dernière étape consiste à activer votre configuration NGINX et à la redémarrer.

```bash
# vous n'avez pas besoin de créer un lien symbolique vers ce Vofichier si vous utilisez RHEL, Rocky Linux ou AlmaLinux.
sudo ln -s /etc/nginx/sites-available/pterodactyl.conf /etc/nginx/sites-enabled/pterodactyl.conf

# Vous devez redémarrer nginx quel que soit le système d'exploitation.
sudo systemctl restart nginx
```

</details>

<details>

<summary>Apache avec SSL</summary>

Tout d’abord, supprimez la configuration Apache par défaut.

```wasm
a2dissite 000-default.conf
```

Maintenant, vous devez coller le contenu du fichier ci-dessous, en remplaçant `<domain>` avec votre nom de domaine utilisé dans un fichier appelé `pterodactyl.conf` et placez le fichier dans `/etc/apache2/sites-available`, ou — si sur RHEL, Rocky Linux ou AlmaLinux, `/etc/httpd/conf.d/`.

Remarque : lorsque vous utilisez Apache, assurez-vous d'avoir le `libapache2-mod-php8.3` package installé sinon PHP ne s'affichera pas sur votre serveur web.\*

```apacheconf
<VirtualHost *:80>
    # Replace the example <domain> with your domain name or IP address
    ServerName <domain>

    RewriteEngine On
    RewriteCond %{HTTPS} !=on
    RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L] 
</VirtualHost>

<VirtualHost *:443>
    # Replace the example <domain> with your domain name or IP address
    ServerName <domain>
    DocumentRoot "/var/www/pterodactyl/public"

    AllowEncodedSlashes On

    php_value upload_max_filesize 100M
    php_value post_max_size 100M

    <Directory "/var/www/pterodactyl/public">
        Require all granted
        AllowOverride all
    </Directory>

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/<domain>/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/<domain>/privkey.pem
</VirtualHost>
```

### Activation de la configuration

Une fois que vous avez créé le fichier ci-dessus, exécutez simplement les commandes ci-dessous. Si vous utilisez RHEL, Rocky Linux ou AlmaLinux _vous n'avez pas besoin d'exécuter les commandes ci-dessous!_ Il te suffit de courir `systemctl restart httpd`.

```
# Vous n'avez pas besoin d'exécuter ces commandes sur RHEL, Rocky Linux ou AlmaLinux.
sudo ln -s /etc/apache2/sites-available/pterodactyl.conf /etc/apache2/sites-enabled/pterodactyl.conf
sudo a2enmod rewrite
sudo a2enmod ssl
sudo systemctl restart apache2
```

</details>

<details>

<summary>Apache sans SSL</summary>

Tout d’abord, supprimez la configuration Apache par défaut.

```wasm
a2dissite 000-default.conf
```

Maintenant, vous devez coller le contenu du fichier ci-dessous, en remplaçant `<domain>` avec votre nom de domaine utilisé dans un fichier appelé `pterodactyl.conf` et placez le fichier dans `/etc/apache2/sites-available`, ou — si sur RHEL, Rocky Linux ou AlmaLinux, `/etc/httpd/conf.d/`.

Remarque : lorsque vous utilisez Apache, assurez-vous d'avoir le `libapache2-mod-php8.3`

```
<VirtualHost *:80>
    # Replace the example <domain> with your domain name or IP address
    ServerName <domain>
    DocumentRoot "/var/www/pterodactyl/public"
    
    AllowEncodedSlashes On
    
    php_value upload_max_filesize 100M
    php_value post_max_size 100M
    
    <Directory "/var/www/pterodactyl/public">
        AllowOverride all
        Require all granted
    </Directory>
</VirtualHost>
```



### Activation de la configuration

Une fois que vous avez créé le fichier ci-dessus, exécutez simplement les commandes ci-dessous. Si vous utilisez RHEL, Rocky Linux ou AlmaLinux _vous n'avez pas besoin d'exécuter les commandes ci-dessous!_ Il te suffit de courir `systemctl restart httpd`.

```
# Vous n'avez pas besoin d'exécuter ces commandes sur RHEL, Rocky Linux ou AlmaLinux.
sudo ln -s /etc/apache2/sites-available/pterodactyl.conf /etc/apache2/sites-enabled/pterodactyl.conf
sudo a2enmod rewrite
sudo a2enmod ssl
sudo systemctl restart apache2
```

</details>
