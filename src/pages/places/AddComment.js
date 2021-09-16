import React, {useState, useContext} from 'react';
import {Text, View, Button, TextInput, Modal, Pressable} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {AppContext} from '../../utils/Context';
import {apiProperties} from '../../utils/properties';

export default function AddComment({navigation}) {
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
    subirData.append('photo', {
      type: 'image/jpg',
      uri: imageUri,
      name: 'updateimagentmp.jpg',
    });

    fetch(apiProperties.urlBase + apiProperties.endPoint.saveNewComments, {
      method: 'POST',
      body: subirData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data === true) {
          //console.log("Estoy en el comentario")
          //navigation.navigate('PlacesComments');

          setModalVisible(true)
          
        }
      });
  };

  return (
    <View>

        
<Modal visible={modalVisible} animationType={"slide"}>
  <View style={{ flex: 1 }}>
    <Text>Hello!</Text>
    <Button title="Click To Close Modal" onPress = {() => {  
        alert(modalVisible)
                  setModalVisible(false) }}/>  
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

              setImageUri(response.assets[0].uri);
            },
          )
        }
        title={'subir foto'}
      />

      <Button onPress={() => subirComentario()} title={'Comenta0r'} />
    </View>
  );
}
