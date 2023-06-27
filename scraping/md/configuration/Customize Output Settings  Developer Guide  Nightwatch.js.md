The below settings can be used to control the output and logging when running tests.

  

| Name | type | default | description |
| --- | --- | --- | --- |
| `output_folder` | string | tests\_output | The location where the JUnit XML report files will be saved. |
| `folder_format` | string/function | undefined | Used as a prefix for HTML report folder. This can be utilised to retain HTML report across test runs |
| `disable_colors` | boolean | false | Controls whether or not to disable coloring of the CLI output globally. |
| `live_output` | boolean | false | This option is only useful when running tests in parallel. Controls whether or not to buffer the output. |
| `silent` | boolean | true | Whether to show the extended HTTP traffic command logs from the WebDriver or Selenium server. |
| `output` | boolean | true | Used to disable CLI output completely. |
| `detailed_output` | boolean | true | By default detailed assertion output is displayed while the test is running. Set this to `false` if you'd like to only see the test case name displayed and pass/fail status. Detailed output is disabled by default when running tests in parallel. |
| `disable_error_log` | boolean | false | Set this to true if you'd like to not display errors during the execution of the test (they are shown at the end always). |
| `output_timestamp` | boolean | false | Set this to true if you'd like to see timestamps next to the logging output. |
| `log_screenshot_data` | boolean | false | Used to enable showing the Base64 image data in the (verbose) log when taking screenshots. |

### Recommended content

-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)