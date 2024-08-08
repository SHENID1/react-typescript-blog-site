import axios from "axios";
import $api, {ApiUrl} from "./index";

interface Response {
    email: string;
    _id: string;
}
interface ResponseUsers {
    Count: number;
    mailList: Response[];
}

export default class MailerApi {
    static async create(email: string) {
        try {
            const res = await axios.post<Response>(`${ApiUrl}/mail/create`, {email});
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }
    static async getUsers() {
        try {
            const res = await $api.get<ResponseUsers>(`/mail/users`);
            return res.data;
        } catch (e: any) {
            throw Error(e.message)
        }
    }

}
