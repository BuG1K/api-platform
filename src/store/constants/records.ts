import keyMirror from 'fbjs/lib/keyMirror';

const ActionTypes = keyMirror({
  ADD_RECORD: 'ADD_RECORD',
  DELETE_RECORD: 'DELETE_RECORD',
  DELETE_ALL_RECORDS: 'DELETE_ALL_RECORDS',
});

export default ActionTypes;
