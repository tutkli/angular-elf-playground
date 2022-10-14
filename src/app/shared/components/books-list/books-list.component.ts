import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../core/model/book.model';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, FlexModule, MatIconModule, MatButtonModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {
  @Input() books!: Book[] | null;
  @Output() readonly addBook: EventEmitter<string> = new EventEmitter<string>();
}
