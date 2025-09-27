import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	chats: null,
	selectedChat: null,
};

export const chatsSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		initChats: (state, { payload }) => {
			state.chats = payload;
		},
		removeChat: ({ chats }, { payload }) => {
			chats = chats.filter((chat) => chat.id != payload.id);
		},
		addChat: ({ chats }, { payload }) => {
			chats = [...chats, payload];
		},
		setSelectedChat: ({ selectedChat }, { payload }) => {
			selectedChat = payload.payload;
		},
	},
});

export const { removeChat, addChat, setSelectedChat, initChats } =
	chatsSlice.actions;
export default chatsSlice;
