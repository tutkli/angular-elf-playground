import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsoleComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ConsoleComponent>) {}
}
