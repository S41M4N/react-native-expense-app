import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {firebase} from '@react-native-firebase/database';

import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Config from '../../../Config';

const db = firebase.app().database(Config.firebaseURL);

const Reason = ({value, setValue}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    db.ref('/Suggestions')
      .once('value')
      .then(snapshot => setData(snapshot.val()));
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setValue(item.value);
        setModalOpen(false);
      }}>
      <Text style={styles.colorBlack}>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={v => setValue(v)}
          value={value}
          placeholder={data.length === 0 ? 'Loading...' : 'Type here...'}
          keyboardType="ascii-capable"
          autoCapitalize="words"
          placeholderTextColor="#444"
        />
        <MaterialIcons
          style={styles.addIcon}
          onPress={() => setModalOpen(true)}
          name="add"
          size={32}
        />
      </View>

      <Modal
        visible={modalOpen}
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                style={styles.flatList}
                data={data}
                renderItem={renderItem}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: 50,
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: '#aaa',
    borderRadius: 30,
    color: '#111',
  },
  addIcon: {
    padding: 5,
    color: '#111',
  },
  colorBlack: {
    color: '#111',
  },
});

export default Reason;
