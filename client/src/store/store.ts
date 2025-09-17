import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		selectedTheme: themeSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
