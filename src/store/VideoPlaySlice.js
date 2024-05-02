import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    flag:true,
    ContainerOpend:false,
    HomeOpend:false,
    year:2000,
}

const VideoPlaySlice = createSlice({
    name:'videoplayer',
    initialState,
    reducers:{
        play : (state,action) => {
            state.flag = action.payload;
        },
        ContainerOpen:(state, action) => {
            state.ContainerOpend = action.payload;
        },
        HomeOpen:(state, action)=>{
            state.HomeOpend = action.payload;
        },
        setyear:(state, action)=>{
            state.year = action.payload;
        }
    }
})

export const {play, ContainerOpen, HomeOpen, setyear} = VideoPlaySlice.actions

export default VideoPlaySlice.reducer;