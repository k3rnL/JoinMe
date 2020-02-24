import React from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';

export default function InputBar(props) {
  const { placeholder = 'placeholder', style = {}, textStyle = {}, ...otherProps } = props;

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          {...otherProps}
        />
    </View>
  );
}

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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  input: {
    width: "90%",
    height: "100%",
  },
});
