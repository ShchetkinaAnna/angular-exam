import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../main.service';
import { HttpErrorResponse } from '@angular/common/http';

export type TFolder = {
  Name: string,
  Id: string
};

export type TMailListItem = {
  Id: string,
  Subject: string,
  InDate: string
};

export type TMailMessage = {
  Id: string,
  Subject: string,
  InDate: string,
  Text: string
};

type TMailFolderData = {
  idFolder: string,
  MailList: Array<TMailListItem>
};

@Injectable()
export class MailserviceService {
  private USER_CONTROLLER_URL: string;

  private mailMessageData: Array<TMailMessage> = [
    {Id: "qwerqwe", Subject: "Это первое письмо", InDate: "2017-10-11", Text: "The Angular Router (\"the router\") borrows from this model. It can interpret a browser URL as an instruction to navigate to a client-generated view. It can pass optional parameters along to the supporting view component that help it decide what specific content to present. You can bind the router to links on a page and it will navigate to the appropriate application view when the user clicks a link. You can navigate imperatively when the user clicks a button, selects from a drop box, or in response to some other stimulus from any source. And the router logs activity in the browser's history journal so the back and forward buttons work as well."},
    {Id: "asdfadf", Subject: "Это еще одно письмо", InDate: "2017-10-11", Text: "A routed Angular application has one singleton instance of the Router service. When the browser's URL changes, that router looks for a corresponding Route from which it can determine the component to display. A router has no routes until you configure it. The following example creates four route definitions, configures the router via the RouterModule.forRoot method, and adds the result to the AppModule's imports array."},
    {Id: "12341234", Subject: "Это какое-то непонятное письмо", InDate: "2017-10-11", Text: "The appRoutes array of routes describes how to navigate. Pass it to the RouterModule.forRoot method in the module imports to configure the router. Each Route maps a URL path to a component. There are no leading slashes in the path. The router parses and builds the final URL for you, allowing you to use both relative and absolute paths when navigating between application views. The :id in the second route is a token for a route parameter. In a URL such as /hero/42, \"42\" is the value of the id parameter. The corresponding HeroDetailComponent will use that value to find and present the hero whose id is 42. You'll learn more about route parameters later in this guide. The data property in the third route is a place to store arbitrary data associated with this specific route. The data property is accessible within each activated route. Use it to store items such as page titles, breadcrumb text, and other read-only, static data. You'll use the resolve guard to retrieve dynamic data later in the guide."},
    {Id: "qaweae", Subject: "Это письмо не надо открывать", InDate: "2017-10-11", Text: "The empty path in the fourth route represents the default path for the application, the place to go when the path in the URL is empty, as it typically is at the start. This default route redirects to the route for the /heroes URL and, therefore, will display the HeroesListComponent. The ** path in the last route is a wildcard. The router will select this route if the requested URL doesn't match any paths for routes defined earlier in the configuration. This is useful for displaying a \"404 - Not Found\" page or redirecting to another route."},
    {Id: "aw4wet5grg45", Subject: "Открой это письмо! Ты вииграл МИЛЛИОН!!!", InDate: "2017-10-11", Text: "The order of the routes in the configuration matters and this is by design. The router uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes. In the configuration above, routes with a static path are listed first, followed by an empty path route, that matches the default route. The wildcard route comes last because it matches every URL and should be selected only if no other routes are matched first. If you need to see what events are happening during the navigation lifecycle, there is the enableTracing option as part of the router's default configuration. This outputs each router event that took place during each navigation lifecycle to the browser console. This should only be used for debugging purposes. You set the enableTracing: true option in the object passed as the second argument to the RouterModule.forRoot() method."},
    {Id: "123qwerqwe", Subject: "RE:Это первое письмо", InDate: "2017-10-11", Text: "Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \"active\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element."},
    {Id: "asr54asdfadf", Subject: "RE:Это еще одно письмо", InDate: "2017-10-11", Text: "You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route."}
  ];

  constructor(@Inject(API_URL) private API_URL: string,
    private _http: HttpClient) { 
  this.USER_CONTROLLER_URL = this.API_URL + 'TestUserController/';
}

  public getFolders() {
    let _url: string = `${this.USER_CONTROLLER_URL}GetFolders`;
    return this._http.get(_url);
  }

  public getMessages(folderId: string) {
    let _url: string = `${this.USER_CONTROLLER_URL}GetMessages/${folderId}`;
    return this._http.get(_url);
  }

  public getMessage(messageId: string) {
    let filtered = this.mailMessageData.filter((elem: TMailMessage) => elem.Id == messageId);
    return filtered.length > 0 ? filtered[0] : null;
  }

  public handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }

}
