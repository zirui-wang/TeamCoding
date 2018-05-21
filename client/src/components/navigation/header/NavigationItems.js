import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import Button from '../../UI/Button';

const styles = theme => ({
  deskTopOnly: {
    '@media (max-width: 499px)': {
      display: 'none'
    }
  },
  selected: {
    color: theme.palette.secondary.main
    // color: '#b1b1b1'
  }
});

const navigationItems = props => {
  const { classes, auth, history } = props;
  return (
    <div className={classes.deskTopOnly}>
      <Button
        to="/problems"
        color="inherit"
        size="medium"
        component={NavLink}
        exact
        activeClassName={classes.selected}
      >
        Problems
      </Button>
      {auth.isAuthenticated() ? (
        <Button
          to="/favorites"
          color="inherit"
          size="medium"
          component={NavLink}
          exact
          activeClassName={classes.selected}
        >
          My Favorites
        </Button>
      ) : null}
      {!auth.isAuthenticated() ? (
        <Button onClick={auth.login} color="inherit" size="medium">
          Login
        </Button>
      ) : (
        <Button onClick={() => auth.logout(history)} color="inherit" size="medium">
          Logout
        </Button>
      )}
    </div>
  );
};

export default withRouter(withStyles(styles)(navigationItems));
