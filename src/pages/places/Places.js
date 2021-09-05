import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {getListPlacesByTypeId} from '../../utils/ApiCalls';

import {AppContext} from '../../utils/Context';

export default function Places({navigation}) {
  const context = useContext(AppContext);
  const {dataApp, setDataApp} = context;

  const [loading, setLoading] = useState(false);

  const [dataPlaces, setDataPlaces] = useState([]);

  useEffect(() => {
    console.log('se inicia');
    setLoading(true);

    getListPlacesByTypeId(dataApp, dataApp.typePlacesSelect)
      .then(data => {
        console.log(data);
        setDataPlaces(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Api call error');
        alert(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
        />
      ) : (

       

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PlacesComments');
          }}>
          <Text> ||| places comments {dataApp.typePlacesSelect}</Text>

          {dataPlaces.map(r => <Button key={r.id.toString()} title={r.name}>{r}</Button>)}  
          
        </TouchableOpacity>
      )}
    </View>
  );
}
