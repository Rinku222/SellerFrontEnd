const awsConfig = {
    Auth:{
        region: 'ap-south-1',
        userPoolId: 'ap-south-1_dlZ3ivB4O',
        userPoolWebClientId: '7el1v7hft6bdm5dbgbthc3nc3j',
        identityPoolId:'ap-south-1:a9b6cbb6-a7a3-477f-957c-35fda841da25'
    },
    Storage:{
      AWSS3:{
        bucket:'medical-learning-development',
        region:'ap-south-1'
      }
    }
  }
      
  export default awsConfig;
  