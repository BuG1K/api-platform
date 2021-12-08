import { handleActions } from 'redux-actions';

import { RecordsActionTypes } from '../constants';

interface Record {
  id: string
  name: string
  body: string
  error: boolean
}

type StateType = Record[]

const reduser = handleActions<StateType>(
  {
    [RecordsActionTypes.ADD_RECORD]: (state, { payload }: any) => {
      const record: Record = {
        id: new Date().valueOf().toString(),
        name: payload.name,
        body: payload.body,
        error: payload.error,
      };
      const newState = [record, ...state];

      if (newState.length > 20) newState.pop();

      return newState;
    },
    [RecordsActionTypes.DELETE_RECORD]: (state, { payload }: any) =>
      state.filter(({ id }) => id !== payload.id),
    [RecordsActionTypes.DELETE_ALL_RECORDS]: () => [],
  },
  [],
);

export default reduser;
