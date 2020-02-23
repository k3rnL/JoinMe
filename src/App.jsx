import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { registerRootComponent } from 'expo';
import Home, {navigationOptions} from './pages/HomePage';
import Auth from './pages/AuthPage'
import ContactSelection from "./pages/ContactSelectionPage";
import firebaseConfig from "../config/firebase";
import * as firebase from "firebase";
import {connect, Provider} from "react-redux";
import React from "react";
import store from './stores/index'
import AuthLoading from "./pages/AuthLoadingPage";
import {ApiService} from "./services/ApiService";
import {updateUid} from "./stores/action/profile";
import PartyCreationPage from "./pages/PartyCreationPage";
import ProfilePage from "./pages/ProfilePage";
import PartyListPage from "./pages/PartyListPage";

firebase.initializeApp(firebaseConfig);

const HomeStack = createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions: navigationOptions
    },
    ContactSelection : {
        screen: ContactSelection
    },
    PartyCreation: {
        screen: PartyCreationPage,
    },
    Profile: {
        screen: ProfilePage
    },
    PartyList: {
        screen: PartyListPage
    },
    Auth : {
        screen: Auth
    }
}, {
    initialRouteName: 'Home'
});

const AuthStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: HomeStack,
        Auth: Auth,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

const AppContainer = createAppContainer(AuthStack);

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

registerRootComponent(App);

