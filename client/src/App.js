import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout';
import Problems from './containers/Problems';
import ProblemDetails from './containers/ProblemDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/problems" component={Problems} />
          <Route path="/problems/:id" component={ProblemDetails} />
          <Route exact path="/" render={() => (<Redirect to="/problems" />)} />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
