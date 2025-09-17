import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, { payload }) => {
			if (localStorage.getItem("user")) {
				const username = localStorage.getItem("user");
				state.user = {
					name: username,
				};

				return;
			}

			state.user = payload;
			localStorage.setItem("user", payload.name);
		},
		logout: (state) => {
			if (localStorage.getItem("user")) {
				localStorage.removeItem("user");
			}
			state.user = null;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice;
