import React from 'react';
import styles from './Contributors.module.css';

const Contributors = ({ lastUpdatedBy, lastUpdatedAt }) => {
  if (!lastUpdatedBy && !lastUpdatedAt) {
    return null;
  }

  return (
    <div className={styles.contributors}>
      <div className={styles.credit}>
        {lastUpdatedBy && (
          <span className={styles.creditItem}>
            <i className="fas fa-user-edit"></i> Dernière mise à jour par: {lastUpdatedBy}
          </span>
        )}
        {lastUpdatedAt && (
          <span className={styles.creditItem}>
            <i className="far fa-clock"></i> {new Date(lastUpdatedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Contributors;
