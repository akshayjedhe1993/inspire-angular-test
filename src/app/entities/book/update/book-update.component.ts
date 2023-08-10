import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IBook, Book } from '../book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'jhi-book-update',
  templateUrl: './book-update.component.html',
})
export class BookUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [0],
    PublishDate: [0, [Validators.required]],
    imageUrl: ['', [Validators.required]],
    purchaseLink: ['', [Validators.required]],
    title: ['', [Validators.required]],
  });

  constructor(protected bookService: BookService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ book }) => {
      this.updateForm(book);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const book = this.createFromForm();
    if (book.id !== undefined && book.id !== 0) {
      this.subscribeToSaveResponse(this.bookService.update(book));
    } else {
      this.subscribeToSaveResponse(this.bookService.create(book));
    }
  }

  protected subscribeToSaveResponse(result: Observable<boolean>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(book: IBook): void {
    this.editForm.patchValue({
      id: book.id,
      PublishDate: book.PublishDate,
      imageUrl: book.imageUrl,
      purchaseLink: book.purchaseLink,
      title: book.title,
    });
  }

  protected createFromForm(): IBook {
    return {
      ...new Book(0, 0, '', '', ''),
      id: this.editForm.get(['id'])!.value,
      PublishDate: this.editForm.get(['PublishDate'])!.value,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
      purchaseLink: this.editForm.get(['purchaseLink'])!.value,
      title: this.editForm.get(['title'])!.value,
    };
  }
}
