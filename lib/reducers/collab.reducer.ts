import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppThunk } from "../store";


interface CollabProject {
  projectName: string,
  projectLink: string,
  projectLimitation: boolean,
  projectCapacity: number,
  projectTags: {
    tagName: string,
    needed: boolean
  }[],
  projectDescription: string,
  projectId: string,
  projectStatus: string,
  projectOwner: {
    githubId: string,
    username: string,
    userImage: string
  },
  projectMembers: string[],
  createdAt: Date
}

interface CollavatarProjects {
  all: CollabProject[],
  available?: CollabProject[],
  joined: CollabProject[],
  openSource: CollabProject[]
}

export const collabSlice = createSlice({
  name: "collab",
  initialState: {} as CollavatarProjects,
  reducers: {
    setAllProjects: (state, action) =>{
      state.all = action.payload;
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

// Needs to have paginate or some sort of limitation
export const fetchAllCollavatarProjects = (): AppThunk => async dispatch =>{

  // Fetch for api
  
  // Set fetched data to Json and send dispatch
}