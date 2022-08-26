// GET_ALL_COURSE_CATEGORY

import {GET_ALL_COURSE_CATEGORY, GET_ALL_SEARCHED_COURSES} from '../actions/actionTypes';

const initialState = {
  searchLoading: false,
  courseCatagory: [],
  searchedCourses: [],
  count: 0,
  errorMessage: undefined,
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // RESET data on project change

    case `${GET_ALL_COURSE_CATEGORY}_PENDING`:
      return {
        ...state,
        searchLoading: true,
      };
    case `${GET_ALL_COURSE_CATEGORY}_FULFILLED`: {
      return {
        ...state,
        searchLoading: false,
        courseCatagory: payload.courseCatagory,
        count: payload.count,
      };
    }
    case `${GET_ALL_COURSE_CATEGORY}_REJECTED`:
      return {
        ...state,
        searchLoading: false,
        errorMessage: payload,
      };

    case `${GET_ALL_SEARCHED_COURSES}_PENDING`:
      return {
        ...state,
        searchLoading: true,
      };
    case `${GET_ALL_SEARCHED_COURSES}_FULFILLED`: {
      return {
        ...state,
        // searchLoading: false,
        searchedCourses: payload,
        count: payload.count,
      };
    }
    case `${GET_ALL_SEARCHED_COURSES}_REJECTED`:
      return {
        ...state,
        // searchLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
