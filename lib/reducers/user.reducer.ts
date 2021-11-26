import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";


export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) =>{

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