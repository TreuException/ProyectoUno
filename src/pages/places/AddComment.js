import React, {useState, useContext, useEffect} from 'react';
import {
  PermissionsAndroid,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

import {AppContext} from '../../utils/Context';
import {apiProperties} from '../../utils/properties';

export default function AddComment({route, navigation}) {
  const {dataPlace} = route.params;

  const [name, setName] = useState();
  const [commentario, setComentario] = useState();
  const [imageUri, setImageUri] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const {dataApp, setDataApp} = useContext(AppContext);

  const [errorNombre, setErrorNombre] = useState(false);
  const [errorComentario, setErrorComentario] = useState(false);

  const [loading, setLoading] = useState(false);

  /** subir comentario */
  const subirComentario = () => {
    console.log(name);
    console.log(commentario);
    console.log(imageUri);

    let errores = false;

    if (name === undefined || name.trim() === '') {
      errores = true;
      setErrorNombre(true);
    } else {
      setErrorNombre(false);
    }

    if (commentario === undefined || commentario.trim() === '') {
      errores = true;
      setErrorComentario(true);
    } else {
      setErrorComentario(false);
    }

    // Se termina, no se puede seguir por errores.
    if (errores == true) {
      return;
    }

    setLoading(true);
    console.log('Siguiendo... ');
    
    let subirData = new FormData();
    subirData.append('idPlaces', dataApp.placeSelect);
    subirData.append('name', name);
    subirData.append('comment', commentario);

    if (imageUri !== undefined) {
      subirData.append('photo', {
        type: 'image/jpg',
        uri: imageUri,
        name: 'photo.jpg',
      });
    }

    fetch(apiProperties.urlBase + apiProperties.endPoint.saveNewComments, {
      method: 'POST',
      body: subirData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data === true) {
          setLoading(false);
          console.log('Estoy en el comentario');
          //navigation.navigate('PlacesComments');
          navigation.navigate('PlacesComments', {dataPlace: dataPlace});

          //setModalVisible(true)
        }
      });
      
  };

  const cameraLaunch = () => {
    ImagePicker.launchCamera(
      {
        includeBase64: false,
        mediaType: 'photo',
        quality: 0.3,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log('RESULTADO');
          console.log(response);
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        cameraLaunch();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#1C70E2',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center',
      }}>
      <Modal visible={modalVisible} animationType={'slide'}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
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
        <Text
          style={{
            fontFamily: 'Raleway-Regular',
            fontSize: 45,
            color: '#F0F5FB',
          }}>
          Comentar
        </Text>

        <View
          style={{
            backgroundColor: '#ffff',
            width: '100%',
            borderRadius: 8,
            padding: 10,
            marginTop: 10,
          }}>
          <TextInput
            style={{
              fontFamily: 'Raleway-Regular',
              backgroundColor: '#EEF3F6',
              marginTop: 10,
              borderRadius: 2,
              padding: 5,
            }}
            onChangeText={setName}
            value={Text}
            placeholder="Ingresa tu nombre"
            keyboardType="text"
          />

          {errorNombre && <Text>No puede ser vacio el nombre </Text>}

          <TextInput
            style={{
              fontFamily: 'Raleway-Regular',
              backgroundColor: '#EEF3F6',
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 2,
              padding: 5,
            }}
            multiline={true}
            numberOfLines={4}
            onChangeText={setComentario}
            value={Text}
            placeholder="Ingresa tu comentario"
            keyboardType="text"
          />

          {errorComentario && <Text>No puede ser vacio el comentario </Text>}

          <TouchableOpacity onPress={requestCameraPermission}>
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
                Subir imagen
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => subirComentario()}>
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
                <Text>Comentar {}</Text>

                {loading && (
                  <ActivityIndicator
                    visible={loading}
                    color="#00ff00"
                    textContent={'Loading...'}
                  />
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
