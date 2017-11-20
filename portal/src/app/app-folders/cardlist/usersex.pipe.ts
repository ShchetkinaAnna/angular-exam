import { Pipe, PipeTransform } from '@angular/core';
import { TSexValues } from '../../comon';

@Pipe({
  name: 'usersex'
})
export class UsersexPipe implements PipeTransform {

  transform(value: TSexValues, args?: any): string {    
    return (value == -1) ? "" : (value ? 'Женщина' : 'Мужчина');
  }

}
