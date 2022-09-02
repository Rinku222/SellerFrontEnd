import {Platform} from 'react-native';
import RNFetchBlob, {ReactNativeBlobUtilConfig} from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import * as mime from 'react-native-mime-types';
import {store} from '../../redux/store';
// import {BASE_API_URL} from './constant';

const {DocumentDir, DownloadDir} = RNFetchBlob.fs.dirs;
const DIR = Platform.OS === 'ios' ? DocumentDir : DownloadDir;
const normalizeFilePath = path => (path.startsWith('file://') ? path.slice(7) : path);
export const getFileExtension = fileUrl => {
  // To get the file extension
  const fileExt = /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  return fileExt[0];
};
export function getFileName(file) {
  const {file_name, file_url} = file;
  const split = file_name.split('.');
  const fileName = split[0];
  const fileExt = getFileExtension(file_url);
  return `${fileName}.${fileExt}`;
}
function getFilePath(name) {
  return `${DIR}/${name}`;
}
export async function checkDownloaded(name) {
  const path = getFilePath(name);
  const result = await RNFS.exists(path);
  return result ? path : result;
}
export function getDownloadUrl(file, version) {
  const {id, project_id} = file;
  let url = `files/downloadversoin/${project_id}/current/${id}`;
  if (version) {
    url = `files/downloadversoin/${project_id}/version/${id}`;
  }
  // return `${BASE_API_URL}${url}`;
}
export async function downloadFile(params) {
  const {name, downloadLink: fileUrl, base64: getBase64, data} = params;
  const path = getFilePath(name);
  const {token} = store.getState().user;
  const Authorization = `Bearer ${token}`;
  const downloaded = await checkDownloaded(name);
  if (downloaded) {
    await RNFS.unlink(path);
  }
  const options: ReactNativeBlobUtilConfig = {
    fileCache: true,
    path,
    addAndroidDownloads: {
      path,
      mime: 'application/pdf',
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };
  const REQUEST_TYPE = data ? 'POST' : 'GET';
  return RNFetchBlob.config(options)
    .fetch(REQUEST_TYPE, fileUrl, {Authorization, Accept: '*/*'}, JSON.stringify(data))
    .then(async res => {
      // Alert after successful downloading
      const downloadDir = normalizeFilePath(res.data);
      let base64;
      if (getBase64) {
        const base64Data = await RNFS.readFile(downloadDir, 'base64');
        const mimeType = mime.lookup(name);
        base64 = `data:${mimeType};base64,${base64Data}`;
      }
      return {base64, dir: downloadDir};
    })
    .catch(async error => {
      throw error;
    });
}
export async function downloadPdf(fileUrl) {
  const path = `${DIR}/medical_learning_${new Date().getTime()}.pdf`;
  const options = {
    fileCache: true,
    path,
    addAndroidDownloads: {
      path,
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };
  return RNFetchBlob.config(options)
    .fetch('GET', fileUrl)
    .then(async res => {
      console.log('-------->res', res);
    })
    .catch(async error => {
      console.log('-----> error', error);
    });
}
