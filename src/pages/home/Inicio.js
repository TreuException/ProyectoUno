import React from 'react';
import { Container, Text, Heading, NativeBaseProvider, Center } from 'native-base';
function ContainerComponent() {
  return (
    <Container>
      <Heading>
        A component library for the
        <Heading color="emerald.400">
          React Ecosystem
        </Heading>
      </Heading>
      <Heading pt={4} fontWeight="normal" size="sm">
        NativeBase is a simple, modular and accessible component library that gives you building blocks to build you React applications.
      </Heading>
    </Container>
  );
}

// Example template which wraps component with NativeBaseProvider
export default function () {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ContainerComponent />
      </Center>
    </NativeBaseProvider>
  );
}