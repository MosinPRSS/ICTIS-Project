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
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice;
