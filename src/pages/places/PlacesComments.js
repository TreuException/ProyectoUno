import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

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
        <View style={{}}>
          <Text
            style={{
              fontFamily: 'Raleway-Regular',
              fontSize: 45,
              color: '#F0F5FB',
            }}>
            {dataPlace.name}
          </Text>

          <View
            style={{
              backgroundColor: '#ffff',
              width: '100%',
              borderRadius: 8,
              padding: 10,
              marginTop: 10,
            }}>
            <Image
              style={{
                width: '100%',
                height: 150,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              source={{
                uri: dataPlace.photo,
              }}></Image>

            <Text
              style={{
                fontFamily: 'Raleway-Regular',
                fontSize: 12,
                color: '#6A686B',
              }}>
              Comentarios :
            </Text>
            <View>
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
                  {dataComments.map(r => (
                    <View key={r.id.toString()}>
                      
                      <Text
                        style={{
                          fontFamily: 'Raleway-Regular',
                          fontSize: 15,
                          color: '#6A686B',
                        }}>
                        <Text>#</Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {' '}
                          {r.id.toString()}{' '}
                        </Text>
                      </Text>

                      <Text>
                        <Text>nombre :</Text>
                        <Text>{r.name}</Text>
                      </Text>

                      
                      <Text>Comentario :</Text>
                      <Text>{r.comment}</Text>
                     

                      <Image
                        style={{
                          width: '90%',
                          height: 100,
                        }}
                        source={{
                          uri: dataApp.urlPhotoServer + r.photo,
                        }}
                      />

                      <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddComment', {dataPlace: dataPlace})
          }>
          <Text> Comentar...</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
