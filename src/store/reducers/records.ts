import { handleActions } from 'redux-actions';

import { RecordsActionTypes } from '../constants';

interface Record {
  id: string
  name: string
  value: string
  error: boolean
}

type StateType = Record[]

const reduser = handleActions<StateType>(
  {
    [RecordsActionTypes.ADD_RECORD]: (state, { payload }: any) => {
      const record: Record = {
        id: new Date().valueOf().toString(),
        name: payload.name,
        value: payload.value,
        error: payload.error,
      };
      let newState = [...state];
      const isFind = newState.findIndex(({ value: itemValue }) =>
        itemValue.replace(/\s/g, '') === record.value.replace(/\s/g, ''));

      if (isFind !== -1) {
        newState = newState.filter((_, index) => index !== isFind);
      }

      newState = [record, ...newState];
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
