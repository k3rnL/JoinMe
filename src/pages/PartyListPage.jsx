import { connect } from 'react-redux';
import {
  Text, View, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/ApiService';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

function goToParty(props) {
  props.navigation.navigate('Party');
}

async function getParties(props, setParties) {
  const { parties } = await ApiService.getUserParties(props.uid);
  setParties(parties);
}

function PartyList(props) {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    getParties(props, setParties);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={parties}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            goToParty(props, item);
          }}
          >
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default connect((state) => ({ uid: state.profile.uid }))(PartyList);
