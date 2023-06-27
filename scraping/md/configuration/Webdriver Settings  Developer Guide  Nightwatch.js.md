Below are a number of options for the Webdriver service. Nightwatch can start and stop the Webdriver process automatically which is very convenient as you don't have to manage this yourself and focus only on the tests.

If you'd like to enable this, set `start_process` to `true` and specify the location of the binary file inside `server_path`.

| Name | type | default | description |
| --- | --- | --- | --- |
| `start_process` | boolean | false | When this is enabled, the Webdriver server is run in background in a [child process](https://nodejs.org/api/child_process.html) and started/stopped automatically.  
Nightwatch includes support for managing Chromedriver, Geckodriver (Firefox), Safaridriver, and Selenium Server. Please refer to the [Install Webdriver](https://v2.nightwatchjs.org/gettingstarted/installation/#webdriver-service) section for details. |
| `server_path` | string | none | Only useful if `start_process` is enabled. |
| `host` | string |  | Only needed when the Webdriver service is running on a different machine. |
| `port` | integer |  | The port number on which the Webdriver service will listen and/or on which Nightwatch will attempt to connect. |
| `ssl` | boolean |  | Should be set to `true` if connecting to a remote (cloud) service via HTTPS. Also don't forget to set port to 443. |
| `log_path` | string|boolean | none | The location where the Webdriver service log file `output.log` file will be placed. Defaults to current directory.  
To disable Webdriver logging, set this to `false` |
| `log_file_name` | string|none | none | By default, the log file name will be the same as the testsuite file name, but a different filename can be specified as well. |
| `cli_args` | object | none | List of cli arguments to be passed to the Webdriver process. This varies for each Webdriver implementation. |
| `keep_alive` | boolean|object | false | Enable [HTTP Keep-Alive](https://nodejs.org/api/http.html#http_new_agent_options). If set to `true` the keepAlive option is enabled with default settings (`keepAliveMsecs` = 3000).  
If set to an object, can specify specify the `keepAliveMsecs` value.
Example: `"keep_alive" : {"enabled" : true, "keepAliveMsecs" : 2000}`

 |
| `timeout_options` | object | timeout: 60000  
retry\_attempts: 0 | Requests to the Webdriver service will timeout in `timeout` miliseconds; a retry will happen `retry_attempts` number of times.

Example:  
`{timeout: 15000, retry_attempts: 5}`

 |
| `status_poll_interval`  
since v1.2.2 | integer | 100 | Interval (in ms) to use between status ping checks when checking if the Webdriver server is up and running |
| `max_status_poll_tries`  
since v1.2.2 | integer | 5 | Maximum number of ping status check attempts when checking if the Webdriver server is up and running before returning a timeout error. |
| `process_create_timeout`  
since v1.2.2 | integer | 120000 | The entire time (in ms) to wait for the Node.js process to be created and running (default is 2 min), including spawning the child process and checking the status |
| `username` | string | none | Usually only needed for cloud testing Selenium services. In case the server requires credentials this username will be used to compute the `Authorization` header.

The value can be also an environment variable, in which case it will look like this:  
`"username" : "${SAUCE_USERNAME}"`

 |
| `access_key` | string | none | This field will be used together with `username` to compute the `Authorization` header.

Like `username`, the value can be also an environment variable:  
`"access_key" : "${SAUCE_ACCESS_KEY}"`

 |
| `proxy` | string | none | Proxy requests to the Webdriver (or Selenium) service. http, https, socks(v5), socks5, sock4, and pac are accepted.  
Uses [proxy-agent](https://www.npmjs.com/package/proxy-agent) which needs to be installed as a separate package from NPM.

Example: `http://user:pass@host:port`

 |
| `default_path_prefix` | string |  | Needed sometimes when using a Selenium Server. The prefix to be added to to all requests (e.g. /wd/hub). |

### Recommended content

-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)