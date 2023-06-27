### Overview

Nightwatch default interface for writing tests has been the `exports` syntax, which makes it very easy to write end-to-end tests.

While this format is slightly easier to understand and work with, it is also more limited than the BDD `describe()` interface. Due to the widespread usage of `describe()` as a test format and compatibility with tools like Mocha, we recommend using the BDD `describe()`, however `exports` will also continue to work just fine.

### Example

The following basic test suite example opens the search engine [Ecosia.org](https://www.ecosia.org/), searches for the term `nightwatch`, and then verifies if the term first result is the `Nightwatch.js` website.

_tests/sampleTest.js_

```
module.exports = {
  'Demo test ecosia.org' : function(browser) {
    browser
      .url('https://www.ecosia.org/')
      .waitForElementVisible('body')
      .assert.titleContains('Ecosia')
      .assert.visible('input[type=search]')
      .setValue('input[type=search]', 'nightwatch')
      .assert.visible('button[type=submit]')
      .click('button[type=submit]')
      .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  }
};
```

  

You can also include multiple steps in a test as follows:

_tests/sampleTest.js_

```
module.exports = {
  'step one: navigate to ecosia.org': function(browser) {
    browser
      .url('https://www.ecosia.org')
      .waitForElementVisible('body')
      .assert.titleContains('Ecosia')
      .assert.visible('input[type=search]')
      .setValue('input[type=search]', 'nightwatch')
      .assert.visible('button[type=submit]');
  },
  
  'step two: click submit' : function (browser) {
    browser
      .click('button[type=submit]')
      .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  }
};
```

### Using ES Modules (ESM)

If using [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) in your project, you'll need to write your tests using the below format:

_tests/sampleTest.js_

```
exports default {
  'Demo test ecosia.org' : function(browser) {
    browser
      .url('https://www.ecosia.org/')
      .waitForElementVisible('body')
      .assert.titleContains('Ecosia')
      .assert.visible('input[type=search]')
      .setValue('input[type=search]', 'nightwatch')
      .assert.visible('button[type=submit]')
      .click('button[type=submit]')
      .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  }
};
```

You'll also need to use `nightwatch.conf.cjs` config file.

We've put together a complete [Github ESM template repo](https://github.com/nightwatchjs/nightwatch-boilerplate-esm) with several examples which we're periodically updating, including a Github Actions workflow for you to get started with.

[![nightwatch-boilerplate-esm on Github](https://opengraph.githubassets.com/default/nightwatchjs/nightwatch-boilerplate-esm)](https://github.com/nightwatchjs/nightwatch-boilerplate-esm)

### Test tags

You can also selectively target tests to run based on tags, such that a test may belong to multiple tags. For example, you might have a login test that belongs to a `login` suite as well as a `sanity` suite.

The tagging can be accomplished by adding the `@tags` property to a test module:

_tests/sampleTest.js_

```
module.exports = {
  '@tags': ['login', 'sanity'],
  'demo login test': function (browser) {
     // test code
  }
};
```

To select which tags to run, use the `--tag` command line flag:

```
nightwatch --tag login
```

Specify multiple tags as:

```
nightwatch --tag login --tag something_else
```

To skip running tests with a specific tag, use the \`--skiptags\` flag:

```
nightwatch --skiptags login
```

Or to skip multiple tags, add each tag you want to skip as comma-separated:

```
nightwatch --skiptags login,something_else
```

### Recommended content

-   [BDD test syntax](https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html)
-   [Using async/await](https://nightwatchjs.org/guide/writing-tests/using-es-6-async-await.html)