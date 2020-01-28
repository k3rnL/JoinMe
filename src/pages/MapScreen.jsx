import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import window from '../../constants/Layout.js';

console.log(window);
export default () => {
    return (
        <View style={{flex: 1}} >
            <MapView style={window.window} />
        </View>
    );
}