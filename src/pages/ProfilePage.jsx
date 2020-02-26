import {
  View, Image, ImageBackground, TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { Divider, ListItem } from 'react-native-elements';
import { ApiService } from '../services/ApiService';
import Button from '../components/Button';
import ModalInputChange from '../components/ModalInputChange';
import ErrorMessage from '../components/Error';
import MaxResDefault from '../assets/maxresdefault.jpg';

async function getPermissionAsync(setError) {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      setError('Sorry, we need camera roll permissions to make this work!');
    }
  }
}

async function pickImage(uid, props) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.cancelled) {
    await ApiService.updateProfilePicture(uid, result.uri);
    const user = await ApiService.getUser(uid);
    props.dispatch(updatePicture(user.picture));
  }
}

function Profile(props) {
  const [error, setError] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    async function load() {
      await getPermissionAsync(setError);
    }
    load();
  }, []);

  const {
    uid, picture, phone, firstname, lastname,
  } = props;

  return (
    <View style={{ justifyContent: 'flex-start' }}>
      <ImageBackground
        source={MaxResDefault}
        style={{
          width: '100%',
          height: 250,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => pickImage(uid, props)}
          style={{
            width: 140,
            height: 140,
            borderRadius: 100,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: picture }}
            style={{
              width: '98%',
              height: '98%',
              backgroundColor: 'white',
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <Divider />
      {
        isOpenModal
          ? (
            <ModalInputChange
              fieldName={label}
              fieldValue={inputValue}
              callbackConfirm={
                async (response) => {
                  console.log('response : ', response);
                }
              }
              callbackCancel={
                (response) => {
                  console.log('response : ', response);
                }
              }
            />
          )
          : null
      }
      <ListItem
        title="Firstname"
        subtitle={firstname}
        onPress={() => {
          setInputValue(firstname);
          setLabel('Firstname');
          setIsOpenModal(!isOpenModal);
        }}
      />
      <ListItem
        title="Lastname"
        subtitle={lastname}
        onPress={() => {
          setInputValue(lastname);
          setLabel('Lastname');
          setIsOpenModal(!isOpenModal);
        }}
      />
      <ListItem title="Phone" subtitle={phone} />
      <Divider />
      <ErrorMessage message={error} />
      <View style={{ alignItems: 'center' }}>
        <Button title="Log out" onPress={() => firebase.auth().signOut()} />
      </View>
    </View>
  );
}

export default connect((state) => ({
  uid: state.profile.uid,
  phone: state.profile.phone,
  firstname: state.profile.firstname,
  lastname: state.profile.lastname,
  picture: state.profile.picture,
}))(Profile);

Profile.propTypes = {
  uid: PropTypes.string,
  phone: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  picture: PropTypes.string,
};

Profile.defaultProps = {
  uid: '',
  phone: '',
  firstname: '',
  lastname: '',
  picture: '',
};
