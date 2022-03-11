import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';

type CheckboxComponentProps = {};

const PaymentTypeSelector: React.FunctionComponent<CheckboxComponentProps> = ({
  method,
  setMethod,
}) => {
  const [cash, setCash] = useState(true);
  const [bkash, setBkash] = useState(false);
  const [rocket, setRocket] = useState(false);

  const setItem = index => {
    let values = [false, false, false];
    values[index] = true;

    setCash(values[0]);
    setBkash(values[1]);
    setRocket(values[2]);

    setMethod(index);
  };
  return (
    <View style={styles.container}>
      <CheckBox
        containerStyle={styles.checkbox}
        title="Cash"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={cash}
        onPress={() => setItem(0)}
      />
      <CheckBox
        containerStyle={styles.checkbox}
        title="Bkash"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={bkash}
        onPress={() => setItem(1)}
      />
      <CheckBox
        containerStyle={styles.checkbox}
        title="Rocket"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={rocket}
        onPress={() => setItem(2)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkbox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    paddingVertical: 8,
    margin: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default PaymentTypeSelector;
