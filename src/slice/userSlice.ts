import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, User } from "../types/userTypes";


export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginRegisterUser: (state,action: PayloadAction<Partial<User>>) => {
            return {
                ...state,
                ...action.payload,
                isloggedin: true
            };
        },
        resetUser: () =>{
            return initialState;
        }

    }
});

export const {loginRegisterUser, resetUser} = userSlice.actions;

export const selectUser = (state: {user: User}) => state.user;

export default userSlice.reducer;