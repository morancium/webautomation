### Overview

The Nightwatch inspector is designed to simplify authoring tests. Major advantages of using this are:

1.  Save time identifying selectors
2.  Build more robust tests
3.  Reduced back and forth between test file & browser as you can test commands in the browser itself

### Start Nightwatch Inspector

Follow these to start the Nightwatch Inspector:

#### Step 1 - Add debug line

Add `browser.debug()` in the test at a line where you want to start the Nightwatch inspector.

#### Step 2 - Run test with debug flag

Run the specific Nightwatch test with `--debug` test:

```
npx nightwatch /test/inspector_demo.js --env chrome --debug
```

#### Step 3 - Open Nightwatch selector

Running the test would have opened up a browser and it would be paused at the line where `.debug()` was present. Now open dev-tools, click on **\>>** and select Nightwatch Inspector.

![Nightwatch Inspector](https://github.com/nightwatchjs/nightwatch-docs/assets/1677755/167f04bd-4bbc-46c7-b582-cff875eae7ac)

### Explore mode

To get selector recommendations, you have to enable the explore mode.

![Explore mode](https://github.com/nightwatchjs/nightwatch-docs/assets/1677755/a4b0f1e3-72a6-4d4e-8e34-bdf0d744c8e7)

Once the explore mode is enabled and you point and click in the browser window, you will get selector recommendations as shown below:

![Selector recommendations](https://github.com/nightwatchjs/nightwatch-docs/assets/1677755/63e7dd88-2df4-4f5a-b842-81bff3c2aa9f)

Click on any element to get the suggestion in the selector history.

![Selector history](https://github.com/nightwatchjs/nightwatch-docs/assets/1677755/fb6d17d0-0391-4b3a-94cc-c735ae54b559)

### Try commands

Try out Nightwatch commands from the Nightwatch Inspector itself using the selectors from the selector history.

You can copy the selector using copy button in the \`Selector History\` & paste it while using the commands.

![Selector copy](https://github.com/nightwatchjs/nightwatch-docs/assets/1677755/842bd935-3271-4466-b2d4-6d407e7dfba8)

All successful commands will show up in Command History as shown below

![Command history](https://github.com/nightwatchjs/nightwatch-docs/assets/1677755/5a4596d2-5ebc-4007-a783-673959110100)

You can directly copy paste these in your test files and complete your test authoring very easily. Enjoy authoring tests with the Nightwatch inspector!