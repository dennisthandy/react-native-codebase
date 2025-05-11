import * as SecureStore from 'expo-secure-store';

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
  options?: SecureStore.SecureStoreOptions & CallbackFn,
) {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (options?.onSuccess) options.onSuccess(result);
    return result as T;
  } catch (error) {
    if (options?.onError) options.onError(error);
    return '';
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
