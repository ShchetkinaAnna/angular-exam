import { AppLoginPage } from './app.po';

describe('portal App', () => {
  let page: AppLoginPage;

  beforeEach(() => {
    page = new AppLoginPage();
  });

  it('should display login', () => {
    page.navigateTo();
    expect(page.getLoginBlock().isPresent()).toBe(true);

    page.getLogin().sendKeys("testLogin");
    page.getPassword().sendKeys("testPassword");
    page.getButton().click();

    page.getScreen();
  });
});
