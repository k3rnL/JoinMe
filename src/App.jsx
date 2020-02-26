import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { registerRootComponent } from 'expo';

import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import React from 'react';
import Auth from './pages/AuthPage';
import Home, { navigationOptions } from './pages/HomePage';
import ContactSelection from './pages/ContactSelectionPage';
import firebaseConfig from '../config/firebase';
import store from './stores/index';
import AuthLoading from './pages/AuthLoadingPage';
import PartyCreationPage from './pages/PartyCreationPage';
import ProfilePage from './pages/ProfilePage';
import PartyListPage from './pages/PartyListPage';
import VerificationCodePage from './pages/VerificationCodePage';
import PartyPage from './pages/PartyPage';

firebase.initializeApp(firebaseConfig);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions,
    },
    ContactSelection: {
      screen: ContactSelection,
    },
    PartyCreation: {
      screen: PartyCreationPage,
    },
    Profile: {
      screen: ProfilePage,
    },
    PartyList: {
      screen: PartyListPage,
    },
    Party: {
      screen: PartyPage,
    },

  }, {
    initialRouteName: 'Home',
  },
);

const AuthStack = createSwitchNavigator(
  {
    AuthLoading,
    App: HomeStack,
    Auth,
    VerificationCode: {
      screen: VerificationCodePage,
    },
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(AuthStack);

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

registerRootComponent(App);
