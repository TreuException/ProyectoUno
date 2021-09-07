import React, {useState} from 'react';
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

export default function PlacesComments() {
  const [imageUri, setImageUri] = useState();

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

  return (
    <View>
      <Text> COMENTARIOS !! </Text>

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
