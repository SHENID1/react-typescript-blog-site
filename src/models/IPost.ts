import IComment from "./IComment";
import  { Dayjs } from "dayjs";
import Categories from "./categories";

export default interface IPost {
    _id?: string;
    title: string;
    categories: Categories;
    urlPreview: string | any[];
    isVisible: boolean;
    content: string[];
    commentaries?: IComment[];
    dateCreated?: Date | Dayjs;
}
