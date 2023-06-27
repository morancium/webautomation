If Selenium Server is being used, then the connection related settings should be placed under the `"selenium""`. If both `webdriver` and `selenium` dictionaries are present, the `selenium` options will be merged with the `webdriver` ones.

The `"selenium"` settings should also be used when configuring connections to cloud-based testing providers.

| Name | type | default | description |
| --- | --- | --- | --- |
| `start_process` | boolean | false | Whether or not to manage the Selenium process automatically. |
| `server_path` | string | none | The location of the Selenium `jar` file. This needs to be specified if `start_process` is enabled.  
E.g.: `bin/selenium-server-standalone-2.43.0.jar` |
| `log_path` | string|boolean | none | The location where the Selenium `output.log` file will be placed. Defaults to current directory.  
To disable Selenium logging, set this to `false` |
| `version2` | boolean | false | Set this to `true` if you need to use legacy Selenium Server 2. |
| `port` | integer | 4444 | The port number Selenium will listen on and/or Nighwatch will attempt to connect to. |
| `cli_args` | object | none | List of cli arguments to be passed to the Selenium process. Here you can set various options for browser drivers, such as:
-   `webdriver.firefox.profile`: Selenium will by default create a new Firefox profile for each session. If you wish to use an existing Firefox profile you can specify its name here.  
    Complete list of Firefox Driver arguments available [here](https://github.com/SeleniumHQ/selenium/wiki/FirefoxDriver).
-   `webdriver.chrome.driver`: Nightwatch can run the tests using **Chrome** browser also. To enable this you have to download the [ChromeDriver binary](http://chromedriver.storage.googleapis.com/index.html) and specify it's location here. Also don't forget to specify chrome as the browser name in the `desiredCapabilities` object.  
    More information can be found on the [ChromeDriver website](https://sites.google.com/a/chromium.org/chromedriver/).  
    
-   `webdriver.ie.driver`: Nightwatch works with **Internet Explorer** also. To enable this you have to download the [IE Driver binary](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver) and specify it's location here.
    
    Alternatively you can install the package [`iedriver`](https://www.npmjs.com/package/iedriver) from NPM.
    
    Also you need to specify "internet explorer" as the browser name in the `desiredCapabilities` object.
    

 |

### Selenium Example Configuration

Here's an example configuration as part of the `nightwatch.conf.js` which uses a local Selenium Server with support for Firefox, Chrome, and Internet Explorer.

The following **NPM** packages are assumed to be installed in the current project:

-   geckodriver
-   chromedriver
-   selenium-server
-   iedriver

```
module.exports = {
  src_folders: [],
  
  test_settings: {
    default: {
    launch_url: 'https://nightwatchjs.org'
  },
  
  selenium: {
    // Selenium Server is running locally and is managed by Nightwatch
    selenium: {
      start_process: true,
      port: 4444,
      server_path: require('selenium-server').path,
      cli_args: {
        'webdriver.gecko.driver': require('geckodriver').path,
        'webdriver.chrome.driver': require('chromedriver').path,
        'webdriver.ie.driver': process.platform === 'win32' ? require('iedriver').path : ''
      }
    },
    webdriver: {
      start_process: false
    }
  },
  
  'selenium.chrome': {
    extends: 'selenium',
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        w3c: false
      }
    }
  },
  
  'selenium.firefox': {
    extends: 'selenium',
    desiredCapabilities: {
      browserName: 'firefox'
    }
  },
  
  'selenium.ie': {
    extends: 'selenium',
    desiredCapabilities: {
      browserName: 'internet explorer'
    }
  }
}
}
```

### Recommended content

-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)