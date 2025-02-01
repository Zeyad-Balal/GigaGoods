import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true,
})
export class SalePipe implements PipeTransform {
  transform(value: string): string {
    //logic => if value is on sale == true, return OnSale value
    //to be implemented, SOON
    return `OnSale ${value}`;
  }
}
