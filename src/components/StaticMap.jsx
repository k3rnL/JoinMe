import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import window from '../constants/Layout.js';
import {LinearGradient} from "expo-linear-gradient";
import {rgba} from "polished";
import {Shadows, Strokes} from "../constants";

export default (props) => {

    const {
        location = 'Epitech Toulouse',
        style = styles.image
    } = props;

    let preview = 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURI(location) +
        '&zoom=13&size=1800x1800&maptype=roadmap' +
        '&markers=color:blue%7C' + encodeURI(location) +
        '&key=AIzaSyAfv8IPCxhiURtrI8tDyQptGEVQoOl0G3c';

    return (
        <ImageBackground style={[styles.image, style]} source={{uri: preview}}>
            <LinearGradient
                end={[0, 1]}
                colors={['#FFFFFF00', '#FFFFFF00', '#FFFFFF11', '#FFFFFF77', '#FFFFFFFF']}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 400,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
});
