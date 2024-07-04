import IComment from "./IComment";
import  { Dayjs } from "dayjs";

export default interface IPost {
    _id?: string;
    title: string;
    categories: string;
    urlPreview: string | any[];
    isVisible: boolean;
    content: string[];
    commentaries?: IComment[];
    dateCreated?: Date | Dayjs;
}
