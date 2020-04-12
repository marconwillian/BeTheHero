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
