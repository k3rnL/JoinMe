import React from 'react';
import {
  Text, View, StyleSheet, TextInput,
} from 'react-native';

import { Strokes, Shadows } from '../constants';

console.log('Strokes :: ', Strokes);


export default function InputBar() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>salut</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F74C5',
    shadowColor: "#000",
    ...Strokes,
    ...Shadows,
  },
  text: {
    color: 'white'
  }
});