import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { storage } from './storage';

/** useState that mirrors its value into localStorage. `initial` wins over storage when `override` is given. */
export function usePersistedState<T>(key: string, initial: T, override?: T | null): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => (override != null ? override : storage.get<T>(key, initial)));
  useEffect(() => { storage.set(key, value); }, [key, value]);
  return [value, setValue];
}
