import { Pipe, PipeTransform } from '@angular/core';
import { TSexValues } from '../../comon';

@Pipe({
  name: 'usersex'
})
export class UsersexPipe implements PipeTransform {

  transform(value: TSexValues, args?: any): string {    
    if (!(value === -1 || value === 0 || value === 1 || value === null)) {
      throw new Error("UsersexPipe Не верный входной параметр");
    }

    return (value == -1 || value === null) ? "" : (value ? 'Женщина' : 'Мужчина');
  }

}
