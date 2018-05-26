import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    padding: 20
  },
  margin: {
    marginTop: 10,
    marginBottom: 10
  }
});

const problemDetail = props => {
  const { classes, className: classNameProp } = props;
  const className = classNames(classes.root, classNameProp);
  const headline = props.problem.id + '. ' + props.problem.title;
  return (
    <div className={className}>
      <Typography variant="headline" className={classes.margin}>
        {headline}
      </Typography>
      <Divider />
      <Typography variant="body1" className={classes.margin}>
        {props.problem.desc}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(problemDetail);
