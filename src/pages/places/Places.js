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

export default function Places({ navigation }) {
  return (
    <View>
      <TouchableOpacity 
       onPress={() => {
          navigation.navigate('PlacesComments');
        }}>
          <Text> places comments</Text>
      </TouchableOpacity>
     

    </View>
  );
}
