import React, { useState, useEffect } from 'react';
import styles from './ContributorsList.module.css';

// Liste des descriptions à masquer (à gérer côté admin)
const HIDDEN_DESCRIPTIONS = {};

const ContributorsList = () => {
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); // Nombre initial de contributeurs visibles

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/Jtheberg-hebergeur/Docs-WebSite/contributors'
        );
        
        if (!response.ok) throw new Error('Failed to fetch contributors');
        
        const data = await response.json();
        
        // Récupérer les détails des contributeurs
        const contributorsWithDetails = await Promise.all(
          data.map(async (contributor) => {
            try {
              const userResponse = await fetch(contributor.url);
              if (!userResponse.ok) return contributor;
              
              const userData = await userResponse.json();
              const username = userData.login;
              
              return {
                ...contributor,
                name: userData.name || username,
                bio: HIDDEN_DESCRIPTIONS[username] || userData.bio || '',
                location: userData.location,
                company: userData.company
              };
            } catch (e) {
              console.error(`Error fetching user ${contributor.login}:`, e);
              return {
                ...contributor,
                name: contributor.login,
                bio: ''
              };
            }
          })
        );
        
        setContributors(contributorsWithDetails);
      } catch (err) {
        console.error('Error fetching contributors:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 5 : contributors.length);
  };

  if (isLoading) {
    return <div className={styles.loading}>Chargement des contributeurs...</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Nos Contributeurs</h3>
      <div className={`${styles.contributorsGrid} ${isExpanded ? styles.expanded : ''}`}>
        {contributors.slice(0, visibleCount).map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contributorCard}
          >
            <img
              src={contributor.avatar_url}
              alt={`${contributor.login}'s avatar`}
              className={styles.avatar}
            />
            <div className={styles.contributorInfo}>
              <span className={styles.name}>{contributor.name}</span>
              <span className={styles.username}>@{contributor.login}</span>
              {contributor.bio && (
                <p className={styles.bio}>{contributor.bio}</p>
              )}
            </div>
          </a>
        ))}
      </div>
      {contributors.length > 5 && (
        <button onClick={toggleExpand} className={styles.toggleButton}>
          {isExpanded ? 'Voir moins' : `Voir les ${contributors.length - 5} autres contributeurs`}
        </button>
      )}
      <div className={styles.viewAll}>
        <a href="/contributors" className={styles.viewAllLink}>
          Voir tous les contributeurs →
        </a>
      </div>
    </div>
  );
};

export default ContributorsList;
