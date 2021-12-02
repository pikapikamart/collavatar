import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CollavatarProject } from "./projects.reducer"
import { AppState, AppThunk } from "../store";
import { fetcher, buildFetchedUpdate } from "../utils";


export interface CollavatarNotification {
  requester?: CollavatarUser,
  responder?: CollavatarUser,
  project?: CollavatarProject,
  notificationType: string,
  position: string,
  message: string,
  accepted?: string,
  responded?: string,
  notificationId?: string
}

export interface CollavatarUser {
  githubId: number | null,
  githubRepoLink: string,
  username: string,
  userImage: string,
  userBio: string,
  isDoneConfiguring: boolean,
  collaboratedProjects: CollavatarProject[] | [],
  ownedProjects: CollavatarProject[] | [],
  notifications: CollavatarNotification[] | []
}

const userInitialState: CollavatarUser = {
  githubId: null,
  githubRepoLink: "",
  username: "",
  userImage: "",
  userBio: "",
  isDoneConfiguring: false,
  collaboratedProjects: [],
  ownedProjects: [],
  notifications: []
}

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<CollavatarUser>) =>{
      return {...state, ...action.payload}
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        // console.log('HYDRATE', state, action.payload);
        return {
            ...state,
            ...action.payload.subject,
        };
    },
},
})

export const { setUser } = userSlice.actions;

export const thunkSetUser = (update: CollavatarUser): AppThunk => async dispatch =>{
  const fetchUpdateData = buildFetchedUpdate("PATCH", update);
  await fetcher("/api/user", fetchUpdateData);

  dispatch(setUser(update));
}

export const selectUser = ( state: AppState ) => state.user;

export default userSlice.reducer;