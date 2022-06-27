import {useDispatch} from 'react-redux';
import * as types from './actionTypes';
import useHomeServices from '../../services/Home';
import {useSearchServices} from '../../services/Search';

export default function useSearchActions() {
  const dispatch = useDispatch();
  const {getAllCourseCategories} = useSearchServices();
  const {getAllCourses} = useHomeServices();

  return {
    getAllCourseCategories: params =>
      dispatch({
        type: types.GET_ALL_COURSE_CATEGORY,
        payload: async () => {
          try {
            const response = await getAllCourseCategories(params);
            const {data} = response;
            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    getAllSearchedCourses: params =>
      dispatch({
        type: types.GET_ALL_SEARCHED_COURSES,
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
