import {readService, createService, deleteService, updateService} from '../HttpService/HttpService';

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
    addRecentVideo: data => {
      const {courseId, videoId, sectionId} = data;

      return createService(`/video/recent`, {courseId, videoId, sectionId});
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
      const {stickynoteId, stickyTitle, description, videoId} = data;
      return deleteService(`/stickynote?stickynoteId=${stickynoteId}`, {
        stickyTitle,
        description,
        videoId,
      });
    },
    readReviews: data => {
      const {courseId, offSet, limit} = data;
      return readService(`/review?courseId=${courseId}&offset=${offSet}&limit=${limit}`);
    },
    addReview: data => {
      const {courseId, reviewDescription} = data;
      return createService(`/review`, {reviewDescription, courseId});
    },
    readFAQ: data => {
      const {courseId, offSet, limit} = data;
      return readService(`/faq?courseId=${courseId}&offset=${offSet}&limit=${limit}`);
    },
    setVideoTime: data => {
      const {courseId, videoId, duration} = data;
      console.log('----->data', data);
      const sectionId = '62b43d5009b03c0009d4bb1e';
      return createService(`/video/history`, {courseId, videoId, duration, sectionId});
    },
  };
}
