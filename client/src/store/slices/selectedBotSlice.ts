import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedBot: null,
};

export const selectedBotSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		removeSelectedBot: ({ selectedBot }, { payload }) => {
			selectedBot = null;
		},
		addSelectedBot: ({ selectedBot }, { payload }) => {
			selectedBot = payload;
		},
	},
});

export const { removeSelectedBot, addSelectedBot } = selectedBotSlice.actions;
export default selectedBotSlice;
