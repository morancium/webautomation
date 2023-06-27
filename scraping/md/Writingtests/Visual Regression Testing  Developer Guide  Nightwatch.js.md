### Overview

Visual Regression Testing (VRT) is a type of software testing technique that compares screenshots or images of a user interface before and after changes have been made to the application. The goal of VRT is to detect unintended visual changes that may have been introduced during development, such as changes to layout, colour, typography, or other visual elements.

Visual Regression Testing typically involves the following steps:

1.  Capture screenshots of the application or webpage before and after changes have been made.
2.  Compare the screenshots pixel-by-pixel to identify any differences.
3.  Review and analyse the differences to determine whether they are intentional or unintentional.
4.  Approve changes if they are intentional

### How does it work?

Nightwatch uses [JIMP](https://www.npmjs.com/package/jimp), a Javascript image processing library with no native dependencies, to do the image comparison.

Nightwatch logic:

1.  Waits for the elements to be present
2.  Takes a screenshot
3.  Compares screenshot with baseline
4.  Displays visual differences between the current screenshots and baseline in the VRT report

### Installation

#### Step 1

Install the plugin with this command:

```
npm i @nightwatch/vrt --save-dev
```

#### Step 2

Update the Nightwatch configuration to add the plugin to the list

_nightwatch.conf.js_

```
module.exports = {
  plugins: ['@nightwatch/vrt']
  // other nightwatch settings...
}
```

### Write visual regression tests

In order to use `nightwatch-vrt`, you only need to invoke the `screenshotIdenticalToBaseline` assertion and pass a css selector for the DOM element to compare. You may also pass a custom filename, `visual_regression_settings` overrides, and a custom log message.

The `screenshotIdenticalToBaseline` takes 4 parameters as an input:

1.  `selector` - Identifies the element that will be captured in the screenshot
2.  `fileName` - Optional file name for this screenshot; defaults to the selector
3.  `settings` - Optional settings to override the defaults and `visual_regression_settings`
4.  `message` - Optional `message` for nightwatch to log upon completion

E.g.:

_vrt-demo.js_

```
describe('VRT demo test', function() {
    it('Test Google UI loads correctly', function(browser) {
        browser
            .navigateTo('https://www.google.co.uk')
            .assert.screenshotIdenticalToBaseline('body',  /* Optional */ 'custom-name', {threshold: 0.0}, 'VRT custom-name complete.')
            .end()
    })
})
```

The first time a test is run, a baseline screenshot will be created and stored on disk. You should always register the baseline screenshot. Further executions of this test will compare against this baseline.

### Visual Regression Settings

Nightwatch VRT ships with carefully thought through default settings. Here is the list:

1.  generate\_screenshot\_path `default none` - Passed function that will generate a screenshot path
2.  latest\_screenshots\_path `default "vrt/latest"` - Path to the most recently captured screenshots
3.  latest\_suffix `default ""` - A string appended to the end of the latest captured screenshot
4.  baseline\_screenshots\_path `default "vrt/baseline"` - Path to the baseline expected screenshots
5.  baseline\_suffix `default ""` - A string appended to the end of the baseline screenshot
6.  diff\_screenshots\_path `default "vrt/diff"` - Path to the diff image of the two screenshots
7.  diff\_suffix `default ""` - A string appended to the end of the diff image
8.  threshold `default 0.0` - Matching threshold, ranges from `0` to `1`. Smaller values make the comparison more sensitive
9.  prompt `default false` - If true, the user will be prompted to override baseline screenshot when the recently captured screenshot differs
10.  updateScreenshots `default false` - If true, recently captured screenshots will always override the baseline

However, these can be overridden globally via `nightwatch.conf.js` as shown `below`:

_nightwatch.conf.js_

```
module.exports = {
  
  //... other config
  
  '@nightwatch/vrt': {
    latest_screenshots_path: 'vrt/latest',
    latest_suffix: '',
    baseline_screenshots_path: 'vrt/baseline',
    baseline_suffix: '',
    diff_screenshots_path: 'vrt/diff',
    diff_suffix: '',
    threshold: 0.00,
    prompt: false,
    updateScreenshots: false
  },
}
```

Further the settings can also be overridden passing as a JSON object (settings argument) as shown in the [example](https://nightwatchjs.org/guide/writing-tests/visual-regression-testing.html#write-visual-regression-tests) as part of the `screenshotIdenticalToBaseline` assertion. Settings passed as a function argument will override the ones in the config file & default values.

### Review

Once the test-run is complete, a report would be generated. Under the `vrt-report` folder. You can either open it manually or use `--open` with the run test command to open the report automatically.

#### Baseline & Diff

This shows how the baseline image and along with the diff. Every pixel that did not match is marked as red in the diff image.

![Baseline & Diff](https://user-images.githubusercontent.com/1677755/222640496-99bff9fd-406e-4600-b4eb-a4426e521e64.png)

As you can notice, the diff % is also shown. If the diff% is less than the threshold, VRT engine will not mark the test as failed.

#### Baseline & Latest

This shows how the current image differs from the baseline image.

![Baseline & Latest](https://user-images.githubusercontent.com/1677755/222640717-a0a98555-d704-479a-9529-4561ef2a5727.png)

### Approve

Once you have reviewed that all visual changes are intentional, you can update the baseline by using the `--update-screenshots` flag. This is important as all further comparisons will happen against the new baseline.

E.g.:

```
npx nightwatch <path to tests> --update-screenshots
```