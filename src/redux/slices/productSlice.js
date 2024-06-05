// features/products/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    },
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.list.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter(product => product.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
