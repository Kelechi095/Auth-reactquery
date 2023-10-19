import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.currentUser = action.payload;
    },
    removeUserInfo: (state, action) => {
      state.currentUser = null
    }
  },
});

export const {setUserInfo, removeUserInfo} = userSlice.actions;
export default userSlice.reducer;