import React from 'react';

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {marginBottom} from 'styled-system';
import {backgroundColor, marginRight, position} from 'styled-system';

const Bienvenida = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1C70E2',
        flexDirection: 'row',
      }}>
      <View
        style={{
          marginLeft: '10%',
          marginTop: '50%',
        }}>
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            fontSize: 56,
            color: '#F0F5FB',
          }}>
          Bienvenido !!
        </Text>
        <Text
          style={{
            fontFamily: 'Roboto-regular',
            fontSize: 18,
            color: '#F0F5FB',
          }}>
          Busca y comenta los lugares que conoces...
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Homelugares')}>
          <View
            style={{
              width: 200,
              backgroundColor: '#122E55',
              borderRadius: 12,
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Roboto-regular',
                fontSize: 18,
                padding: 10,
                color: '#F0F5FB',
              }}>
              Entrar...
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Bienvenida;
