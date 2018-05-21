import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
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
  const { classes } = props;
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
      {props.isAuthenticated ? (
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
      {!props.isAuthenticated ? (
        <Button href="/auth/google" color="inherit" size="medium">
          Login with Google
        </Button>
      ) : (
        <Button href="/api/logout" color="inherit" size="medium">
          Logout
        </Button>
      )}
    </div>
  );
};

export default withStyles(styles)(navigationItems);
