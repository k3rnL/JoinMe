import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image, Modal,
} from 'react-native';


import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import url from 'url';
import * as firebase from 'firebase';
import InputBarPhone from '../components/InputBarPhone';
import Button from '../components/Button';
import { updatePhoneNumber } from '../stores/action/profile';
import store from '../stores';

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
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

const captchaUrl = 'https://joinme-2aa7a.firebaseapp.com/captcha.html'; // link to your captcha.html

function sendConfirmationCode(captchaToken, props, phone, setShowModal) {
  setShowModal(false);
  const number = `+${phone}`;
  const captchaVerifier = {
    type: 'recaptcha',
    verify: () => Promise.resolve(captchaToken),
  };
  firebase.auth().signInWithPhoneNumber(number, captchaVerifier)
    .then((confirmation) => {
      store.getState().profile.confirmation = confirmation;
      props.dispatch(updatePhoneNumber(phone));
      props.navigation.navigate('VerificationCode');
    })
    .catch(() => {
      alert('Incorrect input !');
    });
}

function handleResponse(data, props, phone, setShowModal) {
  const { query } = url.parse(data.url, true);

  if (Object.prototype.hasOwnProperty.call(query, 'token')) {
    sendConfirmationCode(query.token, props, phone, setShowModal);
  } else if (Object.prototype.hasOwnProperty.call(query, 'cancel')) {
    setShowModal(false);
  }
}

function renderCaptchScreen(showModal, props, phone, setShowModal) {
  return (
    <View style={{ marginTop: 100 }}>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <WebView
          source={{ uri: captchaUrl }}
          onNavigationStateChange={(data) => handleResponse(data, props, phone, setShowModal)}
          injectedJavaScript="document.f1.submit()"
        />
      </Modal>
    </View>
  );
}
const logo = require('../assets/logo.png');

function Auth(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: 160, height: 130, resizeMode: 'stretch' }}
      />
      <InputBarPhone phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      <Button
        title="OK"
        onPress={() => {
          setShowModal(true);
        }}
      />

      {renderCaptchScreen(showModal, props, phoneNumber, setShowModal)}
    </View>
  );
}

export default connect((state) => ({ uid: state.profile.uid }))(Auth);
