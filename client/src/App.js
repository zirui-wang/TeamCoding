import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Auth from './services/auth/Auth';
import Callback from './components/callback/Callback';

import Layout from './hoc/Layout';
import Problems from './containers/Problems';
import Problem from './containers/Problem';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(nextState.history);
  }
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout auth={auth}>
          <Route exact path="/problems" component={Problems} auth={auth} />
          <Route path="/problems/:id" component={Problem} auth={auth} />
          <Route exact path="/" render={() => <Redirect to="/problems" />} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
