import React, {useRef} from 'react';
import {
  Box,
  Text,
  Pressable,
  FlatList,
  Stack,
  Image,
  HStack,
  IconButton,
  Center,
  Spinner,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {
  changePosition,
  deleteSimpson,
  getSimpsons,
  setSelectedSimpson,
} from '../../store/slices/simpsonsSlice';

const Simpsons = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const simpsonsState = useSelector(state => state.simpsons.simpsons);

  const simpsonDetail = item => {
    dispatch(setSelectedSimpson(item));
    navigation.navigate('Details');
  };

  const deleteSimp = index => {
    dispatch(deleteSimpson(index));
  };

  const change = (index, position) => {
    dispatch(changePosition({index: index, position: position}));
  };

  const willMount = useRef(true);
  if (willMount.current) {
    willMount.current = false;
    dispatch(getSimpsons());
  }

  const renderItem = ({item, index}) => (
    <Box p="5" rounded="xl" key={index}>
      <Pressable onPress={() => simpsonDetail(item)}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space={1} alignItems="center">
            <Text>{index + 1}</Text>
            <Image
              source={{
                uri: item.avatar,
              }}
              alt="Simpson"
              size="xs"
              resizeMode={'contain'}
            />
            <Text fontWeight="bold">{item.name}</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            {index > 0 ? (
              <Ionicons
                name="arrow-up-circle-outline"
                onPress={() => change(index, 'up')}
                color="green"
                size={25}
              />
            ) : null}
            {index !== simpsonsState.data.length - 1 ? (
              <Ionicons
                name="arrow-down-circle-outline"
                onPress={() => change(index, 'down')}
                color="red"
                size={25}
              />
            ) : null}
            <Ionicons
              name="trash-outline"
              onPress={() => deleteSimp(index)}
              size={25}
            />
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  const keyExtractor = item => item.id;

  const spinner = (
    <Center flex={1} px="3">
      <Spinner size="lg" color="#f8db27" accessibilityLabel="Loading posts" />
    </Center>
  );

  return (
    <>
      {simpsonsState.loading ? (
        spinner
      ) : (
        <Stack flex={1} padding={2}>
          <FlatList
            data={simpsonsState.data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            refreshing={simpsonsState.loading}
            onRefresh={() => dispatch(getSimpsons())}
          />
          <IconButton
            onPress={() => navigation.navigate('AddNewCharacter')}
            icon={
              <Ionicons name="add-circle-outline" color="#36318B" size={35} />
            }
          />
        </Stack>
      )}
    </>
  );
};

export default Simpsons;
