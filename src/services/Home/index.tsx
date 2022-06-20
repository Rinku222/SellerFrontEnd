import {createService, readService} from '../HttpService/HttpService';

export default function useHomeServices() {
  return {
    getAllCourses: data => {
      return readService(`/course?offset=${data.offset}&limit=${data.limit}`);
    },
  };
}
