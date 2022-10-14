import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../core/model/book.model';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-books-collection',
  standalone: true,
  imports: [CommonModule, FlexModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './books-collection.component.html',
  styleUrls: ['./books-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksCollectionComponent {
  @Input() books!: Book[] | null;
  @Output() readonly removeBook: EventEmitter<string> = new EventEmitter<string>();
}
