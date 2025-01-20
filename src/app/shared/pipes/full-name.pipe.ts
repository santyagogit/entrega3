import { Pipe, PipeTransform } from '@angular/core';
import { Students } from '../../modules/dashboard/pages/students/models';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value: Students, type?: 'uppercase' | 'lowercase'): string {

    let result = value;
    // if (type === 'lowercase')
    //   result = result.toLowerCase();
    // else {
    //   result = result.toUpperCase();
    // }

    return `${value.lastName.toUpperCase()}, ${value.name}`;
  }
}
