import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Config from '../Config';
function FlatButton({text, onPress}) {
  return (
    <TouchableOpacity style={styles.flatButton} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flatButton: {
    backgroundColor: Config.buttonColor,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginTop: 10,
    shadowOffset: {width: 1, height: 1},
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default FlatButton;
