import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import { Strokes, Shadows } from '../constants';

const styles = StyleSheet.create({
  button: {
    height: 42,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F74C5',
    shadowColor: '#000',
    margin: 10,
    ...Strokes,
    ...Shadows,
  },
  text: {
    color: 'white',
  },
});

export default function Button(props) {
  const { title, style = {}, textStyle = {}, onPress } = props;

  return (
    <View style={[styles.button, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

Button.propTypes = {
  title: PropTypes.string,
};

Button.defaultProps = {
  title: '',
};
