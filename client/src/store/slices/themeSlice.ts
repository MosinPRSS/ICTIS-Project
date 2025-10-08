import { themes } from "@/utils/themes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = themes.themes.violet;

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, { payload }) => {
			state.name = payload.name;
			state.options = payload.options;

			localStorage.setItem("theme", JSON.stringify(state));
		},

		initTheme: (state) => {
			if (localStorage.getItem("theme")) {
				const theme = JSON.parse(localStorage.getItem("theme"));
				state.name = theme.name;
				state.options = theme.options;
			} else {
				localStorage.setItem("theme", JSON.stringify(initialState));
			}
		},
	},
});

export const { setTheme, initTheme } = themeSlice.actions;
export default themeSlice;
