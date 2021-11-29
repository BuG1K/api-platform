import {
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import { Dispatch } from 'redux';

import { ActionsAuth } from './actions';
import { StateType } from './reducers';

type Actions = ActionsAuth

export const useDispatch = () => useReduxDispatch<Dispatch<Actions>>();
export const useSelector: TypedUseSelectorHook<StateType> = useReduxSelector;
