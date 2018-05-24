import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Button from './Button';

const styles = theme => ({
  root: {},
  paper: {
    backgroundColor: theme.palette.background.paper
  }
});

const modal = props => {
  const { classes, className: classNameProp } = props;
  const className = classNames(classes.root, classNameProp);
  return (
    <Dialog
      className={className}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(modal);
