import React from 'react';
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
} from 'native-base';

const Inicio = () {
    return (
        <NativeBaseProvider>
          <Box
            bg="primary.600"
            py={4}
            px={3}
            rounded="md"
            alignSelf="center"
            width={375}
            maxWidth="100%">
    
                <Text> HOLA MUNDO </Text>
            </Box>
        </NativeBaseProvider>
      );
}

export default Inicio;
