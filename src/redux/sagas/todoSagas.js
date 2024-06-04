// sagas/todoSagas.js
import {call, put, takeEvery} from 'redux-saga/effects';
import {firebase} from '../firebase/config';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
} from '../reducers/todoReducers';

function* fetchTodos() {
  try {
    const snapshot = yield call([
      firebase.firestore().collection('todo'),
      'get',
    ]);
    const todos = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* addTodo(action) {
  try {
    const docRef = yield call(
      [firebase.firestore().collection('todo'), 'add'],
      {text: action.payload},
    );
    const doc = yield call([docRef, 'get']);
    yield put(addTodoSuccess({id: doc.id, ...doc.data()}));
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

function* updateTodo(action) {
  try {
    yield call(
      [
        firebase.firestore().collection('todo').doc(action.payload.id),
        'update',
      ],
      {text: action.payload.text},
    );
    yield put(updateTodoSuccess(action.payload));
  } catch (error) {
    yield put(updateTodoFailure(error.message));
  }
}

function* deleteTodo(action) {
  try {
    yield call([
      firebase.firestore().collection('todo').doc(action.payload),
      'delete',
    ]);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

function* todoSaga() {
  yield takeEvery(fetchTodosRequest.type, fetchTodos);
  yield takeEvery(addTodoRequest.type, addTodo);
  yield takeEvery(updateTodoRequest.type, updateTodo);
  yield takeEvery(deleteTodoRequest.type, deleteTodo);
}
export default todoSaga;
