import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  GET_USER_DETAILS,
  UPLOAD_IMAGE,
  GET_USER_DATA,
  UPDATE_USER_DATA,
} from '../actions/actionTypes';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  userLoading: false,
  userData: {},
  errorMessage: undefined,
  user: {},
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // RESET data on project change

    case `${GET_USER_DETAILS}_PENDING`:
      return {
        ...state,
        userLoading: true,
      };
    case `${GET_USER_DETAILS}_FULFILLED`: {
      return {
        ...state,
        userLoading: false,
        userData: payload,
      };
    }
    case `${GET_USER_DETAILS}_REJECTED`:
      return {
        ...state,
        userLoading: false,
        errorMessage: payload,
      };
    case `${UPLOAD_IMAGE}_PENDING`:
    case `${UPDATE_USER_DATA}_PENDING`:
      return {
        ...state,
        userLoading: true,
      };
    case `${UPLOAD_IMAGE}_FULFILLED`:
    case `${UPDATE_USER_DATA}_FULFILLED`: {
      return {
        ...state,
        userLoading: false,
      };
    }
    case `${UPLOAD_IMAGE}_REJECTED`:
    case `${UPDATE_USER_DATA}_REJECTED`:
      return {
        ...state,
        userLoading: false,
        errorMessage: payload,
      };
    case `${GET_USER_DATA}_PENDING`:
      return {
        ...state,
        userLoading: true,
      };
    case `${GET_USER_DATA}_FULFILLED`: {
      return {
        ...state,
        user: payload,
        userLoading: false,
      };
    }
    case `${GET_USER_DATA}_REJECTED`:
      return {
        ...state,
        userLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
