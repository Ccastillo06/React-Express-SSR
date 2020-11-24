import { combineReducers } from 'redux';

import charactersReducer, { charactersNamespace } from './namespaces/characters';

export default combineReducers({
  [charactersNamespace]: charactersReducer,
});
