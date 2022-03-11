import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const DateInput = ({date, setDate}) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>
            {date && date.toISOString().split('T')[0]}
          </Text>
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default DateInput;
