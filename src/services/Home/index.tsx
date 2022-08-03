import {createService, readService, deleteService} from '../HttpService/HttpService';

export default function useHomeServices() {
  return {
    getAllCourses: data => {
      const {offset, limit, searchText = '', streamId = ''} = data;

      return readService(
        `/mentee/course?offset=${offset}&limit=${limit}&searchText=${searchText}&streamId=${streamId}`,
      );
    },
    getCart: data => {
      return readService(`/userCart?offset=0&limit=100`);
    },
    deleteCartCourse: data => {
      const {userCartId} = data;
      return deleteService(`/userCart?userCartId=${userCartId}`);
    },
  };
}
