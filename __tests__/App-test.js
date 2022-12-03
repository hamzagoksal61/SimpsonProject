import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';
import reducer, {
  addSimpson,
  changePosition,
  deleteSimpson,
} from '../src/store/slices/simpsonsSlice';
import AddNewCharacter from '../src/screens/addNewCharacter';
import Simpsons from '../src/screens/simpsons';
import Detail from '../src/screens/detail';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

test('should return the initial state', () => {
  expect(reducer(undefined, {type: undefined})).toEqual({
    simpsons: {
      data: [],
      loading: false,
    },
    selectedSimpson: {},
  });
});

test('should handle a simpson being added to an empty list', () => {
  const previousState = {
    simpsons: {
      data: [],
      loading: false,
    },
    selectedSimpson: {},
  };

  expect(
    reducer(
      previousState,
      addSimpson({
        name: 'Homer Simpson',
        avatar:
          'https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest/scale-to-width-down/300?cb=20201222215437',
        job: 'Nuclear Safety Inspector',
        description:
          "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson. Homer is overweight (said to be ~240 pounds), lazy, and often ignorant to the world around him. Although Homer has many flaws, he has shown to have great caring, love, and even bravery to those he cares about and, sometimes, even others he doesn't. He also serves as the main protagonist of the The Simpsons Movie. He is 39 years old and was born in 1956.",
      }),
    ),
  ).toEqual({
    simpsons: {
      data: [
        {
          id: 1,
          name: 'Homer Simpson',
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest/scale-to-width-down/300?cb=20201222215437',
          job: 'Nuclear Safety Inspector',
          description:
            "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson. Homer is overweight (said to be ~240 pounds), lazy, and often ignorant to the world around him. Although Homer has many flaws, he has shown to have great caring, love, and even bravery to those he cares about and, sometimes, even others he doesn't. He also serves as the main protagonist of the The Simpsons Movie. He is 39 years old and was born in 1956.",
        },
      ],
      loading: false,
    },
    selectedSimpson: {},
  });
});

test('should handle a simpson being deleted to a list', () => {
  const previousState = {
    simpsons: {
      data: [
        {
          id: 1,
          name: 'Homer Simpson',
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest/scale-to-width-down/300?cb=20201222215437',
          job: 'Nuclear Safety Inspector',
          description:
            "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson. Homer is overweight (said to be ~240 pounds), lazy, and often ignorant to the world around him. Although Homer has many flaws, he has shown to have great caring, love, and even bravery to those he cares about and, sometimes, even others he doesn't. He also serves as the main protagonist of the The Simpsons Movie. He is 39 years old and was born in 1956.",
        },
      ],
      loading: false,
    },
    selectedSimpson: {},
  };

  expect(reducer(previousState, deleteSimpson(0))).toEqual({
    simpsons: {
      data: [],
      loading: false,
    },
    selectedSimpson: {},
  });
});

test('should handle a simpson being moved to up', () => {
  const previousState = {
    simpsons: {
      data: [
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/d/d5/Lisa_Simpson_official.png/revision/latest/scale-to-width-down/247?cb=20190409004811',
          description:
            'Lisa Marie Simpson (born May 9) is the elder daughter and middle child of the Simpson family and one of the two tritagonists (along with Marge,) of The Simpsons series.',
          id: '35',
          job: 'Student',
          name: 'Lisa Simpson',
        },
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest/scale-to-width-down/300?cb=20201222215318',
          description:
            "Marjorie Jacqueline 'Marge' Simpson (née Bouvier; born October 2nd) is the homemaker and matriarch of the Simpson family. She is also one of the five main characters in The Simpsons TV series. Marge is 36 years of age. She and her husband Homer have three children: Bart, Lisa, and Maggie. Marge is the moralistic force in her family and often provides a grounding voice in the midst of her family's antics by trying to maintain order in the Simpson household. Aside from her duties at home, Marge has flirted briefly with a number of careers ranging from a police officer to an anti-violence activist.",
          id: '33',
          job: 'Housewife',
          name: 'Marge Simpson',
        },
      ],
      loading: false,
    },
    selectedSimpson: {},
  };

  expect(
    reducer(previousState, changePosition({index: 1, position: 'up'})),
  ).toEqual({
    simpsons: {
      data: [
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest/scale-to-width-down/300?cb=20201222215318',
          description:
            "Marjorie Jacqueline 'Marge' Simpson (née Bouvier; born October 2nd) is the homemaker and matriarch of the Simpson family. She is also one of the five main characters in The Simpsons TV series. Marge is 36 years of age. She and her husband Homer have three children: Bart, Lisa, and Maggie. Marge is the moralistic force in her family and often provides a grounding voice in the midst of her family's antics by trying to maintain order in the Simpson household. Aside from her duties at home, Marge has flirted briefly with a number of careers ranging from a police officer to an anti-violence activist.",
          id: '33',
          job: 'Housewife',
          name: 'Marge Simpson',
        },
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/d/d5/Lisa_Simpson_official.png/revision/latest/scale-to-width-down/247?cb=20190409004811',
          description:
            'Lisa Marie Simpson (born May 9) is the elder daughter and middle child of the Simpson family and one of the two tritagonists (along with Marge,) of The Simpsons series.',
          id: '35',
          job: 'Student',
          name: 'Lisa Simpson',
        },
      ],
      loading: false,
    },
    selectedSimpson: {},
  });
});

test('should handle a simpson being moved to down', () => {
  const previousState = {
    simpsons: {
      data: [
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/d/d5/Lisa_Simpson_official.png/revision/latest/scale-to-width-down/247?cb=20190409004811',
          description:
            'Lisa Marie Simpson (born May 9) is the elder daughter and middle child of the Simpson family and one of the two tritagonists (along with Marge,) of The Simpsons series.',
          id: '35',
          job: 'Student',
          name: 'Lisa Simpson',
        },
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest/scale-to-width-down/300?cb=20201222215318',
          description:
            "Marjorie Jacqueline 'Marge' Simpson (née Bouvier; born October 2nd) is the homemaker and matriarch of the Simpson family. She is also one of the five main characters in The Simpsons TV series. Marge is 36 years of age. She and her husband Homer have three children: Bart, Lisa, and Maggie. Marge is the moralistic force in her family and often provides a grounding voice in the midst of her family's antics by trying to maintain order in the Simpson household. Aside from her duties at home, Marge has flirted briefly with a number of careers ranging from a police officer to an anti-violence activist.",
          id: '33',
          job: 'Housewife',
          name: 'Marge Simpson',
        },
      ],
      loading: false,
    },
    selectedSimpson: {},
  };

  expect(
    reducer(previousState, changePosition({index: 0, position: 'down'})),
  ).toEqual({
    simpsons: {
      data: [
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest/scale-to-width-down/300?cb=20201222215318',
          description:
            "Marjorie Jacqueline 'Marge' Simpson (née Bouvier; born October 2nd) is the homemaker and matriarch of the Simpson family. She is also one of the five main characters in The Simpsons TV series. Marge is 36 years of age. She and her husband Homer have three children: Bart, Lisa, and Maggie. Marge is the moralistic force in her family and often provides a grounding voice in the midst of her family's antics by trying to maintain order in the Simpson household. Aside from her duties at home, Marge has flirted briefly with a number of careers ranging from a police officer to an anti-violence activist.",
          id: '33',
          job: 'Housewife',
          name: 'Marge Simpson',
        },
        {
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/d/d5/Lisa_Simpson_official.png/revision/latest/scale-to-width-down/247?cb=20190409004811',
          description:
            'Lisa Marie Simpson (born May 9) is the elder daughter and middle child of the Simpson family and one of the two tritagonists (along with Marge,) of The Simpsons series.',
          id: '35',
          job: 'Student',
          name: 'Lisa Simpson',
        },
      ],
      loading: false,
    },
    selectedSimpson: {},
  });
});

it('renders correctly', () => {
  const tree = render(
    <App>
      <AddNewCharacter />
    </App>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('AddNewCharacter', () => {
  it('should render successfully', () => {
    const {container} = render(
      <App>
        <AddNewCharacter />
      </App>,
    );
    expect(container).toBeTruthy();
  });
});

describe('Simpsons', () => {
  it('should render successfully', () => {
    const {container} = render(
      <App>
        <Simpsons />
      </App>,
    );
    expect(container).toBeTruthy();
  });
});

describe('Detail', () => {
  it('should render successfully', () => {
    const {container} = render(
      <App>
        <Detail />
      </App>,
    );
    expect(container).toBeTruthy();
  });
});
