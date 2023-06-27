### Overview

Component testing is used to test individual components in isolation. It has become crucial with the rise of reusable component UI frameworks. Unit testing single page front-end applications usually presents an entire set of issues to deal with over regular approaches of unit testing. In order to reliably test a web component in isolation, we need to be able to render it first.

### How does it work?

Component testing in Nightwatch is built out of our vite-plugin-nightwatch plugin. The plugin can be used in projects that are using Vite.

[![vite-plugin-nightwatch on Github](https://opengraph.githubassets.com/b9f11016590a96e4846d047aa81077a62d81c8d38ed769e4ff4ca6638f8e13e4/nightwatchjs/vite-plugin-nightwatch)](https://github.com/nightwatchjs/vite-plugin-nightwatch)

We also provide dedicated plugins for Vue and React which are built on top of the Vite plugin and which use the Vite dev server internally:

-   [`@nigthwatch/react`](https://nightwatchjs.org/guide/component-testing/testing-react-components.html)
-   [`@nigthwatch/vue`](https://nightwatchjs.org/guide/component-testing/testing-vue-components.html)

Our initial aim is to support React and Vue components and once Vue and React support is firmly in place, we will expand to add other frameworks like Svelte and Lit.

### Rendering components

When testing web components, the crucial aspect is how the component is rendered. In many cases, rendering using a real browser might seem like an overkill and something clumsy that will slow everything down. For instance, a large project might have a dedicated QA team who takes care of the end-to-end testing and in such a case, it might seem unnecessary to write component tests using real browsers, especially if it’s overly complicated or slow.

#### Rendering using JSDom

[JSDom](https://github.com/jsdom/jsdom) is tool which offers the possibility to render a web component using a Node.js virtual renderer, without the need of a real browser. Everything happens in the CLI and it’s usually pretty fast. Here’s how it normally looks like:

![https://blog.nightwatchjs.org/content/images/2022/02/component-testing.001.png](https://blog.nightwatchjs.org/content/images/size/w1000/2022/02/component-testing.002.png)

#### Rendering using Karma TestRunner/Puppeteer

The other popular approach is to use something like the [Karma Runner](https://karma-runner.github.io/latest/index.html), which is a frontend testing tool created about 10 years ago at Google. There are also variations on this theme where [Puppetter](https://pptr.dev/) and browser-based Mocha is used.

In this approach all files needed are loaded on the test renderer page where it all happens: the component is loaded together with dependencies and any testing tools needed, then the component is rendered and the test is executed in the same browser context. It looks a bit like this: ![https://blog.nightwatchjs.org/content/images/size/w1000/2022/02/component-testing.002.png](https://blog.nightwatchjs.org/content/images/size/w1000/2022/02/component-testing.002.png)

### Limitations

Either one of the above approaches are fine in terms of running tests and debugging, however both of them come with their own limitations, which are easy to spot:

-   Using **JSDom rendering** the limitation is clear: no real browser. However, advantages to consider are speed and access to OS-level APIs, which would make tasks like loading files or generating advanced reports more straightforward.
    
-   On the other hand, when using the **Karma Runner** or similar approach the advantage is clear: everything is happening in the browser and thus the test is more reliable. However, the disadvantage is that working with external files is not straightforward, reporting is limited, and configuration can be quite difficult.
    

### Rendering in Nightwatch

What Nightwatch aims to provide is a combination of both approaches by extending its cross browser CLI test runner and built-in assertion library and providing an integrated and easy-to-use solution. Nightwatch already has support for end-to-end testing in all major browsers and comes with built-in reporting and support for parallelism out of the box.

Here’s what Nightwatch does to run a component test:

1.  the CLI test runner launches a real browser and navigates to a basic HTML page (the test renderer)
2.  inside the test renderer, it injects the Vue or React test utils and then mounts the component which needs to be tested, optionally specifying a list of plugins–in case of Vue, such as a `store` or a `router`– or `props` in case of React
3.  once the component has been successfully rendered a reference to the DOM element will be sent back to the Nightwatch CLI runner
4.  the CLI runner continues running the test in the same way it does for end-to-end testing; the assertions are run in the Node.js context

![https://blog.nightwatchjs.org/content/images/2022/02/component-testing.003.png](https://blog.nightwatchjs.org/content/images/2022/02/component-testing.003.png)

### Advantages

##### Ease of use and consistency

The main advantage and motivation for using Nightwatch as component testing is the easy to use and consistency with how end-to-end testing is done. With Nightwatch, you have everything installed so there is nothing more to configure in terms of testing.

##### Access to OS-level APIs

And since the testing is done by the CLI test runner, we have also access to **OS-level APIs** and we also have access to the **Vite** runner APIs, so we could do more advanced integration directly between Vite and Nightwatch.

### Drawbacks

The only disadvantage would be that it’s going to be a bit slower than the _JSDom_ renderer and possibly also the _Karma Runner_. However, we believe Nightwatch compensates by offering a more reliable and easy-to-use solution, better reporting, and an overall better experience. Once you enable parallelism, then speed might not be a problem any longer.

### Recommended content

-   [Blog > Introducing Component Testing in Nightwatch](https://nightwatchjs.org/blog/introducing-component-testing-in-nightwatch/)