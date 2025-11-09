---
title: Docker Engine
sidebar_position: 3
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Docker Engine

<details>

<summary>Installer sur Ubuntu</summary>

## Installer via apt

Avant d'installer Docker Engine pour la première fois sur une nouvelle machine hôte, vous devez configurer le dépôt `apt` de Docker. Ensuite, vous pouvez installer et mettre à jour Docker depuis le dépôt.\


1. Configurer le dépôt `apt` de Docker.

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Installez les paquets Docker.

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Vérifiez que l'installation est réussie en exécutant l'image `hello-world` :

```bash
sudo docker run hello-world
```

Cette commande télécharge une image de test et l'exécute dans un conteneur. Lorsque le conteneur s'exécute, il affiche un message de confirmation et se ferme.\
\
Vous avez maintenant installé et démarré Docker Engine avec succès.

</details>

<details>

<summary>Installer sur Debian</summary>

## Installer via apt

Avant d'installer Docker Engine pour la première fois sur une nouvelle machine hôte, vous devez configurer le dépôt `apt` de Docker. Ensuite, vous pouvez installer et mettre à jour Docker à partir du dépôt.\


1. Configurer le dépôt `apt` de Docker.

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Installez les paquets Docker.

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Vérifiez que l'installation est réussie en exécutant l'image `hello-world` :

```bash
sudo docker run hello-world
```

Cette commande télécharge une image de test et l'exécute dans un conteneur. Lorsque le conteneur s'exécute, il affiche un message de confirmation et se ferme.

Vous avez maintenant installé et démarré avec succès Docker Engine.

</details>

<details>

<summary>Installer sur RockyLinux</summary>

## Ajouter le dépôt Docker

Utilisez l’utilitaire `dnf` pour ajouter le référentiel `Docker` à votre serveur Rocky Linux. Pour ce faire tapez la commande :

```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
```

### Installer les paquets nécessaires <a href="#installer-les-paquets-necessaires" id="installer-les-paquets-necessaires"></a>

Installez la dernière version de Docker Engine, `containerd` et Docker Compose en utilisant :

```bash
sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Démarrez le service docker de systemd (`dockerd`) et activez-le pour le démarrage automatique <a href="#demarrez-le-service-docker-de-systemd-dockerd-et-activez-le-pour-le-demarrage-automatique" id="demarrez-le-service-docker-de-systemd-dockerd-et-activez-le-pour-le-demarrage-automatique"></a>

Utilisez l'utilitaire `systemctl` afin de configurer Docker pour démarrer automatiquement avec le prochain redémarrage du système et le démarrer simultanément pour la session courante. Pour ce faire utilisez la commande :

```bash
sudo systemctl --now enable docker
```

### Autoriser, si besoin est, un utilisateur non root à gérer Docker <a href="#autoriser-si-besoin-est-un-utilisateur-non-root-a-gerer-docker" id="autoriser-si-besoin-est-un-utilisateur-non-root-a-gerer-docker"></a>

Ajoutez un utilisateur non root au groupe `docker` pour permettre à l'utilisateur de gérer `docker` sans `sudo`.

Il s'agit d'une étape facultative mais elle peut être pratique si vous êtes l'utilisateur principal du système ou si vous souhaitez autoriser plusieurs utilisateurs à gérer Docker mais ne souhaitez pas leur accorder d'autorisations `sudo`.

Entrer la commande suivante :

```bash
sudo usermod -a -G docker $(whoami)
```

</details>

<details>

<summary>Installer sur Alpine Linux</summary>

**Étape 1 : Installer Docker et Docker Compose**

Pour mettre à jour le dépôt, exécutez la commande suivante :

```shell
apk update
```

Après cela, nous pouvons installer `docker` en utilisant

```shell
apk add docker
```

**Étape 2 : Démarrer et activer le service Docker au démarrage**

Activer le démarrage automatique au démarrage en utilisant

```shell
rc-update add docker default
```

Ensuite, vous pouvez démarrer le service `docker` en exécutant la commande ci-dessous.

```shell
/etc/init.d/docker start
```

Vous avez maintenant installé Alpine Linux avec Docker.

</details>

