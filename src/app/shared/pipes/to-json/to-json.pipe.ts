import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toJson',
  standalone: true,
})
export class ToJsonPipe implements PipeTransform {
  transform(value: unknown): string {
    return JSON.stringify(value, null, 4);
  }
}
