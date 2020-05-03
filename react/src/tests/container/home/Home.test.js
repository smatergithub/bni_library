import React from 'react';
import { render, cleanup, wait, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Switch, Router, Route } from 'react-router-dom';
import axios from 'axios';
import Home from '../../../pages/home';
import configureStore from '../../../redux/store/configureStore';
import { listName } from './mock';

const { store } = configureStore();
function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}
function MainRouter() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Provider>
  );
}

describe('Integration__test-Home', () => {
  beforeEach(() => {});
  afterEach(() => {
    cleanup();
  });
  test('Should render component after fetch api successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: listName });
    const { queryByTestId } = renderWithRouter(<MainRouter />, {
      route: '/',
    });
    await wait(() => {
      expect(queryByTestId('home__loading')).not.toBeInTheDocument();
    });
    expect(queryByTestId('home__container')).toBeInTheDocument();
  });
  test('Should redirect to detail pages when user detail button clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: listName });
    const { queryByTestId } = renderWithRouter(<MainRouter />, {
      route: '/',
    });
    await wait(() => {
      expect(queryByTestId('home__loading')).not.toBeInTheDocument();
    });
    expect(queryByTestId('home__container')).toBeInTheDocument();
    fireEvent.click(queryByTestId('home_user-detail-button'));
    expect(queryByTestId('home__container')).not.toBeInTheDocument();
  });
});
