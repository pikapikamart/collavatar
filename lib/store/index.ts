import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import collavatarProjectReducer from "@/lib/reducers/projects.reducer";
import collavatarUserReducer from "@/lib/reducers/user.reducer";


export const makeStore = () => configureStore({
  reducer: {
    projects: collavatarProjectReducer,
    user: collavatarUserReducer
  },
  devTools: true
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);