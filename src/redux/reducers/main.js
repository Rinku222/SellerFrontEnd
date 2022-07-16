import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  GET_SECTIONS,
  GET_VIDEOS,
  GET_DESCRIPTIONS,
  ADD_NOTE,
  READ_NOTES,
  DELETE_NOTE,
  UPDATE_NOTE,
  ADD_RECENT_VIDEO,
  READ_REVIEWS,
  ADD_REVIEW,
  READ_FAQ,
} from '../actions/actionTypes';

const initialState = {
  mainLoading: false,
  videoLoading: false,
  sections: [],
  videos: [],
  notes: [],
  descriptions: {},
  reviews: [],
  FAQ: [],
  errorMessage: undefined,
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // RESET data on project change

    case `${GET_SECTIONS}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${GET_SECTIONS}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
        sections: payload.section,
      };
    }
    case `${GET_SECTIONS}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${GET_VIDEOS}_PENDING`:
      return {
        ...state,
        videoLoading: true,
      };
    case `${GET_VIDEOS}_FULFILLED`: {
      return {
        ...state,
        videoLoading: false,
        videos: payload.video,
      };
    }
    case `${GET_VIDEOS}_REJECTED`:
      return {
        ...state,
        videoLoading: false,
        errorMessage: payload,
      };
    case `${GET_DESCRIPTIONS}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${GET_DESCRIPTIONS}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
        descriptions: payload,
      };
    }
    case `${GET_DESCRIPTIONS}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${READ_NOTES}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${READ_NOTES}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
        notes: payload.stickynote,
      };
    }
    case `${READ_NOTES}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${READ_REVIEWS}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${READ_REVIEWS}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
        reviews: payload.review,
      };
    }
    case `${READ_REVIEWS}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${READ_FAQ}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${READ_FAQ}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
        FAQ: payload.faq,
      };
    }
    case `${READ_FAQ}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${ADD_NOTE}_PENDING`:
    case `${UPDATE_NOTE}_PENDING`:
    case `${ADD_REVIEW}_PENDING`:
    case `${ADD_RECENT_VIDEO}_PENDING`:
    case `${DELETE_NOTE}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${ADD_NOTE}_FULFILLED`:
    case `${UPDATE_NOTE}_FULFILLED`:
    case `${ADD_REVIEW}_FULFILLED`:
    case `${ADD_RECENT_VIDEO}_FULFILLED`:
    case `${DELETE_NOTE}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
      };
    }
    case `${ADD_NOTE}_REJECTED`:
    case `${UPDATE_NOTE}_REJECTED`:
    case `${ADD_REVIEW}_REJECTED`:
    case `${ADD_RECENT_VIDEO}_REJECTED`:
    case `${DELETE_NOTE}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

// export default reducer;
export default reducer;
