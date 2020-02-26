import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Button from '../components/Button';
import InputBar from '../components/InputBar';
import store from '../stores';


export default function VerificationCode(props) {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 160, height: 130, resizeMode: 'stretch' }}
      />
      <InputBar value={code} onChangeText={(code) => setCode(code)} placeholder="Code" />
      <Button onPress={() => confirmCode(code, props)} title="OK" />
    </View>
  );
}

function confirmCode(code, props) {
  store.getState().profile.confirmation.confirm(code)
    .then(() => {
      props.navigation.navigate('App');
    })
    .catch((err) => {
      alert(`Oops! something is wrong ${err}`);
    });
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 80,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },
  itemStyle: {
    marginBottom: 10,
  },
  iconStyle: {
    color: '#000000',
    fontSize: 28,
    marginLeft: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  countryStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: 'black',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    alignItems: 'center',
    bottom: '1%',
    position: 'absolute',
  },
});
function confirmCode(code, props) {
  store.getState().profile.confirmation.confirm(code)
    .then(() => {
      props.navigation.navigate('App');
    })
    .catch((err) => {
      alert(`Oops! something is wrong ${err}`);
    });
}

const logo = require('../assets/logo.png');

export default function VerificationCode(props) {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: 160, height: 130, resizeMode: 'stretch' }}
      />
      <InputBar value={code} onChangeText={(input) => setCode(input)} placeholder="Code" />
      <Button onPress={() => confirmCode(code, props)} title="OK" />
    </View>
  );
}
