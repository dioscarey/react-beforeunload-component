
[![NPM registry](https://img.shields.io/npm/v/react-beforeunload-component.svg?style=for-the-badge)](https://yarnpkg.com/en/package/react-beforeunload-component) [![NPM license](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](LICENSE.md)

# React Beforeunload Component

Beforeunload works when the document and resources are about to be unloaded and react components that will be unmounted.

### Compatible

gatsby, react-router, @reach-router, netflix.js and more..

## Demo

[![Edit react-beforeunload-component](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-beforeunload-component-mr2zp?file=/src/App.js)

## Install
`npm i --save react-beforeunload-component`

## Example
```js
import React from 'react';
import BeforeUnloadComponent from 'react-beforeunload-component';
// React Hook
const Example = () => {
    
    return (
      <div>
        <BeforeUnloadComponent
            blockRoute={true}               
        /> 
            <form> ... </form>
        <BeforeUnloadComponent />
      </div>
    );
}
....

```
## Example with your custom modal
```js
import React from 'react';
import BeforeUnloadComponent from 'react-beforeunload-component';
import MyModal from 'path/MyModal';
// React Hook
const Example = () => {
    
    return (
      <div>
        <BeforeUnloadComponent
            blockRoute={true}   
            modalComponentHandler={({handleModalLeave, handleModalCancel})=>{
                return (
                    <MyModal
                        onClose={handleModalCancel}
                        onSubmit={handleModalLeave}
                    />
                )
            }}
        />  
            <form id="myform"> ... </form>
        <BeforeUnloadComponent/>
      </div>
    );

}
....

```
## API


|         Name          | Type     | Default  | Description |
| :-------------------: | :-------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
|     **`blockRoute`**  | `boolean` | `true` | If it's false the router will not blocked |
|     **`ignoreBeforeUnloadAlert`**  | `boolean` | `false` |  It will ignore default reloading page alert.  |
|   **`modalComponentHandler`**  | `function`  | `window.confirm(...)` | You can use your custom modal component instead of the default alert. |
| **`alertMessage`** | `string` | `"Are you sure you want to leave? Changes will not be saved."` | If you don't want to use a React Modal Component you can use the default alert (Browsers defaults) with your own message. |                                                                              

### Limitations

Ipad browsers like safari and chrome don't detect the event beforeunload. So, when you want to reload the page, the browser alert will not be shown. There's some work to do to patch this issue.