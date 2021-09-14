import React, {useState, useContext} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {AppContext} from '../../utils/Context';

export default function PlacesComments() {
  const [imageUri, setImageUri] = useState();

  const context = useContext(AppContext);
  const {dataApp, setDataApp} = context;

  const [name, setName] = useState();
  const [commentario, setComentario] = useState();

  const updatePhotoServer = image_uri => {
    let subirData = new FormData();
    subirData.append('idPlaces', '1');
    subirData.append('name', 'Ricardo');
    subirData.append('comment', 'estes es un comentario');
    subirData.append('valor1', '1');
    subirData.append('photo', {
      type: 'image/jpg',
      uri: image_uri,
      name: 'updateimagentmp.jpg',
    });

    fetch('http://192.168.0.9:7612/formulario', {
      method: 'POST',
      body: subirData,
    });
  };

  const subirComentario = () => {
    console.log(name);
    console.log(commentario);
    console.log(imageUri);

    let subirData = new FormData();
    subirData.append('idPlaces', dataApp.placeSelect);
    subirData.append('name', name);
    subirData.append('comment', commentario);
    subirData.append('photo', {
      type: 'image/jpg',
      uri: imageUri,
      name: 'updateimagentmp.jpg',
    });

    fetch('http://192.168.0.6:7612/formulario', {
      method: 'POST',
      body: subirData,
    });

  };

  return (
    <View>
      <Text> COMENTARIOS !! </Text>

      <Text> ID TIPO: {dataApp.typePlacesSelect} </Text>
      <Text> ID LUGAR: {dataApp.placeSelect} </Text>

      <View>
        <TextInput
          onChangeText={setName}
          value={Text}
          placeholder="Ingresa tu nombre"
          keyboardType="text"
        />

        <TextInput
          onChangeText={setComentario}
          value={Text}
          placeholder="Ingresa tu comentario"
          keyboardType="text"
        />

        <Button
          onPress={() =>
            launchCamera(
              {cameraType: 'back', mediaType: 'photo', saveToPhotos: true},
              response => {
                if (response.didCancel) {
                  return;
                }
                if (!response.assets[0].uri) {
                  return;
                }
                console.log(response.assets[0]);
                console.log(response.assets[0].data);
                setImageUri(response.assets[0].uri);
                updatePhotoServer(response.assets[0].uri);
              },
            )
          }
          title={'subir foto'}
        />

        <Button onPress={() => subirComentario()} title={'Comenta0r'} />
      </View>

      <TouchableOpacity
        onPress={() =>
          launchCamera(
            {cameraType: 'back', mediaType: 'photo', saveToPhotos: true},
            response => {
              if (response.didCancel) {
                return;
              }
              if (!response.assets[0].uri) {
                return;
              }
              console.log(response.assets[0]);
              console.log(response.assets[0].data);
              setImageUri(response.assets[0].uri);
              updatePhotoServer(response.assets[0].uri);
            },
          )
        }
        style={{
          backgroundColor: 'white',
          width: 130,
          padding: 10,
          margin: 15,
          borderRadius: 5,
        }}>
        <Text style={{textAlign: 'center'}}>Usar cámara</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          launchImageLibrary({mediaType: 'photo'}, response => {
            if (response.didCancel) {
              return;
            }
            if (!response.assets[0].uri) {
              return;
            }
            setImageUri(response.assets[0].uri);
          })
        }
        style={{
          backgroundColor: 'white',
          width: 130,
          padding: 10,
          margin: 15,
          borderRadius: 5,
        }}>
        <Text style={{textAlign: 'center'}}>Usar Galeria</Text>
      </TouchableOpacity>
    </View>
  );
}
