import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.cartItems.find(i => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
