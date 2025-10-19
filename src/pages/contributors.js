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
        setContributors(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching contributors:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, []);

  return (
    <Layout title="Contributeurs" description="Liste des contributeurs du projet Jtheberg">
      <main className={styles.container}>
        <h1>Nos Contributeurs</h1>
        <p className={styles.subtitle}>
          Merci à toutes ces personnes incroyables qui contribuent au projet Jtheberg !
        </p>
        
        {isLoading ? (
          <div className={styles.loading}>Chargement des contributeurs...</div>
        ) : error ? (
          <div className={styles.error}>
            Erreur lors du chargement des contributeurs : {error}
          </div>
        ) : (
          <div className={styles.grid}>
            {contributors.map((contributor) => (
              <a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className={styles.avatar}
                />
                <h3>{contributor.login}</h3>
                <p>{contributor.contributions} contributions</p>
              </a>
            ))}
          </div>
        )}
        
        <div className={styles.contribute}>
          <h2>Vous souhaitez contribuer ?</h2>
          <p>
            Rejoignez notre communauté de contributeurs ! Consultez notre guide de contribution pour commencer.
          </p>
          <a
            href="https://github.com/Jtheberg-Cloud/documentation/blob/main/CONTRIBUTING.md"
            className="button button--primary"
          >
            Voir comment contribuer
          </a>
        </div>
      </main>
    </Layout>
  );
};

export default Contributors;
