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
                height: 120,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              source={require('./assets/images/lugares.jpg')}></Image>

            <Text
              style={{
                fontFamily: 'Raleway-Regular',
                fontSize: 28,
                color: '#6A686B',
              }}>
               {props.tipoLugar}
            </Text>
          </View>

      </TouchableOpacity>
    </View>
  );
}
