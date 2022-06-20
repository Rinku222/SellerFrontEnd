import {useDispatch} from 'react-redux';
// import {useResProcessor} from 'hooks/useResponseProcessor';
import * as types from './actionTypes';
import useHomeServices from '../../services/Home';

export default function useSalesActions() {
  const dispatch = useDispatch();
  // const {_err, _res} = useResProcessor();
  const {getAllCourses} = useHomeServices();

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
  };
}
