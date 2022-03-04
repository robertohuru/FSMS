import { combineReducers } from "@reduxjs/toolkit";

export const countryReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_COUNTRY":
      return action.payload;
    case "ADD_COUNTRY":
      return state + action.payload;
    default:
      return state;
  }
};

export const regionReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_REGION":
      return action.payload;
    case "ADD_REGION":
      return state + action.payload;
    default:
      return state;
  }
};

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload;
    case "ADD_USER":
      return state + action.payload;
    default:
      return state;
  }
};

export const alertReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALERTS":
      return action.payload;

    default:
      return state;
  }
};

const allReducers = combineReducers({
  user: userReducer,
  country: countryReducer,
  region: regionReducer,
  alerts: alertReducer,
});

export default allReducers;
