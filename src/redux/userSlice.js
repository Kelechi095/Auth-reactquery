import { createSlice } from "@reduxjs/toolkit";
import useRefresh from "../hooks/useRefresh";

const initialState = {
  token: null,
  isLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.token = action.payload;
    },
    removeUserInfo: (state, action) => {
      state.token = null;
      state.isLoggedIn = false
    },
    setLogin: (state) => {
      state.isLoggedIn = true
    }
  },
});

export const { setUserInfo, removeUserInfo, setLogin } = userSlice.actions;
export default userSlice.reducer;
