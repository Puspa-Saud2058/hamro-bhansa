import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
     }
});

export const { productDetails } = menuSlice.actions;
export default menuSlice.reducer;
