import {readService} from '../HttpService/HttpService';

export function useSearchServices() {
  return {
    getAllCourseCategories: data => {
      return readService(`/courseCatagory?offset=${data.offset}&limit=${data.limit}`);
    },
  };
}
