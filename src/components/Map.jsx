import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import window from '../constants/Layout.js';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Text from "react-native-web/dist/exports/Text";
import MapMarker from "react-native-maps/lib/components/MapMarker";


export default function Map(props) {

    const [ location, setLocation ] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        getLocationAsync(setLocation)
    }, []);

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <MapView style={StyleSheet.absoluteFillObject} region={location}>
                {/*<MapMarker/>*/}
            </MapView>
        </View>
    );

}

async function getLocationAsync(setLocation) {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    console.log(location);
}

