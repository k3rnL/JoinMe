import React, { useState } from 'react';
import {
  Modal, Text, View, StyleSheet,
} from 'react-native';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import InputBar from './InputBar';
import Button from './Button';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: rgba(52, 52, 52, 0.8),
  },
  modal: {
    height: 170,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function ListItemModification(props) {
  const [modalVisible, setModalVisible] = useState(true);
  const [text, setText] = useState('');

  const {
    fieldName, fieldValue, callbackConfirm, callbackCancel,
  } = props;

  return (
    <View>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <View>
              <Text>{fieldName}</Text>
              <InputBar
                onChangeText={(value) => setText(value)}
                placeholder={fieldName}
                defaultValue={fieldValue}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title="apply"
                onPress={() => {
                  callbackConfirm(text);
                  setModalVisible(!modalVisible);
                }}
              />
              <Button
                title="cancel"
                style={{ backgroundColor: 'red' }}
                onPress={() => {
                  callbackCancel(text);
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

ListItemModification.propTypes = {
  fieldName: PropTypes.string,
  fieldValue: PropTypes.string,
  callbackConfirm: PropTypes.func,
  callbackCancel: PropTypes.func,
};

ListItemModification.defaultProps = {
  fieldName: '',
  fieldValue: '',
  callbackConfirm: () => {},
  callbackCancel: () => {},
};
