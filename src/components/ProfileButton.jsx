import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';

const user = require('../assets/user.png');

export default function ProfileButton(props) {
  const {
    onPress = () => {
    }, style,
  } = props;

  return (
    <TouchableOpacity onPress={() => onPress()} style={style}>
      <ImageBackground
        source={user}
        style={{
          zIndex: 3,
          width: 30,
          height: 30,
          shadowColor: 'black',
          shadowOffset: { height: 10 },
          shadowOpacity: 1,
          overflow: 'visible',
        }}
      />
    </TouchableOpacity>
  );
}
