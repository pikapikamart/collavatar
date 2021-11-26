import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CollavatarProject } from "./projects.reducer"
import { AppState } from "../store";


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
  githubId: string,
  githubRepoLink: string,
  username: string,
  userImage: string,
  collaboratedProjects: CollavatarProject[] | [],
  ownedProjects: CollavatarProject[] | [],
  notifications: CollavatarNotification[] | [],
  isDoneConfiguring: string
}

const userInitialState: CollavatarUser = {
  githubId: "",
  githubRepoLink: "",
  username: "",
  userImage: "",
  collaboratedProjects: [],
  ownedProjects: [],
  notifications: [],
  isDoneConfiguring: ""
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

export const selectUser = ( state: AppState ) => state.user;

export default userSlice.reducer;