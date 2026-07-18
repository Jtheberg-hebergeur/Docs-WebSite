import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/contributeurs',
    component: ComponentCreator('/contributeurs', '6ca'),
    exact: true
  },
  {
    path: '/contributors',
    component: ComponentCreator('/contributors', 'a48'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f20'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '243'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '38a'),
            routes: [
              {
                path: '/category/-blueprint',
                component: ComponentCreator('/category/-blueprint', '07a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-docker',
                component: ComponentCreator('/category/-docker', 'b7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-installer-pterodactyl',
                component: ComponentCreator('/category/-installer-pterodactyl', '84d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-introduction-à-nextcloud',
                component: ComponentCreator('/category/-introduction-à-nextcloud', 'c90'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-netic-api',
                component: ComponentCreator('/category/-netic-api', 'b35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/️-nextcloud',
                component: ComponentCreator('/category/️-nextcloud', '5d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-plesk',
                component: ComponentCreator('/category/-plesk', '7f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-podman',
                component: ComponentCreator('/category/-podman', '4c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-pterodactyl',
                component: ComponentCreator('/category/-pterodactyl', 'b1e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/-wings',
                component: ComponentCreator('/category/-wings', 'f42'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docker/docker-compose',
                component: ComponentCreator('/docker/docker-compose', 'b68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docker/docker-engine',
                component: ComponentCreator('/docker/docker-engine', 'f07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docker/quest-ce-que-docker',
                component: ComponentCreator('/docker/quest-ce-que-docker', 'c49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/netic/api',
                component: ComponentCreator('/netic/api', 'fa3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nextcloud/introduction-a-nextcloud',
                component: ComponentCreator('/nextcloud/introduction-a-nextcloud', 'f92'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nextcloud/introduction-a-nextcloud/guide-dinstallation',
                component: ComponentCreator('/nextcloud/introduction-a-nextcloud/guide-dinstallation', 'eec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nextcloud/introduction-a-nextcloud/prerequis-systeme',
                component: ComponentCreator('/nextcloud/introduction-a-nextcloud/prerequis-systeme', '24f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/plesk/installer-plesk',
                component: ComponentCreator('/plesk/installer-plesk', '8a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/podman/installer-podman',
                component: ComponentCreator('/podman/installer-podman', 'b1d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/blueprint',
                component: ComponentCreator('/pterodactyl/blueprint', '8f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/blueprint/comment-corriger-une-installation-incomplete-de-blueprint',
                component: ComponentCreator('/pterodactyl/blueprint/comment-corriger-une-installation-incomplete-de-blueprint', '962'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl', '7c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/choisir-un-systeme-dexploitation-serveur',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/choisir-un-systeme-dexploitation-serveur', 'c2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/configuration-de-lenvironnement',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/configuration-de-lenvironnement', '1a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/configuration-du-serveur-web',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/configuration-du-serveur-web', '0b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/dependances',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/dependances', '6e1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/installation',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/installation', 'e27'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/telecharger-des-fichiers',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/telecharger-des-fichiers', '18c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/mise-a-jour-de-pterodactyl',
                component: ComponentCreator('/pterodactyl/mise-a-jour-de-pterodactyl', 'cc7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings',
                component: ComponentCreator('/pterodactyl/wings', 'c93'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/allocations-de-nodes',
                component: ComponentCreator('/pterodactyl/wings/allocations-de-nodes', '2dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/configure',
                component: ComponentCreator('/pterodactyl/wings/configure', 'bd2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/demarre-wings',
                component: ComponentCreator('/pterodactyl/wings/demarre-wings', 'bde'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/dependances',
                component: ComponentCreator('/pterodactyl/wings/dependances', '757'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/installing-wings',
                component: ComponentCreator('/pterodactyl/wings/installing-wings', '8d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/mise-a-jour-de-wings',
                component: ComponentCreator('/pterodactyl/wings/mise-a-jour-de-wings', '00a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/systemes-pris-en-charge',
                component: ComponentCreator('/pterodactyl/wings/systemes-pris-en-charge', 'a8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'd48'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
