import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const languageSelector = props => {
  return (
    <TextField
      id="select-lang"
      select
      label="Select"
      className={classes.textField}
      value={props.lang}
      onChange={this.handleChange('currency')}
      SelectProps={{
        MenuProps: {
          className: classes.menu
        }
      }}
      helperText="Please select your currency"
      margin="normal"
    >
      {props.langs.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default languageSelector;
