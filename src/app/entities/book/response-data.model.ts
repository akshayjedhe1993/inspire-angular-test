import { IBookData } from "./book-data.model";

export interface IResponseData {
    data?: IBookData;
    status?: string;
}