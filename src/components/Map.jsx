import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import window from '../constants/Layout.js';

export default () => {
    return (
        <View style={{flex: 1}} >
            <MapView style={window.window} />
        </View>
    );
}