import React, {useContext} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';



import AsyncStorage from '../../utils/AsyncStorage';
import styleMain from '../../style/stylemain';
import {AppContext} from '../../utils/Context';

import {ID_TYPE_PLACER} from '../../utils/properties';

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

const Home = ({navigation}) => {
  const context = useContext(AppContext);
  const {dataApp, setDataApp} = context;

  return (
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
          setDataApp({...dataApp, typePlacesSelect: ID_TYPE_PLACER.PLACES});
          navigation.navigate('Places');
        }}>
        <ImageBackground
          source={require('./assets/images/lugares.jpg')}
          style={{width: '100%', height: '100%'}}>
          <View style={styleMain.homeBoxTextCenter}>
            <Text style={styleMain.homeBoxLugaresTexto}>Lugares</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={{width: '100%', height: '30%', paddingBottom: '2%'}}
        onPress={() => {
          //navigation.navigate('Beaches');
          setDataApp({...dataApp, typePlacesSelect: ID_TYPE_PLACER.BEACHES});
          navigation.navigate('Places');
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
          /* ACA EL LINK AL OTRO COMPONENTE */
          setDataApp({...dataApp, typePlacesSelect: 'Bares'});
          navigation.navigate('Places');
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
  );
};

export default Home;
