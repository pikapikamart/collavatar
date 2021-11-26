import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CollavatarProject } from "./projects.reducer"


export interface CollavatarNotification {
  requester?: CollavatarUser,
  responder?: CollavatarUser,
  project?: CollavatarProject,
  notificationType: string,
  position: string,
  message: string,
  accepted?: boolean,
  responded?: boolean,
  notificationId?: string
}

export interface CollavatarUser {
  githubId: string,
  githubRepoLink: string,
  username: string,
  userImage: string,
  collaboratedProjects: CollavatarProject[] | [],
  ownedProjects: CollavatarProject[] | [],
  notifications: CollavatarNotification[] | []
}

const userInitialState: CollavatarUser = {
  githubId: "",
  githubRepoLink: "",
  username: "",
  userImage: "",
  collaboratedProjects: [],
  ownedProjects: [],
  notifications: []
}

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) =>{
      state = {...state, ...action.payload}
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        console.log('HYDRATE', state, action.payload);
        return {
            ...state,
            ...action.payload.subject,
        };
    },
},
})