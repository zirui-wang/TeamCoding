import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

const layout = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default layout;
