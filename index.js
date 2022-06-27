/**
 * @format
 */

import {AppRegistry} from 'react-native';

import React, {Suspense} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {name as appName} from './app.json';
import App from './App';

import {store} from './src/redux/store';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

// export function Loader() {
//   return <Spinner visible textContent="" />;
// }

// function Index() {
//   return (
//     <StoreProvider store={store}>
//       <Suspense fallback={<Loader />}>
//         <App />
//       </Suspense>
//     </StoreProvider>
//   );
// }

// AppRegistry.registerComponent(appName, () => Index);
AppRegistry.registerComponent(appName, () => App);
