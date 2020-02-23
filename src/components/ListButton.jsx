import React from "react";
import {setPartyLocation} from "../stores/action/partyCreation";
import {ImageBackground, TouchableOpacity} from "react-native";

export default function ProfileButton(props) {

    const { onPress = () => {}, style } = props;

    return (
        <TouchableOpacity onPress={() => onPress()} style={style}>
            <ImageBackground source={require('../assets/list.png')} style={{zIndex: 3, width: 30, height: 30,shadowColor: "black",
                shadowOffset: { height: 10},
                shadowOpacity: 1,overflow: 'visible'}}/>
        </TouchableOpacity>
    );

}
