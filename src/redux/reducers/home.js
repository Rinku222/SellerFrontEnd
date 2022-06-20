import {GET_HOME_COURSES} from '../actions/actionTypes';

const initialState = {
  homeLoading: false,
  allCourses: [],
  errorMessage: undefined,
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // RESET data on project change

    case `${GET_HOME_COURSES}_PENDING`:
      return {
        ...state,
        homeLoading: true,
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

    default:
      return state;
  }
};

export default reducer;
