import { useEffect, useState } from 'react';
import { getStorage, setStorage } from '../utils/storage.utils';

export function usePersistedState<T>(key: string, defaultValue: T): [data: T, (data: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const getStoredValue = async () => {
      const result = await getStorage<T>(key);
      if (result) setValue(result);
    };
    getStoredValue();
  }, [key]);

  useEffect(() => {
    const seStorageValue = async () => {
      console.log(value);
      await setStorage(key, value);
    };
    seStorageValue();
  }, [value, key]);

  return [value, setValue];
}
