module.exports = {
  'Search and Get Video Description': function (browser) {
    // Go to YouTube
    browser.url('https://www.youtube.com');

    // Get the video name from the user (using browser.prompt)
    const videoName = browser.execute(function () {
      return prompt('Enter the name of the video you want to search for:');
    }).value;

    // Find and fill the search input
    browser.setValue('input[name="search_query"]', "Fireship");
    browser.keys(browser.Keys.ENTER);

    // Wait for the search results to load
    browser.pause(2000);

    // Click on the first video in the search results
    browser.click('#video-title');

    // Wait for the video page to load
    browser.pause(3000);

    // Get the video description
    const videoDescription = browser.getText('#description');
    console.log('Video Description:');
    console.log(videoDescription);

    // Close the browser
    browser.end();
  }
};
