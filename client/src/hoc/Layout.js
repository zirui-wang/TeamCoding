import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/navigation/header/Header';

const layout = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header/>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default layout;
