### Overview

[XPath](https://developer.mozilla.org/en-US/docs/Web/XPath) stands for XML Path Language. It uses a non-XML syntax to provide a flexible way of finding elements in a web page.

Nightwatch supports XPath selectors in locating elements. CSS selectors are used by default if no strategy is specified, and there are several ways in which to make use of XPath, depending on the use case:

### 1\. Using .useXpath() command

Using `useXpath()` command, as seen in the example below, is a convenient way. You don't need to bother with using multiple parameters on element commands, or you may have more than one subsequent element commands/assertions in the same test which use XPath expressions. To switch back to CSS, call `useCss()`.

_tests/sampleTest.js_

```
module.exports = {
  demoTest: function (browser) {
    browser
      .useXpath() // every selector now must be xpath
      .click("//tr[@data-recordid]/span[text()='Search Text']")
      .useCss() // we're back to CSS now
      .setValue('input[type=text]', 'nightwatch')
  }
};
```

### 2\. Find elements with Xpath selectors

You can also use Xpath directly on a single command or assertion, by either passing an [element selector object](https://nightwatchjs.org/guide/working-with-page-objects/#element-properties), or specifying `'xpath'` strategy as first argument:

_tests/sampleTest.js_

```
module.exports = {
  demoTest(browser) {
    // using element selector objects
    browser.click({
      selector: '//tr[@data-recordid]/span[text()='Search Text']',
      locateStrategy: 'xpath'
    });
    
    // specifying xpath strategy as first argument
    browser.click('xpath', '//tr[@data-recordid]/span[text()='Search Text']');
}
};
```

### 3\. Always use XPath by default

If you mostly are using XPath expressions and you want to avoid configuring the strategy in your tests all the time, you can also use XPath by default by setting the property `use_xpath: true` in your [config](https://nightwatchjs.org/gettingstarted/configuration/#extended-settings).

_nightwatch.json_

```
{
  "use_xpath": true
}
```