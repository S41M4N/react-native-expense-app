import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Config from '../../Config';

const Balance = ({amount}) => {
  return (
    <View style={styles.body}>
      <LinearGradient
        colors={['#7ba9ff', '#0360ff']}
        style={styles.linearGradient}>
        <Text style={content.title}>Total Expense</Text>
        <Text style={content.amount}> ৳ {amount.toFixed(2)}</Text>
        <Text style={content.date}>March, 2022</Text>
      </LinearGradient>
    </View>
  );
};

const content = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
  },
  amount: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 30,
    marginTop: 20,
  },
});
const styles = StyleSheet.create({
  body: {
    marginHorizontal: Config.layoutMargin,
    height: 200,
    paddingVertical: 10,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  expense: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
});

export default Balance;
