import { createAction } from 'redux-actions';

import { RecordsActionTypes } from '../constants';

export const actionAddRecord = createAction<{
  name: string
  value: string
  error: boolean
}>(RecordsActionTypes.ADD_RECORD);

export const actionDeleteRecord = createAction<{
  id: string
}>(RecordsActionTypes.DELETE_RECORD);

export const actionDeleteAllRecords = createAction(
  RecordsActionTypes.DELETE_ALL_RECORDS,
);

export type ActionsRecords =
  ReturnType<typeof actionAddRecord>
  | ReturnType<typeof actionDeleteRecord>
  | ReturnType<typeof actionDeleteAllRecords>
