import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BooksRepositoryService } from '../../../core/state/books/books-repository.service';
import { ToJsonPipe } from '../../pipes/to-json/to-json.pipe';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [CommonModule, ToJsonPipe],
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsoleComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ConsoleComponent>,
    public bookRepositoryService: BooksRepositoryService
  ) {}
}
