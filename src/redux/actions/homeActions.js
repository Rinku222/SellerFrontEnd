import {useDispatch} from 'react-redux';
// import {useResProcessor} from 'hooks/useResponseProcessor';
import * as types from './actionTypes';
import useHomeServices from '../../services/Home';
import useSubscribedCourseServices from '../../services/SubsribedCourses';

export default function useSalesActions() {
  const dispatch = useDispatch();
  // const {_err, _res} = useResProcessor();
  const {getAllCourses, getCart, deleteCartCourse} = useHomeServices();
  const {getSubscribedCourses} = useSubscribedCourseServices();

  return {
    getHomeCourses: params =>
      dispatch({
        type: types.GET_HOME_COURSES,
        payload: async () => {
          try {
            const response = await getAllCourses(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    getCart: params =>
      dispatch({
        type: types.GET_CART,
        payload: async () => {
          try {
            const response = await getCart(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    deleteCartCourse: params =>
      dispatch({
        type: types.DELETE_CART_COURSE,
        payload: async () => {
          try {
            const response = await deleteCartCourse(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    getAllSubscribedCourses: () =>
      dispatch({
        type: types.GET_ALL_SUBSCRIBED_COURSES,
        payload: async () => {
          try {
            const response = await getSubscribedCourses();
            const {data} = response;
            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
  };
}
