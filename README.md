[![NPM registry](https://img.shields.io/npm/v/react-beforeunload-component.svg?style=for-the-badge)](https://yarnpkg.com/en/package/react-beforeunload-component) [![NPM license](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](LICENSE.md)

# React Beforeunload Component

Beforeunload works when the document or React components are about to be unloaded.

### Compatible

Gatsby, react-router, @reach/router, next.js and more..

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

If you want to ignore some links you need to add an attribute:

```js
<a custom-ignore={"true"} href="path">Path</a>
```

or, you can ignore all the children links:

```js
<BeforeUnloadComponent
    ignoreChildrenLinks={true}
    blockRoute={true}
    modalComponentHandler={({handleModalLeave, handleModalCancel})=>{
        ....
    }}
/>
    <form id="myform"> ... </form>
<BeforeUnloadComponent/>
```

## API

| Name | Type | Default | Description |
| :--: | :--: | :------ | :---------- |
| **`blockRoute`** | `boolean` | `true` | If it's false the router will not be blocked |
| **`ignoreBeforeunloadDocument`** | `boolean` | `false` | It ignores default reloading page alert. |
| **`modalComponentHandler`** | `function` | `window.confirm(...)` | You can use your custom modal component instead of the default alert. |
| **`alertMessage`** | `string` | `"Are you sure you want to leave? Changes will not be saved."` | If you don't want to use a React Modal Component you can use the default alert (Browsers defaults) with your own message. |  
| **`ignoreChildrenLinks`** | `boolean` | `false` | If it's true is going to ignore all the children links |
| **`beforeUnload`** | `function` | `null` | Manage data before the component is unload |
| **`beforeUnloadSendBeacon`** | `object` | `null` | Manage data before the document is unload with sendBeacon( path, data). More info about sendBeacon, [click here](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon). |

### Limitations

Ipad and Iphones browsers like safari and chrome don't trigger the event beforeunload, for this reason, when you want to reload the page the browser alert will not be shown. There's some work to do to patch this issue.
