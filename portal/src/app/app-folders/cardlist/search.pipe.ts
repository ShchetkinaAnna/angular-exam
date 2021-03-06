import { Pipe, PipeTransform } from '@angular/core';
import { UsersexPipe } from './usersex.pipe';
import { DatePipe } from '@angular/common';
import { TUserCard } from '../../comon';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private pipeSex?: UsersexPipe, private dPipe?: DatePipe) {}

  transform(items: TUserCard[], searchText: string): any {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(item => 
      item.F.toLowerCase().indexOf(searchText) !== -1 ||
      item.I.toLowerCase().indexOf(searchText) !== -1 ||
      item.O.toLowerCase().indexOf(searchText) !== -1 ||
      item.Email.toLowerCase().indexOf(searchText) !== -1 ||
      this.pipeSex.transform(item.Sex).toLowerCase().indexOf(searchText) !== -1 ||
      ((!isNaN(item.BirthDate) && item.BirthDate != null) ? this.dPipe.transform(item.BirthDate, 'dd.MM.yyyy').indexOf(searchText) : -1 ) !== -1
    );
  }

}
