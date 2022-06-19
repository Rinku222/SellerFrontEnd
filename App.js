import React, {Suspense} from 'react';
import Amplify from 'aws-amplify';
import {Provider as StoreProvider} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AppNavigator from './src/navigation';
import awsConfig from './src/config/amplifyConfig/awsConfig';

import {store} from './src/redux/store';

Amplify.configure(awsConfig);

export function Loader() {
  return <Spinner visible textContent="" />;
}

function App() {
  return (
    <StoreProvider store={store}>
      <Suspense fallback={<Loader />}>
        <AppNavigator />
      </Suspense>
    </StoreProvider>
  );
}

export default App;
