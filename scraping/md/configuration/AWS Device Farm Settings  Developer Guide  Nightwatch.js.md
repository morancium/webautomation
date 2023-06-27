[Aws Device Farm](https://aws.amazon.com/device-farm/) is one of cloud testing platforms that allows users to do remove browser testing using selenium. It is possible to use Nightwatch with AWS using some tweaks to the auto-generated configuration file `nightwatch.conf.js`.

### Create a new project in AWS Device Farm

Once you have an account with AWS, you can go to the console and navigate to Device Farm Dashboard. From the Dashboard select _Desktop Browser Testing>Projects_ and create a new project there. Once you have a project setup, note down the _Project ARN_.

### Setup aws-cli

If you don't have already, install [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and login to aws using the cli. This will setup the credentials directory which will be needed by the node.js library used in the configuration.

```
aws configure
```

### Install aws-sdk

Install the aws-node sdk in the same folder where nightwatch is setup.

```
npm install  aws-sdk
```

### Configuration AWS

Use this configuration as a template to connect to AWS Device Farm. Make sure up update the `PROJECT_ARN`.

_nightwatch.conf.js_

```
let AWS = require("aws-sdk");
let PROJECT_ARN = "<PROJECT_ARN>";
let devicefarm = new AWS.DeviceFarm({ region: "us-west-2" });


module.exports = (async function() {
 const testGridUrlResult = await devicefarm.createTestGridUrl({
     projectArn: PROJECT_ARN,
     expiresInSeconds: 86400
 }).promise();
 const testGridUrl = new URL(testGridUrlResult.url);
 
 return {
   // An array of folders (excluding subfolders) where your tests are located;
   // if this is not specified, the test source must be passed as the second argument to the test runner.
   src_folders: [],
   
   // See https://nightwatchjs.org/guide/working-with-page-objects/using-page-objects.html
   page_objects_path: ['node_modules/nightwatch/examples/pages/'],
   
   // See https://nightwatchjs.org/guide/extending-nightwatch/custom-commands.html
   custom_commands_path: ['node_modules/nightwatch/examples/custom-commands/'],
   
   // See https://nightwatchjs.org/guide/extending-nightwatch/custom-assertions.html
   custom_assertions_path: '',
   
   // See https://nightwatchjs.org/guide/extending-nightwatch/plugin-api.html
   plugins: [],
   
   // See https://nightwatchjs.org/guide/#external-globals
   globals_path : '',
   
   webdriver: {},
   
   test_settings: {
     default: {
       disable_error_log: false,
       launch_url: 'https://nightwatchjs.org',
       
       screenshots: {
         enabled: false,
         path: 'screens',
         on_failure: true
       },
       
       desiredCapabilities: {
         browserName : 'chrome'
       },
     },
     
     awsDeviceFarm: {
       selenium: {
         host: testGridUrl.host,
         default_path_prefix: testGridUrl.pathname,
         port: 443
       },
       
       webdriver: {
         timeout_options: {
           timeout: 150000,
           retry_attempts: 3
         },
         ssl: true,
         keep_alive: true,
         start_process: false
       }
     }
   }
 }
})();
```

### Recommended content

-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)