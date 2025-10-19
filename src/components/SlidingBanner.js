import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './SlidingBanner.module.css';

const SlidingBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const slides = [
    {
      title: '🚀 Hébergement Haute Performance',
      description: 'Découvrez nos solutions d\'hébergement optimisées pour des performances exceptionnelles',
      buttonText: 'En savoir plus',
      buttonLink: '/docs/intro',
      icon: '⚡',
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      overlay: 'rgba(0, 0, 0, 0.6)'
    },
    {
      title: '🔒 Sécurité Renforcée',
      description: 'Protection avancée contre les attaques DDoS et surveillance 24/7 de vos services',
      buttonText: 'Découvrir',
      buttonLink: '/docs/security',
      icon: '🛡️',
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      overlay: 'rgba(0, 0, 0, 0.5)'
    },
    {
      title: '📚 Documentation Complète',
      description: 'Accédez à nos guides détaillés pour configurer et optimiser vos services',
      buttonText: 'Explorer la doc',
      buttonLink: '/docs',
      icon: '📖',
      background: 'linear-gradient(135deg, #d946ef 0%, #a855f7 100%)',
      overlay: 'rgba(0, 0, 0, 0.4)'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div 
      className={styles.sliderContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={styles.slides} 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={styles.slide}
            style={{ 
              background: slide.background,
              '--overlay': slide.overlay
            }}
          >
            <div className={styles.slideOverlay}></div>
            <div className={styles.slideContent}>
              <div className={styles.slideIcon}>{slide.icon}</div>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href={slide.buttonLink} className={styles.slideButton}>
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.sliderDots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
