import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';

import {
  loadNextPageCharacters,
  selectFilteredCharactersIds,
  selectNextPageUrl,
} from '../../store/namespaces/characters';
import Card from '../Card';

import styles from './styles.scss';

function CardList() {
  const dispatch = useDispatch();
  const characterIds = useSelector(selectFilteredCharactersIds);
  const nextPageUrl = useSelector(selectNextPageUrl);

  function handleLoadCharacters() {
    dispatch(loadNextPageCharacters());
  }

  return (
    <div className="CardList__container">
      <ul className="CardList__list">
        {characterIds.map(id => (
          <Card key={id} id={Number(id)} />
        ))}
      </ul>

      {nextPageUrl ? (
        <div className="CardList__load">
          <button className="CardList__load-button" type="button" onClick={handleLoadCharacters}>
            Next page
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(CardList);
