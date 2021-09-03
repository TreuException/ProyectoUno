import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import styleMain from '../../style/stylemain';

const Box = () => {
  return (
    <View style={styleMain.homebox}>
      <Text style={styleMain.homeBoxTitle}>Titulo</Text>

      <View>
        <Text style={styleMain.homeBoxBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          efficitur, lacus nec semper laoreet.
        </Text>
      </View>
    </View>
  );
};

export default Box;
