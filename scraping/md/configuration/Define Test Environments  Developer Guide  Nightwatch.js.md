### Overview

The environments are located under the `"test_settings"` dictionary in the configuration file. A `default` environment is always required from which the other environments inherit the settings. You can overwrite any test setting for each environment as needed.

In this guide we're going to create a new test environment called `"chrome-local"` which we'll be using to run tests against the Google Chrome browser.

### Create a new test project

First, let's create a new empty project and install Nightwatch inside it:

```
mkdir ./test-project && cd ./test-project
```

Install `nightwatch` and `chromedriver` from NPM (`chromedriver` is the W3C WebDriver implementation for running tests in the Google Chrome browser):

```
npm i nightwatch chromedriver
```

Create an empty file named `nightwatch.conf.js`

```
nano nightwatch.conf.js
```

and paste the following:

_nightwatch.conf.js_

```
module.exports = {
  src_folders: ['tests'],
  
  test_settings: {
    default: {
      launch_url: 'https://home.cern',
      webdriver: {
        start_process: true,
        server_path: ''
      }
    }
  }
}
```

Test environments are referenced using the `--env` cli argument. Since we only have a `default` environment defined, attempting to reference the `chrome-local` environment will produce an error:

```
npx nightwatch --env chrome-local
```

```
~/workspace/test-project % npx nightwatch --env chrome-local
 
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│    Error: Invalid testing environment specified: chrome-local.   │
│                                                                  │
│     Available environments are:                                  │
│     [ 'default' ]                                                │
│                                                                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Define a new "chrome-local" environment

Now, open the `nightwatch.conf.js` file again and add the `chrome-local` object below the `default` one:

_nightwatch.conf.js_

```
module.exports = {
  src_folders: ['tests'],
  
  test_settings: {
    default: {
      launch_url: 'https://home.cern',
      webdriver: {
        start_process: true,
        server_path: ''
      }
    },
    'chrome-local': {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
}
```

### Run a sample test against the "chrome-local" environment

Then add a sample test inside the `tests` folder:

```
mkdir tests && nano ./tests/sample-nightwatch-test.js
```

_tests/sample-nightwatch-test.js_

```
describe('sample nightwatch test', function() {
  it('opens the browser and checks for input', function(browser) {
    browser
      .init()
      .assert.titleEquals('Home | CERN')
      .end();
  });
})
```

Run the sample and pass the `--env chrome-local` argument:

```
npx nightwatch --env chrome-local
```

The output will look a bit like this:

```
[sample nightwatch test] Test Suite
──────────────────────────────────────────────────────────────────────
ℹ Connected to ChromeDriver on port 9515 (844ms).
  Using: chrome (101.0.4951.64) on MAC OS X.


  Running opens the browser and checks for input:
────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  ℹ Loaded url https://home.cern in 5531ms
  ✔ Testing if the page title equals 'Home | CERN' (6ms)

OK. 1 assertions passed. (5.604s)
```

### Recommended content

-   [Concepts > Test environments](https://nightwatchjs.org/guide/concepts/test-environments.html)
-   [Reference > Browser Drivers > ChormeDriver](https://nightwatchjs.org/guide/browser-drivers/chrome-driver.html)
-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)