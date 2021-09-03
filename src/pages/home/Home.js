import React from 'react';
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

import AsyncStorage from '../../utils/AsyncStorage';
import styleMain from '../../style/stylemain';

import DataAplicacionContext from '../../utils/Context';

import Box from './Box';

const guardaData = async () => {
  try {
    const obj = {
      hola: 1,
    };
    await AsyncStorage.setItem('holakey', obj);
    alert('guarado');
  } catch (e) {
    alert('error: ' + e);
  }
};

const verData = async () => {
  try {
    const item = await AsyncStorage.getItem('holakey');
    alert(item.hola);
  } catch (e) {
    alert('error: ' + e);
  }
};

export default ({navigation}) => (
  <DataAplicacionContext.Consumer>
    {value => (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
        }}>
        <TouchableOpacity
          style={{width: '100%', height: '30%', paddingBottom: '2%'}}
          onPress={() => {
            navigation.navigate('Places');
          }}>
          <ImageBackground
            source={require('./assets/images/lugares.jpg')}
            style={{width: '100%', height: '100%'}}>
            <View style={styleMain.homeBoxTextCenter}>
              <Text style={styleMain.homeBoxLugaresTexto}> {value.hola} Lugares</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: '100%', height: '30%', paddingBottom: '2%'}}
          onPress={() => {
            navigation.navigate('Beaches');
          }}>
          <ImageBackground
            source={require('./assets/images/playa.jpg')}
            style={{width: '100%', height: '100%'}}>
            <View style={styleMain.homeBoxTextCenter}>
              <Text style={styleMain.homeBoxPlayasTexto}>Playas</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: '100%', height: '30%', paddingBottom: '2%'}}
          onPress={() => {
            alert('BARES');
          }}>
          <ImageBackground
            source={require('./assets/images/bares.jpg')}
            style={{width: '100%', height: '100%'}}>
            <View style={styleMain.homeBoxTextCenter}>
              <Text style={styleMain.homeBoxBaresTexto}>Bares</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )}
  </DataAplicacionContext.Consumer>
);
