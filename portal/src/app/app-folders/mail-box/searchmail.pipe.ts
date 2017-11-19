import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TMailListItem } from '../../comon';

@Pipe({
  name: 'searchmail'
})
export class SearchmailPipe implements PipeTransform {
  constructor(private dPipe: DatePipe) {}

  transform(items: TMailListItem[], searchText: string): any {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => 
      item.Subject.toLowerCase().indexOf(searchText) !== -1 ||
      item.Text.toLowerCase().indexOf(searchText) !== -1 ||
      this.dPipe.transform(item.InDate, 'dd.MM.yyyy HH:mm:ss').indexOf(searchText) !== -1 ||
      (item.User.F + ' ' + item.User.I + ' ' + item.User.O).toLowerCase().indexOf(searchText) !== -1 ||
      item.User.Email.toLowerCase().indexOf(searchText) !== -1
    );
  }
}
