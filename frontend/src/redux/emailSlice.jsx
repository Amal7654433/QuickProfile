import { createSlice } from "@reduxjs/toolkit";

const emailReduce = createSlice({
    name: 'email',
    initialState: {

    },
    reducers: {
        emailDelete: (state, action)=>
        {
       
        }
    }
})

export const {emailDelete} =emailReduce.actions
export default emailReduce.reducer