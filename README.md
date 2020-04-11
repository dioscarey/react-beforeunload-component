

# React Beforeunload Component

Currently Beforeunload works when the browser detects the change of the pathname


## Install
*NOTE*: react version ^16.8 for hooks

`npm i --save react-beforeunload-component`

## Example React Hook
```js
import React from 'react';
import { useHistory } from "react-router-dom";
import BeforeUnloadComponent from 'react-beforeunload-component';
// React Hook
const Example = () => {
    let history = useHistory();
    
    return (
      <div>
        <BeforeUnloadComponent
            blockRoute={true}   
            historyMode={true}  
            handleAfterLeave={({to}) => {
                // react-router-dom
                history.push(to);
            }}
        />  ]
            <form> ... </form>
        <BeforeUnloadComponent ref={el => (this.componentRef = el)} />
      </div>
    );
}
....

```
## Example React Hook - Your Modal Component
```js
import React from 'react';
import { navigate } from "gatsby";
import BeforeUnloadComponent from 'react-beforeunload-component';
import MyModal from '../../MyModal';
// React Hook
const Example = () => {
    let history = useHistory();
    
    return (
      <div>
        <BeforeUnloadComponent
            blockRoute={true}   
            historyMode={true}  
            handleAfterLeave={({to, state}) => {
                // Example with gatsby
                navigate.push(to, state);
            }}
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
        <BeforeUnloadComponent ref={el => (this.componentRef = el)} />
      </div>
    );
}
....

```
## API

|         Name          | Type     | Default  | Description |
| :-------------------: | :-------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
|     **`blockRoute`**  | `boolean` | `true` | If it's false will not block router |
|     **`ignoreBeforeUnloadAlert`**  | `boolean` | `false` |  Will ignore default reloading page alert.  |
|     **`historyMode`**     | `boolean` | `true` |  Necessary for returing a state mode in case you are using react-router or @reach-router or similar library that use pushState history, if you don't need it, set it as false .  |
|   **`replace`**    | `boolean`  | `false` | historyMode needs to be __true__ and it reaplce the history state. |
|   **`handleAfterLeave`**  | `function` | `optional` | It's necesary for handleing the router, if this prop is omitted, will use the natural router reloading pages. |
|   **`modalComponentHandler`**  | `function`  | `optional` | You can use your own modal. The limitation for the moment is that when the page is reloaded the default browser alert will be displayed instead of your modalcomponent. |
| **`alertMessage`** | `string` | `optional` | If you don't want to use a React Modal component you can use the deafult alert (Browsers defaults) with your own message |                                                                              

