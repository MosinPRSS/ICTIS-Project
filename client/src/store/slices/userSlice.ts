import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isAuth: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		auth: (state, { payload }) => {
			console.log(payload);

			state.user = payload;
		},
		logout: (state) => {
			state.user = null;
		},

		showAuth: (state, { payload }) => {
			state.isAuth = payload;
		},
	},
});

export const { auth, logout, showAuth } = userSlice.actions;
export default userSlice;
