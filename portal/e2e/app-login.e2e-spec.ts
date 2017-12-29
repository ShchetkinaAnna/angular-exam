import { AppLoginPage } from './app-login.po';

describe('portal LoginPage', () => {
  let page: AppLoginPage;

  beforeEach(() => {
    page = new AppLoginPage();
  });

  it('LoginPage Test Uncorrect', () => {
    page.navigateTo();
    expect(page.getLoginBlock().isPresent()).toBe(true);

    page.getLogin().sendKeys("testLogin");
    page.getPassword().sendKeys("testPassword");
    page.getButton().click();

    page.getScreen();
  });

  it('LoginPage Test Load', () => {
    page.navigateTo();
    expect(page.getLoginBlock().isPresent()).toBe(true);
    page.getScreen();
  });

  it('LoginPage Test Correct', () => {
    page.navigateTo();
    //TO DO
  });
});
