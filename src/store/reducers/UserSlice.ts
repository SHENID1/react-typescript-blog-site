import IUser from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "./ActionCreators";
import IAuth from "../../models/IAuth";

const initialState: IAuth = {
    isAuth: false,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.pending.type, (state: IAuth) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled.type, (state: IAuth, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            // state.token = action.payload;
        });
        builder.addCase(login.rejected.type, (state: IAuth, action: PayloadAction<string>) => {
            state.isLoading = false;
            // state.user = ;
        });
    },
})

export default userSlice.reducer;
