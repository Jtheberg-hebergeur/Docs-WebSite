import React, { useState, useEffect } from 'react';
import { FaGithub, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import styles from './GitHubContributors.module.css';

const GitHubContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const contributorsPerPage = 4;

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        
        // Vérifier si des données sont en cache et toujours valides (1 jour de cache)
        const cachedData = localStorage.getItem('githubContributors');
        const cacheTime = localStorage.getItem('githubContributorsTime');
        const now = new Date().getTime();
        
        if (cachedData && cacheTime && now - cacheTime < 24 * 60 * 60 * 1000) {
          setContributors(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // Récupérer les contributeurs depuis l'API GitHub
        const response = await fetch('https://api.github.com/repos/Jtheberg-hebergeur/Docs-WebSite/contributors');
        
        if (!response.ok) {
          throw new Error('Impossible de récupérer les contributeurs depuis GitHub');
        }
        
        const data = await response.json();
        
        // Mettre en cache les données
        localStorage.setItem('githubContributors', JSON.stringify(data));
        localStorage.setItem('githubContributorsTime', now.toString());
        
        setContributors(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des contributeurs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  // Fonction pour obtenir le rôle en fonction des contributions
  const getRole = (contributions) => {
    if (contributions > 100) return 'Contributeur Principal';
    if (contributions > 50) return 'Contributeur Actif';
    return 'Contributeur';
  };

  // Pagination
  const totalPages = Math.ceil(contributors.length / contributorsPerPage);
  const currentContributors = contributors.slice(
    currentPage * contributorsPerPage,
    (currentPage + 1) * contributorsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement des contributeurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Impossible de charger les contributeurs. {error}</p>
        <a 
          href="https://github.com/Jtheberg-hebergeur/Docs-WebSite/graphs/contributors" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          <FaGithub /> Voir les contributeurs sur GitHub
        </a>
      </div>
    );
  }

  if (contributors.length === 0) {
    return <div className={styles.noContributors}>Aucun contributeur trouvé.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Nos Contributeurs</h2>
        <p>Merci à toutes les personnes qui contribuent à ce projet</p>
      </div>
      
      <div className={styles.contributorsGrid}>
        {currentContributors.map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contributorCard}
          >
            <div className={styles.avatarContainer}>
              <img 
                src={contributor.avatar_url} 
                alt={contributor.login} 
                className={styles.avatar}
                loading="lazy"
              />
            </div>
            <div className={styles.contributorInfo}>
              <h3>@{contributor.login}</h3>
              <p className={styles.role}>{getRole(contributor.contributions)}</p>
              <div className={styles.contributions}>
                <FaGithub className={styles.githubIcon} />
                <span>{contributor.contributions} contributions</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={prevPage} 
            className={styles.paginationButton}
            aria-label="Page précédente"
          >
            <FaArrowLeft />
          </button>
          <span>Page {currentPage + 1} sur {totalPages}</span>
          <button 
            onClick={nextPage} 
            className={styles.paginationButton}
            aria-label="Page suivante"
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      <div className={styles.footer}>
        <a 
          href="https://github.com/Jtheberg-hebergeur/Docs-WebSite/graphs/contributors" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          <FaGithub /> Voir tous les contributeurs sur GitHub
        </a>
      </div>
    </div>
  );
};

export default GitHubContributors;
