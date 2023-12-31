import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBook, Book } from '../book.model';
import { BookService } from '../service/book.service';

@Injectable({ providedIn: 'root' })
export class BookRoutingResolveService implements Resolve<IBook> {
  constructor(protected service: BookService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBook> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((book: Book | undefined) => {
          if (book) {
            return of(book);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new Book(0, 0, '', '', ''));
  }
}
