import {readService, createService, deleteService} from '../HttpService/HttpService';

export default function useMainServices() {
  return {
    getSections: data => {
      const {courseId, limit, offset} = data;

      return readService(`/section?courseId=${courseId}&offset=${offset}&limit=${limit}`);
    },
    getVideos: data => {
      const {sectionId, limit, courseId, offset} = data;

      return readService(
        `/video?sectionId=${sectionId}&offset=${offset}&limit=${limit}&courseId=${courseId}`,
      );
    },
    getDescriptions: data => {
      const {limit, courseId, offset} = data;
      return readService(`/course?offset=${offset}&limit=${limit}&courseId=${courseId}`);
    },
    addNote: data => {
      const {stickyTitle, description, videoId} = data;
      return createService(`/stickynote`, {stickyTitle, description, videoId});
    },
    readNotes: data => {
      const {limit, offset, videoId} = data;
      return readService(`/stickynote?videoId=${videoId}&offset=${offset}&limit=${limit}`);
    },
    deleteNote: data => {
      const {stickynoteId} = data;
      return deleteService(`/stickynote?stickynoteId=${stickynoteId}`);
    },
    updateNote: data => {
      const {stickynoteId,stickyTitle,description,videoId} = data;
      return deleteService(`/stickynote?stickynoteId=${stickynoteId}`,{stickyTitle, description, videoId});
    },
  };
}
