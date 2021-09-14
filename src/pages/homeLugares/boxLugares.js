import React from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function boxLugares(props) {
  return (
    <View
      style={{
        marginTop: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          props.clickNavegation(props.tipoLugarId);
        }}>
        <Image style={{
            width: "100%",
            borderTopLeftRadius:8,
            borderTopRightRadius: 8
        }} source={require('./assets/images/lugares.jpg')}></Image>

        <View style={{
            backgroundColor: '#122E55',
        }} >
          <Text
            style={{
              textAlign: 'center',
              color: '#F0F5FB',
              fontFamily: 'Roboto-regular',
              fontSize: 18,
              padding: 10,
            }}>
            Ver {props.tipoLugar}...
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
