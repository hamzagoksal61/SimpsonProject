import React from 'react';
import {Text, Image, Center, Stack, ScrollView} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';

const Detail = () => {
  const simpsonsState = useSelector(state => state.simpsons.selectedSimpson);


  return (
    <ScrollView>
      <Stack
        space={2}
        justifyContent="center"
        alignItems="center"
        flex={1}
        padding={3}>
        <Image
          source={{
            uri: simpsonsState.avatar,
          }}
          alt="Alternate Text"
          size="2xl"
          resizeMode={'contain'}
        />
        <Text fontWeight="bold" fontSize={20}>
          {simpsonsState.name}
        </Text>
        <Text color="gray.400" fontSize={18}>
          {simpsonsState.job}
        </Text>
        <Text color="gray.400" fontSize={14}>
          {simpsonsState.description}
        </Text>
      </Stack>
    </ScrollView>
  );
};

export default Detail;
