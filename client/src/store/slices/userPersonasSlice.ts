import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userPersonas: null,
};

export const userPersonasSlice = createSlice({
	name: "userPersonas",
	initialState,
	reducers: {
		removeUserPersona: ({ userPersonas }, { payload }) => {
			userPersonas = userPersonas.filter((bot) => bot.id != payload.id);
		},
		addUserPersona: ({ userPersonas }, { payload }) => {
			userPersonas = [...userPersonas, payload];
		},
	},
});

export const { removeUserPersona, addUserPersona } = userPersonasSlice.actions;
export default userPersonasSlice;
