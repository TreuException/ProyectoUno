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

  const [imageLoaded, isImageLoaded] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);

      //console.log('data del contexto');
      //console.log(dataApp);
      //console.log(dataApp.urlPhotoServer);

      listCommentsByPlaces(dataApp, dataPlace.id)
        .then(data => {
          //console.log('COMENTARIOS...');
          //console.log(data);
          setDataComments(data);
          setLoading(false);
        })
        .catch(error => {
          console.log('Api call error' + error.message);
          //alert(error.message);
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

  const acortarComment = (largoMaximo, comment) => {
    const largo = comment.length;

    if (largo > largoMaximo) {
      const cortado = comment.substring(0, largoMaximo);
      return cortado + '...';
    } else {
      return comment;
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
        <View
          style={{
            backgroundColor: '#1C70E2',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignContent: 'center',
          }}>
          <ScrollView horiztonal>
            <View
              style={{
                margin: '5%',
              }}>
              <View
                style={{
                  backgroundColor: '#ffff',
                  width: '100%',
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 10,
                }}>

                {imageLoaded === false && (
                  <ActivityIndicator
                    visible={loading}
                    color="#6A686B"
                    textContent={'Loading...'}
                  />
                )}

                {dataImagenModal.photo !== '' && (
                  <Image
                    onLoadEnd={() => isImageLoaded(true)}
                    style={{
                      width: '100%',
                      height: 400,
                    }}
                    source={{
                      uri: dataApp.urlPhotoServer + dataImagenModal.photo,
                    }}
                  />
                )}

                <Text
                  style={{
                    fontFamily: 'Raleway-Regular',
                    fontSize: 15,
                    color: '#6A686B',
                  }}>
                  <Text>{dataImagenModal.name} </Text>
                  <Text> - </Text>

                  {dataImagenModal.photo !== '' && (
                    <Icon key="1" name="image" size={15}></Icon>
                  )}
                </Text>

                <Text
                  style={{
                    fontFamily: 'Raleway-Regular',
                    fontSize: 15,
                    color: '#6A686B',
                  }}>
                  {dataImagenModal.comment}
                </Text>

                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#122E55',
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 15,
                      marginBottom: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Raleway-Regular',
                        fontSize: 18,
                        padding: 10,
                        color: '#F0F5FB',
                      }}>
                      Cerrar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
                fontFamily: 'Raleway-Bold',
                fontSize: 15,
                color: '#6A686B',
                marginTop: 5,
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
                  <View>
                    {dataComments.map(r => (
                      <TouchableOpacity
                        key={r.id.toString()}
                        onPress={() => openModalImagen(r)}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: '#EEF3F6',
                            marginTop: 10,
                            borderRadius: 8,
                            padding: 8,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Raleway-Regular',
                              fontSize: 12,
                              color: '#6A686B',
                            }}>
                            <Text> {r.name} - </Text>
                            <Text>
                              {acortarComment(40, r.comment)} {}
                            </Text>

                            {r.photo !== '' && (
                              <Icon key="1" name="image" size={15}></Icon>
                            )}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
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
      </View>
    </ScrollView>
  );
}
