import IUser from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "./ActionCreators";
import IAuth from "../../models/IAuth";

const initialState: IAuth = {
    isAuth: false,
    isLoading: false,
    errors: "",
}
interface LoginResponse {
    message: string;
    user: IUser;
    token: string;
}
export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        successLogin(state:IAuth, action: PayloadAction<LoginResponse>) {
            console.log(action.payload);
            state.isLoading = false;
            state.isAuth = true
            state.user = action.payload.user
            state.token = action.payload.token

        }
    },
    extraReducers: (builder) => {
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
