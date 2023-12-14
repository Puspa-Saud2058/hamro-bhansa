import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    productDetails: (state, actions) => {
        productDetails:actions.payload,
    },
     }
});

export const { productDetails } = menuSlice.actions;
export default menuSlice.reducer;
