import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: 'red',
  },
});

export default function ErrorMessage(props) {
  const { message = '' } = props;

  return (
    <View style={styles.container}>
      {message === '' ? null : <Text style={styles.text}>{message}</Text>}
    </View>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
};
