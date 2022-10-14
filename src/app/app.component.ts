import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from './core/services/books/books.service';
import { BooksRepositoryService } from './core/state/books/books-repository.service';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ConsoleComponent } from './shared/components/console/console.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout';
import { BooksListComponent } from './shared/components/books-list/books-list.component';
import { BooksCollectionComponent } from './shared/components/books-collection/books-collection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatToolbarModule,
    FlexModule,
    BooksListComponent,
    BooksCollectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    public booksRepositoryService: BooksRepositoryService,
    private matBottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe();
  }

  openConsole(): void {
    this.matBottomSheet.open(ConsoleComponent);
  }
}
