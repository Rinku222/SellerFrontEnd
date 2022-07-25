import React, {useEffect, Suspense} from 'react';
import Amplify from 'aws-amplify';
import {Provider as StoreProvider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation';
import awsConfig from './src/config/amplifyConfig/awsConfig';
import {store} from './src/redux/store';
// import {AlertProvider} from './src/components/Alert';

Amplify.configure(awsConfig);

export function Loader() {
  return <Spinner visible textContent="" />;
}

function App() {
  // useEffect(() => {
  // loadData()
  // }, []);

  // const loadData=()={
  //   getNewToken();
  // }

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        {/* <AlertProvider> */}
        <Suspense fallback={<Loader />}>
          <AppNavigator />
        </Suspense>
        {/* </AlertProvider> */}
      </PaperProvider>
    </StoreProvider>
  );

  // return <AppNavigator />;
}

export default App;
