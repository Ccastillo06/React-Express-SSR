import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Footer from './components/Footer';

import styles from './App.scss';

const App = ({ route }) => (
  <>
    <Helmet>
      <title>React SSR with Express</title>
    </Helmet>

    <div className="App">
      <Header />

      {renderRoutes(route.routes)}

      <Footer />
    </div>

    <ToastContainer />
  </>
);

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  route: null,
};

const AppWithStyles = withStyles(styles)(App);
export default AppWithStyles;
