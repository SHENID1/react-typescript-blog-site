import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IAuth from "../../models/IAuth";
import LoginResponse from "../../models/loginResponse";

const initialState: IAuth = {
    isAuth: false,
    loading: true,
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        successLogin(state:IAuth, action: PayloadAction<LoginResponse>) {
            state.isAuth = true
            state.user = action.payload.user
            state.loading = false
        },
        logout(state: IAuth) {
            state.isAuth = false;
            state.user = undefined;
            state.loading = false
        }
    },
    extraReducers: () => {
    //     builder.addCase(login.pending.type, (state: IAuth) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(login.fulfilled.type, (state: IAuth, action: PayloadAction<IUser[]>) => {
    //         state.isLoading = false;
    //         // state.token = action.payload;
    //     });
    //     builder.addCase(login.rejected.type, (state: IAuth, action: PayloadAction<string>) => {
    //         state.isLoading = false;
    //         // state.user = ;
    //     });
    },
})

export default userSlice.reducer;
