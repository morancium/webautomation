### Overview

The 1st step towards writing any web interaction is to find an element. Selectors are needed to find the element from the DOM tree. With Nightwatch v3, the selectors have been upgraded to make it even more simpler to find elements. V3 also introduces chaining of `.find()` commands to be able to locate nested elements with ease.

### CSS Selectors

You can easily find elements within the DOM tree using CSS selectors. There are multiple types of simple & complex CSS selectors that Nightwatch supports. Some common examples include

1.  id based
2.  class based
3.  element class based
4.  nested

```
// Find an element which contains id = element-id
browser.element.find('#element-id');

// Find all elements with CSS class active
browser.element.findAll('.active');

// Find all <p> elements with class active
browser.element.find('p.active');

// Find element with class active nested within an element with id list
browser.element.find('#id > .active');
```

```
// Find an element which contains id = element-id
browser.element.find('#element-id');

// Find all elements with CSS class active
browser.element.findAll('.active');

// Find all <p> elements with class active
browser.element.find('p.active');

// Find element with class active nested within an element with id list
browser.element.find('#id > .active');
```

### XPath Selectors

XPath is a query language for selecting nodes from an XML document based on their location and properties. You can use XPaths to locate elements within the DOM tree.

```
// Find an element with XPath
browser.element.find(by.xpath('xpath string'))

// Find all elements with XPath
browser.element.findAll(by.xpath('xpath string'))
```

We do not recommend the use of XPath selectors as it can break your tests frequently

You can learn more about XPath selectors [out here](https://nightwatchjs.org/guide/writing-tests/using-xpath-selectors.html).

### Text based

Text based selectors are a very natural way of finding elements.

```
// Find an element with text 'Sign In'
browser.element.findByText('Sign In');

// Find all elements with text 'Sign In'
browser.element.findAllByText('Sign In');
```

```
// Find an element with text 'Sign In'
browser.element.findByText('Sign In');

// Find all elements with text 'Sign In'
browser.element.findAllByText('Sign In');
```

Using text based selectors can be problematic if the website or web app has internationalization

### Placeholder text based

Placeholder texts are common within form elements or search bars. Let's see how you can find elements which contain placeholder text 'Search here...'

```
// Find the search bar with placeholder text 'Search here...'
browser.element.findByPlaceholderText('Search here...');

// Find all elements with placeholder text 'Enter here'
browser.element.findAllByPlaceholderText('Enter here');
```

```
// Find the search bar with placeholder text 'Search here...'
browser.element.findByPlaceholderText('Search here...');

// Find all elements with placeholder text 'Enter here'
browser.element.findAllByPlaceholderText('Enter here');
```

### Alt text based

Alt texts are common with media within a page. You can easily find such elements with alt text based methods.

```
// Find the element with alt text 'cat-image'
browser.element.findByAltText('cat-image');

// Find all elements with alt text 'cat-image'
browser.element.findAllByAltText('cat-image');
```

```
// Find the element with alt text 'cat-image'
browser.element.findByAltText('cat-image');

// Find all elements with alt text 'cat-image'
browser.element.findAllByAltText('cat-image');
```

### Inputs based on labels

Sometimes form inputs might not contain text or placeholder text, but might contain labels as shown below

![Label](https://github.com/nightwatchjs/nightwatch/assets/1677755/00a723d4-c244-4103-aae4-a705ba397302)

You can easily find the input element related to the label `First Name` by using label based methods

```
// Find the input element associated with label 'First Name'
browser.element.findByLabelText('First Name');
```

```
// Find the input element associated with label 'First Name'
browser.element.findByLabelText('First Name');
```

### Selecting nth element

If you need to find an element at a specific index from a list of elements, Nightwatch provides a convenience method `.nth`

```
// Find the 2nd element from all ul elements
browser.element.findAll('ul').nth(2);
```

```
// Find the 2nd element from all ul elements
browser.element.findAll('ul').nth(2);
```

### Recommended next steps

Now that you understand selectors, you can use them to write commands & assertions.

[Command](https://nightwatchjs.org/guide/writing-tests/commands.html)  
[Assertions](https://nightwatchjs.org/guide/writing-tests/adding-assertions.html)