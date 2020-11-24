import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import { ALL_GENDERS } from '../../../constants/rickMortyGender';
import {
  loadCharacters,
  selectSearchOptions,
  setSearchOptions,
} from '../../store/namespaces/characters';
import filterFalsyValues from '../../utils/filterFalsyValues';

import styles from './styles.scss';

const initialFormState = {
  name: '',
  gender: '',
};

function CharacterFilter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchOptions = useSelector(selectSearchOptions);

  const [formState, setFormState] = useState({
    name: searchOptions.name || '',
    gender: searchOptions.gender || '',
  });

  function onInputChange(ev) {
    const { name, value } = ev.target;

    setFormState({ ...formState, [name]: value });
  }

  function resetFormState() {
    setFormState(initialFormState);
    dispatch(setSearchOptions(initialFormState));

    // Clean search params
    history.push({
      pathname: '/',
      search: '',
    });
  }

  async function onFormSubmit(ev) {
    ev.preventDefault();
    const query = filterFalsyValues(formState);

    await dispatch(loadCharacters(query));

    // Push search params without reloading
    history.push({
      pathname: '/',
      search: `?${new URLSearchParams(query).toString()}`,
    });
  }

  return (
    <div className="CharacterFilter__container">
      <h3>
        Search your favourite character!{' '}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h3>
      <form className="CharacterFilter__form" onSubmit={onFormSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Choose a name"
          value={formState.name}
          onChange={onInputChange}
        />

        <select id="gender" name="gender" value={formState.gender} onChange={onInputChange}>
          <option value="">Choose a gender</option>

          {ALL_GENDERS.map(val => (
            <option key={val}>{val.toUpperCase()}</option>
          ))}
        </select>

        <button className="CharacterFilter__submit" type="submit">
          Search Characters
        </button>

        <button
          className="CharacterFilter__cancel"
          type="button"
          onClick={resetFormState}
          disabled={!formState.name && !formState.gender}
        >
          Remove filters
        </button>
      </form>
    </div>
  );
}

export default withStyles(styles)(CharacterFilter);
