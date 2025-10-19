import React from 'react';
import styles from './DocAuthor.module.css';

export default function DocAuthor() {
  return (
    <div className={styles.authorBox}>
      <div className={styles.authorContent}>
        <img 
          src="https://github.com/KizYTB.png" 
          alt="Kiz___" 
          className={styles.authorAvatar}
        />
        <div className={styles.authorInfo}>
          <div className={styles.authorName}>
            <strong>Kiz___</strong>
          </div>
          <div className={styles.authorTitle}>
            President de Jtheberg.cloud
          </div>
          <a 
            href="https://github.com/KizYTB" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.authorLink}
          >
            @KizYTB
          </a>
        </div>
      </div>
    </div>
  );
}
