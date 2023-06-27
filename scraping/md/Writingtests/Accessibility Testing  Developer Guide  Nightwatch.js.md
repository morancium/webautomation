### Overview

In a bid to standardise accessibility testing, W3C has released the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) to standardise the practice of making websites inclusive to all. Since v2.3, accessibility testing support is now built-in to Nightwatch, using the [`aXe-core`](https://www.npmjs.com/package/axe-core) package developed by [Deque Systems](https://www.deque.com/).

Accessibility tests audit the rendered DOM against a set of heuristics based on WCAG rules and other industry-accepted best practices. The `aXe` library has over 90 different around accessibility testing and automatically catches up to [57% of WCAG issues](https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/).

### Run all rules

Use the command [`.axeInject()`](https://nightwatchjs.org/api/axeInject.html) to inject the `aXe` library first and the simply run all accessibility tests with [`axeRun()`](https://nightwatchjs.org/api/axeRun.html) command as shown below:

```
describe('accessibility testing', function() {
  
  it('run all accessibility rules', function(browser) {
    browser
      .navigateTo('https://www.w3.org/WAI/demos/bad/after/home.html')
      .axeInject()
      .axeRun('body');
  });
});
```

### Run selected rules

Alternatively, you can choose to run only a selected tests, by passing the `rule IDs` in an array as shown below:

```
describe('accessibility testing', function() {
  
  it('accessibility rule subset', function(browser) {
    browser
      .navigateTo('https://www.w3.org/WAI/demos/bad/after/home.html')
      .axeInject()
      .axeRun('body', {
        runOnly: ['color-contrast', 'image-alt'],
      });
  });
});
```

### Disable selected rules

You can also choose to run all the tests and exclude a few tests.

```
describe('accessibility testing', function() {
  
  it('accessibility rule subset', function(browser) {
    browser
      .navigateTo('https://www.w3.org/WAI/demos/bad/after/home.html')
      .axeInject()
      .axeRun('body', {
        rules: {
            'color-contrast': {
                enabled: false
            },
            'region': {
                enabled: false
            }
        }
    });
  });
});
```

You can find the complete list of the rule IDs on the [Axe Github page](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

### Recommended content

-   [API Reference: axeInject()](https://nightwatchjs.org/api/axeInject.html)
-   [API Reference: axeRun()](https://nightwatchjs.org/api/axeRun.html)