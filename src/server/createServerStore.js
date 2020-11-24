import { createStore } from 'redux';
import serialize from 'serialize-javascript';

import reducers from '../client/store/reducers';
import initialState from '../client/store/initialState';

export default function createServerStore() {
  const store = createStore(reducers, initialState);
  const preloadedState = store.getState();

  const storeScript = `<script>window.REDUX_STATE = ${serialize(preloadedState)}</script>`;

  return {
    store,
    storeScript,
  };
}
