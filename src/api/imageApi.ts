import $api from "./index";

export default class ImageApi {
    static async deleteImage(file: any) {
        const filename = file.response;
        await $api.delete(`api/image/${filename}`);
    }

    static async deleteCert(file: any) {
        let filename = file.response;
        if (!filename) filename = file.name;
        await $api.delete(`api/cert/files/${filename}`);
    }
}