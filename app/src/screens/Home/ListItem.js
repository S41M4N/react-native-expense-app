import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import Config from '../../Config';

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const zero = n => (String(n).length === 1 ? '0' + n : n);

const formatDate = d => {
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return (
    days[date.getDay()] + ', ' + zero(day) + '/' + zero(month) + '/' + year
  );
};

const ListItem = ({
  id,
  category,
  paymentType,
  description,
  amount,
  date,
  icon,
}) => {
  const deleteThisItem = async () => {
    const today = new Date();
    const path = '/List/' + today.getFullYear() + '/' + (today.getMonth() + 1);

    await firebase
      .app()
      .database(Config.firebaseURL)
      .ref(path + '/' + id)
      .remove();
  };
  const deleteDialog = () => {
    console.log(id);
    Alert.alert(
      'Do you want to delete this item?',
      `${description}\n${category}\nAmount: ${amount}`,
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => deleteThisItem()},
      ],
    );
    console.log('delete');
  };
  return (
    <TouchableWithoutFeedback onLongPress={deleteDialog}>
      <View style={styles.body}>
        <View style={styles.left}>
          <Text>{icon}</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.title}>{category}</Text>

          <Text style={styles.paymentType}>{paymentType}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.amount}>{parseFloat(amount).toFixed(2)} TK</Text>
          <Text style={styles.dateTime}>{formatDate(date)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    color: '#000',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  left: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  middle: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  paymentType: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#005ed9',
  },
  desc: {
    fontSize: 14,
    color: '#333',
  },
  right: {
    paddingHorizontal: 10,
  },
  amount: {
    textAlign: 'right',
    fontSize: 16,
    color: '#E00',
  },
  dateTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: 15,
  },
});

export default ListItem;
