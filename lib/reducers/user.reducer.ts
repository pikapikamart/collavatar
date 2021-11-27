import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CollavatarProject } from "./projects.reducer"
import { AppState, AppThunk } from "../store";
import { fetcher } from "../utils";


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
  userBio: string
  collaboratedProjects: CollavatarProject[] | [],
  ownedProjects: CollavatarProject[] | [],
  notifications: CollavatarNotification[] | [],
  isDoneConfiguring: boolean
}

const userInitialState: CollavatarUser = {
  githubId: null,
  githubRepoLink: "",
  username: "",
  userImage: "",
  userBio: "",
  collaboratedProjects: [],
  ownedProjects: [],
  notifications: [],
  isDoneConfiguring: false
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

type UserUpdate = {
  username?: string,
  userImage?: string,
  userBio?: string,
  isDoneConfiguring?: boolean
}
// export const { setUser } = userSlice.actions;
export const thunkSetUser = (update: UserUpdate): AppThunk => async dispatch =>{

  // fetch to api
  const updateData = {
    method: "PATCH",
    Headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(update)
  }
  const updateUser = await fetcher("/api/user", updateData);


}

export const selectUser = ( state: AppState ) => state.user;

export default userSlice.reducer;