import {createService, readService, deleteService} from '../HttpService/HttpService';

export default function useWishlistServices() {
  return {
    getWishlist: () => {
      return readService(`/wishlist`);
    },
    addWishlist: params => {
      return createService(`/wishlist?courseId=${params.courseId}`);
    },
    deleteWishlist: params => {
      return deleteService(`/wishlist?courseId=${params.courseId}`);
    },
  };
}
