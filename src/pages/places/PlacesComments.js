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
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {useIsFocused} from '@react-navigation/native';

import {AppContext} from '../../utils/Context';

import AddComment from './AddComment';

import {listCommentsByPlaces} from '../../utils/ApiCalls';
import {marginTop} from 'styled-system';

export default function PlacesComments({route, navigation}) {
  const isFocused = useIsFocused();

  const {dataPlace} = route.params;

  const context = useContext(AppContext);
  const {dataApp, setDataApp} = context;

  const [loading, setLoading] = useState(false);
  const [dataComments, setDataComments] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [dataImagenModal, setDataImagenModal] = useState({});

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

  const openModalImagen = data => {
    if (data !== undefined) {
      setDataImagenModal(data);
      setModalVisible(true);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#1C70E2',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center',
      }}>
      <Modal visible={modalVisible} animationType={'slide'}>
        <View style={{flex: 1}}>
          <Image
            style={{
              width: '90%',
              height: 100,
            }}
            source={{
              uri: dataApp.urlPhotoServer + dataImagenModal.photo,
            }}
          />

          <Button
            title="Click To Close Modal"
            onPress={() => {
              alert(modalVisible);
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>

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
                      <View
                        style={{
                          backgroundColor: '#EEF3F6',
                          marginTop: 10,
                          borderRadius: 2,
                          padding: 5,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Raleway-Regular',
                            fontSize: 12,
                            color: '#6A686B',
                          }}>
                          <Text>#</Text>
                          <Text style={{fontWeight: 'bold'}}>
                            {r.id.toString()}{' '}
                          </Text>
                          <Text> - </Text>
                          <Text>{r.name} </Text>
                          <Text> - </Text>
                          <Icon
                            key="1"
                            onPress={() => openModalImagen(r)}
                            name="camera"
                            size={15}></Icon>
                        </Text>

                        <Text
                          style={{
                            fontFamily: 'Raleway-Regular',
                            fontSize: 10,
                            color: '#6A686B',
                          }}>
                          {r.comment}
                        </Text>
                      </View>
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
          <View
            style={{
              width: '100%',
              backgroundColor: '#122E55',
              borderRadius: 12,
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Raleway-Regular',
                fontSize: 18,
                padding: 10,
                color: '#F0F5FB',
              }}>
              Comentar
            </Text>
          </View>
        </TouchableOpacity>

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
