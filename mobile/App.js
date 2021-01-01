/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import SplashScreen from 'react-native-splash-screen';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

import Routes from './src/routes';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://ad6d0b5b7846468f82caf666f3109199@o497854.ingest.sentry.io/5576280', 
});


class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render(){
    return (
      <>
        <Routes />
      </>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#FF0',
  },
});

export default App;
