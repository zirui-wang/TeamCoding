import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Button from '../../UI/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    '@media (max-width: 499px)': {
      display: 'none'
    }
  },
  selected: {
    color: theme.palette.secondary.main
    // color: '#b1b1b1'
  },
  avatar: {
    margin: 10
  }
});

const navigationItems = props => {
  const {
    classes,
    className: classNameProp,
    auth,
    history,
    handleClose,
    handleMenu,
    anchorEl
  } = props;
  const className = classNames(classes.root, classNameProp);
  const open = Boolean(anchorEl);
  return (
    <div className={className}>
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
          logout
        </Button>
      )}
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default withRouter(withStyles(styles)(navigationItems));
