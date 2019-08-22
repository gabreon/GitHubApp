import React, { Component } from 'react';
import { AsyncStorage } from "react-native";

import './config/reactotron';
import checkRoutes from './routes';

import { Provider } from 'react-redux';
import store from './main/store';

export default class App extends Component {
  state = {
    userChecked: false,
    
    userLogged: false
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@gitHubApp:user');

    this.setState({
      userChecked: true,

      userLogged: !!username
    });
  }

  render() {
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = checkRoutes(userLogged);

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
};