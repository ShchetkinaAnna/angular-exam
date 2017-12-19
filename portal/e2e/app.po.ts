import { browser, by, element } from 'protractor';

export class AppLoginPage {
  fs: any = require('fs');

  navigateTo() {
    browser.driver.manage().window().maximize();
    browser.get('/');
  }

  getLoginBlock() {
    return element(by.className('mainL'));
  }

  getLogin() {
    return element(by.css('.mainL input["formcontrolname"="login"]'));
  }

  getPassword() {
    return element(by.css('.mainL input["formcontrolname"="password"]'));
  }  

  getButton() {
    return element(by.className('btnSave'));
  } 

  getScreen() {
    let self = this;
    browser.takeScreenshot().then(function (png) {
      self.writeScreenShot(png, 'test_screens\\login_test_screen.png');
     }
    );

    var width = 800;
    var height = 600;
    browser.driver.manage().window().setSize(width, height).then(function () {
      browser.takeScreenshot().then(function (png) {
        self.writeScreenShot(png, 'test_screens\\login_test_screen_small.png');
       }
      );
    });
  }

  writeScreenShot(data, filename) {
    if (this.fs.existsSync(filename)) {
      this.fs.unlinkSync(filename);
    }
    var stream = this.fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }
}
