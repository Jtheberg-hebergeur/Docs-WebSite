---
sidebar_position: 10
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Mise a jour de Pterodactyl

Pour mètre a jour Pterodactyl il faux éxécuté cette commande dans votre terminal

```
cd /var/www/pterodactyl && php artisan down && curl -L https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz | tar -xzv && chmod -R 755 storage/* bootstrap/cache && composer install --no-dev --optimize-autoloader && php artisan view:clear && php artisan config:clear && php artisan migrate --seed --force && chown -R www-data:www-data /var/www/pterodactyl/* && php artisan queue:restart && (command -v blueprint >/dev/null 2>&1 && blueprint -rerun-install || echo "Blueprint non détecté, étape ignorée.") && php artisan up
```

Est voila votre Pterodactyl est si vous avez installer Blueprint il se réinstallera vaux module ne sont pas impacté.
