import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './DocAuthor.module.css';

export default function DocAuthor() {
  const {frontMatter} = useDoc();
  
  // Récupère les métadonnées d'auteur du frontmatter
  const author = frontMatter.author;
  const authorTitle = frontMatter.author_title;
  const authorUrl = frontMatter.author_url;
  const authorImageUrl = frontMatter.author_image_url;
  
  // Si aucune métadonnée d'auteur n'est présente, ne rien afficher
  if (!author) {
    return null;
  }
  
  // Extrait le nom d'utilisateur GitHub de l'URL si disponible
  const githubUsername = authorUrl 
    ? authorUrl.split('/').pop() 
    : null;
  
  return (
    <div className={styles.authorBox}>
      <div className={styles.authorContent}>
        {authorImageUrl && (
          <img 
            src={authorImageUrl} 
            alt={author} 
            className={styles.authorAvatar}
          />
        )}
        <div className={styles.authorInfo}>
          <div className={styles.authorName}>
            <strong>{author}</strong>
          </div>
          {authorTitle && (
            <div className={styles.authorTitle}>
              {authorTitle}
            </div>
          )}
          {authorUrl && githubUsername && (
            <a 
              href={authorUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.authorLink}
            >
              @{githubUsername}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
