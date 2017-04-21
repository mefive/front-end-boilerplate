import { put } from 'redux-saga/effects';

import * as actionTypes from 'config/actionTypes';
import constants from 'config/constants';
import sleep from 'utils/sleep';

export function loadPage(fn) {
  return function* (args) {
    yield put({
      type: actionTypes.FETCH_START
    });

    yield [fn(args), sleep(300)];

    yield put({
      type: actionTypes.FETCH_END
    });
  }
}

export function* alertError(error) {
  let message;

  if (typeof error === 'string') {
    message = error;
  }
  else if (error.code) {
    message = error.message || error.code;
  }

  console.log('message', message);

  if (message) {
    yield put({
      type: actionTypes.PUSH_MODAL,
      payload: {
        modalType: constants.MODAL_TYPE_ALERT,
        message: error.message || error.code
      }
    });
  }
}
