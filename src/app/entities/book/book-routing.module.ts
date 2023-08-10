import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookComponent } from './list/book.component';
import { BookDetailComponent } from './detail/book-detail.component';
import { BookUpdateComponent } from './update/book-update.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BookComponent
      },
      {
        path: ':login/view',
        component: BookDetailComponent
      },
      {
        path: 'new',
        component: BookUpdateComponent
      },
      {
        path: ':login/edit',
        component: BookUpdateComponent
      },
    ]),
  ],
})
export class BookRoutingModule {}
