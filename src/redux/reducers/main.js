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
  READ_ASSESSMENT,
  SUBMIT_ASSESSMENT,
  UPDATE_ASSESSMENT,
  SET_COURSE_ID,
  ADD_TO_CART,
  GET_CART,
  READ_MESSAGES,
  ADD_MESSAGES,
} from '../actions/actionTypes';

const initialState = {
  mainLoading: false,
  courseId: '',
  videoLoading: false,
  sections: [],
  videos: [],
  notes: [],
  descriptions: {},
  reviews: [],
  FAQ: [],
  assessment: {},
  errorMessage: undefined,
  assessmentResult: {},
  messages: {messages: []},
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // RESET data on project change

    case 'SET_COURSE_ID':
      return {
        ...state,
        courseId: payload,
      };

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
        mainLoading: false,
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
        // mainLoading: true,
      };
    case `${READ_NOTES}_FULFILLED`: {
      return {
        ...state,
        // mainLoading: false,
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
        // mainLoading: true,
      };
    case `${READ_REVIEWS}_FULFILLED`: {
      return {
        ...state,
        // mainLoading: false,
        reviews: payload.review,
      };
    }
    case `${READ_REVIEWS}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${READ_ASSESSMENT}_PENDING`:
      return {
        ...state,
        // mainLoading: true,
      };
    case `${READ_ASSESSMENT}_FULFILLED`: {
      return {
        ...state,
        // mainLoading: false,
        assessment: payload,
      };
    }
    case `${READ_ASSESSMENT}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${SUBMIT_ASSESSMENT}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${SUBMIT_ASSESSMENT}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
        assessmentResult: payload,
      };
    }
    case `${SUBMIT_ASSESSMENT}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${UPDATE_ASSESSMENT}_PENDING`:
      return {
        ...state,
        mainLoading: true,
      };
    case `${UPDATE_ASSESSMENT}_FULFILLED`: {
      return {
        ...state,
        mainLoading: false,
        assessmentResult: payload,
      };
    }
    case `${UPDATE_ASSESSMENT}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${READ_FAQ}_PENDING`:
      return {
        ...state,
        // mainLoading: true,
      };
    case `${READ_FAQ}_FULFILLED`: {
      return {
        ...state,
        // mainLoading: false,
        FAQ: payload.faq,
      };
    }
    case `${READ_FAQ}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${ADD_MESSAGES}_PENDING`:
      return {
        ...state,
        // mainLoading: true,
      };
    case `${ADD_MESSAGES}_FULFILLED`: {
      return {
        ...state,
        messages: {
          messages: [],
        },
      };
    }
    case `${ADD_MESSAGES}_REJECTED`:
      return {
        ...state,
        mainLoading: false,
        errorMessage: payload,
      };
    case `${READ_MESSAGES}_PENDING`:
      return {
        ...state,
        // mainLoading: true,
      };
    case `${READ_MESSAGES}_FULFILLED`: {
      return {
        ...state,
        messages: {
          messages: [...state.messages.messages, ...payload.messages],
          count: payload.count,
        },
      };
    }
    case `${READ_MESSAGES}_REJECTED`:
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

    case `${ADD_TO_CART}_PENDING`: {
      return {
        ...state,
      };
    }
    case `${ADD_TO_CART}_FULFILLED`: {
      return {
        ...state,
      };
    }
    case `${ADD_TO_CART}_REJECTED`: {
      return {
        ...state,
        mainLoading: false,
      };
    }

    default:
      return state;
  }
};

// export default reducer;
export default reducer;
