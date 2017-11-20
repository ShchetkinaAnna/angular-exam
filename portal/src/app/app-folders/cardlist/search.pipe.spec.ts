import { SearchPipe } from './search.pipe';
import { TUserCard } from '../../comon';

describe('SearchPipe', () => {
  let pipe; 
  let testUserCards: TUserCard[] = [
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
      O: "Иванович",
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
    }
  ];
  
  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform null array', () => {
    expect(pipe.transform(null, "поиск")).toEqual([]);
  }); 

  it('should transform null string', () => {
    expect(pipe.transform(testUserCards, "")).toEqual(testUserCards);
  });   

  /*it('should transform F', () => {
    expect(pipe.transform(testUserCards, "test@mail.ru")).toEqual([testUserCards[0]]);
  });   */
});
