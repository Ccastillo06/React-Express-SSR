import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import createTemplate from './createTemplate';
import createServerStore from './createServerStore';

import Routes from '../client/Routes';

export default function renderer(req) {
  const { store, storeScript } = createServerStore();

  const css = new Set(); // CSS for all rendered React components
  // eslint-disable-next-line no-underscore-dangle
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>
        <StyleContext.Provider value={{ insertCss }}>
          <div>{renderRoutes(Routes)}</div>
        </StyleContext.Provider>
      </StaticRouter>
    </Provider>,
  );

  return createTemplate(content, storeScript, css);
}
