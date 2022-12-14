import {
  fileUploadService,
  readService,
  updateService,
  fileUpdateService,
  createService,
} from '../HttpService/HttpService';

export default function useUserServices() {
  return {
    uploadProfileImage: (data: any) => {
      const {directory, entityId, file, extension} = data;
      return fileUploadService(directory, extension, entityId, file);
    },
    updateProfileImage: (data: any) => {
      const {path, file, extension} = data;
      return fileUpdateService(path, file, extension);
    },
    getUserData: () => {
      return readService(`/mentee`);
    },
    updateUserData: (data: any) => {
      return updateService(`/mentee`, {}, data);
    },
    addMentee: (data: any) => {
      const {displayName, email, phone, profileUrl} = data;
      return createService(`/mentee`, data);
    },
    getMyCertificates: (data: any) => {
      const {offSet} = data;
      return readService(`/certificate?offset=${offSet}&limit=10`, data);
    },
  };
}
