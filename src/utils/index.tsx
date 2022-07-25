import {Auth} from 'aws-amplify';

export function getShadow(depth: number) {
  return {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Math.floor(depth / 2),
    },
    shadowOpacity: depth * 0.02416,
    shadowRadius: (depth * 2) / 3,
    elevation: depth,
  };
}

export const getIdentityId = async () => {
  return Auth.currentUserCredentials().then(res => {
    return res.identityId;
  });
};

const s3BaseUrl = 'https://s3.ap-south-1.amazonaws.com/';
