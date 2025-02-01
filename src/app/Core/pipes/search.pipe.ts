import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(arrayOfObjects: any[], search_value: string): any[] {
    return arrayOfObjects.filter((obj) => {
      return obj.title.toLowerCase().includes(search_value.toLowerCase());
    });
  }
}
