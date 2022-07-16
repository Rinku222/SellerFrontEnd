import {useDispatch} from 'react-redux';
import {Auth} from 'aws-amplify';
import * as types from './actionTypes';
import useUserServices from '../../services/User';

export default function useUserActions() {
  const dispatch = useDispatch();

  const {uploadProfileImage} = useUserServices();

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
            // user.signInUserSession.idToken.jwtToken
            console.log('----->payload called');
            // return Promise.resolve(response);
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
            console.log('----->result', result);
          } catch (error) {
            console.log('----->error in UPLOAD_IMAGE action', error);
          }
        },
      }),
  };
}
