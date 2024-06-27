import {AppDispatch} from "../store";
import axios from "axios";
import IUser from "../../models/IUser";
import {userSlice} from "./UserSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginUrl} from "../../constants";
import $api from "../../api";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching())
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e) {
//         dispatch(userSlice.actions.usersFetchingError(e.message))
//     }
// }

interface LoginResponse {
    message: string;
    user: IUser;
    token: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (_, thunkAPI) => {
        try {
            const response = await $api.post<LoginResponse>(
                LoginUrl,
                // {username: _.username,password: _.password},
                )
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)
