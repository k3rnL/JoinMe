import {View, Image, Text, ImageBackground, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ApiService} from "../services/ApiService";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


function Profile(props) {

    const [ picture, setPicture] = useState(require('../assets/user.png'));

    useEffect(() => {
        getPermissionAsync()
    }, []);

    return (
        <View>
            <ImageBackground source={require('../assets/maxresdefault.jpg')}
                             style={{width: '100%', height: '75%', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => pickImage(props.uid, setPicture)} style={{
                    width: 140,
                    height: 140,
                    borderRadius: 100,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={picture}
                           style={{width: '98%', height: '98%', backgroundColor: 'white', borderRadius: 100}}/>
                </TouchableOpacity>
            </ImageBackground>
            <Text>{'Phone : ' + props.phone}</Text>
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

async function pickImage(uid, setPicture) {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    });

    if (!result.cancelled) {
        setPicture({uri: result.uri});
    }
}

export default connect(state => {
    return {
        uid: state.profile.uid,
        phone: state.profile.phone
    };
})(Profile);
