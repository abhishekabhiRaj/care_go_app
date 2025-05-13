import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useHideHeader = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
};

export default useHideHeader;