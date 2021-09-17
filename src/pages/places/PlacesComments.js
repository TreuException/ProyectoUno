import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import {AppContext} from '../../utils/Context';

import AddComment from './AddComment';

import {listCommentsByPlaces} from '../../utils/ApiCalls';

export default function PlacesComments({route, navigation}) {
  const isFocused = useIsFocused();

  const {dataPlace} = route.params;

  const context = useContext(AppContext);
  const {dataApp, setDataApp} = context;

  const [loading, setLoading] = useState(false);
  const [dataComments, setDataComments] = useState([]);

  useEffect(() => {
    if (isFocused) {
      console.log('se inicia');
      console.log(dataPlace);
      setLoading(true);

      console.log('data del contexto');
      console.log(dataApp);
      console.log(dataApp.urlPhotoServer);

      listCommentsByPlaces(dataApp, dataPlace.id)
        .then(data => {
          console.log('COMENTARIOS...');
          console.log(data);
          setDataComments(data);
          setLoading(false);
        })
        .catch(error => {
          console.log('Api call error');
          alert(error.message);
          setLoading(false);
        });
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <Text> </Text>

      <View key={dataPlace.id.toString()}>
        <Text>{dataPlace.id.toString()}</Text>
        <Text>{dataPlace.name}</Text>
        <Text>{dataPlace.location}</Text>
        <Text>{dataPlace.description}</Text>
      </View>

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
            {dataComments.map(r => (
              <View key={r.id.toString()}>
                <Text>{r.id.toString()}</Text>
                <Text>{r.name}</Text>
                <Text>{r.comment}</Text>
                <Text>{r.photo}</Text>

                <Image
                  style={{
                    width: '90%',
                    height: 100,
                  }}
                  source={{
                    uri: dataApp.urlPhotoServer + r.photo,
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddComment', {dataPlace: dataPlace})
        }>
        <Text> Comentar...</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
