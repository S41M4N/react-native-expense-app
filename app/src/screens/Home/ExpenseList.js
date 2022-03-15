import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Config from '../../Config';
import {paymentType} from '../../shared/Common';
import {getIcon} from '../../shared/helpers';
import ListItem from './ListItem';

const ExpenseList = ({data, categories}) => {
  const parseIcon = item => {
    const icon = categories[item.category];

    if (icon) {
      return getIcon(icon.iconType, icon.iconName, icon.iconColor);
    }
    return getIcon('material', 'disabled-by-default');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flat}
        data={data}
        renderItem={({item}) => (
          <ListItem
            id={item.key}
            category={item.category}
            amount={item.amount}
            paymentType={paymentType[item.method]}
            date={item.date}
            description={item.description}
            icon={parseIcon(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Config.layoutMargin,
    marginTop: 10,
  },
});

export default ExpenseList;
