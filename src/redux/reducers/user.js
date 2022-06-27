import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {GET_USER_DETAILS} from '../actions/actionTypes';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  userLoading: false,
  userData: {},
  errorMessage: undefined,
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

    default:
      return state;
  }
};

// export default reducer;
export default persistReducer(persistConfig, reducer);
