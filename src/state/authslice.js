import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{id:1,isLoggedIn:false},
    reducers:{
        LogInOut:(state)=>{
            state.isLoggedIn=!state.isLoggedIn;
        }
    }
})

export const {LogInOut}=authSlice.actions;
export default authSlice.reducer;