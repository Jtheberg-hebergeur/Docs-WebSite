import React, { useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SlidingBanner from '../components/SlidingBanner';
import GitHubContributors from '../components/GitHubContributors';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import './index.fixed.css';

// Définition des classes CSS en dur pour éviter les erreurs
const styles = {
  documentation: 'documentation',
  sectionTitle: 'sectionTitle',
  sectionSubtitle: 'sectionSubtitle',
  docsGrid: 'docsGrid',
  docCard: 'docCard',
  docLink: 'docLink',
  docFeatures: 'docFeatures',
  docFeature: 'docFeature',
  features: 'features',
  featuresGrid: 'featuresGrid',
  featureCard: 'featureCard',
  heroBanner: 'heroBanner',
  heroContent: 'heroContent',
  heroText: 'heroText',
  heroTitle: 'heroTitle',
  heroSubtitle: 'heroSubtitle',
  heroDescription: 'heroDescription',
  heroButtons: 'heroButtons',
  heroAuthor: 'heroAuthor',
  authorLink: 'authorLink',
  buttonIcon: 'buttonIcon',
  primaryButton: 'primaryButton',
  secondaryButton: 'secondaryButton',
  cta: 'cta',
  ctaContent: 'ctaContent',
  ctaButtons: 'ctaButtons',
  button: 'button',
  'button--primary': 'button--primary',
  'button--outline': 'button--outline',
  'nav-arrows': 'nav-arrows',
  'nav-arrow': 'nav-arrow'
};

// Composant de navigation flottante
const NavigationArrows = () => {
  const sectionIds = ['features', 'documentation', 'contributeurs'];
  
  const scrollToSection = (index) => {
    const targetId = sectionIds[index];
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getCurrentSectionIndex = () => {
    for (let i = 0; i < sectionIds.length; i++) {
      const element = document.getElementById(sectionIds[i]);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          return i;
        }
      }
    }
    return 0;
  };

  return (
    <div className={styles['nav-arrows']}>
      <button 
        className={styles['nav-arrow']} 
        onClick={() => {
          const currentIndex = getCurrentSectionIndex();
          if (currentIndex > 0) {
            scrollToSection(currentIndex - 1);
          }
        }}
        aria-label="Section précédente"
      >
        <FaArrowUp />
      </button>
      <button 
        className={styles['nav-arrow']}
        onClick={() => {
          const currentIndex = getCurrentSectionIndex();
          if (currentIndex < sectionIds.length - 1) {
            scrollToSection(currentIndex + 1);
          }
        }}
        aria-label="Section suivante"
      >
        <FaArrowDown />
      </button>
    </div>
  );
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <header className={styles.heroBanner}>
      <SlidingBanner />
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroDescription}>
            Découvrez une plateforme d'hébergement cloud performante, sécurisée et facile à utiliser.
            Parfait pour les développeurs et les entreprises.
          </p>
          <div className={styles.heroButtons}>
            <Link
              className={styles.primaryButton}
              to="/docs/intro">
              Commencer la Documentation
              <span className={styles.buttonIcon}>🚀</span>
            </Link>
            <Link
              className={styles.secondaryButton}
              to="https://jtheberg.cloud">
              Visiter le Site Principal
              <span className={styles.buttonIcon}>🌐</span>
            </Link>
          </div>
          <div className={styles.heroAuthor}>
            <span>Maintenu par </span>
            <a 
              href="https://github.com/KizYTB" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.authorLink}
            >
              Kiz___
            </a>
            <span> - Président de Jtheberg.cloud</span>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <div className={styles.illustration}>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const features = [
    {
      title: '🚀 Performances Optimales',
      description: 'Des serveurs haute performance avec des temps de chargement ultra-rapides pour une expérience utilisateur exceptionnelle.',
    },
    {
      title: '🔒 Sécurité Maximale',
      description: 'Protection avancée contre les attaques DDoS, chiffrement SSL et sauvegardes automatiques pour une sécurité maximale.',
    },
    {
      title: '📱 Interface Intuitive',
      description: 'Un panneau de contrôle moderne et facile à utiliser pour gérer tous vos services en un seul endroit.',
    },
    {
      title: '⚡ Évolutif',
      description: 'Adaptez facilement vos ressources en fonction de vos besoins, sans temps d\'arrêt.',
    },
    {
      title: '🌍 Réseau Mondial',
      description: 'Des datacenters stratégiquement situés à travers le monde pour des performances optimales partout.',
    },
    {
      title: '🛠️ Support 24/7',
      description: 'Une équipe d\'experts disponible 24/7 pour vous aider à tout moment.',
    },
  ];

  return (
    <section className={styles.features} id="features">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Pourquoi choisir Jtheberg.cloud ?</h2>
          <p>Découvrez ce qui fait de nous le choix idéal pour votre hébergement</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Documentation() {
  const docs = [
    {
      title: 'Documentation Docker',
      description: 'Découvrez comment déployer et gérer vos conteneurs avec notre solution Docker optimisée.',
      link: '/docs/docker/docker-engine',
      icon: '🐳',
      category: 'Conteneurisation',
    },
    {
      title: 'Guide Plesk',
      description: 'Maîtrisez l\'administration de votre hébergement avec notre panel Plesk complet.',
      link: '/docs/plesk/installer-plesk',
      icon: '🖥️',
      category: 'Hébergement',
    },
    {
      title: 'Podman',
      description: 'Apprenez à utiliser Podman comme alternative légère à Docker pour vos conteneurs.',
      link: '/docs/podman/installer-podman',
      icon: '📦',
      category: 'Conteneurisation',
    },
    {
      title: 'Nextcloud',
      description: 'Découvrez comment configurer et personnaliser votre espace de stockage cloud privé.',
      link: '/docs/nextcloud/introduction-a-nextcloud',
      icon: '☁️',
      category: 'Cloud',
    },
    {
      title: 'Docker Compose',
      description: 'Maîtrisez l\'orchestration de vos conteneurs avec Docker Compose.',
      link: '/docs/docker/docker-compose',
      icon: '🚀',
      category: 'Conteneurisation',
    },
    {
      title: 'Documentation Communautaire',
      description: 'Contribuez à notre documentation et partagez vos connaissances avec la communauté.',
      link: 'https://github.com/KizYTB/Jtheberg-docs',
      icon: '👥',
      category: 'Communauté',
      external: true
    }
  ];

  return (
    <section className={styles.documentation} id="documentation">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Documentation Complète</h2>
          <p>Accédez à nos guides détaillés et tutoriels pour tirer le meilleur parti de nos services</p>
        </div>
        <div className={styles.docsGrid}>
          {docs.map((doc, idx) => (
            <div key={idx} className={styles.docCard}>
              <div className={styles.docIcon}>{doc.icon}</div>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <div className={styles.docFeatures}>
                <span className={styles.docFeature}>{doc.category}</span>
                {doc.external ? (
                  <a href={doc.link} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                    Voir la documentation <span>→</span>
                  </a>
                ) : (
                  <Link to={doc.link} className={styles.docLink}>
                    Voir la documentation <span>→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Prêt à commencer ?</h2>
          <p>Découvrez comment Jtheberg.cloud peut vous aider à déployer et gérer vos applications en toute simplicité.</p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Démarrer avec la documentation
            </Link>
            <Link
              className="button button--outline button--lg"
              to="https://jtheberg.cloud">
              Visiter Jtheberg.cloud
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const Section = ({ children, className, id }) => {
  return (
    <section 
      className={clsx(styles.section, className)} 
      id={id}
      ref={el => {
        if (el) {
          const sections = document.querySelectorAll(`.${styles.section}`);
          const index = Array.from(sections).indexOf(el);
          if (index !== -1) {
            el.setAttribute('data-section-index', index);
          }
        }
      }}
    >
      {children}
    </section>
  );
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const sectionsRef = useRef([]);
  
  // Fonction pour ajouter une référence de section
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Découvrez Jtheberg.cloud, une plateforme d'hébergement cloud performante et sécurisée pour vos projets web. Hébergement, stockage et services cloud fiables.">
      <NavigationArrows />
      <HomepageHeader />
      <main>
        <Section ref={addToRefs} id="features">
          <Features />
        </Section>
        <Section ref={addToRefs} id="contributors">
          <GitHubContributors />
        </Section>
        <Section ref={addToRefs} id="documentation">
          <Documentation />
        </Section>
        <Section ref={addToRefs} id="cta">
          <CTA />
        </Section>
      </main>
    </Layout>
  );
}
