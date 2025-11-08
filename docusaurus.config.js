// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jtheberg Documentation',
  tagline: 'Documentation complète',
  favicon: 'img/favicon.ico',

  // Configuration pour un domaine personnalisé (jtheberg.cloud)
  url: 'https://jtheberg.cloud',
  baseUrl: '/',

  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  ],

  organizationName: 'Jtheberg-hebergeur',
  projectName: 'Docs-WebSite',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,  // Pour des URLs plus propres sans slash de fin

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Jtheberg-hebergeur/Docs-WebSite/edit/Public/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          routeBasePath: '/', // Utilise la racine pour la documentation
          breadcrumbs: true,
          beforeDefaultRemarkPlugins: [],
          remarkPlugins: [],
          rehypePlugins: [],
        },
        blog: false, // Désactive le blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Redirection automatique vers la documentation
      onBrokenLinks: 'throw',
      onBrokenMarkdownLinks: 'warn',
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Jtheberg',
        logo: {
          alt: 'Jtheberg Logo',
          src: 'https://jtheberg.cloud/assets/images/logo.png',
          href: 'https://jtheberg.cloud',
          target: '_self',
        },
        hideOnScroll: false,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '📚 Documentation',
          },
          {
            href: 'https://jtheberg.cloud',
            label: '🏠 Site Principal',
            position: 'left',
          },
          {
            href: 'https://jtheberg.cloud/contact',
            label: '📞 Contact',
            position: 'left',
          },
          {
            to: '/contributors',
            label: '👥 Contributeurs',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '📚 Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/intro',
              },
              {
                label: 'Pterodactyl',
                to: '/pterodactyl/installer-pterodactyl',
              },
              {
                label: 'Docker',
                to: '/docker/quest-ce-que-docker',
              },
              {
                label: 'Plesk',
                to: '/plesk/installer-plesk',
              },
            ],
          },
          {
            title: '🌐 Jtheberg',
            items: [
              {
                label: 'Site Principal',
                href: 'https://jtheberg.cloud',
              },
              {
                label: 'VPS',
                href: 'https://jtheberg.cloud/hosting/vps',
              },
              {
                label: 'Hébergement Web',
                href: 'https://jtheberg.cloud/hosting/web',
              },
              {
                label: 'Minecraft',
                href: 'https://jtheberg.cloud/hosting/minecraft',
              },
            ],
          },
          {
            title: '💬 Communauté',
            items: [
              {
                label: 'Contact',
                href: 'https://jtheberg.cloud/contact',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/KizYTB',
              },
              {
                label: 'Trustpilot',
                href: 'https://www.trustpilot.com/review/jtheberg.cloud',
              },
            ],
          },
          {
            title: '🔧 Support',
            items: [
              {
                label: 'Licenses',
                href: 'https://jtheberg.cloud/licenses',
              },
              {
                label: 'Status',
                href: 'https://status.jtheberg.cloud',
              },
            ],
          },
        ],
        copyright: `
          <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="margin-bottom: 0.5rem;">🚀 <strong>Jtheberg</strong> - Hébergeur Web Professionnel</p>
            <p style="margin-bottom: 0.5rem;">Copyright © ${new Date().getFullYear()} Jtheberg.cloud - Maintenu avec ❤️ par <a href="https://github.com/KizYTB" target="_blank" rel="noopener noreferrer">Kiz___</a></p>
            <p style="font-size: 0.9rem; opacity: 0.8;">🔒 Sécurité | ⚡ Performance | 📞 Support 24/7</p>
          </div>
        `,
      },
      prism: {
        theme: prismThemes.vsLight,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash', 'docker', 'yaml', 'json', 'nginx', 'php', 'sql', 'powershell'],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
    }),
};

export default config;
