### Overview

Nightwatch provides simple and comprehensive APIs for interacting with web elements and performing various actions and assertions. In Nightwatch v3, brand new element APIs are introduced to make writing tests even simpler and more concise.

The [Nightwatch inspector](https://nightwatchjs.org/guide/writing-tests/nightwatch-inspector.html) makes it easier to author tests as it provides selector recommendations that are durable in the longer run.

If you know very little or no coding, you can also use our [Chrome recorder extension](https://nightwatchjs.org/guide/writing-tests/chrome-devtools-recorder.html) to record tests and run them using Nightwatch.

### Finding elements

Before you can interact with elements or perform assertions, you will have to find the elements from the DOM tree using selectors. Nightwatch supports a variety of selectors to make finding elements a breeze. You can do so using `.find()` & `.findAll()` related commands:

1.  **CSS selectors** :
    
    ```
    browser.element.find('css selector');
    browser.element.findAll('css selector');
    ```
    
2.  **xPath selector** :
    
    ```
    browser.element.find(by.xpath(('xpath string'));
    browser.element.findAll(by.xpath(('xpath string'));
    ```
    
3.  **By role** :
    
    ```
    browser.element.findByRole('role');
    browser.element.findAllByRole('role');
    ```
    
4.  **By text** :
    
    ```
    browser.element.findByText('text');
    browser.element.findAllByText('text');
    ```
    
5.  **By placeholder text** :
    
    ```
    browser.element.findByPlaceholderText('placeholder text');
    browser.element.findAllByPlaceholderText('placeholder text');
    ```
    
6.  **By label text** :
    
    ```
    browser.element.findByLabelText('label text');
    browser.element.findAllByLabelText('label text');
    ```
    
7.  **By alt text** :
    
    ```
    browser.element.findByAltText('alt text');
    browser.element.findAllByAltText('alt text');
    ```
    

Along with the find commands, Nightwatch also provides with convenience methods that help finding methods in more complex scenarios

1.  Finding **nth** element from an array of elements `.nth(index)`
2.  Finding **count** of element array `.count()`

### Finding nested elements

On top of this powerful set of selectors, Nightwatch also supports selector chaining:

```
browser.element.find('CSS selector').findByText('text').click();
// or
browser.element.findAll('CSS selector').nth(2).findByText('text').click();
```

For a more detailed guide & examples on selectors, please refer to this [guide](https://nightwatchjs.org/guide/writing-tests/selectors.html).

### Commands

Once you find elements, you can interact with them using commands

#### Interaction commands

1.  **Click** :
    
    ```
    browser.element.find('selector').click();
    ```
    
2.  **Double Click** :
    
    ```
    browser.element.find('selector').doubleClick();
    ```
    
3.  **Right Click** :
    
    ```
    browser.element.find('selector').rightClick();
    ```
    
4.  **Type into an input** :
    
    ```
    browser.element.find('selector').sendKeys('text');
    ```
    
5.  **Set Value** :
    
    ```
    browser.element.find('selector').setValue();
    ```
    
6.  **Clear** :
    
    ```
    browser.element.find('selector').clear();
    ```
    

Instead of `.find()`, you could also have used other find related methods such as `.findByText()`, `.findByRole()` followed by the command

  

#### Get element details

1.  **Get text** :
    
    ```
    browser.element.find('selector').getText();
    ```
    
2.  **Get value** :
    
    ```
    browser.element.find('selector').getValue();
    ```
    
3.  **Get tag name** :
    
    ```
    browser.element.find('selector').getTagName();
    ```
    
4.  **Get attribute** :
    
    ```
    browser.element.find('selector').getAttribute();
    ```
    
5.  **Get CSS property** :
    
    ```
    browser.element.find('selector').getCssProperty();
    ```
    
6.  **Get ID** :
    
    ```
    browser.element.find('selector').getId();
    ```
    
7.  **Get Accessibility name** :
    
    ```
    browser.element.find('selector').getAccessibilityName();
    ```
    
8.  **Get rect** :
    
    ```
    browser.element.find('selector').getRect();
    ```
    
      
    

#### Update element details

1.  **Set text** :
    
    ```
    browser.element.find('selector').setText('text');
    ```
    
2.  **Set attribute** :
    
    ```
    browser.element.find('selector').setAttributes('attribute', 'attribute value');
    ```
    

  

#### Setting browser context

1.  **Set Geolocation** :
    
    ```
    browser.setGeolocation({latitude: , longitude: , accuracy: 100});
    ```
    

Refer to this [guide](https://nightwatchjs.org/guide/writing-tests/commands.html) for detailed examples.

You can also write custom commands with Nightwatch.[Try now](https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html)

### Assertions

The main point of writing automated tests is setting assertions to pass. There are 2 ways to do assertions with Nightwatch

You can use the built-in assertions

1.  **Text equals** :
    
    ```
    browser.element.find('selector').assert.textEquals('text');
    ```
    
2.  **Text contains** :
    
    ```
    browser.element.find('selector').assert.textContains('text');
    ```
    
3.  **Text matches** :
    
    ```
    browser.element.find('selector').assert.textMatches('regex');
    ```
    
4.  **Value equals** :
    
    ```
    browser.element.find('selector').assert.valueEquals('text');
    ```
    
5.  **Value contains** :
    
    ```
    browser.element.find('selector').assert.valueContains('text');
    ```
    
6.  **Value matches** :
    
    ```
    browser.element.find('selector').assert.valueMatches('regex');
    ```
    
7.  **URL equals** :
    
    ```
    browser.assert.urlEquals('text');
    ```
    
8.  **URL contains** :
    
    ```
    browser.assert.urlContains('text');
    ```
    
9.  **URL matches** :
    
    ```
    browser.assert.urlMatches('regex');
    ```
    
10.  **Visible** :
    
    ```
    browser.element.find('selector').assert.visible();
    ```
    

If these assertions don’t suffice, you can write your own custom assertions. [Learn how](https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html)

### Chai expects

If you prefer Chai style asserts, you can also use the expect() to perform assertions

1.  **Text equals** :
    
    ```
    expect(element).text.to.equal();
    ```
    
2.  **Text contains** :
    
    ```
    expect(element).text.to.contain();
    ```
    
3.  **Text equals** :
    
    ```
    expect(element).text.to.match();
    ```
    
4.  **Value equals** :
    
    ```
    expect(element).value.to.equal();
    ```
    
5.  **Value contains** :
    
    ```
    expect(element).value.to.contain();
    ```
    
6.  **Value equals** :
    
    ```
    expect(element).value.to.match();
    ```
    
7.  **URL equals** :
    
    ```
    expect(brower.url()).to.equal();
    ```
    
8.  **URL contains** :
    
    ```
    expect(brower.url()).to.contain();
    ```
    
9.  **URL matches** :
    
    ```
    expect(brower.url()).to.match();
    ```
    
10.  **Visible** :
    
    ```
    expect(element).to.be.visible();
    ```
    

For detailed examples around assertions, refer to this [article](https://nightwatchjs.org/guide/writing-tests/assertions.html)

### Using Nightwatch inspector

Nightwatch inspector is a point-and-click tool designed to save your time while authoring tests and help you write more durable tests. It also allows you to try out Nightwatch commands from devtools itself. [Learn more](https://nightwatchjs.org/guide/writing-tests/nightwatch-inspector.html).

### Record using Chrome dev tools

Alternatively, Nightwatch provides tools to help you get started by recording your test actions on screen and generate Nightwatch test scripts automatically without having to write any code. Explore Create Nightwatch test using [Google Chrome DevTools Recorder](https://nightwatchjs.org/guide/writing-tests/chrome-devtools-recorder.html) for more information.

### Recommended next steps

Now that you understand the basics of writing tests for mobile apps, it's time to understand selectors, commands & assertions in more detail

[Selectors](https://nightwatchjs.org/guide/writing-tests/selectors.html)  
[Command](https://nightwatchjs.org/guide/writing-tests/commands.html)  
[Assertions](https://nightwatchjs.org/guide/writing-tests/assertions.html)