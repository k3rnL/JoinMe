import React from 'react';
import {
  View, StyleSheet, TextInput, ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  input: {
    width: '90%',
    height: '100%',
  },
});

export default function InputBar(props) {
  const {
    placeholder = 'placeholder', onChangeText, value, style
  } = props;

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

InputBar.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

InputBar.defaultProps = {
  placeholder: '',
  style: {},
};
