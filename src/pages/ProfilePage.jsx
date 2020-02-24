import {View, Image, Text, ImageBackground, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ApiService} from "../services/ApiService";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {Divider, ListItem} from "react-native-elements";
import {updatePicture} from "../stores/action/profile";
import Button from "../components/Button";
import * as firebase from "firebase";

function Profile(props) {

  useEffect(() => {
    getPermissionAsync()
  }, []);

  return (
    <View style={{justifyContent: 'flex-start'}}>
      <ImageBackground source={require('../assets/maxresdefault.jpg')}
                       style={{width: '100%', height: 250, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => pickImage(props.uid, props)} style={{
          width: 140,
          height: 140,
          borderRadius: 100,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={{uri: props.picture}}
                 style={{width: '98%', height: '98%', backgroundColor: 'white', borderRadius: 100}}/>
        </TouchableOpacity>
      </ImageBackground>
      <Divider/>
      <ListItem title={'Phone'} subtitle={props.phone}/>
      <Divider/>
      <Button title={'Log out'} onPress={() => firebase.auth().signOut()}/>
    </View>
  );
}

async function getPermissionAsync() {
  if (Constants.platform.ios) {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
}

async function pickImage(uid, props) {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  });

  if (!result.cancelled) {
    const data = new FormData();
    data.append('picture', {
      uri: result.uri,
      type: 'image/jpeg',
      name: 'picture'
    });

    try {
      const response = await fetch('https://join-me-api.herokuapp.com/users/' + uid + '/picture',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        });

      const user = await ApiService.getUser(uid);
      props.dispatch(updatePicture(user.picture));
    } catch (e) {
      console.log(e);
    }

  }
}

export default connect(state => {
  return {
    uid: state.profile.uid,
    phone: state.profile.phone,
    picture: state.profile.picture
  };
})(Profile);
