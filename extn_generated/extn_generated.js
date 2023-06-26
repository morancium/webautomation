describe("Recording 6/20/2023 at 10:25:16 AM", function () {
it("tests Recording 6/20/2023 at 10:25:16 AM", function (browser) {
  browser.windowRect({width: 1049, height: 792})
  .navigateTo("https://www.youtube.com/")
  .click("#center input")
  .setValue("#center input", "nightwatch")
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
  .click("#center input")
  .setValue("#center input", "nightwatch api")
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
  .click("div:nth-of-type(3) > ytd-video-renderer:nth-of-type(1) ytd-thumbnail > a img")
  .click("ytd-watch-metadata yt-smartimation > div > div:nth-of-type(1) div.yt-spec-touch-feedback-shape__fill")
  .click("ytd-watch-metadata yt-attributed-string > span")
  .click("ytd-watch-flexy ytd-text-inline-expander")
  .perform(function() {
            const actions = this.actions({async: true});

            return actions
            .keyDown(this.Keys.CONTROL);
          })
  .perform(function() {
            const actions = this.actions({async: true});

            return actions
            .keyUp(this.Keys.CONTROL);
          })
  .end();
  });
});
