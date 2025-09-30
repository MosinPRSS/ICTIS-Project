import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	theme: "Violet",
	options: {
		background: "bg-violet-950",
		middleground: "bg-violet-900",
		text: "text-white",
		border: "border-white",
		elementBackground: "bg-violet-900/50",
	},
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, { payload }) => {
			state.theme = payload.theme;
			state.options = payload.options;

			localStorage.setItem("theme", JSON.stringify(state));
		},

		initTheme: (state) => {
			if (localStorage.getItem("theme")) {
				const theme = JSON.parse(localStorage.getItem("theme"));
				state.theme = theme.theme;
				state.options = theme.options;
			} else {
				localStorage.setItem("theme", JSON.stringify(initialState));
			}
		},
	},
});

export const { setTheme, initTheme } = themeSlice.actions;
export default themeSlice;
