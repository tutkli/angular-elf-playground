import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToJsonPipe } from '../../pipes/to-json/to-json.pipe';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [CommonModule, ToJsonPipe],
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsoleComponent implements OnInit {
  booksStorage: unknown;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ConsoleComponent>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @HostListener('window.storage', ['$event'])
  onStorageUpdate(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      this.updateConsoleValue();
    }
  }

  ngOnInit(): void {
    this.updateConsoleValue();
  }

  private updateConsoleValue(): void {
    const booksStorage: string | null = localStorage.getItem('books');
    if (booksStorage !== null) {
      this.booksStorage = JSON.parse(booksStorage);
      this.changeDetectorRef.detectChanges();
    }
  }
}
