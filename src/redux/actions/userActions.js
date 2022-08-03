import {useDispatch} from 'react-redux';
import {Auth} from 'aws-amplify';
import * as types from './actionTypes';
import useUserServices from '../../services/User';

export default function useUserActions() {
  const dispatch = useDispatch();

  const {uploadProfileImage, getUserData, updateUserData, updateProfileImage} = useUserServices();

  return {
    getUserDetails: params =>
      dispatch({
        type: types.GET_USER_DETAILS,
        payload: async () => {
          try {
            const {emailPhoneForLogin, passwordForLogin} = params;
            const response = await Auth.signIn(emailPhoneForLogin, passwordForLogin);

            return Promise.resolve(response);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    getNewToken: params =>
      dispatch({
        type: types.GET_NEW_TOKEN,
        payload: async () => {
          try {
            console.log('----->payload called');
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    uploadProfileImage: params =>
      dispatch({
        type: types.UPLOAD_IMAGE,
        payload: async () => {
          try {
            const result = await uploadProfileImage(params);
            return result.key;
          } catch (error) {
            console.log('----->error in UPLOAD_IMAGE action', error);
          }
        },
      }),
    updateProfileImage: params =>
      dispatch({
        type: types.UPDATE_IMAGE,
        payload: async () => {
          try {
            const result = await updateProfileImage(params);
            console.log('----->result.key', result.key);
            return result.key;
          } catch (error) {
            console.log('----->error in UPLOAD_IMAGE action', error);
          }
        },
      }),
    getUserData: () =>
      dispatch({
        type: types.GET_USER_DATA,
        payload: async () => {
          try {
            const result = await getUserData();
            return result.data;
          } catch (error) {
            console.log('----->error in UPLOAD_IMAGE action', error);
          }
        },
      }),
    updateUserData: params =>
      dispatch({
        type: types.UPDATE_USER_DATA,
        payload: async () => {
          try {
            const result = await updateUserData(params);
            return result.data;
          } catch (error) {
            console.log('----->error in UPLOAD_IMAGE action', error);
          }
        },
      }),
  };
}
