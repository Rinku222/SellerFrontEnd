import React from 'react';
import SnackbarContext from './SnackBarContext';

const useSnackbar = () => React.useContext(SnackbarContext);
export default useSnackbar;
