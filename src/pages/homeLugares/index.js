import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import BoxLugares from './boxLugares';

export default function index({navigation}) {
  const clickNavegation = (tipo) => {
    alert('hola en el padre '+ tipo);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#ffff',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center'
      }}>

      <View style={{
        margin: "5%"
      }}>
        <Text style={{
           fontFamily: 'Roboto-regular',
           fontSize: 40,
           color: '#122E55',
        }}>Tipos de lugares </Text>

        <BoxLugares
          tipoLugar="playa"
          clickNavegation={clickNavegation}></BoxLugares>

<BoxLugares
          tipoLugar="playa"
          clickNavegation={clickNavegation}></BoxLugares>
          
      
      </View>
    </ScrollView>
  );
}
