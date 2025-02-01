import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText',
  standalone: true
})
export class SplitTextPipe implements PipeTransform {

  transform(value:string , limit:number): string {
    let new_value = value.split(" ").slice(0, limit).join(" ");
    return new_value;
  }

}
