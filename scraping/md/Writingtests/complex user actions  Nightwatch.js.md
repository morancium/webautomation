## Write complex user actions

### Overview

Nightwatch 2 brings support for working with the newer [Actions API](https://www.selenium.dev/documentation/webdriver/actions_api/) from Selenium WebDriver for performing complex user gestures.

The Actions API provides granular control over exactly what designated input devices can do. Selenium provides an interface for 3 kinds of input sources:

-   a key input for keyboard devices
-   a pointer input for a mouse, pen or touch devices
-   wheel inputs for scroll wheel devices (introduced in Selenium 4.2)

More information is available on the [W3C Webdriver spec page](https://w3c.github.io/webdriver/#dfn-actions).

### Example

The new API is available and ready to use in Nightwatch via the existing [`.perform()`](https://nightwatchjs.org/api/perform.html) command. The previous functionality of the `perform()` command is still there and working in the same way as before.

_tests/sampleTest.js_

```
describe('user actions api', function() {
  
  it('demo test', function() {
    browser
      .navigateTo('https://nightwatchjs.org')
      .perform(function() {
        const actions = this.actions({async: true});
        
        return actions
         .keyDown(Keys.SHIFT)
         .keyUp(Keys.SHIFT);
      });
  })
})
```

### Available Actions

#### .clear()

Releases all keys, pointers, and clears internal state.

##### Parameters:

None

#### .click(`[element]`)

Short-hand for performing a simple left-click (down/up) with the mouse.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `element`  
Optional | WebElement | If specified, the mouse will first be moved to the center of the element before performing the click. |

#### .contextClick(`[element]`)

Short-hand for performing a simple right-click (down/up) with the mouse.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `element`  
Optional | WebElement | If specified, the mouse will first be moved to the center of the element before performing the click. |

#### .doubleClick(`[element]`)

Short-hand for performing a double left-click with the mouse.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `element`  
Optional | WebElement | If specified, the mouse will first be moved to the center of the element before performing the click. |

#### .dragAndDrop(`from`, `to`)

Configures a drag-and-drop action consisting of the following steps:

1.  Move to the center of the from element (element to be dragged).
2.  Press the left mouse button.
3.  If the to target is a `WebElement`, move the mouse to its center. Otherwise, move the mouse by the specified offset.
4.  Release the left mouse button.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `from` | `WebElement` | The element to press the left mouse button on to start the drag |
| `to` | `WebElement` or:  
`{x: number, y: number}` | Either another element to drag to (will drag to the center of the element), or an object specifying the offset to drag by, in pixels. |

#### .insert(`device`, `...actions`)

Appends actions to the end of the current sequence for the given `device`. If device synchronization is enabled, after inserting the actions, pauses will be inserted for all other devices to ensure all action sequences are the same length.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `device` | `[Device](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Device.html)` | the device to update |
| `actions` | `...[Action](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Action.html)` | the actions to insert. |

#### .keyDown(`key`)

Inserts an action to press a single key.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `key` | string|number | the key to press. This key may be specified as a Key value, a specific unicode code point, or a string containing a single unicode code point. |

#### .keyUp(`key`)

Inserts an action to release a single key.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `key` | string|number | the key to release. This key may be specified as a Key value, a specific unicode code point, or a string containing a single unicode code point. |

#### .keyboard()

##### Parameters:

None

##### Returns:

| Type | description |
| --- | --- |
| [Keyboard](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Keyboard.html) | the keyboard device handle. |

#### .mouse()

##### Parameters:

None

##### Returns:

| Type | description |
| --- | --- |
| [Pointer](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Pointer.html) | the mouse pointer device handle. |

#### .move(`[options]`)

Inserts an action for moving the mouse `x` and `y` pixels relative to the specified `origin`. The origin may be defined as the mouse's [current position](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Origin.html#POINTER), the [viewport](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Origin.html#VIEWPORT), or the center of a specific `WebElement`.

It's possible to adjust how long the browser driver should take, in milliseconds, to perform the move using the duration parameter (defaults to 100 ms).

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `options`  
Optional | Object | The move options. Defaults to moving the mouse to the top-left corner of the viewport over 100ms.
Available values are:

```
{
  duration: {Number|undefined}, 
  origin: (Origin|WebElement|undefined), 
  x: {Number|undefined}, 
  y: {Number|undefined}
}
```

 |

#### .pause(`duration`, `...devices`)

Inserts a pause action for the specified devices, ensuring each device is idle for a tick. The length of the pause (in milliseconds) may be specified as the first parameter to this method (defaults to 0). Otherwise, you may just specify the individual devices that should pause.

If no devices are specified, a pause action will be created (using the same duration) for every device.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `duration`  
Optional | Number|[Device](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Device.html) | The length of the pause to insert, in milliseconds. Alternatively, the duration may be omitted (yielding a default 0 ms pause), and the first device to pause may be specified. |
| `devices` | ...[Device](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Device.html) | The devices to insert the pause for. If no devices are specified, the pause will be inserted for all devices. |

#### .press(`[button]`)

Inserts an action to press a mouse button at the mouse's current location.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `button`  
Optional | [Button](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Button.html) | The button to press; defaults to `LEFT`. |

#### .release(`[button]`)

Inserts an action to release a mouse button at the mouse's current location.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `button`  
Optional | [Button](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Button.html) | The button to release; defaults to `LEFT`. |

#### .sendKeys(`...keys`)

Inserts a sequence of actions to type the provided key sequence. For each key, this will record a pair of keyDown and keyUp actions.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `keys` | ...String|Number | The keys to type. |

#### .synchronize(`...devices`)

Ensures the action sequence for every device referenced in this action sequence is the same length. For devices whose sequence is too short, this will insert pauses so that every device has an explicit action defined at each tick.

##### Parameters:

| Name | Type | description |
| --- | --- | --- |
| `devices` | ...[Device](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Device.html) | The specific devices to synchronize. If unspecified, the action sequences for every device will be synchronized. |

### Working with Action Ticks

Action sequences are divided into a series of "ticks". At each tick, the browser driver will perform a single action for each device included in the action sequence. At tick 0, the driver will perform the first action defined for each device, at tick 1 the second action for each device, and so on until all actions have been executed. If an individual device does not have an action defined at a particular tick, it will automatically pause.

By default, action sequences will be synchronized so only one device has a define action in each tick. Consider the following code sample:

_tests/sampleTest.js_

```
describe('user actions api', function() {
  
  it('demo test', function() {
    browser
      .perform(function() {
        const actions = this.actions({async: true});
        
        return actions
          .keyDown(Keys.SHIFT)
          .move({origin: el})
          .press()
          .release()
          .keyUp(Keys.SHIFT);
      });
    })
})
```

This produces the following sequence of ticks:

| Device | Tick 1 | Tick 2 | Tick 3 | Tick 4 | Tick 5 |
| --- | --- | --- | --- | --- | --- |
| Keyboard | keyDown(SHIFT) | pause() | pause() | pause() | keyUp(SHIFT) |
| Mouse | pause() | move({origin: el}) | press() | release() | pause() |

### Recommended content

-   [Selenium API Docs](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Actions.html)
-   [Webdriver W3C spec](https://w3c.github.io/webdriver/#dfn-actions)