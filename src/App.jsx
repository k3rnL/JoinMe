import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { registerRootComponent } from 'expo';
import Home from './pages/HomePage';
import Auth from './pages/AuthPage'
import ContactSelection from "./pages/ContactSelectionPage";
import firebaseConfig from "../config/firebase";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);

const HomeStack = createStackNavigator({
    Home : {
        screen: Home
    },
    ContactSelection : {
        screen: ContactSelection
    },
    Auth : {
        screen: Auth
    }
}, {
    initialRouteName: 'Home'
});

registerRootComponent(createAppContainer(HomeStack));

