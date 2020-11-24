import qs from 'qs';

import cleanValues from '../utils/cleanValues';

const baseUrl = 'https://rickandmortyapi.com/api/character';

const buildUrl = (path = '', queryOptions = {}) => {
  const queryString = qs.stringify(cleanValues(queryOptions));

  return `${baseUrl}${path || ''}${queryString ? `?${queryString}` : ''}`;
};

export const getCharacters = query => fetch(buildUrl('/', query)).then(res => res.json());

export const getCharactersById = id => fetch(buildUrl(`/${id}`)).then(res => res.json());
