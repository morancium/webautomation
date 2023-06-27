Another useful concept that Nightwatch provides is test globals. In its most simple form, it is a dictionary of name-value pairs which is defined in your configuration file.

Globals can be defined either as a `"globals"` property or as an external file which is specified as the `"globals_path"` property.

Here's an example definition using the `"globals"` property in `nightwatch.json`:

_nightwatch.conf.js_

```
{
  "src_folders": [],

  "globals": {
    "myGlobalVar" : "some value",
    "otherGlobal" : "some other value"
  },

  "test_settings": {
    "default": {
      "launch_url": "https://nightwatchjs.org",
    }
  }
}
```

Like the `launch_url` property, the `globals` object is made available directly on the Nightwatch api which is passed to the tests.

_tests/sampleTest.js_

```
module.exports = {
  'Demo test' : function (browser) {
    console.log(browser.globals.myGlobalVar); // myGlobalVar == "some value"
  }
};
```

### Pre-defined Globals

The following global properties can be used to control the behaviour of the test runner and are defined with the following default values:

_nightwatch/globals.js_

```
module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure: true,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 500,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout : 5000,

  // since 1.4.0 – this controls whether to abort the test execution when an element cannot be located; an error
  // is logged in all cases, but this also enables skipping the rest of the testcase;
  // it's being used in element commands such as .click() or .getText()
  abortOnElementLocateError: false,
  
  // this will cause waitFor commands on elements to throw an error if multiple
  // elements are found using the given locate strategy and selector
  throwOnMultipleElementsReturned: false,

  // By default a warning is printed if multiple elements are found using the given locate strategy
  // and selector; set this to true to suppress those warnings
  suppressWarningsOnMultipleElementsReturned: false,

  // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout : 10000,

  // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
  // or an error is thrown
  unitTestsTimeout : 2000,

  // controls the timeout value for when executing the global async reporter. Expects the done() callback to be 
  // invoked within this time or an error is thrown
  customReporterCallbackTimeout: 20000,

  // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions 
  // until a given timeout is reached, before the test runner gives up and fails the test.
  retryAssertionTimeout: 5000,

  // Custom reporter
  reporter: function(results, done) {
    // do something with the results
    done(results);
  }
}
```

### Environment Specific Globals

Like other test settings, globals have the ability to be overwritten per test environment. Consider this configuration:

_nightwatch.json_

```
{
  "src_folders": [],

  "test_settings": {
    "default": {
      "launch_url": "https://nightwatchjs.org",

      "globals": {
        "myGlobalVar" : "some value",
        "otherGlobal" : "some other value"
      }
    },

    "integration": {
      "globals": {
        "myGlobalVar" : "integrated global"
      }
    }
  }
}
```

If we still pass the `--env integration` option to the runner, then our globals object will look like below:

```
nightwatch --env integration
```

```
module.exports = {
  'Demo test' : function (browser) {
    console.log(browser.globals.myGlobalVar); // myGlobalVar == "integrated global"
  }
};
```