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
});

export default function ContactSelection() {
  return (
    <View style={styles.container}>
      <ContactsList />
    </View>
  );
}
