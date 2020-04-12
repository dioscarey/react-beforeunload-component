

# React Beforeunload Component

Beforeunload works when the document and resources are about to be unloaded but it doesn't detect react components that will be unmounted.


## Install
*NOTE*: react version ^16.8 for hooks

`npm i --save react-beforeunload-component`

## Example React Hook
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
## Example React Hook - Your Modal Component
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
|     **`blockRoute`**  | `boolean` | `true` | If it's false the router will be blocked |
|     **`ignoreBeforeUnloadAlert`**  | `boolean` | `false` |  it will ignore default reloading page alert.  |
|   **`modalComponentHandler`**  | `function`  | `optional` | You can use your custom modal. The limitation for the moment is that when the page is reloaded the default browser alert will be displayed instead of your modalcomponent. |
| **`alertMessage`** | `string` | `optional` | If you don't want to use a React Modal Component you can use the default alert (Browsers defaults) with your own message. |                                                                              

