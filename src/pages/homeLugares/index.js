import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';

import {ID_TYPE_PLACER} from '../../utils/properties';

import BoxLugares from './boxLugares';

import {getListType} from '../../utils/ApiCalls';
import {AppContext} from '../../utils/Context';

export default function index({navigation}) {
  const context = useContext(AppContext);
  const {dataApp, setDataApp} = context;

  const [loading, setLoading] = useState(false);

  const [dataTypePlaces, setDataTypePlaces] = useState([]);

  useEffect(() => {
    console.log('se inicia');
    setLoading(true);

    getListType(dataApp)
      .then(data => {
        console.log(data);
        setDataTypePlaces(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Api call error');
        setLoading(false);
      });
  }, []);

  const clickNavegation = tipo => {
    alert('hola en el padre ' + tipo);

    switch (tipo) {
      case ID_TYPE_PLACER.PLACES:
        setDataApp({...dataApp, typePlacesSelect: ID_TYPE_PLACER.PLACES});
        break;
      case ID_TYPE_PLACER.BEACHES:
        setDataApp({...dataApp, typePlacesSelect: ID_TYPE_PLACER.BEACHES});
        break;

      case ID_TYPE_PLACER.RESTAURANT:
        setDataApp({...dataApp, typePlacesSelect: ID_TYPE_PLACER.RESTAURANT});
        break;
        
      default:
        setDataApp({...dataApp, typePlacesSelect: ID_TYPE_PLACER.ERROR});
        break;
    }

    navigation.navigate('Places');
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#ffff',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center',
      }}>
      <View
        style={{
          margin: '5%',
        }}>
        <View>
          {loading ? (
            <ActivityIndicator visible={loading} textContent={'Loading...'} />
          ) : (
            <View>
              <Text
                style={{
                  fontFamily: 'Roboto-regular',
                  fontSize: 40,
                  color: '#122E55',
                }}>
                Tipos de lugares{' '}
              </Text>

              {dataTypePlaces.map(r => (
                <BoxLugares
                  key={r.id}
                  tipoLugar={r.name}
                  tipoLugarId={r.id}
                  clickNavegation={clickNavegation}></BoxLugares>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
