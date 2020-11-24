import 'regenerator-runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import 'react-toastify/dist/ReactToastify.css';

import createStore from './store/createStore';
import Routes from './Routes';

const store = createStore();
const insertCss = (...styles) => {
  const removeCss = styles.filter(style => style?._insertCss).map(style => style?._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <div>{renderRoutes(Routes)}</div>
      </StyleContext.Provider>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
