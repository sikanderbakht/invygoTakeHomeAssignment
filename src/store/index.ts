import appReducer from './rootReducer';

import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: appReducer,
  middleware: [thunk],
});
