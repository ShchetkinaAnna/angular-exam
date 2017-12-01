import { SearchmailPipe } from './searchmail.pipe';
import { TMailListItem } from '../../comon';
import { DatePipe } from '@angular/common';

describe('SearchmailPipe', () => {
  let pipe; 
  let mockUserCards: TMailListItem[];

  beforeEach(() => {
    mockUserCards = [
      {
        Id: "1",
        Subject: "asdfsdf",
        InDate: Date.parse('2017-11-20 23:31:17'),
        Text: "sdfadsf",
        User: {
          Email: "test@gmai.com",
          F: "",
          I: "",
          Id: 32,
          O: ""
        }
      },
      {
        Id: "2",
        Subject: "RE:Это первое письмо",
        InDate: Date.parse('2017-04-18 18:19:20'),
        Text: "Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \"active\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",
        User: {
          Email: "testmail6@test.ru",
          F: "Синицын",
          I: "Юрий",
          Id: 33,
          O: "Николаевич"
        }
      },
      {
        Id: "3",
        Subject: "Это письмо не надо открывать",
        InDate: Date.parse('2017-06-18 13:01:00'),
        Text: "The empty path in the fourth route represents the default path for the application, the place to go when the path in the URL is empty, as it typically is at the start. This default route redirects to the route for the /heroes URL and, therefore, will display the HeroesListComponent. The ** path in the last route is a wildcard. The router will select this route if the requested URL doesn't match any paths for routes defined earlier in the configuration. This is useful for displaying a \"404 - Not Found\" page or redirecting to another route.",
        User: {
          Email: "testmail3@test.ru",
          F: "Ватутин",
          I: "Михаил",
          Id: 34,
          O: "Олегович"
        }
      },
      {
        Id: "4",
        Subject: "Открой это письмо! Ты вииграл МИЛЛИОН!!!",
        InDate: Date.parse('2016-12-10 14:08:56'),
        Text: "The order of the routes in the configuration matters and this is by design. The router uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes. In the configuration above, routes with a static path are listed first, followed by an empty path route, that matches the default route. The wildcard route comes last because it matches every URL and should be selected only if no other routes are matched first. If you need to see what events are happening during the navigation lifecycle, there is the enableTracing option as part of the router's default configuration. This outputs each router event that took place during each navigation lifecycle to the browser console. This should only be used for debugging purposes. You set the enableTracing: true option in the object passed as the second argument to the RouterModule.forRoot() method.",
        User: {
          Email: "testmail5@test.ru",
          F: "Петров",
          I: "Максим",
          Id: 35,
          O: "Борисович"
        }
      }
    ];
    pipe = new SearchmailPipe(new DatePipe('en-US'));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform null array', () => {
    expect(pipe.transform(null, "петров")).toEqual([]);
  }); 

  it('should transform null string', () => {
    expect(pipe.transform(mockUserCards, "")).toEqual(mockUserCards);
  });   

  it('should transform Not Use Value', () => {
    expect(pipe.transform(mockUserCards, "sffsgvg")).toEqual([]);
  });

  it('should transform Text', () => {
    expect(pipe.transform(mockUserCards, "order of the routes")).toEqual([mockUserCards[3]]);
  });   

  it('should transform Subject', () => {
    expect(pipe.transform(mockUserCards, "письмо")).toEqual([mockUserCards[1], mockUserCards[2], mockUserCards[3]]);
  });              

  it('should transform Email', () => {
    expect(pipe.transform(mockUserCards, "gmai")).toEqual([mockUserCards[0]]);
    expect(pipe.transform(mockUserCards, "testmail5@test.ru")).toEqual([mockUserCards[3]]);
  });          

  it('should transform FIO', () => {
    expect(pipe.transform(mockUserCards, "синиц")).toEqual([mockUserCards[1]]);
    expect(pipe.transform(mockUserCards, "мих")).toEqual([mockUserCards[2]]);
    expect(pipe.transform(mockUserCards, "бор")).toEqual([mockUserCards[3]]);
    expect(pipe.transform(mockUserCards, "синицын Юрий")).toEqual([mockUserCards[1]]);
  });            

  it('should transform Date', () => {
    expect(pipe.transform(mockUserCards, "20.11.2017 23:31:17")).toEqual([mockUserCards[0]]);
    expect(pipe.transform(mockUserCards, "18.04.2017 18:19:20")).toEqual([mockUserCards[1]]);
  });  
});