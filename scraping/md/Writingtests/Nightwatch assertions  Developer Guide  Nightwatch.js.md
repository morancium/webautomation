### Overview

Nightwatch provides built-in extendable `assert`/`verify` library as two namespaces containing the same methods that perform assertions on elements.

### .assert

With the `.assert` namespace, when an assertion fails, the test ends, thus skipping all other assertions in the test.

The following example code snippet uses the `assert` namespace to assert whether an element with class `non_existing` is visible on the page. If the assertion fails, the test ends:  

```
    browser.element.find('selector').assert.visible('.non_existing');
  
```

### .verify

With the `.verify` namespace, when an assertion fails, the test logs the failure and continues with other assertions in the test.

The following example code snippet uses the `verify` namespace to check whether an element with class `non_existing` is visible on the page. If the assertion fails, a failure is logged and the test continues:  

```
browser.verify.visible('.non_existing');
```

### Basic Assertions

The methods from the [Node.js assert module](https://nodejs.org/api/assert.html) are also available on the `.assert`/`.verify` namespaces to be used as required.

### Negate (".not") Assertions

Starting Nightwatch version **1.3**, all the assertions including custom-defined assertions have a `".not"` counterpart, which can be used to assert the opposite condition.

Assertions such as, \`elementNotPresent\`, \`cssClassNotPresent\`, \`hidden\` are obsolete and deprecated.

The following example code snippet shows the `".not"` assertions:

_tests/sampleTest.js_

```
describe('Demo .not assertion', function() {
  it('demo test', function(browser) {
    browser.init();
    
    browser
      .element.find('.not_present')
      .assert.not.elementPresent();
    
    browser 
      .assert.not.urlContains('http://');
    
    // ...
  })
})
```

### Automatic Retries

By default, Nightwatch automatically retries failed assertions for up to `5000` milliseconds. This can be configured by setting the `retryAssertionTimeout` (in milliseconds) property in your `globals` object in your `nightwatch.json` file. Check out [working with test globals](https://v2.nightwatchjs.org/guide/concepts/test-globals.html) for more details.

If the given timeout is reached, the test runner stops retrying and marks the assertion as failed.

The following example code snippet shows the `retryAssertionTimeout` property defined in the configuration file:

_nightwatch.conf.js_

```
{
  src_folders: ['tests'],
  
  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org',
      
      globals: {
        myGlobalVar: 'some value',
        retryAssertionTimeout: 5000
      }
    }
  }
}
```

### Expect assertions

In addition to the `assert` namespace, the Nightwatch API supports out of the box a BDD-style `expect` assertion library which greatly improves the flexibility as well as readability of the assertions.

The `expect` assertions use a subset of the `Expect` api from the [Chai framework](https://chaijs.com/api/bdd/) and at this point are available for elements, cookies, page title, and url.

#### Example

Here a basic example that uses various `expect.element([...])` assertions:

_tests/sampleTest.js_

```
module.exports = {
  'Demo test Ecosia.org': function (browser) {
    browser.url('https://www.ecosia.org/');
    
    // expect element header to be present in 1000ms
    expect(browser.element.find('header')).to.be.present.before(1000);
    
    browser.end();
  }
};
```

#### Expecting a specific elements count

In this example, the test is expecting that a specified number of elements exist on the page, using the `expect.elements([...]).count` assertion:

_tests/sampleTest.js_

```
module.exports = {
  'demo test ecosia.org'(browser) {
    browser
      .url('https://www.ecosia.org/')
      .expect(browser.element.findAll('section').count()).to.equal(5);
  },
  
  after(browser) {
    browser.end();
  }
};
```

The `expect` interface provides a much more flexible and fluid language for defining assertions, significantly improved over the existing `assert` interface. The only downside is that it's not possible to chain assertions anymore.

For a complete list of available `expect` assertions, refer to the [API docs](https://nightwatchjs.org/api/#expect-api).