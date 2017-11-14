import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersex'
})
export class UsersexPipe implements PipeTransform {

  transform(value: 0|1, args?: any): string {
    return value ? 'Женщина' : 'Мужчина';
  }

}
