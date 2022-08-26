import {
  GET_HOME_COURSES,
  GET_ALL_SUBSCRIBED_COURSES,
  GET_CART,
  DELETE_CART_COURSE,
} from '../actions/actionTypes';

const initialState = {
  homeLoading: false,
  allCourses: [],
  subscribedCourses: [],
  errorMessage: undefined,
  cart: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // RESET data on project change

    case `${GET_HOME_COURSES}_PENDING`:
      return {
        ...state,
        // homeLoading: true,
      };
    case `${GET_HOME_COURSES}_FULFILLED`: {
      return {
        ...state,
        homeLoading: false,
        allCourses: payload.course,
      };
    }
    case `${GET_HOME_COURSES}_REJECTED`:
      return {
        ...state,
        homeLoading: false,
        errorMessage: payload,
      };
    case `${DELETE_CART_COURSE}_PENDING`:
      return {
        ...state,
        // homeLoading: true,
      };
    case `${DELETE_CART_COURSE}_FULFILLED`: {
      return {
        ...state,
        // homeLoading: false,
        // allCourses: payload.course,
      };
    }
    case `${DELETE_CART_COURSE}_REJECTED`:
      return {
        ...state,
        homeLoading: false,
        errorMessage: payload,
      };

    case `${GET_ALL_SUBSCRIBED_COURSES}_PENDING`:
      return {
        ...state,
        homeLoading: true,
      };
    case `${GET_ALL_SUBSCRIBED_COURSES}_FULFILLED`: {
      return {
        ...state,
        homeLoading: false,
        subscribedCourses: payload.subscription,
      };
    }
    case `${GET_ALL_SUBSCRIBED_COURSES}_REJECTED`:
      return {
        ...state,
        homeLoading: false,
        errorMessage: payload,
      };

    case `${GET_CART}_PENDING`:
      return {
        ...state,
        // mainLoading: true,
      };
    case `${GET_CART}_FULFILLED`: {
      return {
        ...state,
        // mainLoading: false,
        cart: payload.userCart,
      };
    }
    case `${GET_CART}_REJECTED`:
      return {
        ...state,
        homeLoading: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default reducer;
