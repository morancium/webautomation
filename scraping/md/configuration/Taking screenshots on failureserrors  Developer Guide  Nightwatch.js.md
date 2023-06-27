If test failures or errors exist and screenshots are enabled, then screenshots are taken prior to sending the `DELETE`.

To enable screenshots for test failures/errors, set the `screenshots` property in your `nightwatch.json`, under the desired `test_settings` environment. E.g.:

_nightwatch.json_

```

{
  "test_settings" : {
    "default" : {
      "screenshots" : {
        "enabled" : true,
        "on_failure" : true,
        "path" : "./screens"
      }
    }
  }
}
```

### Recommended content

-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)