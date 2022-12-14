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
      const {courseId, videoId} = data;

      return createService(`/video/recent`, {courseId, videoId});
    },
    getDescriptions: data => {
      const {limit, courseId, offset} = data;
      return readService(`/course?offset=${offset}&limit=${limit}&courseId=${courseId}`);
    },
    getUpcomingVideo: data => {
      const {sectionId, courseId, videoId} = data;
      return readService(`/video/upcoming?courseId=${courseId}&sectionId=${sectionId}&videoId=${videoId}`);
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
      const {courseId, reviewDescription, rating} = data;
      return createService(`/review`, {reviewDescription, courseId, rating});
    },
    readFAQ: data => {
      const {courseId, offSet, limit} = data;
      return readService(`/faq?courseId=${courseId}&offset=${offSet}&limit=${limit}`);
    },
    setVideoTime: data => {
      const {courseId, sectionId, videoId, duration} = data;
      return createService(`/video/history`, {courseId, videoId, duration, sectionId});
    },
    readAssessment: data => {
      const {courseId, sectionId} = data;
      return readService(`/assessment?courseId=${courseId}&sectionId=${sectionId}`);
    },
    readMessages: data => {
      const {courseId, offSet, limit} = data;
      return readService(`/chat?offset=${offSet}&limit=10&courseId=${courseId}`);
    },
    addMessage: data => {
      const {courseId, message} = data;
      return createService(`/chat?offset=0&limit=10&courseId=${courseId}`, {message, courseId});
    },
    addToCart: data => {
      const {courseId} = data;
      return createService(`/userCart`, {courseId});
    },

    submitAssessment: data => {
      const {questions, assessmentId} = data;
      const newArray = questions.map((item, index) => {
        const picked = (({questionId, optionId}) => ({questionId, optionId}))(item);
        return picked;
      });

      return createService(`/assessment/answer`, {questions: newArray, assessmentId});
    },
    updateAssessment: data => {
      const {questions, assessmentId, sessionId} = data;
      const newArray = questions.map((item, index) => {
        const picked = (({questionId, optionId}) => ({questionId, optionId}))(item);
        return picked;
      });

      return updateService(
        `/assessment/answer?sessionId=${sessionId}`,
        {},
        {
          questions: newArray,
          assessmentId,
        },
      );
    },
  };
}
