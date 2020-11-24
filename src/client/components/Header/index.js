import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './styles.scss';

function Header() {
  return (
    <header className="Header__container">
      <Link to="/">
        <img src="/assets/rick-morty-logo.png" alt="logo" className="Header__logo" />
      </Link>
    </header>
  );
}

export default withStyles(styles)(Header);
