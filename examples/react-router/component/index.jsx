import React, {Component} from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import BeforeUnload from 'react-beforeunload-component'

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </div>
  );
}


const About = () => {
  return (
    <div>c
      <h2>About</h2>
    </div>
  );
}


const Home = () => {
  let history = useHistory();

  return (
    <div>
      <BeforeUnload
        blockRoute={true}      
        historyMode={true}  
        handleAfterLeave={({to}) => {
          history.push(to);
        }}
        >
        <h2>Component Before Un Load</h2>
      </BeforeUnload>
    </div>
  )
}

// This example show how you could create a custom
// <Link> that renders something special when the URL
// is the same as the one the <Link> points to.

export default class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <OldSchoolMenuLink
            activeOnlyWhenExact={true}
            to="/"
            label="Home"
          />
          <OldSchoolMenuLink to="/about" label="About" />

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}