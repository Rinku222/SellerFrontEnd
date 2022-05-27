import React from "react";
import AppNavigator from "./src/navigation";
import Amplify from 'aws-amplify';
import awsConfig from './src/config/amplifyConfig/awsConfig';
Amplify.configure(awsConfig);

function App() {
  return <AppNavigator />;
}

export default App;
