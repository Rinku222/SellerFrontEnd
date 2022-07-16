import {fileUploadService} from '../HttpService/HttpService';

export default function useUserServices() {
  return {
    uploadProfileImage: data => {
      const {directory, entityId, file, extension} = data;

      console.log('----->data in services', data);

      return fileUploadService(directory, extension, entityId, file);
    },
  };
}
