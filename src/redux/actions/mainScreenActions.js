import {useDispatch} from 'react-redux';
import * as types from './actionTypes';
import useMainServices from '../../services/Main';

export default function useMainScreenActions() {
  const dispatch = useDispatch();
  const {getSections, getVideos, getDescriptions, addNote, readNotes, deleteNote, updateNote} =
    useMainServices();

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
            console.log('----->params in get getDescriptions', params);
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
            console.log('----->params in get getDescriptions', params);
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
            console.log('----->params in get getDescriptions', params);
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
            console.log('----->params in get getDescriptions', params);
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
            console.log('----->params in get getDescriptions', params);
            const response = await updateNote(params);
            const {data} = response;

            return Promise.resolve(data);
          } catch (error) {
            console.log('----->error in reducer', error);
          }
        },
      }),
  };
}
