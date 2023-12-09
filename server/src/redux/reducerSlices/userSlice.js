import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  isLoggedIn:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails: (state, actions) => {
      state.count = state.count + 1;
    },
    handleLogout: (state) => {
      state.count = state.count - 1;
    },
  }
});

export const { setLoginDetails, handleLogout } = userSlice.actions;
export default userSlice.reducer;
