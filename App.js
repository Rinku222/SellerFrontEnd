import React from 'react';
import Amplify from 'aws-amplify';
import AppNavigator from './src/navigation';
import awsConfig from './src/config/amplifyConfig/awsConfig';

Amplify.configure(awsConfig);

function App() {
  return <AppNavigator />;
}

export default App;
