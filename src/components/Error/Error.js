import React from 'react';
import styles from './Error.module.css';

function Error({ message }) {
  return (
    <div className={styles.Error}>
      <p>Error: {message}</p>
    </div>
  );
}

export default Error;
