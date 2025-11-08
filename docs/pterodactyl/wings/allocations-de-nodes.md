---
sidebar_position: 6
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

# Allocations de nodes

L'allocation est une combinaison d'adresse IP et de port que vous pouvez attribuer à un serveur. Chaque serveur créé doit avoir au moins une allocation. L'allocation correspond à l'adresse IP de votre interface réseau. Dans certains cas, par exemple derrière un NAT, il s'agit de l'adresse IP interne. Pour créer de nouvelles allocations, accédez à **Nodes > votre Node > Allocation**.

Tapez `hostname -I | awk '{print $1}'` pour trouver l'adresse IP à utiliser pour l'attribution. Vous pouvez également taper `ip addr | grep "inet "` pour voir toutes vos interfaces et adresses IP disponibles. N'utilisez pas 127.0.0.1 pour les attributions.
