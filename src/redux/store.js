import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./slice"


const store = configureStore({
    reducer: {
        task: taskReducer
    }
})

export default store;
