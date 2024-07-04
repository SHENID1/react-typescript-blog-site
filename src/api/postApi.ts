import $api from "./index";
import IPost from "../models/IPost";

export default class PostApi {
    static async create(data: IPost) {
        try {
            const res = await $api.post<IPost>('api/post', data);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
    static async getPostById(id: string) {
        try {
            const res = await $api.get<IPost>(`api/post/${id}`);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
    static async DeletePost(id: string) {
        try {
            await $api.delete(`api/post/${id}`);
            return true;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
    static async getPostsByCategoryId(CategoryId: string) {
        try {
            const res = await $api.get<IPost[]>(`api/posts/categories/${CategoryId}`);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
    static async updatePost(data: IPost) {
        try {
            const res = await $api.put<IPost>('api/post', data);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
}