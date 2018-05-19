import React from 'react';
import classNames from 'classnames';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    padding: '20px',
    maxWidth: 800,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    minWidth: 200
  },
  margin: {
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    margin: {
      top: theme.spacing.unit
    },
    float: 'right'
  }
});

const newProblem = props => {
  const { classes, className: classNameProp } = props;
  const className = classNames(classes.root, classNameProp);
  const difficultySelectField = ({ input, label, children, ...custom }) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
        <Select
          {...input}
          onChange={(event) => 
            input.onChange(event)
          }
          children={children}
          {...custom}
        />
        <FormHelperText>Select the difficulty</FormHelperText>
      </FormControl>
    );
  };
  
  return (
    <div className={className}>
      <form>
        <Field
          component={TextField}
          type="text"
          label="Problem Title"
          name="title"
          fullWidth={true}
          helperText="Enter Problem Title"
          className={classes.margin}
        />
        <Field
          component={TextField}
          type="text"
          label="Problem Description"
          name="desc"
          fullWidth={true}
          helperText="Enter Problem Description"
          multiline
          className={classes.margin}
        />
        <Field
          name="difficulty"
          component={difficultySelectField}
          label="Difficulty"
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Field>
        <div>
          <Button
            type="submit"
            size="large"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'newProblem',
  destroyOnUnmount: false
})(withStyles(styles)(newProblem));
