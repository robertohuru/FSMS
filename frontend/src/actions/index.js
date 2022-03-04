export const fetchUser = (nr) => {
  return { type: "FETCH_USER", payload: nr };
};

export const addUser = (nr) => {
  return { type: "ADD_USER", payload: nr };
};

export const fetchCountry = (nr) => {
  return { type: "FETCH_COUNTRY", payload: nr };
};

export const addCountry = (nr) => {
  return { type: "ADD_COUNTRY", payload: nr };
};

export const fetchRegion = (nr) => {
  return { type: "FETCH_REGION", payload: nr };
};

export const addRegion = (nr) => {
  return { type: "ADD_REGION", payload: nr };
};

export const fetchAlerts = (nr) => {
  return { type: "FETCH_ALERTS", payload: nr };
};
