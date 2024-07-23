import $api, {ApiUrl} from "./index";
import IPost from "../models/IPost";
import axios from "axios";

export default class PostApi {
    static async create(data: IPost) {
        try {
            const res = await $api.post<IPost>('api/post', data);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
    static async sendMailer(data: IPost) {
        try {
            const res = await $api.post('api/sendMailer', data);
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
    static async getFreePostById(id: string) {
        try {
            const res = await axios.get<IPost>(`${ApiUrl}/api/all/post/${id}`);
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
    static async getFreePostsByCategoryId(CategoryId: string, count: number) {
        try {
            const res = await axios.get<IPost[]>(`${ApiUrl}/api/all/categories/${CategoryId}/${count}`);
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
    static async getBytes() {
        try {
            return (await $api.get('/api/bytes')).data;
        } catch (e) {
            return e;
        }

    }

    static async clearBytes() {
        try {
            return (await $api.post('/api/bytes')).data;
        } catch (e) {
            return e;
        }

    }
}