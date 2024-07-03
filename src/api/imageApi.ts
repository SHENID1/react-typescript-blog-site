import $api from "./index";

export default class ImageApi {
     static async deleteImage(file: any) {
        const filename = file.response;
        await $api.delete(`api/image/${filename}`);
    }
}