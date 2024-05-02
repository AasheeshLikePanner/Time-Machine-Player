import {configureStore} from '@reduxjs/toolkit'
import VideoPlaySlice from './VideoPlaySlice'

const store = configureStore({
    reducer: {
        videoplayer: VideoPlaySlice,
    }
})

export default store;