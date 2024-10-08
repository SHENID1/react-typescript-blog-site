import $api from "./index";
import Categories from "../models/categories";

interface Response {
    name: string;
    _id: string;
}

export default class CategoriesApi {
    static async create(name: string) {
        try {
            const res = await $api.post<Response>('api/categories', {name});
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }

    static async update(oldName: string, newName: string) {
        try {
            const res = await $api.put<Response>('api/categories', {oldName, newName});
            return res.data;

        } catch (e) {
            return null;

        }
    }

    static async delete(id: string) {
        try {
            await $api.delete(`/api/categories/${id}`);
            return true
        } catch (e: any) {
            throw Error(e.message)
        }
    }

    static async getAllCategories() {
        try {
            const res = await $api.get<Categories[]>("/api/categories");
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }static async getCatById(id: string) {
        try {
            const res = await $api.get<Categories>(`/api/categories/${id}`);
            if (!res.data) return {
                name: "Не найдено",
                _id: "-1",
                count: 0,
            } as Categories
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
}
