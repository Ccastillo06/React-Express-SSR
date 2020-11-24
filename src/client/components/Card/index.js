import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import { selectCharacterById } from '../../store/namespaces/characters';

import styles from './styles.scss';

function Card({ id, noLink, isLarge }) {
  const character = useSelector(s => selectCharacterById(s, id));

  const { id: charId, name, status, image, species, gender, location } = character;

  return (
    <div className={`Card__container ${isLarge ? 'Card__container--large' : ''}`}>
      <div className="header flex-center mb-1">
        <h2 className="Card__title ellipsis">{name}</h2>
        <h3 className="regular capitalize">{status}</h3>
      </div>

      <img src={`${image}`} alt={`${name}`} className="Card__picture mb-1" />

      <div className="Card__info flex-center mb-1">
        <h3 className="regular">{species}</h3>
        <h3 className="regular">{gender}</h3>
      </div>

      <h3 className="ellipsis mb-1">{location.name}</h3>

      {!noLink ? (
        <div className="text-right">
          <Link className="Card__link-button" to={`/character/${charId}`}>
            About
          </Link>
        </div>
      ) : null}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  noLink: PropTypes.bool,
  isLarge: PropTypes.bool,
};

Card.defaultProps = {
  noLink: false,
  isLarge: false,
};

export default withStyles(styles)(Card);
