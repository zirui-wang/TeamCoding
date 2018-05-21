import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/navigation/header/Header';

const theme = createMuiTheme({
  shadows: ["none"]
});

const layout = props => {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header/>
        <main>{props.children}</main>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

export default layout;
