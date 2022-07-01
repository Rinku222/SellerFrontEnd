import {readService} from '../HttpService/HttpService';

export default function useSubscribedCourseServices() {
  return {
    getSubscribedCourses: () => {
      return readService(`/subscription`);
    },
  };
}
