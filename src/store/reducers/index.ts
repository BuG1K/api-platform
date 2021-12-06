import { combineReducers as createCombineReducers } from 'redux';

import auth from './auth';

const combineReducers = createCombineReducers({ auth });

export type StateType = ReturnType<typeof combineReducers>

export default combineReducers;
