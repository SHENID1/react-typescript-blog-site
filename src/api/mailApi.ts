import axios from "axios";
import {ApiUrl} from "./index";

interface Response {
    email: string;
    _id: string;
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

}
