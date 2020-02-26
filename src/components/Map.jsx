import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

export default function Map(props) {
  const { location, onRegionChange } = props;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={location}
        onRegionChange={(region) => onRegionChange(region)}
      />
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
