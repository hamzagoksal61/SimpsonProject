import React, {useState} from 'react';
import {
  FormControl,
  VStack,
  Input,
  Button,
  TextArea,
  useToast,
  KeyboardAvoidingView,
  Center,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {addSimpson} from '../../store/slices/simpsonsSlice';
import {AddValidator} from '../../validation/addValidation';

const AddNewCharacter = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const [formData, setData] = useState({
    name: '',
    avatar: '',
    job: '',
    description: '',
  });

  const save = () => {
    const asArray = Object.entries(AddValidator(formData));
    const errorFields = asArray.filter(([key, value]) => value === true);
    if (errorFields.length === 0) {
      dispatch(addSimpson(formData));
      toast.show({
        description: 'Başarıyla eklendi',
      });
      navigation.navigate('Simpsons');
    } else {
      toast.show({
        description: 'Zorunlu alanları doldurunuz.',
      });
    }
  };

  return (
    <Center flex={1} px="3">
      <KeyboardAvoidingView
        h={{
          base: '400px',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <VStack space={3}>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Name Surname
            </FormControl.Label>
            <Input
              placeholder="Name Surname"
              onChangeText={value => setData({...formData, name: value})}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Job Title
            </FormControl.Label>
            <Input
              placeholder="Job Title"
              onChangeText={value => setData({...formData, job: value})}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              About Him/Her
            </FormControl.Label>
            <TextArea
              placeholder="About Him/Her"
              onChangeText={value => setData({...formData, description: value})}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Image Link
            </FormControl.Label>
            <Input
              placeholder="Image Link"
              onChangeText={value => setData({...formData, avatar: value})}
            />
          </FormControl>

          <Button width="100%" onPress={() => save()}>
            Add Character
          </Button>
        </VStack>
      </KeyboardAvoidingView>
      ; };
    </Center>
  );
};

export default AddNewCharacter;
