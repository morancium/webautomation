### Overview

Nightwatch can be integrated with Storybook through our official `@nightwatch/storybook` plugin, which provides several important capabilities for running component tests to an existing Storybook project for React.

There is no need to start writing additional tests and import stories in them. Nightwatch supports the [Component Story Format](https://storybook.js.org/docs/react/api/csf) (CSF) so it is able to run the stories directly.

[![@nightwatch/storybook on Github](https://opengraph.githubassets.com/default/nightwatchjs/nightwatch-storybook-plugin)](https://github.com/nightwatchjs/nightwatch-storybook-plugin)

### How it works

Nightwatch is able to detect and run any existing [interaction tests](https://storybook.js.org/docs/react/writing-tests/interaction-testing) (using the `play()` function) and **[accessibility tests](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)** which are defined in the component story.

In addition, Nightwatch provides a `test()` function which has access to its own APIs.

_test/form.stories.jsx_

```
import Form from '../components/Form.jsx';

export default {
  title: 'Form Stories',
  component: Form
}

const Template = (args) =< <Form {...args} />
export const FilledForm = Template.bind({});

// Runs in the browser context
FilledForm.play = async ({ canvasElement }) =< {

};

// Runs in the Nightwatch context
FilledForm.test = async (browser, { component }) =< {

}

```

### Installation

The Storybook plugin for Nightwatch can be installed from NPM with:

```
npm i @nightwatch/storybook --save-dev
```

Then add the plugin in your `nightwatch.conf.js`:

_nightwatch.conf.js_

```
module.exports = {
  plugins: [
    //...
    '@nightwatch/storybook'      
  ]
}
```

### Usage

The plugin can be used in an **existing** Storybook project for React.

#### Setup Storybook

In an existing React project, run:

```
npx storybook init
```

Head over to the Storybook [installation guide](https://storybook.js.org/docs/react/get-started/install) for more details.

We also recommend installing a few essential Storybook addons:

-   [`@storybook/addon-interactions`](https://storybook.js.org/addons/@storybook/addon-interactions/)
-   [`@storybook/addon-a11y`](https://storybook.js.org/addons/@storybook/addon-a11y)
-   [`@storybook/testing-react`](https://storybook.js.org/addons/@storybook/testing-react)

#### Running stories

By default, Nightwatch will mount the component story in the target browser and do a basic visibility assertion. Then, depending on which of the below are defined, it will:

-   run any interaction tests if a `play()` function is defined;
-   run the accessibility tests
-   run the test hooks, if any of these are defined in the `default` story export:
    -   `setup (browser)`
    -   `teardown (browser)`
    -   `preRender (browser, {id, title, name})`
    -   `postRender (browser, {id, title, name})`

All test hooks are `async`.

In addition, Nightwatch provides the ability to extend the component story with its own `test()` function, as follows:

-   `test(browser, { component })`

**Read more on:**

-   Storybook [interaction tests](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
    -   How to use the [play() function](https://storybook.js.org/docs/react/writing-stories/play-function)
    -   [Test hooks API](https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental)
-   Storybook [accessibility testing](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)
-   [Component story format](https://storybook.js.org/docs/react/api/csf) (CSF)
    -   [Component Story Format 3.0](https://storybook.js.org/blog/component-story-format-3-0/)

#### Example

Considering a basic `Form.jsx` component, here's how its `Form.stories.jsx` story would look like, written in CSF and extended with Nightwatch functionality:

_Form.stories.jsx_

```
import { userEvent, within } from '@storybook/testing-library';
import Form from './Form.jsx';

export default {
  title: 'Form',
  component: Form,
  
  async setup(browser) {
    console.log('setup hook', browser.capabilities)
  },
  
  async preRender(browser) {
    console.log('preRender hook')
  },
  
  async postRender(browser) {
    console.log('postRender hook')
  },
  
  async teardown(browser) {
    console.log('teardown hook')
  },
}

const Template = (args) =< <Form {...args} />;

// Component story for an empty form
export const EmptyForm = Template.bind({});

// Component story simulating filling in the form
export const FilledForm = Template.bind({});

FilledForm.play = async ({ canvasElement }) =< {
  
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  
  // 👇 Simulate interactions with the component
  await userEvent.type(canvas.getByTestId('new-todo-input'), 'outdoors hike');
  await userEvent.click(canvas.getByRole('button'));
};

FilledForm.test = async (browser, { component }) =< {
  // 👇 Run commands and assertions in the Nightwatch context
  await expect(component).to.be.visible;
}
```

### Configuration

The `@nightwatch/storybook` plugin supports a few configuration options. Edit your `nightwatch.conf.js` and configure it as follows:

-   **`src_folders`** By default Nightwatch tries to use the location defined in the `main.js` inside the storybook config folder. This can define the specific location(s) to where the stories are located.

The following options need to be set under the specific `'@nightwatch/storybook'` dictionary:

-   **`start_storybook`** – whether Nightwatch should manage the Storybook server automatically (default `false`)
-   **`storybook_url`** – can be changed if Storybook is running on a different port/hostname (default `http://localhost:6006/`)
-   **`storybook_config_dir`** - default is `.storybook`
-   **`hide_csf_errors`** - Nightwatch tries to ignore the CSF parsing errors and displays a warning; setting this to `true` will hide these warnings (default is `false`)
-   **`show_browser_console`** - By default when using Chrome or Edge browsers, the browser console logs will be displayed in the Nightwatch console (using the `[browser]` prefix); this options disables this functionality.

_nightwatch.conf.js_

```
module.exports = {
  src_folders: ['src/stories/*.stories.jsx'],
  
  '@nightwatch/storybook': {
    start_storybook: false,
    storybook_url: 'http://localhost:6006/',
    storybook_config_dir: '.storybook', // default storybook config directory
    hide_csf_errors: false,
    show_browser_console: true
  }
}
```

### Run stories with Nightwatch

The previous `Form.stories.jsx` example contains two stories and it can be run by Nightwatch as a regular test.

For the best developer experience available at the moment, we recommend to use Chrome, however you can use any of the other browsers that Nightwatch supports as well.

```
npx nightwatch src/stories/Form.stories.jsx --env chrome
```

#### Running a specific story

You can run a specific story from a given `.stories.jsx` file by using the `--story` CLI argument.

Say you want to run only the `FilledForm` story. This will mount it and also execute the `play()` and `test()` functions accordingly:

```
npx nightwatch src/stories/Form.stories.jsx --env chrome --story=FilledForm
```

#### Run stories in parallel

It may be useful to run the stories in parallel for optimizing the speed of execution using the existing Nightwatch option of running in parallel using test workers. In fact, running in parallel using test workers is enabled by default in Nightwatch v2.4.

```
npx nightwatch ./src/stories/**.stories.jsx --env chrome --workers=4 --headless
```

### Preview stories

Nightwatch provides the ability to run a `.stories.jsx` file in preview mode (using the `--preview` CLI argument) which would only open the Storybook renderer and pause the execution indefinitely.

This can be useful during development, since the Storybook renderer has the ability to automatically reload the component via its built-in Hot Module Replacement (HMR) functionality.

To launch the `FilledForm` story in preview mode, run:

```
npx nightwatch src/stories/Form.stories.jsx --env chrome --story=FilledForm --preview
```

You can use the Nightwatch built-in parallelism to open the story in both Firefox and Chrome:

```
npx nightwatch src/stories/Form.stories.jsx --env chrome,firefox --story=FilledForm --preview
```

### Debug stories

In addition to previewing the story, it's also possible to use Nightwatch to debug the story. To do this, enable the `--debug` and `--devtools` CLI flags and use the `debugger` to add breakpoints inside the `play()` function.

#### Example:

_Form.stories.jsx_

```
import { userEvent, within } from '@storybook/testing-library';
import Form from './Form.jsx';

export default {
  title: 'Form',
  component: Form,
}

const Template = (args) =< <Form {...args} />

// Component story for an empty form
export const EmptyForm = Template.bind({});

// Component story simulating filling in the form
export const FilledForm = Template.bind({});

FilledForm.play = async ({ canvasElement }) =< {
  
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  
  debugger;
  
  // 👇 Simulate interactions with the component
  await userEvent.type(canvas.getByTestId('new-todo-input'), 'outdoors hike');
  await userEvent.click(canvas.getByRole('button'));
};

FilledForm.test = async (browser, { component }) =< {
  // 👇 Run commands and assertions in the Nightwatch context
  await expect(component).to.be.visible;
}
```

Run the example and observe the breakpoint in the Chrome devtools console.

```
npx nightwatch src/stories/Form.stories.jsx --env chrome --devtools --debug --story=FilledForm
```

[![Screenshot of the Chrome Devtools debugger paused at a breakpoint](https://raw.githubusercontent.com/nightwatchjs/nightwatch-storybook-plugin/main/.github/assets/debugger.png)](https://raw.githubusercontent.com/nightwatchjs/nightwatch-storybook-plugin/main/.github/assets/debugger.png)

You can also use the [integrated debug console](https://nightwatchjs.org/guide/debugging-tests/using-debug.html) to issue commands from Nightwatch.

### Accessibility testing

Both Storybook and Nightwatch rely internally on the same accessibility testing tools developed by [Deque Systems](https://www.deque.com/axe/) and published in NPM as the [`axe-core`](https://www.npmjs.com/package/axe-core) library.

To get started with in A11y testing in Storybook, install the addon:

```
npm i @storybook/addon-a11y --save-dev
```

Add this line to your `main.js` file (create this file inside your Storybook config directory if needed).

_.storybook/main.js_

```
module.exports = {
  addons: ['@storybook/addon-a11y']
};
```

More details can be found on Storybook docs:

-   [storybook-addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)
-   [Accessibility tests in Storybook](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)

#### Example

Consider the bundled example `Button.jsx` component and `Button.stories.jsx` which come pre-installed when you setup Storybook.

Add the following rules for accessibility tests:

_stories/Button.stories.jsx_

```
import React from 'react';
import { Button } from './Button';

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  
  parameters: {
    a11y: {
      // Optional selector to inspect
      element: '#root',
      
      // Show the individual axe-rules as Nightwatch assertions (can be verbose if there are many violations)
      runAssertions: false,
      
      // Show the complete Acccessibilty test report (by default, only rule violations will be shown)
      verbose: false,
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'image-alt',
            enabled: false,
          },
          {
            id: 'input-button-name',
            enabled: true
          },
          {
            id: 'color-contrast',
            enabled: true
          }
        ],
      },
      options: {},
      manual: true
    }
  }
};

const Template = (args) =< <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

```

Nightwatch will automatically pick up the A11y rules from the story config and use them to run its own accessibility test commands.

One of the Button component story will fail the `"color-contrast"` accessibility rule as defined by the Axe-core library.

Run the following to see the result:

```
npx nightwatch src/stories/Button.stories.jsx -e chrome
```

The output from Nightwatch should be:

```
  ️TEST FAILURE (2.947s):  
   - 1 assertions failed; 4 passed
  
   ✖ 1) Button.stories
   – "Primary" story (733ms)
  
   → ✖ NightwatchAssertError
   There are accessibility violations; please see the complete report for details.
  
    Read More : 
        https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md 


Accessibility report for: example-button--primary.Primary

Accessibility violations for: example-button--primary.Primary
┌───────────────────────┬────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬────────────┐
│ ID                    │ Impact     │ Description                                                                                                       │ Nodes      │
│ ───────────────────── │ ────────── │                                                                                                                   │ ────────── │
│ color-contrast        │ serious    │ Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds           │ 1          │
│ ───────────────────── │ ────────── │                                                                                                                   │ ────────── │
│ Target                             │ Html                                                                                                              │ Violations │
│ [".storybook-button"]              │ Button │            │
│                                                                                                                                                                     │
╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

```

To view the entire report (which includes all the eveluated rules), pass `verbose: true` in the story parameters:

_stories/Button.stories.jsx_

```
import React from 'react';
import { Button } from './Button';

export default {
  parameters: {
    a11y: {
      // Show the complete Accessibility test report (by default, only rule violations will be shown)
      verbose: false,
      // ...
    }
  }
}
```

### Recommended content

-   [Blog > Introducing Component Testing in Nightwatch](https://nightwatchjs.org/blog/introducing-component-testing-in-nightwatch/)