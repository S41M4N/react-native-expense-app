import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Balance from './Balance';
import ExpenseList from './ExpenseList';
import {homeStyle} from '../../styles/Home';
import {FAB} from 'react-native-elements';
import Config from '../../Config';

const db = firebase.app().database(Config.firebaseURL);

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  const loadItems = () => {
    const today = new Date();
    const path = '/List/' + today.getFullYear() + '/' + (today.getMonth() + 1);

    db.ref(path)
      .orderByChild('date')
      .on('value', snapshot => {
        if (!snapshot.val()) {
          setLoading(false);
          return;
        }
        let sum = 0;
        const array = [];

        snapshot.forEach(child => {
          sum += parseInt(child.child('amount'), 10);
          array.unshift({key: child.key, ...child.val()});
        });

        setAmount(sum);
        setData(array);
        setLoading(false);
      });
  };

  useEffect(() => {
    db.ref('/Category')
      .once('value')
      .then(res => {
        setCategories(res.val());
        loadItems();
      });
  }, []);

  return (
    <View style={homeStyle.main}>
      <View style={homeStyle.header}>
        <Balance amount={amount} />
      </View>
      <View style={homeStyle.body}>
        {loading ? (
          <View style={homeStyle.loader}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <ExpenseList data={data} categories={categories} />
        )}
      </View>
      <View style={homeStyle.footer}>
        <FAB
          icon={{name: 'add', color: 'white'}}
          visible={true}
          placement="right"
          color="green"
          onPress={() => navigation.navigate('addForm')}
          buttonStyle={styles.FAB}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FAB: {
    borderRadius: 30,
    borderColor: '#fff',
  },
});

export default Home;
