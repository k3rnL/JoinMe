import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContactsList from '../components/ContactsList';

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

export default function ContactSelection() {
  return (
    <View style={styles.container}>
      <ContactsList />
    </View>
  );
}
