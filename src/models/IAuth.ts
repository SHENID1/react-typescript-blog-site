import IUser from "./IUser";

export default interface IAuth {
    user?: IUser;
    isAuth: boolean;
    loading: boolean;
}