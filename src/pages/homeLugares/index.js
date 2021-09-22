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
    setLoading(true);

    getListType(dataApp)
      .then(data => {
        setDataTypePlaces(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Api call error');
        setLoading(false);
      });
  }, []);

  const clickNavegation = (tipo, tipoLugar) => {
    //alert('hola en el padre ' + tipo);

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

    navigation.navigate('Places', {tipoLugar: tipoLugar});
  };

  return (
    <ScrollView
      style={{
        //backgroundColor: '#ffff',
        backgroundColor: '#1C70E2',
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
          <Text
            style={{
              fontFamily: 'Raleway-Regular',
              fontSize: 45,
              color: '#F0F5FB',
            }}>
            Explora nuestros sitios
          </Text>

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <ActivityIndicator visible={loading} color="#00ff00" textContent={'Loading...'} />
            </View>
          ) : (
            <View>
              <View>
                {dataTypePlaces.map(r => (
                  <BoxLugares
                    key={r.id}
                    tipoLugar={r.name}
                    tipoLugarId={r.id}
                    clickNavegation={clickNavegation}></BoxLugares>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
