import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {getListPlacesByTypeId} from '../../utils/ApiCalls'

import {AppContext} from '../../utils/Context';

export default function Places({navigation}) {

  const context = useContext(AppContext);
  const {dataApp, setDataApp} = context;

  useEffect(() => {
    console.log('se inicia');

    getListPlacesByTypeId(dataApp, dataApp.typePlacesSelect)
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PlacesComments');
        }}>
        <Text> places comments {dataApp.typePlacesSelect}</Text>
      </TouchableOpacity>
    </View>
  );
}
