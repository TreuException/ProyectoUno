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
        //alert(error.message);
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
        <View>
          <Text> ||| places comments {dataApp.typePlacesSelect}</Text>

          {dataPlaces.map(r => (
            <TouchableOpacity
              onPress={() => {

                setDataApp({...dataApp, placeSelect: r.id.toString()});
                navigation.navigate('PlacesComments', {dataPlace: r});
              }}>
              <View key={r.id.toString()}>
                <Text>{r.id.toString()}</Text>
                <Text>{r.name}</Text>
                <Text>{r.location}</Text>
                <Text>{r.description}</Text>
              </View>
            </TouchableOpacity>
          ))}

        </View>
      )}
    </View>
  );
}
