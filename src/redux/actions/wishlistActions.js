import {useDispatch} from 'react-redux';
// import {useResProcessor} from 'hooks/useResponseProcessor';
import * as types from './actionTypes';
import useWishlistServices from '../../services/Wishlist';

export default function useWishlistActions() {
  const dispatch = useDispatch();
  // const {_err, _res} = useResProcessor();
  const {getWishlist, addWishlist, deleteWishlist} = useWishlistServices();

  return {
    getWishlist: () =>
      dispatch({
        type: types.GET_WISHLIST,
        payload: async () => {
          try {
            const response = await getWishlist();
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    addWishlist: params =>
      dispatch({
        type: types.ADD_WISHLIST,
        payload: async () => {
          try {
            const response = await addWishlist(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    deleteWishlist: params =>
      dispatch({
        type: types.DELETE_WISHLIST,
        payload: async () => {
          try {
            const response = await deleteWishlist(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
  };
}
