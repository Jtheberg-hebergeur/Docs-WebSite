import React from 'react';
import Layout from '@theme/Layout';
import useSWR from 'swr';
import axios from 'axios';
import styles from './contributeurs.module.css';

const fetcher = (url) => axios.get(url).then(res => res.data);

const ContributorCard = ({ login, html_url, avatar_url, contributions }) => (
  <a
    href={html_url}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.card}
  >
    <img src={avatar_url} alt={login} className={styles.avatar} />
    <div className={styles.info}>
      <h3>{login}</h3>
      <p className={styles.contributions}>
        <i className="fas fa-code-branch"></i> {contributions} contributions
      </p>
    </div>
  </a>
);

const Contributeurs = () => {
  const { data: contributors, error } = useSWR(
    'https://api.github.com/repos/Jtheberg-hebergeur/Docs-WebSite/contributors',
    fetcher,
    { revalidateOnFocus: false }
  );

  const isLoading = !contributors && !error;

  return (
    <Layout 
      title="Contributeurs" 
      description="Liste des contributeurs du projet Jtheberg"
    >
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Nos Contributeurs</h1>
          <p>Merci à tous ceux qui contribuent à faire de Jtheberg une communauté incroyable !</p>
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
            <i className="fas fa-exclamation-triangle"></i>
            <p>Erreur lors du chargement des contributeurs. Veuillez réessayer plus tard.</p>
          </div>
        ) : (
          <>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <i className="fas fa-users"></i>
                <div>
                  <h3>{contributors?.length || 0}</h3>
                  <p>Contributeurs</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <i className="fas fa-code-merge"></i>
                <div>
                  <h3>
                    {contributors?.reduce((acc, curr) => acc + curr.contributions, 0).toLocaleString()}
                  </h3>
                  <p>Contributions au total</p>
                </div>
              </div>
            </div>

            <div className={styles.grid}>
              {contributors?.map((contributor) => (
                <ContributorCard key={contributor.id} {...contributor} />
              ))}
            </div>
          </>
        )}

        <div className={styles.contribute}>
          <h2>Vous souhaitez contribuer ?</h2>
          <p>
            Rejoignez notre communauté de contributeurs ! Consultez notre guide de contribution pour commencer.
          </p>
          <div className={styles.buttons}>
            <a
              href="https://github.com/Jtheberg-hebergeur/Docs-WebSite/blob/main/CONTRIBUTING.md"
              className={`${styles.button} ${styles.primary}`}
            >
              <i className="fas fa-book"></i> Guide de contribution
            </a>
            <a
              href="https://github.com/Jtheberg-hebergeur/Docs-WebSite"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              <i className="fab fa-github"></i> Voir sur GitHub
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contributeurs;
