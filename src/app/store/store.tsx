import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../app/portal/login/service/authSlice";
import notesReducer from "../portal/notes/notesService/notesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
