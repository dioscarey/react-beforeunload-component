

# React Beforeunload Component

So you've created a React component but would love to give end users the ability to print out the contents of that component. This package aims to solve that by popping up a new print window with CSS styles copied over as well.

## Install

`npm install --save react-beforeunload-component`

## Example

```js
import React from 'react';
import BeforeUnloadComponent from 'react-to-print';

class Example extends React.Component {
  render() {
    return (
      <div>
        <BeforeUnloadComponent
            blockRoute={true}   
            historyMode={true}  
            handleAfterLeave={({to}) => {
                // react-router-dom
                history.push(to);
            }}
        />
        <BeforeUnloadComponent ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}
```
## Running locally

*NOTE*: Node ^8.6 is required to build the library locally. We use Node ^10 for our CLI checks.

## API

### &lt;ReactToPrint />

The component accepts the following props (note: `?` denotes an optional prop):

|         Name          | Type     | Default  | Description                                                                                                                       |
| :-------------------: | :------- | :------- :---------------------------------------------------------------------------------------------------------------------------------- |
|     **`blockRoute`**  | `boolean` | `true` | If it's false will not block router |
|     **`ignoreBeforeUnloadAlert`**  | `boolean` | `false` |  Will ignore default reloading page alert.  |
|     **`historyMode`**     | `boolean` | `true` |  Necessary for returing a state mode in case you are using react-router or @reach-router or similar library that use pushState history, if you don't need it, set it as false .  |
|   **`replace`**    | `boolean`  | `false` | historyMode needs to be __true__ and it reaplce the history state. |
|   **`handleAfterLeave`**  | `function` | `optional` | It's necesary for handleing the router, if this prop is omitted, will use the natural router reloading pages. |
|   **`modalComponentHandler`**  | `function`  | `optional` | You can use your own modal. The limitation for the moment is that when the page is reloaded the default browser alert will be displayed instead of your modalcomponent. |
| **`alertMessage`** | `string` | `optional` | If you don't want to use a React Modal component you can use the deafult alert (Browsers defaults) with your own message |                                                                              