import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getIcon} from '../../../shared/helpers';

const Category = ({value, setValue, DATA}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setValue(item.name);
        setModalOpen(false);
      }}>
      <View style={styles.itemContainer}>
        {getIcon(item.iconType, item.iconName, item.iconColor)}
        <Text style={styles.colorBlack}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{value || 'Select a Category'}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalOpen}
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                style={styles.flatList}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.name}
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
  colorBlack: {
    color: '#111',
    paddingLeft: 5,
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
  itemContainer: {
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
});

export default Category;
