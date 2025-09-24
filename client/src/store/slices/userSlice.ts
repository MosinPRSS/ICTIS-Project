import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		auth: (state, { payload }) => {
			state.user = payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const { auth, logout } = userSlice.actions;
export default userSlice;
