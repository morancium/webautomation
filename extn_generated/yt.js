describe("Recording 6/21/2023 at 7:37:17 AM", function () {
    it("tests Recording 6/21/2023 at 7:37:17 AM", function (browser) {
      browser.windowRect({width: 1065, height: 760})
      .navigateTo("chrome://new-tab-page/")
      .navigateTo("https://www.youtube.com/")
      .click("#masthead-container input")
      .setValue("#center input", "hello kitty")
      .perform(function() {
                const actions = this.actions({async: true});
    
                return actions
                .keyDown(this.Keys.ENTER);
              })
      .perform(function() {
                const actions = this.actions({async: true});
    
                return actions
                .keyUp(this.Keys.ENTER);
              })
      .click("a > div:nth-of-type(2) img")
      .click("ytd-watch-flexy ytd-text-inline-expander > tp-yt-paper-button:nth-of-type(1)")
      .end();
      });
    });
    