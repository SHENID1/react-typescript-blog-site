import $api, {ApiUrl} from "./index";
import IOtherInfo from "../models/IOtherInfo";
import ICert from "../models/ICert";
import axios from "axios";


export default class OtherInfoApi {

    static async update(data: IOtherInfo) {
        try {
            const res = await $api.put<IOtherInfo>('api/other/', data);
            return res.data;

        } catch (e) {
            return null;

        }
    }

    static async getOtherInfoByName(name: string) {
        try {
            const res = await $api.get<IOtherInfo>(`/api/other/${name}`);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }

    static async getCerts() {
        try {
            const res = await axios.get<ICert[]>(`${ApiUrl}/api/cert/files`);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }

}
