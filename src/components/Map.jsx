import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Text from 'react-native-web/dist/exports/Text';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import PropTypes from 'prop-types';

// function onRegionChange(region, setRegion) {
//   setRegion(region);
// }

export default function Map(props) {
  const { location, onRegionChange } = props;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={location} onRegionChange={(region) => onRegionChange(region)} />
    </View>
  );
}

Map.propTypes = {
  onRegionChange: PropTypes.func,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
};

Map.defaultProps = {
  onRegionChange: () => {},
  location: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
};
