import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const getIcon = (type, name, color = 'black') => {
  switch (type) {
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={32} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name} size={32} color={color} />;
    case 'FontAwesome':
      return <FontAwesome name={name} size={32} color={color} />;
    case 'AntDesign':
      return <AntDesign name={name} size={32} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={32} color={color} />;
    case 'Octicons':
      return <Octicons name={name} size={32} color={color} />;
    default:
      return <MaterialIcons name="disabled-by-default" size={32} />;
  }
};
