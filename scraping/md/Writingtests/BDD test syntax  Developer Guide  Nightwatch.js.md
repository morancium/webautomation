### Overview

Starting with Nightwatch version **1.3**, you can use the popular BDD interfaces for writing tests. You don't need additional configuration to use BDD interfaces. These are now supported out of the box.

You can also run tests written in BDD describe and Exports interfaces together. Prior to this version, you had to use the Mocha test runner for enabling this functionality, which is now possible without additional plugins or libraries.

The BDD interface in Nightwatch provides the following functions:

-   `describe()` / `context()`
-   `test()` / `it()` / `specify()`
-   `before()`
-   `after()`
-   `beforeEach()`
-   `afterEach()`

Nightwatch doesn't support nested ``describe`/`context`` declarations currently. You can only use `describe` to define the name for the test suite.

### Example

```
describe('Ecosia', function() {
  
  // test() and specify() is also available
  
  it('demo test', function(browser) {
    browser
      .url('https://www.ecosia.org/')
      .setValue('input[type=search]', 'nightwatch')
      .click('button[type=submit]')
      .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  });
});
```

```

import {NightwatchTests} from 'nightwatch';

const Ecosia: NightwatchTests = {
  'demo test': () => {
    browser
      .url('https://www.ecosia.org/')
      .setValue('input[type=search]', 'nightwatch')
      .click('button[type=submit]')
      .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  }
};

export default Ecosia;
```

In addition to the usual BDD syntax, Nightwatch provides a few ways for defining own behaviour.

### Test suite-specific capabilities

```

describe('homepage test with describe', function() {
  // testsuite specific capabilities
  this.desiredCapabilities = {
    browserName: 'firefox'
  };
  
  it('...', function() {...});
});
```

#### Test suite-specific tags

```

describe('homepage test with describe', function() {
  // defining tags using bdd
  this.tags = ['login', 'authentication''];
  
  it('...', function() {...});
});
```

#### Test suite-specific retries

```

describe('homepage test with describe', function() {
  // how many time to retry a failed testcase inside this test suite
   this.retries(3);
   
   // how many times to retry the current test suite in case of an assertion failure or error
   this.suiteRetries(2);
   
   it('...', function() {...});
});
```

### Complete BDD syntax

#### Retrieving settings

All current settings are available via `this.settings`.

```
describe('homepage test with describe', function() {
  console.log('Settings', this.settings);
  
  it('...', function() {
    // ...
  });
});
```

#### Desired capabilities

Testsuite specific capabilities.

```
describe('homepage test with describe', function() {
  this.desiredCapabilities = {};
  
  it('...', function() {
    // ...
  });
});
```

#### Unit tests

Enable this if the current test is a unit/integration test (i.e. no Webdriver session will be created);

```
describe('homepage test with describe', function() {
   this.unitTest = true;
   
   it('...', function() {
     // ...
   });
});
```

#### Ending the session on fail

Set this to `false` if you'd like the browser window to be kept open in case of a failure or error (useful for debugging).

```
describe('homepage test with describe', function() {
   this.endSessionOnFail = false
   
   it('...', function() {
     // ...
   });
});
```

#### Skip rest of test cases on fail

Set this to `false` if you'd like the rest of the test cases/test steps to be executed in the event of an assertion failure/error

```
describe('homepage test with describe', function() {
   this.skipTestcasesOnFail = true
   
   it('...', function() {
     // ...
   });
});
```

#### Disable/skip a test suite

Set this to true if you'd like this test suite to be skipped by the test runner

```
describe('homepage test with describe', function() {
   this.disabled = true
   
   it('...', function() {
     // ...
   });
});
```

#### Retries

```
describe('homepage test with describe', function() {
  this.retries(3);
  this.suiteRetries(2);
  
  it('...', function() {
    // ...
    });
});
```

#### Control assertion timeout

Control the assertion and element commands timeout until when an element should be located or assertion passed

```
describe('homepage test with describe', function() {
  this.timeout(1000)
  
  it('...', function() {
    // ...
  });
});
```

#### Control polling interval

Control the polling interval between re-tries for assertions or element commands

```
describe('homepage test with describe', function() {
  this.retryInterval(100);
  
  it('...', function() {
    // ...
  });
});
```

#### Define tags

Define tags for this test suite.

```
describe('homepage test with describe', function() {
  this.tags = ['login']
  
  it('...', function() {
    // ...
  });
});
```

#### Test functions and hooks

```
describe('homepage test with describe', function() {
  
  before(function(browser) {
    this.homepage = browser.page.home();
  });
  
  it('startHomepage', () => {
    this.homepage.navigate();
    this.homepage.expect.section('@indexContainer').to.be.not.visible;
  });
  
  
  // Run only this testcase
  //*
  it.only('startHomepage', () => {
    this.homepage.navigate();
  });
  *// 
  
  // skipped testcase: equivalent to: test.skip(), it.skip(), and xit()
  xtest('async testcase', async browser => {
    const result = await browser.getText('#navigation');
    console.log('result', result.value)
  });
  
  test('version dropdown is enabled', browser => {
    const navigation = this.homepage.section.navigation;
    const navbarHeader = navigation.section.navbarHeader;
    
    navbarHeader.expect.element('@versionDropdown').to.be.enabled;
  });
  
  after(browser => browser.end());
});
```

### Example Github repo

We've put together a complete [Github template repo](https://github.com/nightwatchjs/nightwatch-examples) with several examples which we're periodically updating, including a Github Actions workflow for you to get started with.

[![nightwatch-examples on Github](https://opengraph.githubassets.com/default/nightwatchjs/nightwatch-examples)](https://github.com/nightwatchjs/nightwatch-examples)

### Recommended content

-   [Exports test syntax](https://nightwatchjs.org/guide/writing-tests/test-syntax-exports.html)
-   [Using async/await](https://nightwatchjs.org/guide/writing-tests/using-es-6-async-await.html)
-   [Finding & interacting with DOM Elements](https://nightwatchjs.org/guide/writing-tests/finding-interacting-with-dom-elements.html)