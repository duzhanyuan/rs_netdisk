import * as React from "react";
import "./App.css";

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import Nav from "./Navbar";
import AuthService from "./services/AuthService";
import Viewport from "./Viewport";
import Login from "./views/Login";

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
        <div id="app">
            <Nav />

            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logout" render={ () => {
                    AuthService.delete_user();

                    return (
                        <Redirect to="/login" />
                    );
                }}/>
                <PrivateRoute path="" component={Viewport} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
