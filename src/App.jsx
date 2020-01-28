import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import InputBar from './components/InputBar';

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

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <InputBar />
      </View>
      <View style={styles.content}>
        <Text>Youhou</Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

export default registerRootComponent(App);



// import React from 'react';
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import ContactsScreen from './pages/ContactsScreen.jsx';
// import MapScreen from './pages/MapScreen.jsx';
// import * as firebase from 'firebase';
// import { PartyListScreen } from './Parties';


// const TabNavigator = createBottomTabNavigator({
//     Map: MapScreen,
//     Contacts: ContactsScreen,
//     Firebase: PartyListScreen
// });

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyA4BxTCKwPHZ5bCw0pTKsfX0L1Z3wKdrbA",
//     authDomain: "joinme-2aa7a.firebaseapp.com",
//     databaseURL: "https://joinme-2aa7a.firebaseio.com",
//     projectId: "joinme-2aa7a",
//     storageBucket: "joinme-2aa7a.appspot.com",
//     messagingSenderId: "1009470360932",
//     appId: "1:1009470360932:web:af90568c3b3c13d05cbe71"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default createAppContainer(TabNavigator);
