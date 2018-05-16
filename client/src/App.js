import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Problems from './containers/Problems';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Problems} />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
