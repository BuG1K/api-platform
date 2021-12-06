import { combineReducers as createCombineReducers } from 'redux';

import auth from './auth';
import records from './records';

const combineReducers = createCombineReducers({ auth, records });

export type StateType = ReturnType<typeof combineReducers>

export default combineReducers;
