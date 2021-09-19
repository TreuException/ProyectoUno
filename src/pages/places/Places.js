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
  Image,
} from 'react-native';

import {getListPlacesByTypeId} from '../../utils/ApiCalls';

import {AppContext} from '../../utils/Context';

export default function Places({route, navigation}) {
  const {tipoLugar} = route.params;

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
    <ScrollView
      style={{
        backgroundColor: '#1C70E2',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center',
      }}>
      <View
        style={{
          margin: '5%',
        }}>
        <Text
          style={{
            fontFamily: 'Raleway-Regular',
            fontSize: 45,
            color: '#F0F5FB',
          }}>
          {tipoLugar}
        </Text>

        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
            }}>
            <ActivityIndicator
              visible={loading}
              color="#00ff00"
              textContent={'Loading...'}
            />
          </View>
        ) : (
          <View>

            {dataPlaces.length === 0 && (
              <View
                style={{
                  backgroundColor: '#ffff',
                  width: '100%',
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 10,
                }}>
                <Text> Sin registros </Text>
              </View>
            )}

            {dataPlaces.map(r => (
              <TouchableOpacity
                onPress={() => {
                  setDataApp({...dataApp, placeSelect: r.id.toString()});
                  navigation.navigate('PlacesComments', {dataPlace: r});
                }}>
                <View
                  style={{
                    backgroundColor: '#ffff',
                    width: '100%',
                    borderRadius: 8,
                    padding: 10,
                    marginTop: 10,
                  }}
                  key={r.id.toString()}>
                  <Image
                    style={{
                      width: '100%',
                      height: 150,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    source={{
                      uri: r.photo,
                    }}></Image>

                  <Text
                    style={{
                      fontFamily: 'Raleway-Regular',
                      fontSize: 28,
                      color: '#6A686B',
                    }}>
                    {r.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway-Regular',
                      fontSize: 10,
                      color: '#6A686B',
                    }}>
                    {r.location}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway-Regular',
                      fontSize: 15,
                      color: '#6A686B',
                    }}>
                    {r.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
