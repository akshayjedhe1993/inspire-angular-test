import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

import { IBook, getBookIdentifier } from '../book.model';
import { IBookData } from '../book-data.model';
import { IResponseData } from '../response-data.model';

export type EntityResponseType = HttpResponse<IBook>;
export type EntityArrayResponseType = HttpResponse<IResponseData>;

@Injectable({ providedIn: 'root' })
export class BookService {
  protected resourceUrl = 'https://s3.amazonaws.com/api-fun/books.json';

  private data = new BehaviorSubject<IBookData | undefined>({});
  castData = this.data.asObservable();
  
  private isDataFetched = new BehaviorSubject<boolean>(false);
  castIsDataFetched = this.isDataFetched.asObservable();
   
  updateData(newData: IBookData | undefined){
    this.data.next(newData); 
  }
   
  updateIsDataFetched(newData: boolean){
    this.isDataFetched.next(newData); 
  }

  constructor(protected http: HttpClient) {}


  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IResponseData>(this.resourceUrl, { observe: 'response' });
  }

  find(id: number): Observable<IBook | undefined> {
    return this.castData.pipe(
      map(res => res?.books?.find(book => book.id == id))
    )
  }
  
  create(book: IBook): Observable<boolean> {
    let data: IBookData | undefined;
    this.castData.subscribe(res => data = res);
    let arrObjIds = data?.books?.map(elements => elements.id);
    let maxId = arrObjIds !== undefined ? Math.max(...arrObjIds): 0;
    book.id = ++maxId;
    data?.books?.push(book);
    this.updateData(data);
    return of(true);
  }

  update(book: IBook): Observable<boolean> {
    let data: IBookData | undefined;
    this.castData.subscribe(res => data = res);
    let arrObj = data?.books?.filter(elements => elements.id !== book.id);
    arrObj?.push(book);
    this.updateData({...data, books: arrObj});
    return of(true);
  }
}
