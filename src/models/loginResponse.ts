import IUser from "./IUser";

export default interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}