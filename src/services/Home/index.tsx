import {createService, readService} from '../HttpService/HttpService';

export default function useHomeServices() {
  return {
    getAllCourses: data => {
      const {offset, limit, searchText = '', streamId = ''} = data;

      return readService(
        `/course?offset=${offset}&limit=${limit}&searchText=${searchText}&streamId=${streamId}`,
      );
    },
  };
}
