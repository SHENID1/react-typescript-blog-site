import $api from "./index";
import IPost from "../models/IPost";

export default class PostApi {
    static async create(data: IPost) {
        try {
            const res = await $api.post<Response>('api/post', data);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
}