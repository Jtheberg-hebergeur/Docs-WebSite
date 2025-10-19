---
sidebar_position: 7
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Démarré Wings

Pour démarrer Wings, exécutez simplement la commande ci-dessous, qui le lancera en mode débogage. Une fois que vous avez vérifié qu'il fonctionne sans erreur, utilisez `CTRL+C` pour terminer le processus et le démoniser en suivant les instructions ci-dessous. En fonction de la connexion Internet de votre serveur, le téléchargement et le démarrage de Wings pour la première fois peuvent prendre quelques minutes.

```bash
sudo wings --debug
```

Vous pouvez éventuellement ajouter l'indicateur `--debug` pour exécuter Wings en mode débogage.

Exécution des Wings en arrière-plan est une tâche simple, assurez-vous juste qu'il fonctionne sans erreurs avant de le faire. Placez le contenu ci-dessous dans un fichier nommé `wings.service` dans le répertoire `/etc/systemd/system`.

```systemd
[Unit]
Description=Pterodactyl Wings Daemon
After=docker.service
Requires=docker.service
PartOf=docker.service

[Service]
User=root
WorkingDirectory=/etc/pterodactyl
LimitNOFILE=4096
PIDFile=/var/run/wings/daemon.pid
ExecStart=/usr/local/bin/wings
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Ensuite, exécutez les commandes ci-dessous pour recharger systemd et démarrer Wings.

```purebasic
sudo systemctl enable --now wings
```
