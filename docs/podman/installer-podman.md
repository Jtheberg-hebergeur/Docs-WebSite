---
sidebar_position: 1
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# 🔷 Installer Podman

Podman est une alternative à Docker sans daemon, plus sécurisée et compatible avec les conteneurs Docker. 🚀

## 💻 Systèmes supportés

| Système d'exploitation | Version | Supporté |
| ---------------------- | ------- | ------- |
| Debian                 | 12      | ✅       |
|                        | 13      | ✅       |
| Ubuntu                 | 22.04   | ✅       |
|                        | 24.04   | ✅       |
| Rocky Linux            | 8       | ✅       |
| Alpine Linux           | 3.22    | ✅       |

<details>

<summary>📦 Installer sur Debian</summary>

Pour installer Podman, exécutez cette commande dans votre terminal.

```bash
sudo apt-get -y install podman
```

✅ **Et voilà, Podman est installé !**

</details>

<details>

<summary>🐧 Installer sur Ubuntu</summary>

Pour installer Podman, exécutez cette commande dans votre terminal

```bash
sudo apt-get update
sudo apt-get -y install podman
```

✅ **Et voilà, Podman est installé !**

</details>

<details>

<summary>🏔️ Installer sur Rocky Linux</summary>

Pour installer Podman, exécutez cette commande dans votre terminal

```bash
sudo dnf install -y podman
```

✅ **Et voilà, Podman est installé !**

</details>

<details>

<summary>⛰️ Installer sur Alpine Linux</summary>

Pour installer Podman, exécutez cette commande dans votre terminal

```shell
sudo apk add podman
```

✅ **Et voilà, Podman est installé !**

## 🚀 Prochaines étapes

Maintenant que Podman est installé, vous pouvez :

- 🏃 **Lancer votre premier conteneur** - `podman run hello-world`
- 📝 **Créer des pods** - Groupez plusieurs conteneurs
- 🔄 **Migrer depuis Docker** - Podman est compatible avec les commandes Docker
- 🔐 **Exécuter en rootless** - Plus sécurisé que Docker

</details>
