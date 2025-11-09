---
sidebar_position: 1
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Blueprint

Avant de commencer à exécuter une série de commandes, nous devons préparer quelques éléments. Cela ne prendra pas longtemps !

Blueprint dépend de Node.js v20 ou d'une version ultérieure pour reconstruire les ressources du panel. Vous pouvez l'installer à l'aide des commandes ci-dessous ou en exécutant nvm install 20 si vous utilisez le gestionnaire de versions Node. Nous ne vous jugerons pas !

```bash
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
apt-get update
apt-get install -y nodejs
```

Pterodactyl utilise Yarn pour gérer ses modules de nœuds, que nous devrons également installer.

```wasm
npm i -g yarn
```

Accédez à votre Pterodactyl (généralement `/var/www/pterodactyl`) et exécutez la commande suivante pour initialiser les dépendances :

```bash
cd /var/www/pterodactyl
yarn
```

Dépendances supplémentaires

Nous utilisons des dépendances supplémentaires qui pourraient ne pas être préinstallées avec votre distribution. Pour cet exemple, nous utiliserons `apt`. Les commandes peuvent différer pour les distributions non basées sur Debian.

```bash
apt install -y zip unzip git curl wget
```

**Déjà excité ?** Que vous envisagiez d'utiliser Blueprint pour ses extensions, ses outils de développement ou les deux - nous sommes ravis de vous voir ! Dans les 15 prochaines minutes, vous pourrez installer et développer des extensions via et avec le framework Blueprint.

**Téléchargez la dernière version** Téléchargez la dernière version de Blueprint sur votre serveur en téléchargeant la dernière version depuis GitHub ou en exécutant la commande ci-dessous (qui enregistrera le fichier sous le nom `release.zip`).

```bash
wget "$(curl -s https://api.github.com/repos/BlueprintFramework/framework/releases/latest | grep 'browser_download_url' | cut -d '"' -f 4)" -O release.zip
```

**Extraire la version** Décompressez la version que vous avez téléchargée à l'étape précédente dans votre dossier Pterodactyl.

```bash
mv release.zip /var/www/pterodactyl/release.zip
cd /var/www/pterodactyl
unzip release.zip
```

`unzip` peut vous donner le choix d'écraser un fichier ou non. Lors de l'installation de Blueprint, écrasez toujours les fichiers Pterodactyl existants, car ils sont nécessaires au fonctionnement de Blueprint.

```bash
touch /var/www/pterodactyl/.blueprintrc
```

Modifiez les valeurs `$WEBUSER`, `$USERSHELL` et `$PERMISSIONS` pour correspondre à votre environnement. Vous trouverez ci-dessous la configuration standard pour les systèmes basés sur Debian, mais vous pourriez devoir effectuer vos propres modifications.

```bash
echo \
'WEBUSER="www-data";
OWNERSHIP="www-data:www-data";
USERSHELL="/bin/bash";' >> /var/www/pterodactyl/.blueprintrc
```

**Laissez Blueprint faire le reste**

&#x20;Il ne vous reste plus qu'à donner les permissions d'exécution à `blueprint.sh` et à l'exécuter. Blueprint effectuera ensuite automatiquement les commandes nécessaires pour fonctionner correctement.

```bash
chmod +x blueprint.sh
bash blueprint.sh
```

Vous pouvez éventuellement activer l'autocomplétion Bash en ajoutant `source blueprint;` dans votre fichier `.bashrc` (ou `.zshrc` si vous utilisez ZSH). **Mission accomplie !** Blueprint devrait maintenant être installé sur votre panneau Pterodactyl, ce qui signifie que vous pourrez commencer à installer ou à développer des extensions. Pour en savoir plus sur l'utilitaire de ligne de commande Blueprint, exécutez `blueprint -help`. Si vous aimez le projet, veuillez lui attribuer une étoile sur GitHub. Commencez à développer des extensions grâce à ce guide ou trouvez de nouvelles extensions sur la liste de découverte des extensions. Il y a tant à découvrir, bienvenue sur Blueprint.
