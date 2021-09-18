import React, {useState, useContext} from 'react';
import {
  PermissionsAndroid,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';



import * as ImagePicker from "react-native-image-picker"

import {AppContext} from '../../utils/Context';
import {apiProperties} from '../../utils/properties';

export default function AddComment({route, navigation}) {
  const {dataPlace} = route.params;

  const [name, setName] = useState();
  const [commentario, setComentario] = useState();
  const [imageUri, setImageUri] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const {dataApp, setDataApp} = useContext(AppContext);

  console.log(navigation);

  /** subir comentario */
  const subirComentario = () => {
    console.log(name);
    console.log(commentario);
    console.log(imageUri);

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
      async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log("RESULTADO");
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
    <View>
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

      <TextInput
        onChangeText={setName}
        value={Text}
        placeholder="Ingresa tu nombre"
        keyboardType="text"
      />

      <TextInput
        multiline={true}
        numberOfLines={4}
        onChangeText={setComentario}
        value={Text}
        placeholder="Ingresa tu comentario"
        keyboardType="text"
      />

      <Button
        onPress={requestCameraPermission}
        title={'subir foto'}
      />

      <Button onPress={() => subirComentario()} title={'Comentar'} />
    </View>
  );
}
