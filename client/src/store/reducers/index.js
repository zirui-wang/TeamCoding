import { combineReducers } from 'redux';

import problemReducer from './problemReducer';

export default combineReducers({
  problems: problemReducer
});
