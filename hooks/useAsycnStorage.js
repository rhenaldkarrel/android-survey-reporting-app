import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMyAsyncStorage = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const setItem = (key, value) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  const getItem = async (key) => {
    try {
      const value = JSON.parse((await AsyncStorage.getItem(key)) || '{}');
      setValue(value);
      return value;
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = (key) => {
    AsyncStorage.removeItem(key);
    setValue(null);
  };

  return {value, setItem, getItem, removeItem};
};