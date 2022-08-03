import {useDispatch} from 'react-redux';
import * as types from './actionTypes';
import useMainServices from '../../services/Main';

export default function useMainScreenActions() {
  const dispatch = useDispatch();
  const {
    getSections,
    getVideos,
    getDescriptions,
    addNote,
    readNotes,
    deleteNote,
    updateNote,
    addRecentVideo,
    readReviews,
    addReview,
    readFAQ,
    readAssessment,
    submitAssessment,
    updateAssessment,
    addToCart,
  } = useMainServices();

  return {
    getSections: params =>
      dispatch({
        type: types.GET_SECTIONS,
        payload: async () => {
          try {
            const response = await getSections(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    getVideos: params =>
      dispatch({
        type: types.GET_VIDEOS,
        payload: async () => {
          try {
            const response = await getVideos(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    getDescriptions: params =>
      dispatch({
        type: types.GET_DESCRIPTIONS,
        payload: async () => {
          try {
            const response = await getDescriptions(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    addNote: params =>
      dispatch({
        type: types.ADD_NOTE,
        payload: async () => {
          try {
            const response = await addNote(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    readNotes: params =>
      dispatch({
        type: types.READ_NOTES,
        payload: async () => {
          try {
            const response = await readNotes(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    deleteNote: params =>
      dispatch({
        type: types.DELETE_NOTE,
        payload: async () => {
          try {
            const response = await deleteNote(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    updateNote: params =>
      dispatch({
        type: types.UPDATE_NOTE,
        payload: async () => {
          try {
            const response = await updateNote(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    addRecentVideo: params =>
      dispatch({
        type: types.ADD_RECENT_VIDEO,
        payload: async () => {
          try {
            const response = await addRecentVideo(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    readReviews: params =>
      dispatch({
        type: types.READ_REVIEWS,
        payload: async () => {
          try {
            const response = await readReviews(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    addReview: params =>
      dispatch({
        type: types.ADD_REVIEW,
        payload: async () => {
          try {
            const response = await addReview(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    readFAQ: params =>
      dispatch({
        type: types.READ_FAQ,
        payload: async () => {
          try {
            const response = await readFAQ(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    readAssessment: params =>
      dispatch({
        type: types.READ_ASSESSMENT,
        payload: async () => {
          try {
            const response = await readAssessment(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    submitAssessment: params =>
      dispatch({
        type: types.SUBMIT_ASSESSMENT,
        payload: async () => {
          try {
            const response = await submitAssessment(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    updateAssessment: params =>
      dispatch({
        type: types.SUBMIT_ASSESSMENT,
        payload: async () => {
          try {
            const response = await updateAssessment(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    addToCart: params =>
      dispatch({
        type: types.ADD_TO_CART,
        payload: async () => {
          try {
            const response = await addToCart(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
    setCourseId: params => {
      console.log('----->params in setcourse', params);
      const {courseId} = params;
      dispatch({
        type: types.SET_COURSE_ID,
        payload: courseId,
      });
    },
  };
}
