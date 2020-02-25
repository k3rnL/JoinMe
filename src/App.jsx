import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { registerRootComponent } from 'expo';
import Home, {navigationOptions} from './pages/HomePage';
import Auth from './pages/AuthPage'
import ContactSelection from "./pages/ContactSelectionPage";
import firebaseConfig from "../config/firebase";
import * as firebase from "firebase";
import {Provider} from "react-redux";
import React from "react";
import store from './stores/index'
import AuthLoading from "./pages/AuthLoadingPage";
import PartyCreationPage from "./pages/PartyCreationPage";
import ProfilePage from "./pages/ProfilePage";
import PartyListPage from "./pages/PartyListPage";
import VerificationCodePage from "./pages/VerificationCodePage";
import PartyPage from "./pages/PartyPage";

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
    Party: {
        screen: PartyPage
    }

}, {
    initialRouteName: 'Home'
});

const AuthStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: HomeStack,
        Auth: Auth,
        VerificationCode: {
            screen: VerificationCodePage
        }
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

