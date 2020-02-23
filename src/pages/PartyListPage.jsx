import {connect} from "react-redux";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import React from "react";

function PartyList(props) {

    return (
        <View style={styles.container}>
            <FlatList
                data={this.state.parties}
                renderItem={({item}) =>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('PartyScreen', {party: item});
                        }}
                    >
                        <Text style={styles.item}>{item.name}</Text>
                    </TouchableOpacity>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
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

export default connect(state => {
    return {uid: state.profile.uid};
})(PartyList);
