### Overview

Starting with version 2.4, Nightwatch supports running React component tests with JSX and which are written in a [Component Story Format](https://storybook.js.org/docs/react/api/csf) (CSF) subset.

### What is Component Story Format

Component Story Format (CSF) is an [open standard](https://github.com/ComponentDriven/csf) based on ES6 modules introduced by the [Storybook](https://storybook.js.org/) team as a declarative model for writing [component _stories_](https://storybook.js.org/docs/react/writing-stories/introduction).

A **story** is a named `export` which is an instance of the component, together with _props_, _args_, and/or _test capabilities_. A component test file contains **one or more stories**.

File names must use `.jsx` or `.tsx` as extension. In its simplest form, the component test looks as follows:

_test/sampleTest.jsx_

```
import Form from '../components/Form.jsx';

export default {
  title: 'Form',
  component: Form,
}

export const FormStory = () => <Form />

```

Considering the above example, let's add a second story for our component test:

_test/sampleTest.spec.jsx_

```
import Form from '../components/Form.jsx';

export default {
  title: 'Form Component',
  component: Form
}

export const EmptyForm = () => <Form />

export const AnotherForm = Object.assign(() => <Form addTask={function(value) {
  console.log('Add Task', value);
}} />, {
  // additional parameters
});

```

### Add interaction tests

Each component story (i.e. named export) takes several (`async`) function properties which define the tests that need to be executed. The testing functionality can be written using the following functions:

-   `play({canvasElement, args})` – is executed in the DOM context and receives the component story element
-   `test(browser, {component, result})` – is executed in the Node context and receives the Nightwatch api object (`browser`); receives the `component` element object as a Nightwatch compatible element instance
-   `preRender()` – runs before the component is rendered
-   `postRender()` – runs after the component is rendered

In addition, component level test hooks can be declared on the top level, in the `default export` section.

#### Example

In the example below, the `play()` function uses the DOM utilities from the [Testing Library](https://testing-library.com/).

_test/sampleTest.spec.jsx_

```
import { fireEvent, within } from '@testing-library/dom';
import Form from '../components/Form.jsx';

export default {
  title: 'Form Component',
  component: Form,
  
  // executed before all the individual component stories; runs in Node context
  async setup(browser) {
    console.log('global setup hook', browser.capabilities)
  },
  
  // executed after all the individual component stories; runs in Node context
  async teardown(browser) {
    console.log('global teardown hook')
  },
  
  // executed before each individual component story; runs in Node context
  async preRender(browser, context) {
    // context is made of {id, name, title}
    console.log('preRender', context.id);
  },
  
  // executed after each individual component story; runs in Node context
  async preRender(browser, context) {
    // context is made of {id, name, title}
    console.log('preRender', context.id);
  }
}

export const AnotherForm = Object.assign(() => <Form addTask={function(value) {
  console.log('Add Task', value);
}} />, {
  async preRender() {},
  
  async postRender() {
    console.log('after mount', window);
  },
  
  async play({canvasElement, args}) {
    console.log('play function', args);
    
    const root = within(canvasElement);
    const input = root.getByTestId('new-todo-input');
    
    
    fireEvent.change(input, {
      target: {
        value: 'another one bites the dust'
      }
    });
    
    return {
      fromPlay: input
    }
  },
  
  test: async (browser, {component, result}) => {
    console.log('Result from play', result)
    await expect(component).to.be.visible;
    
    await expect(component.find('input')).to.have.property('value').equal('another one bites the dust');
  }
});

```

### Loading static assets

When loading components in isolation, it's often needed to load additional static assets, such as CSS files, which contain styles used by the component.

Beside loading assets in the (JSX) test file directly, Nightwatch provides 2 ways to accomplish this:

1.  create a `nightwatch/index.jsx` file in the current project
2.  create an entirely new test renderer file and use the `renderPage` option in the [Vite plugin](http://local-new.nightwatchjs.org/guide/component-testing/vite-plugin.html#plugin-options)

### Example project

We've put together a basic To-do app written in React and built on top of Vite which can be used as a boilerplate. It can be found at [https://github.com/nightwatchjs-community/todo-react](https://github.com/nightwatchjs-community/todo-react "nightwatchjs-community/todo-react")

[![nightwatch-react-plugin on Github](https://opengraph.githubassets.com/default/nightwatchjs-community/todo-react)](https://github.com/nightwatchjs-community/todo-react)

### Recommended content

-   [Blog > Introducing Component Testing in Nightwatch](https://nightwatchjs.org/blog/introducing-component-testing-in-nightwatch/)