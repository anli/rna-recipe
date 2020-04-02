import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const App = () => {
  const {data} = useApp();

  return (
    <>
      <View>
        <Text>Test</Text>
        {data?.map(({id, title}) => (
          <Text key={id}>{title}</Text>
        ))}
      </View>
    </>
  );
};

export default App;

interface Recipe {
  id: string;
  title: string;
}

const useApp = () => {
  const [data, setData] = useState<Recipe[] | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('recipes')
      .onSnapshot(querySnapshot => {
        const mappedData = querySnapshot.docs.map(documentSnapshot => {
          const recipe: Recipe = {
            title: documentSnapshot.data().title,
            id: documentSnapshot.id,
          };

          return recipe;
        });

        setData(mappedData);
      });

    /* istanbul ignore next */
    return () => unsubscribe();
  }, []);

  return {data};
};
