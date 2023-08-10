import { IBook } from "./book.model";

export interface IBookData {
    author?: string;
    birthPlace?: string;
    birthday?: string;
    books?: IBook[];
}
  