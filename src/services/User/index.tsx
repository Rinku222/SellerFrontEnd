import {
  fileUploadService,
  readService,
  updateService,
  fileUpdateService,
} from '../HttpService/HttpService';

export default function useUserServices() {
  return {
    uploadProfileImage: (data: any) => {
      const {directory, entityId, file, extension} = data;
      return fileUploadService(directory, extension, entityId, file);
    },
    updateProfileImage: (data: any) => {
      const {path, file, extension} = data;
      console.log('----->path', path);
      console.log('----->file', file);
      console.log('----->extension', extension);
      return fileUpdateService(path, file, extension);
    },
    getUserData: () => {
      return readService(`/mentee`);
    },
    updateUserData: (data: any) => {
      return updateService(`/mentee`, {}, data);
    },
  };
}
