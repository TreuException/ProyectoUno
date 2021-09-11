import React from 'react';
import {
  SimpleGrid,
  MoonIcon,
  SunIcon,
  CheckIcon,
  CircleIcon,
  ArrowBackIcon,
  AddIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  SmallCloseIcon,
  HamburgerIcon,
  InfoIcon,
  InfoOutlineIcon,
  MinusIcon,
  QuestionIcon,
  QuestionOutlineIcon,
  SearchIcon,
  WarningIcon,
  WarningTwoIcon,
  Center,
  NativeBaseProvider,
} from 'native-base';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

export const Example = () => {
  const icons = [
    <AddIcon />,
    <ArrowBackIcon />,
    <ArrowForwardIcon />,
    <ArrowUpIcon />,
    <ArrowDownIcon />,
    <CheckIcon />,
    <CheckCircleIcon />,
    <ChevronDownIcon />,
    <ChevronLeftIcon />,
    <ChevronRightIcon />,
    <ChevronUpIcon />,
    <CircleIcon />,
    <CloseIcon />,
    <SmallCloseIcon />,
    <HamburgerIcon />,
    <InfoIcon />,
    <InfoOutlineIcon />,
    <MinusIcon />,
    <MoonIcon />,
    <QuestionIcon />,
    <QuestionOutlineIcon />,
    <SearchIcon />,
    <SunIcon />,
    <WarningIcon />,
    <WarningTwoIcon />,
  ];
  return (
    // @ts-ignore
    <SimpleGrid
      columns={{
        base: 4,
        md: 9,
      }}
      space={8}>
      {icons}
    </SimpleGrid>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Example />
        <Icon
          key="1"
          name="comments"
          size={45} >
        </Icon>
        
      </Center>
    </NativeBaseProvider>
  );
};
