import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppThunk } from "../store";
import { fetcher } from "@/lib/utils";


export interface CollavatarProject {
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
  all: CollavatarProject[] | [],
  available?: CollavatarProject[] | [],
  joined: CollavatarProject[] | [],
  openSource: CollavatarProject[] | []
}

const projectsInitialState: CollavatarProjects = {
  all: [],
  available: [],
  joined: [],
  openSource: []
} 

export const collavatarProjectSlice = createSlice({
  name: "projects",
  initialState: projectsInitialState,
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
    const collavatarProjects: CollavatarProject[] = await fetcher("/api/projects");
  // Set fetched data to Json and send dispatch
    dispatch(collavatarProjectSlice.actions.setAllProjects(collavatarProjects));
}

export default collavatarProjectSlice.reducer;