import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import InputBar from './components/InputBar';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase.js';
import MapScreen from './pages/MapScreen';

firebase.initializeApp(firebaseConfig);

export default registerRootComponent(() => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <InputBar />
      </View>
      <View style={styles.content}>
        <MapScreen />
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    header: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 3,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footer: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
});