import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: true,
	text: null,
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		openMessage: (state, { payload }) => {
			state.isOpen = true;
			state.text = payload;
		},
		closeMessage: (state) => {
			state.isOpen = false;
			state.text = null;
		},
	},
});

export const { openMessage, closeMessage } = messageSlice.actions;
export default messageSlice;
