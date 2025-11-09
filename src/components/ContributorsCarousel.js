import React, { useState, useEffect } from 'react';
import styles from './ContributorsCarousel.module.css';

const ContributorsCarousel = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleItems = 5; // Number of contributors to show at once

  // Fetch contributors from GitHub API
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/KizYTB/Jtheberg/contributors');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des contributeurs');
        }
        
        const data = await response.json();
        
        // Map the data to match the expected structure
        const formattedContributors = data.map(contributor => ({
          id: contributor.id,
          login: contributor.login,
          avatar_url: contributor.avatar_url,
          html_url: contributor.html_url,
          contributions: contributor.contributions,
          role: getRole(contributor.contributions)
        }));
        
        setContributors(formattedContributors);
        setLoading(false);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Function to determine role based on contributions
    const getRole = (contributions) => {
      if (contributions > 100) return 'Contributeur Principal';
      if (contributions > 50) return 'Contributeur Actif';
      if (contributions > 10) return 'Contributeur';
      return 'Contributeur';
    };

    fetchContributors();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || contributors.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (contributors.length - Math.min(visibleItems, contributors.length) + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused, contributors.length]);

  // If no contributors or still loading
  if (loading) {
    return <div className={styles.loading}>Chargement des contributeurs...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Impossible de charger les contributeurs. {error}</p>
        <p>Veuillez réessayer plus tard.</p>
      </div>
    );
  }

  if (contributors.length === 0) {
    return <div className={styles.noContributors}>Aucun contributeur trouvé.</div>;
  }

  // Calculate the number of items to show (handle case when there are fewer contributors than visibleItems)
  const itemsToShow = Math.min(visibleItems, contributors.length);
  
  // Duplicate contributors for infinite scroll effect
  const extendedContributors = [...contributors, ...contributors];

  // Calculate the transform value for the carousel
  const transformValue = `translateX(calc(-${currentIndex * (100 / itemsToShow)}% - ${currentIndex * 20}px))`;

  // Handle manual navigation
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % (contributors.length - itemsToShow + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + contributors.length) % (contributors.length - itemsToShow + 1));
  };

  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.sectionHeader}>
        <h2>Nos Contributeurs</h2>
        <p>Découvrez les personnes qui rendent Jtheberg.cloud possible</p>
      </div>
      
      <div 
        className={styles.carouselContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Précédent"
        >
          &lt;
        </button>
        
        <div className={styles.carouselTrack} style={{ transform: transformValue }}>
          {extendedContributors.map((contributor, index) => (
            <div key={`${contributor.id}-${index}`} className={styles.contributorCard}>
              <div className={styles.avatarContainer}>
                <img 
                  src={contributor.avatar_url} 
                  alt={contributor.login} 
                  className={styles.avatar}
                  loading="lazy"
                />
                <div className={styles.contributionBadge}>
                  {contributor.contributions}
                </div>
              </div>
              <h3 className={styles.contributorName}>
                <a 
                  href={contributor.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.profileLink}
                >
                  @{contributor.login}
                </a>
              </h3>
              <p className={styles.contributorRole}>{contributor.role}</p>
              <div className={styles.contributionMeter}>
                <div 
                  className={styles.contributionBar}
                  style={{
                    width: `${Math.min(100, (contributor.contributions / 50) * 100)}%`,
                    background: `linear-gradient(90deg, #4f46e5, #7c3aed)`
                  }}
                ></div>
              </div>
              <span className={styles.contributionText}>
                {contributor.contributions} contributions
              </span>
            </div>
          ))}
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Suivant"
        >
          &gt;
        </button>
      </div>
      
      <div className={styles.dotsContainer}>
        {Array.from({ length: Math.max(1, contributors.length - visibleItems + 1) }).map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller au contributeur ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ContributorsCarousel;
