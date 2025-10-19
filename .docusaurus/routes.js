import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
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
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'cd6'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '495'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'cff'),
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
                component: ComponentCreator('/docker/docker-compose', '765'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docker/docker-engine',
                component: ComponentCreator('/docker/docker-engine', 'b2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docker/quest-ce-que-docker',
                component: ComponentCreator('/docker/quest-ce-que-docker', '223'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/intro',
                component: ComponentCreator('/intro', '072'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nextcloud/introduction-a-nextcloud',
                component: ComponentCreator('/nextcloud/introduction-a-nextcloud', 'db1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nextcloud/introduction-a-nextcloud/guide-dinstallation',
                component: ComponentCreator('/nextcloud/introduction-a-nextcloud/guide-dinstallation', '3c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nextcloud/introduction-a-nextcloud/prerequis-systeme',
                component: ComponentCreator('/nextcloud/introduction-a-nextcloud/prerequis-systeme', '0d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/plesk/installer-plesk',
                component: ComponentCreator('/plesk/installer-plesk', 'db3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/podman/installer-podman',
                component: ComponentCreator('/podman/installer-podman', '20c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/blueprint',
                component: ComponentCreator('/pterodactyl/blueprint', '099'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/blueprint/comment-corriger-une-installation-incomplete-de-blueprint',
                component: ComponentCreator('/pterodactyl/blueprint/comment-corriger-une-installation-incomplete-de-blueprint', '7c7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl', '09f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/choisir-un-systeme-dexploitation-serveur',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/choisir-un-systeme-dexploitation-serveur', 'f7f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/configuration-de-lenvironnement',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/configuration-de-lenvironnement', 'e35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/configuration-du-serveur-web',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/configuration-du-serveur-web', '403'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/dependances',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/dependances', '199'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/installation',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/installation', 'bd1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/installer-pterodactyl/telecharger-des-fichiers',
                component: ComponentCreator('/pterodactyl/installer-pterodactyl/telecharger-des-fichiers', 'e64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/mise-a-jour-de-pterodactyl',
                component: ComponentCreator('/pterodactyl/mise-a-jour-de-pterodactyl', '39b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings',
                component: ComponentCreator('/pterodactyl/wings', 'a9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/allocations-de-nodes',
                component: ComponentCreator('/pterodactyl/wings/allocations-de-nodes', '3e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/configure',
                component: ComponentCreator('/pterodactyl/wings/configure', '1f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/demarre-wings',
                component: ComponentCreator('/pterodactyl/wings/demarre-wings', 'fc7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/dependances',
                component: ComponentCreator('/pterodactyl/wings/dependances', '457'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/installing-wings',
                component: ComponentCreator('/pterodactyl/wings/installing-wings', '455'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/mise-a-jour-de-wings',
                component: ComponentCreator('/pterodactyl/wings/mise-a-jour-de-wings', '089'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pterodactyl/wings/systemes-pris-en-charge',
                component: ComponentCreator('/pterodactyl/wings/systemes-pris-en-charge', '8c5'),
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
