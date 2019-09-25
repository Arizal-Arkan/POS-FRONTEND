import {combineReducers} from 'redux';

import login from './login';
import product from './product'
import history from './history'
import transaction from './transaction'

const appReducer = combineReducers({
  login,
  product,
  history,
  transaction
});

export default appReducer;