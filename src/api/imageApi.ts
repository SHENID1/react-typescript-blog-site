import $api from "./index";

export default class ImageApi {
     static async deleteImage(file: any) {
        const filename = file.response;
        const res = await $api.delete(`api/image/${filename}`);
        console.log(res)
    }
}