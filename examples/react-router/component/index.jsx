import React, { useState } from "react";
import {
  BrowserRouter as Router,
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
  const [blockRoute, setBlockRoute] = useState(true);
  const [name, setName] = useState("");

  return (
    <div>
      <BeforeUnloadComponent
        blockRoute={blockRoute}
        historyMode={true}
        handleAfterLeave={({ to }) => {
          history.push(to);
        }}
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
                onChange={e => setName(e.currentTarget.value)}
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
  let history = useHistory();

  return (
    <div>
      <BeforeUnloadComponent
        blockRoute={true}
        historyMode={true}
        handleAfterLeave={({ to }) => {
          history.push(to);
        }}
      >
        <React.Fragment>
          <h2>Before Unload Component</h2>
          <div>This component has the default alert.</div>
          <p>          
            <ul>
              <li>{`blockRoute={true}`}</li>
              <li>{`historyMode={true}`}</li>
              <li>{`handleAfterLeave={({ to }) => {
                history.push(to);
              }}`}</li>
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
      <Link to={`/form`}>Modal</Link>
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
