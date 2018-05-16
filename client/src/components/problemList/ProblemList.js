import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper
  },
  tag: {
    width: 80,
    color: '#fff'
  },
  diffEasy: {
    backgroundColor: '#42ebf4'
  },
  diffMedium: {
    backgroundColor: '#92cf5c'
  },
  diffHard: {
    backgroundColor: '#dd0d1e'
  }
});

const diffClassify = (diff, classes) => {
  switch (diff) {
    case 'easy':
      return classes.diffEasy;
    case 'medium':
      return classes.diffMedium;
    case 'hard':
      return classes.diffHard;
    default:
      return null;
  }
};

const problemList = props => {
  const { classes } = props;
  const list = props.problems.map(problem => (
    <ListItem
      button
      key={problem.id}
      component={NavLink}
      to={'/problems/' + problem.id}
      exact
    >
      <Typography
        className={classNames(
          classes.tag,
          diffClassify(problem.difficulty, classes)
        )}
      >
        {problem.difficulty}
      </Typography>
      <ListItemText primary={problem.id + ' ' + problem.title} />
    </ListItem>
  ));
  return (
    <div className={classes.root}>
      <List component="nav">{list}</List>
    </div>
  );
};

export default withStyles(styles)(problemList);
