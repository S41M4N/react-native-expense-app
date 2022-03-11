import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

import Category from './Field/CategoryInput';
import PaymentTypeSelector from './Field/PaymentTypeSelector';
import Reason from './Field/ReasonInput';
import DateInput from './Field/DateInput';
import Config from '../../Config';

const db = firebase.app().database(Config.firebaseURL);

const AddForm = ({navigation}) => {
  // Control, Store
  const [categoryList, setCategoryList] = useState([]);

  // Form Data
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(0);
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    db.ref('/Category')
      .once('value')
      .then(snapshot => {
        const array = [];
        const response = snapshot.val();
        Object.keys(response).forEach(key => array.push(response[key]));
        setCategoryList(array);
      });
  }, []);

  const submit = () => {
    if (
      saving ||
      amount.trim() === '' ||
      category.trim() === '' ||
      desc.trim() === ''
    ) {
      return;
    }

    setSaving(true);

    const today = new Date();
    const path = '/List/' + today.getFullYear() + '/' + (today.getMonth() + 1);

    db.ref(path)
      .push()
      .set({
        amount: amount,
        category: category,
        date: date.toISOString().split('T')[0],
        description: desc,
        method: method,
        timestamp: new Date().getTime(),
      })
      .then(() => {
        navigation.pop();
      });
  };

  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.title}>Amount</Text>
            <TextInput
              style={styles.input}
              onChangeText={v => setAmount(v)}
              value={amount}
              placeholder="Enter Amount"
              keyboardType="number-pad"
              placeholderTextColor="#444"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.title}>Payment Method</Text>
            <PaymentTypeSelector method={method} setMethod={setMethod} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.title}>Category</Text>
            <Category
              setValue={setCategory}
              value={category}
              DATA={categoryList}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.title}>Reason</Text>
            <Reason setValue={setDesc} value={desc} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.title}>Date</Text>
            <DateInput date={date} setDate={setDate} />
          </View>
        </View>
        <View style={styles.center}>
          <Button
            title={saving ? 'Saving' : 'Add Expense'}
            onPress={submit}
            containerStyle={styles.submitButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Config.layoutBackgroundColor,
  },
  formContainer: {
    marginHorizontal: Config.layoutMargin,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
  },
  formField: {
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 5,
    borderBottomColor: '#aaa',
    paddingHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: '#aaa',
    borderRadius: 30,
    color: '#111',
  },
  title: {
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
    textAlign: 'left',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginVertical: 10,
    width: 200,
  },
});

export default AddForm;
