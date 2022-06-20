import {GET_WISHLIST, ADD_WISHLIST, DELETE_WISHLIST} from '../actions/actionTypes';

const initialState = {
  wishlistLoading: false,
  wishlist: [],
  errorMessage: undefined,
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // Get Wishlist Array
    case `${GET_WISHLIST}_PENDING`:
      return {
        ...state,
        wishlistLoading: true,
      };
    case `${GET_WISHLIST}_FULFILLED`: {
      return {
        ...state,
        wishlistLoading: false,
        wishlist: payload.wishlist,
      };
    }
    case `${GET_WISHLIST}_REJECTED`:
      return {
        ...state,
        wishlistLoading: false,
        errorMessage: payload,
      };

    // Add to Wishlist
    case `${ADD_WISHLIST}_PENDING`:
      return {
        ...state,
        wishlistLoading: true,
      };
    case `${ADD_WISHLIST}_FULFILLED`: {
      return {
        ...state,
        wishlistLoading: false,
      };
    }
    case `${ADD_WISHLIST}_REJECTED`:
      return {
        ...state,
        wishlistLoading: false,
        errorMessage: payload,
      };

    // Delete from Wishlist
    case `${DELETE_WISHLIST}_PENDING`:
      return {
        ...state,
        wishlistLoading: true,
      };
    case `${DELETE_WISHLIST}_FULFILLED`: {
      return {
        ...state,
        wishlistLoading: false,
      };
    }
    case `${DELETE_WISHLIST}_REJECTED`:
      return {
        ...state,
        wishlistLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
