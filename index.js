/**
 * @format
 */

import { AppRegistry, Alert } from 'react-native';
import { Provider } from 'react-redux';
import React, { Component } from 'react';


import App from './src/routes/App';
import { name as appName } from './app.json';
import configureStore from './src/redux/store';

import 'react-native-gesture-handler';


const store = configureStore()

class AppRedux extends Component {
  
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
AppRegistry.registerComponent(appName, () => AppRedux);


