import React from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './views/Home';
import history from './utils/history';
import api from './utils/api';

function App({ auth }: any) {
  let isAuthenticated = false;

  if (auth.AccessToken === undefined) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
    api.defaults.headers['Authorization'] = `Bearer ${auth.AccessToken}`;
  }

  function PrivateRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={(props: any) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRouteCheck({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={(props: any) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={(props: any) => React.createElement(component, props)}
      />
    );
  }

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/h" />} />
          <PublicRoute path="/h" component={Home} />
          {/* <PrivateRoute path="/h" component={Home} /> */}
          {/* <Route component={Notfound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
