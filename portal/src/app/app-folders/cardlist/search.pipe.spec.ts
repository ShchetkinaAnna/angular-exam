import { SearchPipe } from './search.pipe';
import { TUserCard } from '../../comon';
import { UsersexPipe } from './usersex.pipe';
import { DatePipe } from '@angular/common';

describe('SearchPipe', () => {
  let pipe; 
  let mockUserCards: TUserCard[] = [
    {
      UserID: 1,
      F: "Иванов",
      I: "Иван",
      O: "Иванович",
      Email: "test@mail.ru",
      Sex: 1,
      BirthDate: Date.parse('1982-02-16')
    },
    {
      UserID: 2,
      F: "Петров",
      I: "Иван",
      O: "Васильевич",
      Email: "test123@mail.ru",
      Sex: 0,
      BirthDate: Date.parse('1999-10-18')
    },
    {
      UserID: 3,
      F: "Сидоров",
      I: "Петр",
      O: "Петрович",
      Email: "test1254@mail.ru",
      Sex: 1,
      BirthDate: Date.parse('1998-10-18')
    },
    {
      BirthDate: null,
      Email: "test@gmai.com",
      F: "",
      I: "",
      O: "",
      Sex: -1,
      UserID: 33
    },
    {
      BirthDate: NaN,
      Email: "test@gmai.com",
      F: "",
      I: "",
      O: "",
      Sex: -1,
      UserID: 32
    }
  ];
  
  beforeEach(() => {
    pipe = new SearchPipe(new UsersexPipe(), new DatePipe('en-US'));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform null array', () => {
    expect(pipe.transform(null, "поиск")).toEqual([]);
  }); 

  it('should transform null string', () => {
    expect(pipe.transform(mockUserCards, "")).toEqual(mockUserCards);
  });   

  it('should transform F', () => {
    expect(pipe.transform(mockUserCards, "иванов")).toEqual([mockUserCards[0]]);
  });   

  it('should transform I', () => {
    expect(pipe.transform(mockUserCards, "иван")).toEqual([mockUserCards[0], mockUserCards[1]]);
  });     

  it('should transform O', () => {
    expect(pipe.transform(mockUserCards, "васильевич")).toEqual([mockUserCards[1]]);
  });       

  it('should transform Email', () => {
    expect(pipe.transform(mockUserCards, "test1254@mail.ru")).toEqual([mockUserCards[2]]);
  });         

  it('should transform Email null', () => {
    expect(pipe.transform(mockUserCards, "test@gmai.com")).toEqual([mockUserCards[3], mockUserCards[4]]);
  });           

  it('should transform Sex Women', () => {
    expect(pipe.transform(mockUserCards, "Женщина")).toEqual([mockUserCards[0], mockUserCards[2]]);
  });           

  it('should transform Sex Men', () => {
    expect(pipe.transform(mockUserCards, "муж")).toEqual([mockUserCards[1]]);
  });             

  it('should transform Date', () => {
    expect(pipe.transform(mockUserCards, "18.10.1998")).toEqual([mockUserCards[2]]);
  });             
});
