import {fileUploadService, readService, updateService} from '../HttpService/HttpService';

export default function useUserServices() {
  return {
    uploadProfileImage: data => {
      const {directory, entityId, file, extension} = data;

      return fileUploadService(directory, extension, entityId, file);
    },
    getUserData: () => {
      return readService(`/mentee`);
    },
    updateUserData: data => {
      return updateService(`/mentee`, {}, data);
    },
  };
}
