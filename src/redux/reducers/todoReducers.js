// reducers/todoReducer.js
import {createSlice} from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTodosRequest: state => {
      state.loading = true;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoRequest: state => {
      state.loading = true;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTodoRequest: state => {
      state.loading = true;
    },
    updateTodoSuccess: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(todo => todo.id === action.payload.id);
      state.list[index] = action.payload;
    },
    updateTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTodoRequest: state => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = todoSlice.actions;

export default todoSlice.reducer;
