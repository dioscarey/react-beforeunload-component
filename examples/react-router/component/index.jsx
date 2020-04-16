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

const MyModalLoading = ({ onClose, onSubmit }) => {
  return (
    <div className="modal" id="modal">
      <h2>Redirecting...</h2>
      <div className="content">....</div>
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

const IgnoreChildrenLinks = () => {

  return (
    <div>
      <BeforeUnloadComponent
        blockRoute={true}
        modalComponentHandler={({ handleModalLeave, handleModalCancel }) => {
          return (
            <MyModal onClose={handleModalCancel} onSubmit={handleModalLeave} />
          );
        }}
        ignoreChildrenLinks={true}
      >
        <div>
          <div>if <b>ignoreChildrenLinks</b> is setted as  <b>true</b>, all children links will be ifnored</div>
          <div>The follow links will be ignored</div>
            <ul>
              <li><Link to={'/'}> go to home</Link> </li>
              <li><Link to={'/'}> go to home</Link> </li>
              <li><Link to={'/'}> go to home</Link> </li>
              <li><Link to={'/'}> go to home</Link> </li>
            </ul>
        </div>
      </BeforeUnloadComponent>
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
          {
            window.location.hash === "#i"
            ? <div>
                  <div>Add "custom-ignore" attribute to ignore any alert <br/><br/></div>
                  <pre>{`<a custom-ignore="true" href="/form#i">This link is ignored</a>`}</pre>
              </div>
            : ""
          }
          <h2>Custom Modal Before Unload</h2>
          <div>This component has a custom pop-up.</div>          
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
            <div>After submitting the pop-up will be disabled.</div>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </BeforeUnloadComponent>
    </div>
  );
};

const BeforeUnload = () => {
  const [modalLoading, setModalLoading] = useState(false)

  return (
      <BeforeUnloadComponent
        blockRoute={true}
        beforeUnload={(next) => {
          setModalLoading(true)
          setTimeout(() => {
            next()
          }, 3000)
        }}
        ignoreChildrenLinks={true}
        beforeUnloadSendBeacon={{
          path: '/analytics',
          data: JSON.stringify({
            userId: 'numberId'
          })
        }}
      >
        <React.Fragment>
          {
            modalLoading && <MyModalLoading/>
          }
          <h2>Before Unload function</h2>
          <div>You can use beforeUnload callback to send data, ex. tracking</div>      
          <p>
            <b>{`beforeUnload={(redirect)=> redirect() }`}</b>
          </p>
          <br/>
          <br/>
          <div>Also you can use sendBeacon <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">Click here to know more about sendBeacon</a></div>
          <p> 
            <b>beforeUnloadSendBeacon={`{{ path: '/analytics', data: JSON.stringify({data:'data'}) }}`}</b>            
          </p>
        </React.Fragment>
      </BeforeUnloadComponent>
  );
};

const Home = () => {

  return (
      <BeforeUnloadComponent
        blockRoute={true}
      >
        <React.Fragment>
          <h2>Before Unload Component</h2>
          <div>This component has the default alert.</div>      
          <ul>
            <li>{`blockRoute={true}`}</li>            
          </ul>
        </React.Fragment>
      </BeforeUnloadComponent>
  );
};

const App = ({location}) => {

  console.log(location)

  return (
    <div>
      <Link to={`/`}>Home</Link>
      <span> | </span>
      <Link to={{
        pathname: "/form",
        state: { stateTest: true }
      }}>Form</Link>
      <span> | </span>
      <a href="/form#i" custom-ignore="true">Form (This link is ignored)</a>
      <span> | </span>
      <Link to={'/ignorelinks'}>Ignore children links</Link>
      <span> | </span>
      <Link to={'/beforeunload'}>Before unload function</Link>
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
        <Route exact path={`/ignorelinks`}>
          <IgnoreChildrenLinks/>
        </Route>
        <Route exact path={`/beforeunload`}>
          <BeforeUnload/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
