import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const featuresData = [
  {
    icon: '🦖',
    title: 'Pterodactyl Panel',
    description:
      "Gestionnaire de serveurs de jeux moderne et intuitif. Support pour Minecraft, CS2, Rust et bien plus.",
    link: '/pterodactyl/installer-pterodactyl',
  },
  {
    icon: '🦅',
    title: 'Wings',
    description:
      'Daemon performant pour Pterodactyl, optimisé pour des performances maximales sur vos serveurs.',
    link: '/pterodactyl/wings/configure',
  },
  {
    icon: '🎨',
    title: 'Blueprint',
    description:
      'Extensions puissantes pour Pterodactyl. Personnalisez et étendez votre panel facilement.',
    link: '/pterodactyl/blueprint',
  },
  {
    icon: '🐳',
    title: 'Docker',
    description:
      "Conteneurisation d'applications moderne. Déployez vos services en quelques commandes.",
    link: '/docker/quest-ce-que-docker',
  },
  {
    icon: '🔷',
    title: 'Podman',
    description:
      'Alternative moderne à Docker, sans daemon. Idéal pour les environnements de production.',
    link: '/podman/installer-podman',
  },
  {
    icon: '🔧',
    title: 'Plesk',
    description:
      "Panel de gestion d'hébergement web professionnel. Interface intuitive et fonctionnalités avancées.",
    link: '/plesk/installer-plesk',
  },
  {
    icon: '☁️',
    title: 'Nextcloud',
    description:
      'Solution de stockage cloud privé et sécurisé. Synchronisation, partage et collaboration.',
    link: '/nextcloud/introduction-a-nextcloud',
  },
  {
    icon: '🔌',
    title: 'Netic API',
    description:
      "API complète Netic AI (v1 custom + v2 OpenAI-like). Chat, vision, voix, embeddings et plus.",
    link: '/netic/api/intro',
  },
];

const statsData = [
  { icon: '📚', value: '7+', label: 'Services documentés' },
  { icon: '🛠️', value: '30+', label: 'Guides détaillés' },
  { icon: '🌍', value: '100%', label: 'Open source' },
  { icon: '⚡', value: '24/7', label: 'Mise à jour' },
];

const advantagesData = [
  {
    icon: '🚀',
    title: 'Performance Exceptionnelle',
    description:
      'Serveurs optimisés avec les dernières technologies pour des performances maximales. Infrastructure moderne et scalable.',
  },
  {
    icon: '🔒',
    title: 'Sécurité Renforcée',
    description:
      'Protection DDoS avancée, surveillance 24/7, sauvegardes automatiques et infrastructure sécurisée.',
  },
  {
    icon: '💬',
    title: 'Support Réactif',
    description:
      'Équipe technique disponible pour vous accompagner. Réponse rapide et support de qualité.',
  },
  {
    icon: '💰',
    title: 'Tarifs Transparents',
    description:
      'Prix compétitifs sans frais cachés. Facturation claire et flexible selon vos besoins.',
  },
];

const stepsData = [
  {
    icon: '1️⃣',
    title: 'Choisissez votre service',
    description:
      'Parcourez notre catalogue et sélectionnez le service qui correspond à vos besoins. VPS, jeux, web, cloud...',
  },
  {
    icon: '2️⃣',
    title: 'Suivez le guide',
    description:
      'Chaque service dispose d\'un guide détaillé avec prérequis, instructions étape par étape et conseils.',
  },
  {
    icon: '3️⃣',
    title: 'Déployez en production',
    description:
      'Mettez votre service en production en toute confiance. Notre équipe reste disponible pour vous accompagner.',
  },
];

function Home() {
  return (
    <Layout
      title="Jtheberg Documentation"
      description="Documentation complète de Jtheberg.cloud - Hébergement haute performance, VPS, Pterodactyl, Docker, Plesk, Nextcloud et plus"
    >
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={`${styles.heroFloating} ${styles.heroFloating1}`}></div>
        <div className={`${styles.heroFloating} ${styles.heroFloating2}`}></div>
        <div className={`${styles.heroFloating} ${styles.heroFloating3}`}></div>
        <div className={`${styles.heroFloating} ${styles.heroFloating4}`}></div>

        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            Documentation officielle · v2.0
          </span>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleGradient}>Jtheberg.cloud</span>
            <br />
            <span className={styles.heroTitleLight}>La documentation complète</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Guides détaillés, tutoriels pas-à-pas et bonnes pratiques pour
            installer, configurer et maîtriser tous vos services d'hébergement.
          </p>

          <div className={styles.heroActions}>
            <a className={styles.heroBtnPrimary} href="#services">
              <span>🚀 Commencer maintenant</span>
            </a>
            <Link className={styles.heroBtnSecondary} to="/contributors">
              <span>👥 Voir les contributeurs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <div className={styles.statsBar}>
        {statsData.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <section className={styles.section} id="services">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPretitle}>Nos services</span>
          <h2 className={styles.sectionTitle}>
            Une solution pour chaque besoin
          </h2>
          <p className={styles.sectionSubtitle}>
            Découvrez notre gamme complète de services d'hébergement,
            conçus pour offrir performance, sécurité et fiabilité.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {featuresData.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.link}
              className={styles.featureCard}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <span className={styles.featureArrow}>
                Découvrir
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ADVANTAGES SECTION (Alternating bg) ===== */}
      <div className={styles.sectionAlt}>
        <div className={styles.sectionAltInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPretitle}>Pourquoi nous choisir</span>
            <h2 className={styles.sectionTitle}>
              L'excellence à votre service
            </h2>
            <p className={styles.sectionSubtitle}>
              Une infrastructure moderne, un support réactif et des outils
              pensés pour simplifier votre quotidien.
            </p>
          </div>

          <div className={styles.advantagesGrid}>
            {advantagesData.map((adv, idx) => (
              <div key={idx} className={styles.advantageCard}>
                <div className={styles.advantageIcon}>{adv.icon}</div>
                <h4 className={styles.advantageTitle}>{adv.title}</h4>
                <p className={styles.advantageDescription}>{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== STEPS SECTION ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPretitle}>Comment commencer</span>
          <h2 className={styles.sectionTitle}>Trois étapes simples</h2>
          <p className={styles.sectionSubtitle}>
            Suivez notre guide pas-à-pas pour démarrer rapidement avec
            n'importe lequel de nos services.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {stepsData.map((step, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepNumber}>{idx + 1}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Prêt à démarrer ?</h2>
          <p className={styles.ctaSubtitle}>
            Explorez notre documentation complète et choisissez votre service.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/intro" className={styles.ctaBtnPrimary}>
              📖 Lire l'introduction
            </Link>
            <a
              href="https://jtheberg.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtnSecondary}
            >
              🏠 Visiter Jtheberg.cloud
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
