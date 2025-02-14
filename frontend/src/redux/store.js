import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSllice";
import emailReduce from "./emailSlice"
export const store = new configureStore({
    reducer:
    {
        auth: authReducer,
        email:emailReduce

    }
})