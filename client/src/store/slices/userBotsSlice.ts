import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userBots: null,
};

export const userBotsSlice = createSlice({
	name: "userBots",
	initialState,
	reducers: {
		removeUserBot: ({ userBots }, { payload }) => {
			userBots = userBots.filter((bot) => bot.id != payload.id);
		},
		addUserBot: ({ userBots }, { payload }) => {
			userBots = [...userBots, payload];
		},
	},
});

export const { removeUserBot, addUserBot } = userBotsSlice.actions;
export default userBotsSlice;
