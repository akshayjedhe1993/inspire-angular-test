export interface IBook {
  id: number;
  PublishDate: number;
  imageUrl: string;
  purchaseLink: string;
  title: string;
}

export class Book implements IBook {
  constructor(public id: number, public PublishDate: number, public imageUrl: string, public purchaseLink: string, public title: string) {}
}

export function getBookIdentifier(book: IBook): number {
  return book.id;
}
