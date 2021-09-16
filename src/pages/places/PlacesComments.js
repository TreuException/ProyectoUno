import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';


import {AppContext} from '../../utils/Context';
import AddComment from './AddComment';


export default function PlacesComments({navigation}) {

  return (
    <View>
      <Text>ghi </Text>

      <TouchableOpacity
      onPress={
        ()=> navigation.navigate('AddComment')
      }
      >
        <Text> Comentar...</Text>
      </TouchableOpacity>
    </View>
  );
}
