module.exports = {
    'Demo'(browser) {
        browser
            .url('https://www.youtube.com/')
            .setValue('input[id="search"]',"vitaracharts")
            .click('button[id="search-icon-legacy"]')
            .pause(2000)
            .click('a[id="video-title"]')
            .pause(2000)
            .click('button[class="ytp-play-button ytp-button"]')
            .click('div[id="description"]')
            .click('button[class="yt-spec-button-shape-next]')
            // .click('div[id="placeholder-area"]')
            .saveScreenshot("tests_output/img.png")
    }
};