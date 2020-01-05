import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ContactsScreen from './ContactsScreen';
import MapScreen from "./MapScreen";


const TabNavigator = createBottomTabNavigator({
    Map: MapScreen,
    Contacts: ContactsScreen,
});

export default createAppContainer(TabNavigator);
