describe("Recording 6/21/2023 at 8:01:38 AM", function () {
it("tests Recording 6/21/2023 at 8:01:38 AM", function (browser) {
  browser.windowRect({width: 1519, height: 378})
  .navigateTo("chrome://new-tab-page/")
  .navigateTo("https://codeforces.com/")
  .setValue("#handleOrEmail", "ashishsingh1501@gmail.com")
  .doubleClick("#header div:nth-of-type(2) > a:nth-of-type(1)")
  .doubleClick("#handleOrEmail")
  .click("#handleOrEmail")
  .setValue("#handleOrEmail", "morancium")
  .click("#password")
  .click("tr:nth-of-type(2)")
  .setValue("#password", "************")
  .click("tr:nth-of-type(4) input")
  .click("div.lang-chooser > div:nth-of-type(2) > a:nth-of-type(1)")
  .click("div:nth-of-type(7) a:nth-of-type(3)")
  .end();
  });
});