import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = {
  block: {
    alignItems: 'center',
    display: 'flex'
  }
};

const buildNRunResult = props => {
  const { classes } = props;
  const output =
    props.build && props.run ? (
      <div>
        <div className={classes.block}>
          <Typography variant="body2">{'Build: '}</Typography>
          <Typography variant="body1">{props.build}</Typography>
        </div>
        <div className={classes.block}>
          <Typography variant="body2">{'Output: '}</Typography>
          <Typography variant="body1">{props.run}</Typography>
        </div>
      </div>
    ) : null;
  return <div>{output}</div>;
};

export default withStyles(styles)(buildNRunResult);
