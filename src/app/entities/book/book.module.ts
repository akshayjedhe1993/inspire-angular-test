import { NgModule } from '@angular/core';
import { BookComponent } from './list/book.component';
import { BookDetailComponent } from './detail/book-detail.component';
import { BookUpdateComponent } from './update/book-update.component';
import { BookDeleteDialogComponent } from './delete/book-delete-dialog.component';
import { BookRoutingModule } from './route/book-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, BookRoutingModule],
  declarations: [BookComponent, BookDetailComponent, BookUpdateComponent, BookDeleteDialogComponent],
})
export class BookModule {}
