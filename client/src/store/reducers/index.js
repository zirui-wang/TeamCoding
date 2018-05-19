import { combineReducers } from 'redux';

import { reducer as reduxForm } from 'redux-form';
import problemReducer from './problemReducer';

export default combineReducers({
  form: reduxForm,
  problems: problemReducer
});
