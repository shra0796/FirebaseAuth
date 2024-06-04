// sagas/index.js
import {all} from 'redux-saga/effects';
import todoSaga from './todoSagas';

export default function* rootSaga() {
  yield all([todoSaga()]);
}
