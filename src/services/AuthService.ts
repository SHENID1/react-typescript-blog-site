import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import IUser from "../models/IUser";
import loginArgs from "../models/loginArgs";

interface LoginResponse {
    message: string;
    user: IUser;
    token: string;
}


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        login: build.query<LoginResponse, loginArgs>({
            query: (args: loginArgs) => ({
                url: `/auth/login`,
                method: 'POST',
                mode: "no-cors",
                body: args
            }),
            providesTags: result => ['Auth']
        }),
    })
})
