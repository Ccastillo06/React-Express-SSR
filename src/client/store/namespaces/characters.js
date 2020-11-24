import { getCharacters, getCharactersById } from '../../api/rickMorty';
import normalizeData from '../../utils/normalizeData';
import stringIncludes from '../../utils/stringIncludes';

export const charactersNamespace = 'characters';

export const initialState = {
  allIds: [],
  charactersById: {},
  nextPageUrl: null,
  isLoaded: false,
  error: null,
  searchOptions: {
    name: '',
    gender: '',
  },
};

const SET_IS_LOADING = `${charactersNamespace}/SET_IS_LOADING`;
const SET_CHARACTER_DATA = `${charactersNamespace}/SET_CHARACTER_DATA`;
const SET_SINGLE_CHARACTER_DATA = `${charactersNamespace}/SET_SINGLE_CHARACTER_DATA`;
const SET_SEARCH_OPTIONS = `${charactersNamespace}/SET_SEARCH_OPTIONS`;
const SET_ERROR = `${charactersNamespace}/SET_ERROR`;

const reducers = {
  [SET_IS_LOADING]: state => ({
    ...state,
    isLoaded: false,
  }),
  [SET_CHARACTER_DATA]: (state, payload) => ({
    ...state,
    allIds: [...new Set([...state.allIds, ...payload.allIds])],
    charactersById: {
      ...state.charactersById,
      ...payload.charactersById,
    },
    nextPageUrl: payload.nextPageUrl,
    isLoaded: true,
  }),
  [SET_SINGLE_CHARACTER_DATA]: (state, payload) => ({
    ...state,
    allIds: [...state.allIds, payload.id],
    charactersById: {
      ...state.charactersById,
      [payload.id]: payload,
    },
    isLoaded: true,
  }),
  [SET_SEARCH_OPTIONS]: (state, payload) => ({
    ...state,
    searchOptions: {
      name: payload.name,
      gender: payload.gender,
    },
  }),
  [SET_ERROR]: (state, payload) => ({
    ...state,
    error: payload,
    isLoaded: true,
  }),
  default: state => state,
};

// Actions
export const setIsLoading = () => ({ type: SET_IS_LOADING });
export const setCharacterData = payload => ({ type: SET_CHARACTER_DATA, payload });
export const setSingleCharacterData = payload => ({ type: SET_SINGLE_CHARACTER_DATA, payload });
export const setSearchOptions = payload => ({ type: SET_SEARCH_OPTIONS, payload });
export const setError = error => ({ type: SET_ERROR, payload: error });

// Thunks
export const loadCharacters = query => async dispatch => {
  try {
    dispatch(setIsLoading());
    dispatch(setSearchOptions(query));

    const characters = await getCharacters(query);
    const { allIds, dataById } = normalizeData(characters.results);

    dispatch(
      setCharacterData({
        allIds,
        charactersById: dataById,
        nextPageUrl: characters.info.next,
      }),
    );
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const loadNextPageCharacters = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { nextPageUrl } = state[charactersNamespace];

    const response = await fetch(nextPageUrl);
    const { results, info } = await response.json();

    const { allIds, dataById } = normalizeData(results);

    dispatch(
      setCharacterData({
        allIds,
        charactersById: dataById,
        nextPageUrl: info.next,
      }),
    );
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const loadCharacterById = id => async dispatch => {
  try {
    const character = await getCharactersById(id);
    dispatch(setSingleCharacterData(character));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

// Selectors
export const selectIsLoaded = state => state[charactersNamespace].isLoaded;
export const selectNextPageUrl = state => state[charactersNamespace].nextPageUrl;
export const selectSearchOptions = state => state[charactersNamespace].searchOptions;
export const selectError = state => state[charactersNamespace].error;
export const selectCharacterIds = state => state[charactersNamespace].allIds;
export const selectCharacterById = (state, id) => state[charactersNamespace].charactersById[id];

export const selectAllCharactersData = state =>
  Object.values(state[charactersNamespace]?.charactersById || {});

export const selectFilteredCharactersIds = state => {
  const charactersData = selectAllCharactersData(state);
  const { name = '', gender = '' } = selectSearchOptions(state);

  return charactersData
    .filter(
      character =>
        stringIncludes(character.name, name) &&
        (gender ? character.gender.toLowerCase() === gender.toLowerCase() : true),
    )
    .map(({ id }) => id);
};

export default (state = initialState, { type, payload }) => {
  const reducer = reducers[type] || reducers.default;
  return reducer(state, payload);
};
