Any config value in either `nightwatch.conf.js` or `nightwatch.json` can be specified as the name of an environment variables. Nightwatch will automatically populate the value, if found, from `process.env`.

[Dotenv](https://www.npmjs.com/package/dotenv) files are also supported and will be used if an `.env` file is found in the current working directory.

Here's an example from the generated `nightwatch.conf.js`:

_nightwatch.conf.js_

```
module.exports = {
  src_folders: [],
  
  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org'
    },
    
    browserstack: {
      webdriver: {
        start_process: false
      },
      
      selenium: {
        host: 'hub-cloud.browserstack.com',
        port: 443
      },
      
      desiredCapabilities: {
         browserName: 'chrome',
        'bstack:options' : {
          userName: '${BROWSERSTACK_USERNAME}',
          accessKey: '${BROWSERSTACK_ACCESS_KEY}',
        }
      }
    }
  }
}
```

### Recommended content

-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)