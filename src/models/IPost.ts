import IComment from "./IComment";

export default interface IPost {
    _id: string;
    title: string;
    categories: string;
    urlPreview: string;
    content: string[];
    commentaries: IComment[];
    dateCreated: Date;
}
