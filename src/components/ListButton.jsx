import React from 'react';
import { ImageBackground, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const list = require('../assets/list.png');

export default function ListButton(props) {
  const {
    onPress = () => {
    }, style,
  } = props;

  return (
    <TouchableOpacity onPress={() => onPress()} style={style}>
      <ImageBackground
        source={list}
        style={{
          zIndex: 3,
          width: 30,
          height: 30,
          shadowColor: 'black',
          shadowOffset: { height: 10 },
          shadowOpacity: 1,
          overflow: 'visible',
        }}
      />
    </TouchableOpacity>
  );
}

ListButton.propTypes = {
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

ListButton.defaultProps = {
  onPress: () => {},
  style: {},
};
