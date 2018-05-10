import * as React from "react";
import "./App.css";

import AppLayout from './views/layouts/App';
import LoginLayout from './views/layouts/Login';

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import AuthService from "./services/AuthService";

const PrivateRoute  = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => (
        AuthService.is_authenticated()
            ? <Component {...props} />
            : <Redirect to={{ pathname: "/login", state: { from: props.location }}}/>
    )} />
);

class App extends React.Component<{}, {}> {
  constructor() {
    super();
  }

  public render() {

    return (
      <Router>
        <Switch>
            <Route path="/login" component={LoginLayout}/>
            <PrivateRoute path="" component={AppLayout}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
