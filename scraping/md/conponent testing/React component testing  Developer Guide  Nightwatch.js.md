### Overview

React component testing in Nightwatch is available using our official **[`@nightwatch/react`](https://github.com/nightwatchjs/nightwatch-plugin-react)** plugin, which is built on top of the [vite-plugin-nightwatch](https://nightwatchjs.org/guide/component-testing/vite-plugin.html) plugin. The React plugin manages its own Vite dev server internally, so it can be used in any project, irrespective of whether it is using Vite or not.

[![nightwatch-react-plugin on Github](https://opengraph.githubassets.com/default/nightwatchjs/nightwatch-plugin-react)](https://github.com/nightwatchjs/nightwatch-plugin-react)

### Installation

#### Step 1.

The `@nightwatch/react` plugin can be installed from NPM with:

```
npm install @nightwatch/react
```

#### Step 2.

Then update your Nightwatch configuration and add the plugin to the list:

_nightwatch.conf.js_

```
module.exports = {
  plugins: ['@nightwatch/react']
}
```

#### Step 3.

#### a. Non-Vite projects

The `@nightwatch/react` plugin manages its own Vite dev server internally so if you don’t use Vite already in your project, then you are done (for now).

#### b. Already using Vite

If you already have a Vite project, then the `@nightwatch/react` plugin will try to use the existing `vite.config.js` or `vite.config.ts`, if either one is found. You can also supply a different Vite config file via the plugin options (see below).

Update the `vite.config.js` and add the `vite-plugin-nightwatch` plugin:

_vite.config.js_

```
import nightwatchPlugin from 'vite-plugin-nightwatch'

export default {
  plugins: [
    // ... other plugins, such as vue() or react()
    nightwatchPlugin()
  ]
})
```

### Write tests

#### Using JSX + Component Story Format

Starting with version 2.4, Nightwatch supports running React component tests with JSX and which are written in a [Component Story Format](https://storybook.js.org/docs/react/api/csf) (CSF) subset. CSF is an [open standard](https://github.com/ComponentDriven/csf) based on ES6 modules introduced by [Storybook](https://storybook.js.org/).

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

In component testing terms, a "story" is representation of a particular component with props or args. In our concrete case, it is a single `export const` declaration.

-   Read more about [writing tests in Component Story Format](https://nightwatchjs.org/guide/component-testing/write-jsx-react-tests.html)

#### Without JSX

This plugin provides only the `mountComponent` command which can be used to mount a component in isolation and optionally with a set of given props.

#### .mountComponent(`componentPath`, `[props]`, `[callback]`)

##### Parameters:

| Name | Type | componentPath |
| --- | --- | --- |
| `componentPath` | `string` | Location of the component file (`.jsx`) to be mounted |
| `props`  
Optional | `object` | `function` | Properties to be passed to the React component; this can be an object which will be serialized to JSON or a function which returns the props object. The function will be executed in the browser's context. |
| `callback`  
Optional | `function` | An optional callback function which will be called with the component element. |

### Configuration

We’ve designed the `@nightwatch/react` plugin to work with sensible configuration defaults, but in some more advanced scenarios you may need to change some of the config options.

#### Vite dev server

By default, Nightwatch will attempt to start the Vite dev server automatically. You can disable that by adding the below in your `nightwatch.conf.js` file, under the `vite_dev_server` dictionary.

This is common to other component testing plugins that are based on Vite, such as the `@nightwatch/vue` plugin.

_nightwatch.conf.js_

```
module.exports = {
  plugins: ['@nightwatch/react'],
  vite_dev_server: {
    start_vite: true,
    port: 5173
  }
}
```

#### Plugin options

The plugin accepts a few config options which can be set when working with an existing `vite.config.js` file in the project.

##### \- `renderPage`

Specify the path to a custom test renderer to be used. A default renderer is included in the package, but this option can overwrite that value.

_vite.config.js_

```
export default {
  plugins: [
    // ... other plugins, such as vue() or react()
    nightwatchPlugin({
      renderPage: './src/test_renderer.html'
    })
  ]
}
```

##### Example

```
const component = await browser.mountReactComponent('/src/components/Form.jsx')
```

_test/sampleTest.js_

```
describe('user info test', function() {
  let component;
  
  before(async () => {
    component = await browser.mountComponent('/src/components/UserInfo.jsx', function() {
      return {
        date: new Date(),
        text: 'I hope you enjoy reading Ulysses!',
        author: {
          name: 'Leopold Bloom',
          avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Poldy.png'
        }
      }
    });
  });
  
  it('should render the component without error', function() {
    browser.expect(component).to.be.visible;
  })
})
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