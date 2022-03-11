import {StyleSheet} from 'react-native';
import Config from '../Config';

export const homeStyle = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Config.layoutBackgroundColor,
  },
  header: {
    // backgroundColor: '#fff',
    // height: 100,
  },
  body: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#fff',
  },
});
