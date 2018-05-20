import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    textTransform: 'none'
  }
});

const button = props => {
  const { children, classes, className: classNameProp, ...other } = props;
  const className = classNames(classes.root, classNameProp);
  return (
    <Button disableFocusRipple disableRipple {...other} className={className}>
      {children}
    </Button>
  );
};

export default withStyles(styles)(button);
