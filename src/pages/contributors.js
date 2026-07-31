import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './contributors.module.css';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/Jtheberg-hebergeur/Docs-WebSite/contributors'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }

        const data = await response.json();
        // Trier par nombre de contributions décroissant
        const sorted = data.sort((a, b) => b.contributions - a.contributions);
        setContributors(sorted);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching contributors:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, []);

  const getRole = (contributions) => {
    if (contributions > 100) return { label: 'Mainteneur', color: 'gold' };
    if (contributions > 50) return { label: 'Contributeur Principal', color: 'emerald' };
    if (contributions > 10) return { label: 'Contributeur Actif', color: 'green' };
    return { label: 'Contributeur', color: 'gray' };
  };

  const totalContributions = contributors.reduce(
    (sum, c) => sum + c.contributions,
    0
  );

  return (
    <Layout
      title="Contributeurs"
      description="Liste des contributeurs du projet Jtheberg"
    >
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroFloating1}></div>
        <div className={styles.heroFloating2}></div>
        <div className={styles.heroFloating3}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            Communauté open source
          </span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleGradient}>Nos Contributeurs</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Merci à toutes ces personnes incroyables qui contribuent
            au projet Jtheberg. Chaque contribution compte !
          </p>

          {!isLoading && !error && contributors.length > 0 && (
            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatValue}>
                  {contributors.length}
                </span>
                <span className={styles.heroStatLabel}>Contributeurs</span>
              </div>
              <div className={styles.heroStatDivider}></div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatValue}>
                  {totalContributions}
                </span>
                <span className={styles.heroStatLabel}>Contributions</span>
              </div>
              <div className={styles.heroStatDivider}></div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatValue}>
                  {contributors.filter((c) => c.contributions > 50).length}
                </span>
                <span className={styles.heroStatLabel}>Actifs</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className={styles.container}>
        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Chargement des contributeurs...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <p>Erreur lors du chargement des contributeurs : {error}</p>
            <a
              href="https://github.com/Jtheberg-hebergeur/Docs-WebSite/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.errorLink}
            >
              Voir sur GitHub →
            </a>
          </div>
        ) : (
          <>
            <div className={styles.sectionHeader}>
              <span className={styles.pretitle}>L'équipe</span>
              <h2 className={styles.sectionTitle}>
                Rencontrez notre communauté
              </h2>
              <p className={styles.sectionSubtitle}>
                Des personnes passionnées qui font vivre Jtheberg au quotidien.
              </p>
            </div>

            <div className={styles.grid}>
              {contributors.map((contributor, index) => {
                const role = getRole(contributor.contributions);
                return (
                  <a
                    key={contributor.id}
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={styles.cardBadge}>{role.label}</div>
                    <div className={styles.avatarWrapper}>
                      <div className={styles.avatarRing}></div>
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className={styles.avatar}
                        loading="lazy"
                      />
                    </div>
                    <h3 className={styles.name}>@{contributor.login}</h3>
                    <div className={styles.contributions}>
                      <svg
                        className={styles.contributionsIcon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className={styles.contributionsCount}>
                        {contributor.contributions}
                      </span>
                      <span className={styles.contributionsLabel}>
                        contribution{contributor.contributions > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.viewProfile}>
                        Voir le profil
                        <svg
                          className={styles.arrow}
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
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}

        <div className={styles.contribute}>
          <div className={styles.contributeIcon}>🤝</div>
          <h2>Vous souhaitez contribuer ?</h2>
          <p>
            Rejoignez notre communauté de contributeurs ! Consultez notre
            guide de contribution pour savoir comment participer.
          </p>
          <div className={styles.contributeActions}>
            <a
              href="https://github.com/Jtheberg-hebergeur/Docs-WebSite/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contributeBtnPrimary}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.btnIcon}
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Guide de contribution
            </a>
            <a
              href="https://github.com/Jtheberg-hebergeur/Docs-WebSite"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contributeBtnSecondary}
            >
              ⭐ Star sur GitHub
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contributors;
