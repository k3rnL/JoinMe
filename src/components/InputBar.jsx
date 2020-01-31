import React from 'react';
import {
  Text, View, StyleSheet, TextInput,
} from 'react-native';
import Button from './Button';

export default function InputBar() {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={styles.addButton}>
        <Button />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerInput: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'white',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: 'red',
  },
});