export const loadFromStorage = async (key, fallback) => {
  try {
    const result = await window.storage.get(key);
    return result?.value ? JSON.parse(result.value) : fallback;
  } catch {
    return fallback;
  }
};

export const saveToStorage = async (key, value) => {
  try {
    await window.storage.set(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save ${key}:`, err);
  }
};
