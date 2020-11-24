import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './styles.scss';

function Footer() {
  return (
    <footer className="Footer__container">
      <h3>
        Made with{' '}
        <span role="img" aria-label="heart">
          💙
        </span>{' '}
        by{' '}
        <a
          className="Footer__link"
          href="https://github.com/Ccastillo06"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cristian Castillo
        </a>
      </h3>
    </footer>
  );
}

export default withStyles(styles)(Footer);
