import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import themeSlice from "./slices/themeSlice";
import chatsSlice from "./slices/chatsSlice";
import userBotsSlice from "./slices/userBotsSlice";
import userPersonasSlice from "./slices/userPersonasSlice";
import messageSlice from "./slices/messageSlice";

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		selectedTheme: themeSlice.reducer,
		chats: chatsSlice.reducer,
		userBots: userBotsSlice.reducer,
		userPersonas: userPersonasSlice.reducer,
		message: messageSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
