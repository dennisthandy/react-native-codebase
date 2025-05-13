import * as SecureStore from 'expo-secure-store';
import { ALL_STORAGE_KEYS } from '../constants/storage.constants';

export async function setStorage(
  key: string,
  value: unknown,
  options?: SecureStore.SecureStoreOptions & CallbackFn,
) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value), options);
    if (options?.onSuccess) options.onSuccess();
  } catch (error) {
    if (options?.onError) options.onError(error);
  }
}

export async function getStorage<T>(
  key: string,
  options?: SecureStore.SecureStoreOptions & CallbackFn<T>,
) {
  try {
    const result = await SecureStore.getItemAsync(key);
    const saved = (result ? JSON.parse(result) : '') as T;
    if (options?.onSuccess) options.onSuccess(saved);
    return saved;
  } catch (error) {
    if (options?.onError) options.onError(error);
    return '' as T;
  }
}

export async function removeStorage(
  key: string,
  options?: SecureStore.SecureStoreOptions & CallbackFn,
) {
  try {
    await SecureStore.deleteItemAsync(key);
    if (options?.onSuccess) options.onSuccess();
  } catch (error) {
    if (options?.onError) options.onError(error);
  }
}

export async function clearAllStorage(options?: SecureStore.SecureStoreOptions & CallbackFn) {
  try {
    for (const key of ALL_STORAGE_KEYS) {
      await SecureStore.deleteItemAsync(key);
    }
    if (options?.onSuccess) options.onSuccess();
  } catch (error) {
    if (options?.onError) options.onError(error);
  }
}
