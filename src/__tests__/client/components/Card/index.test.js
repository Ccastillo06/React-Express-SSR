import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import Card from '../../../../client/components/Card';

const mockStore = configureStore([]);

describe('Component Card renders as expected', () => {
  let store;
  let context = {};
  let component;

  beforeEach(() => {
    store = mockStore({
      characters: {
        charactersById: {
          1: {
            name: 'Saitama',
            gender: 'Male',
            status: 'Alive',
            location: {
              name: 'Earth',
            },
          },
        },
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <Card id="1" />
        </StaticRouter>
      </Provider>,
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should show the character name as the title', () => {
    const cardTitle = component.root.findByProps({ className: 'Card__title ellipsis' });

    const expected = store.getState().characters.charactersById[1].name;
    expect(cardTitle.children[0]).toBe(expected);
  });
});
