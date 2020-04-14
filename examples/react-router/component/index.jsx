import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import BeforeUnloadComponent from "BeforeUnloadCompnent/index";

const MyModal = ({ onClose, onSubmit }) => {
  return (
    <div className="modal" id="modal">
      <h2>Modal Window</h2>
      <div className="content">If you leave changes will not be saved.</div>
      <div className="actions">
        <button className="toggle-button" onClick={onSubmit}>
          Leave
        </button>
        <button className="toggle-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const Hello = () => {
  let location = useLocation();

  return (
    <div>
      <h1>Hi {location.state.name}</h1>
      <p>Alert was desactivated!</p>
    </div>
  );
};

const Form = () => {
  const history = useHistory();
  const location = useLocation();
  const [blockRoute, setBlockRoute] = useState(false);
  const [name, setName] = useState("");

  return (
    <div>
      <BeforeUnloadComponent
        blockRoute={blockRoute}
        modalComponentHandler={({ handleModalLeave, handleModalCancel }) => {
          return (
            <MyModal onClose={handleModalCancel} onSubmit={handleModalLeave} />
          );
        }}
      >
        <div>
          <h2>Custom Modal Before Unload</h2>
          <div>This component has a custom pop-up.</div>
          <br/>
          <div>After submitting the pop-up will be disabled.</div>
          <br/>
          <div>States also works ={JSON.stringify(location.state)}</div>
          <br/>
          <div><b>blockRoute={blockRoute ? <span style={{color:'green'}}>true</span> : <span style={{color:'red'}}>false</span>} | <span>{!blockRoute ? 'Form is not updated' : 'form is updated! blockRoute activated'}</span></b></div>
          <br/>
          <form
            onSubmit={() => {
              setBlockRoute(false);
              history.push("/hello", { name });
            }}
          >
            <div>
              <label htmlFor="">My name</label>
              <br />
              <input
                type="text"
                value={name}
                onChange={e => {
                  setName(e.currentTarget.value)
                  if(e.currentTarget.value !== "") {
                    setBlockRoute(true)
                  }
                }}
              />
            </div>
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </BeforeUnloadComponent>
    </div>
  );
};

const Home = () => {

  return (
    <div>
      <BeforeUnloadComponent
        blockRoute={true}
      >
        <React.Fragment>
          <h2>Before Unload Component</h2>
          <div>This component has the default alert.</div>
          <p>          
            <ul>
              <li>{`blockRoute={true}`}</li>            
            </ul>
          </p>
        </React.Fragment>
      </BeforeUnloadComponent>
    </div>
  );
};

const App = () => {

  return (
    <div>
      <Link to={`/`}>Home</Link>
      <span> | </span>
      <Link to={{
        pathname: "/form",
        state: { stateTest: true }
      }}>Form</Link>
      <hr />
      <Switch>
        <Route exact path={'/'}>
          <Home />
        </Route>
        <Route exact path={`/form`}>
          <Form />
        </Route>
        <Route exact path={`/hello`}>
          <Hello />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
