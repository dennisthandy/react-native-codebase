import { useEffect, useState } from 'react';
import { getStorage, setStorage } from '../utils/storage.utils';

type UsePersistedStateReturn<T> = [data: T, (data: T) => void, boolean];

export function usePersistedState<T>(key: string, defaultValue: T): UsePersistedStateReturn<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStoredValue = async () => {
      await getStorage<T>(key, {
        onSuccess: result => {
          if (result) setValue(result);
        },
        onError: () => setValue(defaultValue),
      });
      setIsLoading(false);
    };
    getStoredValue();
  }, [defaultValue, key]);

  useEffect(() => {
    const seStorageValue = async () => {
      await setStorage(key, value);
    };
    if (!isLoading) {
      seStorageValue();
    }
  }, [value, key, isLoading]);

  return [value, setValue, isLoading];
}
