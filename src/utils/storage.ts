const storage = window.localStorage;

export const setItem = <T>(key: string, value: T) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const getItem = <T>(key: string, defaultReturnValue: T) => {
  try {
    const storedValue = storage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : defaultReturnValue;
  } catch (e) {
    return defaultReturnValue;
  }
};

export const removeItem = (key: string) => {
  storage.removeItem(key);
};
