import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBook } from '../book.model';
import { BookService } from '../service/book.service';
import { BookDeleteDialogComponent } from '../delete/book-delete-dialog.component';
import { IBookData } from '../book-data.model';
import { IResponseData } from '../response-data.model';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books?: IBook[];
  isLoading = false;
  isDataFetched: boolean = false;
  isSortbyName: boolean = false; 

  constructor(protected bookService: BookService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.bookService.castIsDataFetched.subscribe(data => this.isDataFetched = data);
    
    this.isLoading = true;
    let tempList = [];
    if (this.isDataFetched) {
      this.bookService.castData.subscribe(
        (res: IBookData | undefined) => {
          this.isLoading = false;
          tempList = res?.books ?? [];
          this.books = this.isSortbyName === false ? tempList.sort((a, b) => (a.title > b.title) ? 1 : -1) : tempList.sort((a, b) => (a.PublishDate > b.PublishDate) ? 1 : -1);
        }
      )
    } else {
      this.bookService.getAll().subscribe({
        next: (res: HttpResponse<IResponseData>) => {
          this.isLoading = false;
          tempList = res.body?.data?.books ?? [];
          tempList.map((value, index) => value.id = ++index);
          this.books = this.isSortbyName === false ? tempList.sort((a, b) => (a.title > b.title) ? 1 : -1) : tempList.sort((a, b) => (a.PublishDate > b.PublishDate) ? 1 : -1);
          this.bookService.updateData({...res.body?.data, books: this.books});
          this.bookService.updateIsDataFetched(true);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IBook): number {
    return item.id!;
  }

  delete(book: IBook): void {
    const modalRef = this.modalService.open(BookDeleteDialogComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.book = book;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.books = this.books?.filter(value => value.id != book.id);
        this.bookService.updateData({...this.bookService.castData, books: this.books});
      }
    });
  }

  onCheckboxChange(e: any) {
    this.isSortbyName = e.target.checked;
    this.books = this.isSortbyName === false ? this.books?.sort((a, b) => (a.title > b.title) ? 1 : -1) : this.books?.sort((a, b) => (a.PublishDate > b.PublishDate) ? 1 : -1);
  }
}
