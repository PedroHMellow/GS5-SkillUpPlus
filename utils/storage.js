const storage = {
  data: {},
  getItem: (key) => storage.data[key] || null,
  setItem: (key, value) => { storage.data[key] = value; },
  removeItem: (key) => { delete storage.data[key]; }
};

export default storage;