import axios from 'axios';
import {Auth, Storage} from 'aws-amplify';
import {useState} from 'react';

export const Authorization =
  'eyJraWQiOiJ3UkpDblNTM2lTTTVNQTE4c0Z3bG9BT0FQTUpQelBsWitQR3hxM1ZOcU1VPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2NWZiZDZiZi03MDA1LTRkNDQtOWMyYy04ZTI5Mzg0MTIyODIiLCJkZXZpY2Vfa2V5IjoiYXAtc291dGgtMV8yMzJmZmFhMS02Yjk0LTQ5ZDQtOWU3NS0xNzY4YWM2YmJkMDgiLCJjb2duaXRvOmdyb3VwcyI6WyJtZW50ZWVzIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfZGxaM2l2QjRPIiwiY2xpZW50X2lkIjoiN2VsMXY3aGZ0NmJkbTVkYmdidGhjM25jM2oiLCJvcmlnaW5fanRpIjoiMGM3NmE4MGQtYjI5OC00ZDdkLTg3NmMtZjcyNzBlYjE1ZWVhIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1NTM2OTk5MSwiZXhwIjoxNjU1MzczNTkxLCJpYXQiOjE2NTUzNjk5OTEsImp0aSI6ImZhNDhlNmJjLTM1MTItNGEzYS05ODUzLWZmYWI4OGVhYjRlYiIsInVzZXJuYW1lIjoicmVhY3RkZXZlbG9wZXI1ODBAZ21haWwuY29tIn0.CqrfPYf_FOGpQMQcqGhBO2I1-VTNltenb8xwpxan4qF1TW2CDv2VViTQxWId9M1PynQnc8Yyhb5W7tDiO0pQ1o6KuZanSyIgGki4tO44_85ivjSSDEl7uTpLd-fMpa5Yq5rac-S4E8ATATNbCUjwV2XQNJWyqc-CeQHogAWnw95sD_bKHSyAIj3OW5H9wRxl5cdkMOcp1K8Vrqnw10C7qedkxJCpOXyhnGzGSBARj8fCbYkH7WF0_QD5ZyuEMlNtOn_PXme3_Y6VbjnNPiuue6J_MB5VklItvPP4B2g2Nfeys_01HiRbV0daIVpEhuPJzGU_gsJ_X38E2m0PcmFLyA';

const baseUrl = 'https://l3ent3l321.execute-api.ap-south-1.amazonaws.com/Stage';

axios.interceptors.request.use(
  async config => {
    const res = await Auth.currentSession();

    const accessToken = res.getIdToken();
    const jwt = accessToken.getJwtToken();

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: jwt,
      },
    };
  },
  error => Promise.reject(error),
);

export async function createService(endpoint: string, body = {}, params = {}) {
  return axios
    .post(baseUrl + endpoint, body, params)
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(`create data error is${JSON.stringify(error)}`);
      if (error.response) {
        console.log(error.response);
        console.log('server responded');
        return error.response;
      }
    });
}

export async function readService(endpoint: string, params = {}) {
  return axios
    .get(baseUrl + endpoint, params)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export async function updateService(endpoint: string, params = {}, body: object) {
  return axios
    .put(baseUrl + endpoint, body, params)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export async function deleteService(endpoint: string, params = {}) {
  return axios
    .delete(baseUrl + endpoint, params)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export async function fileUploadService(
  directory: string,
  extension: string,
  entityId: string,
  file: any,
) {
  const response = await fetch(file);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    try {
      Storage.put(`${directory}/${entityId}/${entityId}.${extension}`, blob, {
        level: 'private',
        contentType: `image/${extension}`,
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
}
