import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from '../list/book.component';
import { BookDetailComponent } from '../detail/book-detail.component';
import { BookUpdateComponent } from '../update/book-update.component';
import { BookRoutingResolveService } from './book-routing-resolve.service';

const bookRoute: Routes = [
  {
    path: '',
    component: BookComponent,
  },
  {
    path: ':id/view',
    component: BookDetailComponent,
    resolve: {
      book: BookRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: BookUpdateComponent,
    resolve: {
      book: BookRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: BookUpdateComponent,
    resolve: {
      book: BookRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoute)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
