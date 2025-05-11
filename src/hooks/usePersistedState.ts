import { useEffect, useState } from 'react';
import { getStorage } from '../utils/storage.utils';

export function usePersistedState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const getStoredValue = async () => {
      const result = await getStorage<T>(key);
      if (result) setValue(result);
    };
    getStoredValue();
  }, [key]);

  return [value, setValue];
}
